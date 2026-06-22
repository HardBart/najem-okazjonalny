/**
 * Konfiguracja wielojęzyczności (lekki przełącznik po stronie klienta).
 * Domyślny język: polski. Wybór zapisywany w ciasteczku, bez zmiany adresu URL.
 */

export const LOCALES = ['pl', 'en', 'uk'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pl';
export const LOCALE_COOKIE = 'lang';

export const LOCALE_LABELS: Record<Locale, string> = {
  pl: 'Polski',
  en: 'English',
  uk: 'Українська',
};

/** Krótki kod widoczny przy fladze (UA zamiast kodu języka uk). */
export const LOCALE_CODES: Record<Locale, string> = {
  pl: 'PL',
  en: 'EN',
  uk: 'UA',
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
