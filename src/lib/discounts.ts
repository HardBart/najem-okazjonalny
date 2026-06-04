/**
 * System kodów rabatowych + konfiguracja kampanii przypomnień po roku.
 *
 * Kody są walidowane PO STRONIE SERWERA (nigdy nie ufamy kwocie z przeglądarki).
 * Aby dodać/zmienić zniżkę — edytuj mapę `discountCodes`.
 */

export interface Discount {
  percent: number; // % zniżki
  label: string; // opis pokazywany klientowi
  active: boolean;
}

export const discountCodes: Record<string, Discount> = {
  // Kod wysyłany w przypomnieniu po ~roku (kampania powrotna).
  POWROT15: { percent: 15, label: 'Zniżka powrotna −15%', active: true },
};

/** Kod używany w mailu przypominającym po roku. */
export const RENEWAL_DISCOUNT_CODE = 'POWROT15';

/** Po ilu dniach od opłaconego zamówienia wysłać przypomnienie (≈11 miesięcy). */
export const RENEWAL_REMINDER_AFTER_DAYS = 330;

export function normalizeCode(code: string): string {
  return (code || '').trim().toUpperCase();
}

/** Zwraca aktywny rabat dla kodu albo null. */
export function getDiscount(code: string): Discount | null {
  const d = discountCodes[normalizeCode(code)];
  return d && d.active ? d : null;
}

/** Kwota zniżki w zł (zaokrąglona) dla podanej kwoty bazowej i kodu. */
export function discountAmountFor(baseAmount: number, code: string): number {
  const d = getDiscount(code);
  if (!d) return 0;
  return Math.round((baseAmount * d.percent) / 100);
}

/** Kwota po zniżce (nie mniejsza niż 0). */
export function applyDiscount(baseAmount: number, code: string): number {
  return Math.max(0, baseAmount - discountAmountFor(baseAmount, code));
}
