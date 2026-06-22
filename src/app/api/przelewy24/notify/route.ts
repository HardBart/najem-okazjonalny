import { NextRequest, NextResponse } from 'next/server';
import { Przelewy24Service, P24Notification } from '@/lib/przelewy24';
import { StorageService } from '@/lib/storage';
import { sendOrderConfirmation, sendInvoiceEmail } from '@/lib/email';
import { InpostShipXService } from '@/lib/inpost';
import { issueInvoiceForOrder } from '@/lib/invoice/issueInvoice';

/**
 * Handler powiadomień (webhook) Przelewy24 — wywoływany przez P24 po płatności
 * na adres urlStatus. Weryfikuje podpis, potwierdza transakcję po stronie P24
 * i aktualizuje status zamówienia.
 */
export async function POST(request: NextRequest) {
  try {
    const notification = (await request.json()) as P24Notification;

    // sessionId = nasz orderId
    const storedOrder = await StorageService.getOrderByOrderId(notification.sessionId);
    if (!storedOrder) {
      console.error('Przelewy24 notify: order not found', notification.sessionId);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Weryfikacja podpisu powiadomienia
    if (!Przelewy24Service.verifyNotificationSignature(notification)) {
      console.error('Przelewy24 notify: invalid signature', notification.sessionId);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Zabezpieczenie: kwota z powiadomienia musi zgadzać się z zamówieniem
    const expectedAmount = storedOrder.amount * 100;
    if (notification.amount !== expectedAmount) {
      console.error('Przelewy24 notify: amount mismatch', {
        sessionId: notification.sessionId,
        expected: expectedAmount,
        got: notification.amount,
      });
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 });
    }

    // Autorytatywne potwierdzenie płatności po stronie P24
    const verified = await Przelewy24Service.verifyTransaction({
      sessionId: notification.sessionId,
      orderId: notification.orderId,
      amount: notification.amount,
    });

    if (verified) {
      await StorageService.updateOrder(storedOrder.orderId, {
        paymentStatus: 'completed',
        orderStatus: 'in_progress',
        payuOrderId: String(notification.orderId),
      });
      console.log(`Order ${storedOrder.orderId} opłacone (P24 orderId ${notification.orderId})`);

      // Potwierdzenie na trwałym nośniku (klient + powiadomienie do firmy)
      await sendOrderConfirmation({
        ...storedOrder,
        paymentStatus: 'completed',
        orderStatus: 'in_progress',
      });

      // Wystawienie dokumentu sprzedaży (faktura/rachunek) + e-mail z PDF.
      // Idempotentnie: pomijamy, jeśli dokument już wystawiony. Nie blokuje płatności.
      try {
        if (!storedOrder.invoiceDoc) {
          const p24Id = String(notification.orderId);
          const issued = await issueInvoiceForOrder(
            { ...storedOrder, paymentStatus: 'completed' },
            { p24TransactionId: p24Id }
          );
          await StorageService.updateOrder(storedOrder.orderId, {
            p24TransactionId: p24Id,
            invoiceDoc: { number: issued.number, type: issued.type, issuedAt: new Date().toISOString() },
          });
          if (!issued.alreadyIssued) {
            await sendInvoiceEmail({ ...storedOrder }, { number: issued.number, type: issued.type, pdf: issued.pdf });
          }
          console.log(`Order ${storedOrder.orderId}: ${issued.type} ${issued.number} (VAT ${issued.vat})`);
        }
      } catch (e) {
        console.error('Order invoice error (nie blokuje płatności):', e);
      }

      // Utworzenie przesyłki InPost (jeśli skonfigurowano i dostawa fizyczna)
      try {
        const shipment = await InpostShipXService.createShipment(storedOrder);
        if (shipment) {
          await StorageService.updateOrder(storedOrder.orderId, {
            shipment: {
              provider: 'inpost',
              shipmentId: shipment.shipmentId,
              trackingNumber: shipment.trackingNumber,
              status: shipment.status,
            },
          });
          console.log(`Order ${storedOrder.orderId}: przesyłka InPost ${shipment.shipmentId}`);
        }
      } catch (e) {
        console.error('Order shipment error (nie blokuje płatności):', e);
      }
    } else {
      await StorageService.updateOrder(storedOrder.orderId, { paymentStatus: 'failed' });
      console.warn(`Order ${storedOrder.orderId}: weryfikacja P24 nieudana`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Przelewy24 notification error:', error);
    return NextResponse.json({ error: 'Failed to process notification' }, { status: 500 });
  }
}
