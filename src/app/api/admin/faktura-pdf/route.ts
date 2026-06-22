import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { StorageService } from '@/lib/storage';
import { issueInvoiceForOrder } from '@/lib/invoice/issueInvoice';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Pobranie PDF wystawionego dokumentu sprzedaży (admin). Regeneruje PDF na żądanie —
 * rejestr jest idempotentny, więc nadawany jest istniejący numer (bez nowego wpisu).
 * Wymaga ważnego ciasteczka admin-token.
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin-token')?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });

  const order = await StorageService.getOrderByOrderId(orderId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  // Pobieramy tylko dla zamówień z już wystawionym dokumentem (po opłaceniu).
  if (!order.invoiceDoc) {
    return NextResponse.json({ error: 'Dokument jeszcze nie wystawiony' }, { status: 409 });
  }

  const issued = await issueInvoiceForOrder(order, { p24TransactionId: order.p24TransactionId });
  const filename = `${issued.type}-${issued.number.replace(/[ /]/g, '_')}.pdf`;

  return new NextResponse(new Uint8Array(issued.pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
    },
  });
}
