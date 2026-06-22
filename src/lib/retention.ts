import { Order } from '@/types';

/**
 * Polityka retencji danych (RODO) — jedno źródło zasad minimalizacji.
 *
 * Realizuje obietnice z Polityki Prywatności:
 *  - PESEL: usuwany niezwłocznie po realizacji (proxy czasowy od płatności,
 *    a najlepiej wyzwalany ręcznie w panelu zaraz po przekazaniu dokumentów),
 *  - dane realizacyjne (telefon, adres, cel najmu, dostawa): anonimizowane po
 *    okresie realizacji i przedawnienia roszczeń,
 *  - dane dokumentu sprzedaży: trzymane do 5 lat (obowiązek podatkowy), potem pełna anonimizacja.
 *
 * Okresy są PARAMETRAMI do potwierdzenia z prawnikiem — zmień w jednym miejscu.
 */
export const RETENTION = {
  /** Po ilu dniach od płatności kasujemy PESEL (proxy realizacji; realnie 24–48 h + wysyłka). */
  peselDays: 30,
  /** Po ilu dniach anonimizujemy dane realizacyjne (zostają dane do dokumentu sprzedaży). */
  minimizeDays: 365 * 2,
  /** Po ilu latach pełna anonimizacja danych osobowych (obowiązek podatkowy/księgowy). */
  accountingYears: 5,
} as const;

function daysSince(iso: string | undefined, now: number): number {
  if (!iso) return 0;
  return (now - new Date(iso).getTime()) / (24 * 3600 * 1000);
}

/** Czy zamówienie nadal przechowuje numer PESEL. */
export function hasPesel(order: Order): boolean {
  return !!order.personalData?.pesel && order.personalData.pesel.trim() !== '';
}

export interface RetentionResult {
  updates: Partial<Order>;
  /** Wykonane czynności (do logów/raportu crona). */
  actions: string[];
}

/**
 * Aktualizacje wynikające z polityki retencji dla pojedynczego zamówienia.
 * Pusty `updates` oznacza: nic do zrobienia.
 */
export function retentionUpdatesFor(order: Order, now: number = Date.now()): RetentionResult {
  const updates: Partial<Order> = {};
  const actions: string[] = [];
  if (order.paymentStatus !== 'completed') return { updates, actions };

  const ageDays = daysSince(order.createdAt, now);
  const iso = new Date(now).toISOString();

  // 3) Po okresie księgowym (5 lat) — pełna anonimizacja danych osobowych.
  if (!order.fullyAnonymizedAt && ageDays >= RETENTION.accountingYears * 365) {
    updates.personalData = { firstName: '', lastName: '', email: '', phone: '', pesel: '' };
    updates.rentalData = { currentAddress: '', rentalPurpose: '' };
    if (order.delivery) updates.delivery = { method: order.delivery.method };
    updates.fullyAnonymizedAt = iso;
    if (!order.peselDeletedAt && hasPesel(order)) updates.peselDeletedAt = iso;
    if (!order.dataMinimizedAt) updates.dataMinimizedAt = iso;
    actions.push('anonymize5y');
    return { updates, actions };
  }

  // 2) Minimalizacja danych realizacyjnych (zostają dane do dokumentu sprzedaży).
  if (!order.dataMinimizedAt && ageDays >= RETENTION.minimizeDays) {
    updates.personalData = { ...order.personalData, phone: '', pesel: '' };
    updates.rentalData = { currentAddress: '', rentalPurpose: '' };
    if (order.delivery) updates.delivery = { method: order.delivery.method };
    updates.dataMinimizedAt = iso;
    if (!order.peselDeletedAt && hasPesel(order)) updates.peselDeletedAt = iso;
    actions.push('minimize');
    if (hasPesel(order)) actions.push('pesel');
    return { updates, actions };
  }

  // 1) PESEL — kasowany po realizacji (proxy: peselDays od płatności).
  if (hasPesel(order) && ageDays >= RETENTION.peselDays) {
    updates.personalData = { ...order.personalData, pesel: '' };
    updates.peselDeletedAt = iso;
    actions.push('pesel');
  }

  return { updates, actions };
}

/**
 * Natychmiastowe wyczyszczenie PESEL — np. po ręcznym oznaczeniu realizacji w panelu.
 * Pusty wynik, gdy nie ma czego usuwać.
 */
export function scrubPeselUpdates(order: Order, now: number = Date.now()): Partial<Order> {
  if (!hasPesel(order)) return {};
  return {
    personalData: { ...order.personalData, pesel: '' },
    peselDeletedAt: new Date(now).toISOString(),
  };
}
