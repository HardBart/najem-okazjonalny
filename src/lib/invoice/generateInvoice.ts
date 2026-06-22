import path from 'path';
import type { Order } from '@/types';
import { SELLER, SERVICE_NAME, VAT_EXEMPTION_BASIS, VAT_RATE } from './seller';

// pdfmake (0.2.x) — CJS, używane tylko po stronie serwera (API/webhook).
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PdfPrinter = require('pdfmake');

const FONT_DIR = path.join(process.cwd(), 'src/lib/invoice/fonts');
const fonts = {
  Roboto: {
    normal: path.join(FONT_DIR, 'Roboto-Regular.ttf'),
    bold: path.join(FONT_DIR, 'Roboto-Bold.ttf'),
    italics: path.join(FONT_DIR, 'Roboto-Regular.ttf'),
    bolditalics: path.join(FONT_DIR, 'Roboto-Bold.ttf'),
  },
};

export type DocType = 'faktura' | 'rachunek';
export type VatMode = 'zw' | '23';

export interface InvoiceOptions {
  /** Pełny numer, np. "FV 1/2026/NO" albo "R 3/2026/NO". */
  number: string;
  type: DocType;
  /** Stawka: zwolniony albo 23% (po przekroczeniu progu). */
  vat: VatMode;
  /** ID transakcji Przelewy24 (z webhooka notify). */
  p24TransactionId?: string;
  issueDate?: Date;
  saleDate?: Date;
}

const NAVY = '#1F3A5F';
const LINE = '#999999';

function plDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()} r.`;
}

function plnFmt(n: number): string {
  return `${n.toFixed(2).replace('.', ',')} PLN`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Ustala dane nabywcy na podstawie danych zamówienia. */
function resolveBuyer(order: Order): string[] {
  const inv = order.invoice;
  const lines: string[] = [];
  if (inv?.wantInvoice && inv.buyerType === 'company') {
    if (inv.companyName) lines.push(inv.companyName);
    if (inv.address) lines.push(inv.address);
    if (inv.nip) lines.push(`NIP: ${inv.nip}`);
  } else {
    const name =
      inv?.buyerName ||
      `${order.personalData.firstName} ${order.personalData.lastName}`.trim();
    if (name) lines.push(name);
    const address = inv?.address || order.rentalData?.currentAddress;
    if (address) lines.push(address);
  }
  if (order.personalData.email) lines.push(`E-mail: ${order.personalData.email}`);
  return lines;
}

/** Buduje definicję dokumentu pdfmake. */
function buildDocDefinition(order: Order, opts: InvoiceOptions) {
  const issue = opts.issueDate ?? new Date();
  const sale = opts.saleDate ?? issue;
  const gross = order.amount;
  const is23 = opts.vat === '23';
  const net = is23 ? round2(gross / (1 + VAT_RATE)) : gross;
  const vatAmount = is23 ? round2(gross - net) : 0;

  const titlePrefix = opts.type === 'faktura' ? 'FAKTURA' : 'RACHUNEK';

  // Tabela pozycji — różny układ dla zw. i 23%.
  const itemsTable = is23
    ? {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Lp.', style: 'th' },
            { text: 'Nazwa usługi', style: 'th' },
            { text: 'Ilość', style: 'th' },
            { text: 'Cena netto', style: 'th', alignment: 'right' },
            { text: 'Netto', style: 'th', alignment: 'right' },
            { text: 'VAT 23%', style: 'th', alignment: 'right' },
            { text: 'Brutto', style: 'th', alignment: 'right' },
          ],
          [
            '1',
            SERVICE_NAME,
            '1 szt.',
            { text: plnFmt(net), alignment: 'right' },
            { text: plnFmt(net), alignment: 'right' },
            { text: plnFmt(vatAmount), alignment: 'right' },
            { text: plnFmt(gross), alignment: 'right' },
          ],
        ],
      }
    : {
        widths: ['auto', '*', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Lp.', style: 'th' },
            { text: 'Nazwa usługi', style: 'th' },
            { text: 'Ilość', style: 'th' },
            { text: 'Cena jedn.', style: 'th', alignment: 'right' },
            { text: 'Wartość', style: 'th', alignment: 'right' },
          ],
          [
            '1',
            SERVICE_NAME,
            '1 szt.',
            { text: plnFmt(gross), alignment: 'right' },
            { text: plnFmt(gross), alignment: 'right' },
          ],
        ],
      };

  const sellerStack: string[] = [
    SELLER.name,
    SELLER.addressLine,
    `NIP: ${SELLER.nip}`,
    `REGON: ${SELLER.regon}`,
    `KRS: ${SELLER.krs}`,
    SELLER.court,
  ];
  if (SELLER.shareCapital) sellerStack.push(`Kapitał zakładowy: ${SELLER.shareCapital}`);

  const vatBlock = is23
    ? [
        { text: 'Stawka VAT: 23%', bold: true, margin: [0, 12, 0, 0] },
        { text: `Wartość netto: ${plnFmt(net)}` },
        { text: `Kwota VAT (23%): ${plnFmt(vatAmount)}` },
        { text: `Wartość brutto: ${plnFmt(gross)}`, bold: true },
      ]
    : [
        { text: 'Stawka VAT: zw. (zwolniony)', bold: true, margin: [0, 12, 0, 2] },
        { text: `Podstawa zwolnienia: ${VAT_EXEMPTION_BASIS}`, fontSize: 9 },
      ];

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 50],
    defaultStyle: { font: 'Roboto', fontSize: 10, color: '#222222' },
    styles: {
      th: { bold: true, fillColor: '#F1F1F1' },
      sectionLabel: { bold: true, color: NAVY, fontSize: 11 },
    },
    content: [
      { text: `${titlePrefix} nr ${opts.number}`, bold: true, fontSize: 16, alignment: 'center', margin: [0, 0, 0, 6] },
      {
        stack: [
          { text: `Data wystawienia: ${plDate(issue)}` },
          { text: `Data sprzedaży: ${plDate(sale)}` },
        ],
        alignment: 'right',
        fontSize: 9,
        margin: [0, 0, 0, 14],
      },
      {
        columns: [
          {
            width: '50%',
            stack: [{ text: 'SPRZEDAWCA:', style: 'sectionLabel', margin: [0, 0, 0, 4] }, ...sellerStack.map((t) => ({ text: t }))],
          },
          {
            width: '50%',
            stack: [{ text: 'NABYWCA:', style: 'sectionLabel', margin: [0, 0, 0, 4] }, ...resolveBuyer(order).map((t) => ({ text: t }))],
          },
        ],
        columnGap: 16,
        margin: [0, 0, 0, 16],
      },
      { table: itemsTable, layout: { hLineColor: () => LINE, vLineColor: () => LINE } },
      { text: `SUMA DO ZAPŁATY: ${plnFmt(gross)}`, bold: true, alignment: 'right', fontSize: 12, margin: [0, 8, 0, 0] },
      ...vatBlock,
      { text: 'SZCZEGÓŁY PŁATNOŚCI:', style: 'sectionLabel', margin: [0, 14, 0, 2] },
      { text: 'Metoda: Przelewy24 (płatność online)' },
      { text: `ID transakcji P24: ${opts.p24TransactionId || '—'}` },
      { text: 'Status: OPŁACONO' },
      { text: 'UWAGI I POUCZENIA:', style: 'sectionLabel', margin: [0, 14, 0, 2] },
      {
        ol: [
          'Dokument stanowi potwierdzenie zawarcia umowy o dostarczenie treści cyfrowych. Usługa ma charakter techniczny i nie stanowi porady prawnej.',
          'Klient wyraził zgodę na wykonanie usługi przed upływem terminu do odstąpienia od umowy, co zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta wyłącza prawo do odstąpienia od umowy.',
          opts.type === 'faktura'
            ? 'Faktura wystawiona elektronicznie, nie wymaga podpisu.'
            : 'Rachunek wystawiony elektronicznie, nie wymaga podpisu.',
        ],
        fontSize: 9,
        color: '#444444',
      },
    ],
  };
}

/** Generuje PDF dokumentu (faktura/rachunek) i zwraca Buffer. */
export function generateInvoicePdf(order: Order, opts: InvoiceOptions): Promise<Buffer> {
  const printer = new PdfPrinter(fonts);
  const doc = printer.createPdfKitDocument(buildDocDefinition(order, opts));
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.end();
  });
}
