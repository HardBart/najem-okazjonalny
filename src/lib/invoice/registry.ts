import fs from 'fs';
import path from 'path';
import { VAT_EXEMPTION_LIMIT } from './seller';

/**
 * Rejestr wystawionych dokumentów sprzedaży: numeracja (osobne serie FV/R, reset co rok),
 * suma sprzedaży w roku (próg VAT) oraz idempotencja (po orderId).
 *
 * Implementacja: synchroniczny plik JSON. Na VPS = jeden proces PM2, więc read-modify-write
 * bez await jest atomowy. Przy skalowaniu horyzontalnym → zamienić na SQLite/bazę.
 */

const FILE = path.join(process.cwd(), 'data', 'invoice-registry.json');

export type DocType = 'faktura' | 'rachunek';
export type VatMode = 'zw' | '23';

interface DocRecord {
  number: string;
  type: DocType;
  orderId: string;
  buyer: string;
  amount: number;
  vat: VatMode;
  issuedAt: string;
  year: number;
  p24?: string;
}

interface Registry {
  counters: Record<string, number>; // klucz "FV-2026" / "R-2026"
  documents: DocRecord[];
}

function read(): Registry {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8')) as Registry;
  } catch {
    return { counters: {}, documents: [] };
  }
}

function write(reg: Registry): void {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(reg, null, 2));
}

/** Suma sprzedaży (wszystkie dokumenty) w danym roku — podstawa progu VAT. */
export function getYearSalesTotal(year: number): number {
  return read().documents.filter((d) => d.year === year).reduce((s, d) => s + d.amount, 0);
}

export interface IssueInput {
  orderId: string;
  type: DocType;
  amount: number;
  buyer: string;
  p24TransactionId?: string;
  issueDate?: Date;
}

export interface IssuedDoc {
  number: string;
  type: DocType;
  vat: VatMode;
  issuedAt: string;
  /** true, gdy dokument dla tego orderId już istniał (idempotencja). */
  alreadyIssued: boolean;
}

/**
 * Atomowo: sprawdza idempotencję, wylicza stawkę VAT wg progu, nadaje kolejny numer
 * we właściwej serii i zapisuje rekord. Zwraca dane dokumentu (bez PDF).
 */
export function issueDocument(input: IssueInput): IssuedDoc {
  const reg = read();

  const existing = reg.documents.find((d) => d.orderId === input.orderId);
  if (existing) {
    return { number: existing.number, type: existing.type, vat: existing.vat, issuedAt: existing.issuedAt, alreadyIssued: true };
  }

  const date = input.issueDate ?? new Date();
  const year = date.getFullYear();
  const salesBefore = reg.documents.filter((d) => d.year === year).reduce((s, d) => s + d.amount, 0);
  const vat: VatMode = salesBefore + input.amount > VAT_EXEMPTION_LIMIT ? '23' : 'zw';

  const series = input.type === 'faktura' ? 'FV' : 'R';
  const key = `${series}-${year}`;
  const n = (reg.counters[key] || 0) + 1;
  reg.counters[key] = n;
  const number = `${series} ${n}/${year}/NO`;

  reg.documents.push({
    number,
    type: input.type,
    orderId: input.orderId,
    buyer: input.buyer,
    amount: input.amount,
    vat,
    issuedAt: date.toISOString(),
    year,
    p24: input.p24TransactionId,
  });
  write(reg);

  return { number, type: input.type, vat, issuedAt: date.toISOString(), alreadyIssued: false };
}
