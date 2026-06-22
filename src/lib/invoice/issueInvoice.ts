import type { Order } from '@/types';
import { issueDocument } from './registry';
import { generateInvoicePdf } from './generateInvoice';

function buyerLabel(order: Order): string {
  const inv = order.invoice;
  if (inv?.wantInvoice && inv.buyerType === 'company') return inv.companyName || '—';
  return inv?.buyerName || `${order.personalData.firstName} ${order.personalData.lastName}`.trim();
}

export interface IssuedInvoice {
  number: string;
  type: 'faktura' | 'rachunek';
  vat: 'zw' | '23';
  pdf: Buffer;
  alreadyIssued: boolean;
}

/**
 * Dla opłaconego zamówienia: nadaje numer (rejestr, idempotentnie + próg VAT)
 * i generuje PDF dokumentu (faktura/rachunek). Zwraca też flagę alreadyIssued,
 * by webhook nie wysłał e-maila ponownie.
 */
export async function issueInvoiceForOrder(
  order: Order,
  opts: { p24TransactionId?: string; issueDate?: Date } = {}
): Promise<IssuedInvoice> {
  const type: 'faktura' | 'rachunek' = order.invoice?.wantInvoice ? 'faktura' : 'rachunek';

  const issued = issueDocument({
    orderId: order.orderId,
    type,
    amount: order.amount,
    buyer: buyerLabel(order),
    p24TransactionId: opts.p24TransactionId,
    issueDate: opts.issueDate,
  });

  const pdf = await generateInvoicePdf(order, {
    number: issued.number,
    type: issued.type,
    vat: issued.vat,
    p24TransactionId: opts.p24TransactionId,
    // PDF generujemy z datą wystawienia dokumentu (spójność przy regeneracji).
    issueDate: new Date(issued.issuedAt),
  });

  return { number: issued.number, type: issued.type, vat: issued.vat, pdf, alreadyIssued: issued.alreadyIssued };
}
