'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Zarządzanie zgodami na cookies (RODO/ePrivacy). Lekki, bez zależności.
 * Zgoda zapisywana w ciasteczku `cookie-consent` (JSON + wersja). Kategorie
 * analityczne/marketingowe są domyślnie WYŁĄCZONE do czasu wyraźnej zgody.
 */

export const CONSENT_COOKIE = 'cookie-consent';
export const CONSENT_VERSION = 1;

export interface Consent {
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent extends Consent {
  v: number;
  ts: string;
}

interface ContextValue {
  consent: Consent | null; // null = brak decyzji
  ready: boolean;
  settingsOpen: boolean;
  save: (c: Consent) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const CookieConsentContext = createContext<ContextValue | null>(null);

function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]+)`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as StoredConsent;
    if (parsed.v !== CONSENT_VERSION) return null; // nowa wersja = pytamy ponownie
    return { analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

function writeConsent(c: Consent): void {
  const payload: StoredConsent = { v: CONSENT_VERSION, ts: new Date().toISOString(), ...c };
  const value = encodeURIComponent(JSON.stringify(payload));
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const save = useCallback((c: Consent) => {
    writeConsent(c);
    setConsent(c);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => save({ analytics: true, marketing: true }), [save]);
  const rejectAll = useCallback(() => save({ analytics: false, marketing: false }), [save]);
  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  return (
    <CookieConsentContext.Provider
      value={{ consent, ready, settingsOpen, save, acceptAll, rejectAll, openSettings, closeSettings }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): ContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    // Bezpieczny fallback poza providerem.
    return {
      consent: null,
      ready: false,
      settingsOpen: false,
      save: () => {},
      acceptAll: () => {},
      rejectAll: () => {},
      openSettings: () => {},
      closeSettings: () => {},
    };
  }
  return ctx;
}
