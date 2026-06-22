'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEFAULT_LOCALE, LOCALE_COOKIE, Locale, isLocale } from './config';
import { translate, translateRaw } from './messages';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  /** Zwraca dowolny węzeł słownika (tablica/obiekt) dla list. */
  tx: <T = unknown>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookie(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]+)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return isLocale(value) ? value : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start od DEFAULT_LOCALE (zgodność SSR), potem czytamy ciasteczko po stronie klienta.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readCookie();
    if (stored && stored !== locale) setLocaleState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, []);

  const t = useCallback((key: string) => translate(locale, key), [locale]);
  const tx = useCallback(<T,>(key: string) => translateRaw(locale, key) as T, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tx }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Bezpieczny fallback, gdyby komponent renderował się poza providerem.
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (k: string) => translate(DEFAULT_LOCALE, k),
      tx: <T,>(k: string) => translateRaw(DEFAULT_LOCALE, k) as T,
    };
  }
  return ctx;
}

/** Skrót do samej funkcji tłumaczącej. */
export function useT() {
  return useLanguage().t;
}
