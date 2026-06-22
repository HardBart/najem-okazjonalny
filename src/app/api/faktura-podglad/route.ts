import { NextRequest, NextResponse } from 'next/server';
import { generateInvoicePdf } from '@/lib/invoice/generateInvoice';
import type { Order } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * DEV-ONLY podgląd dokumentu sprzedaży. ?type=faktura|rachunek &vat=zw|23 &buyer=company|person
 * W produkcji zwraca 404 (właściwe wystawianie zrobi webhook + panel admina).
 */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const sp = req.nextUrl.searchParams;
  const type = sp.get('type') === 'rachunek' ? 'rachunek' : 'faktura';
  const vat = sp.get('vat') === '23' ? '23' : 'zw';
  const buyer = sp.get('buyer') === 'person' ? 'person' : 'company';

  const sampleOrder = {
    orderId: 'NO-DEMO-001',
    amount: 389,
    personalData: { firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@example.com', phone: '+48123456789', pesel: '' },
    rentalData: { currentAddress: 'ul. Wrzosowa 15, 05-110 Jabłonna', rentalPurpose: '' },
    invoice:
      type === 'faktura'
        ? buyer === 'company'
          ? { wantInvoice: true, buyerType: 'company', companyName: 'Przykład Sp. z o.o.', nip: '5252248481', address: 'ul. Testowa 1, 00-001 Warszawa' }
          : { wantInvoice: true, buyerType: 'person', buyerName: 'Jan Kowalski', address: 'ul. Wrzosowa 15, 05-110 Jabłonna' }
        : { wantInvoice: false },
  } as unknown as Order;

  const pdf = await generateInvoicePdf(sampleOrder, {
    number: type === 'faktura' ? 'FV 1/2026/NO' : 'R 1/2026/NO',
    type,
    vat,
    p24TransactionId: '4302214224',
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="dokument.pdf"',
    },
  });
}
