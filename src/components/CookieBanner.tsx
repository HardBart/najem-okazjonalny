'use client';

import { useState } from 'react';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';
import { useT } from '@/lib/i18n/LanguageProvider';
import { useCookieConsent } from '@/lib/cookie-consent/CookieConsent';

/**
 * Banner zgód cookies + panel ustawień (granularny). Pokazywany, gdy brak decyzji;
 * panel ustawień można też otworzyć z linku w stopce (useCookieConsent().openSettings).
 */
export default function CookieBanner() {
  const t = useT();
  const { consent, ready, settingsOpen, acceptAll, rejectAll, save, openSettings, closeSettings } =
    useCookieConsent();

  if (!ready) return null;

  const showBanner = consent === null && !settingsOpen;
  if (!showBanner && !settingsOpen) return null;

  return settingsOpen ? (
    <SettingsModal initial={consent} onSave={save} onClose={closeSettings} t={t} />
  ) : (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-4xl rounded-2xl border border-navy-100 bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700 sm:flex">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-navy-900">{t('cookies.title')}</h2>
            <p className="mt-1 text-sm leading-relaxed text-navy-600">
              {t('cookies.desc')}{' '}
              <Link href="/polityka-prywatnosci" className="text-gold-700 underline hover:text-gold-800">
                {t('cookies.policyLink')}
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                onClick={acceptAll}
                className="rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
              >
                {t('cookies.accept')}
              </button>
              <button
                onClick={rejectAll}
                className="rounded-lg border border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-50"
              >
                {t('cookies.reject')}
              </button>
              <button
                onClick={openSettings}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-navy-600 underline hover:text-navy-900"
              >
                {t('cookies.settings')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({
  initial,
  onSave,
  onClose,
  t,
}: {
  initial: { analytics: boolean; marketing: boolean } | null;
  onSave: (c: { analytics: boolean; marketing: boolean }) => void;
  onClose: () => void;
  t: (k: string) => string;
}) {
  const [analytics, setAnalytics] = useState(initial?.analytics ?? false);
  const [marketing, setMarketing] = useState(initial?.marketing ?? false);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-900/50 p-3 sm:items-center sm:p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-bold text-navy-900">{t('cookies.settingsTitle')}</h2>
          <button onClick={onClose} aria-label="Zamknij" className="text-navy-400 hover:text-navy-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <CategoryRow
            title={t('cookies.necessaryTitle')}
            desc={t('cookies.necessaryDesc')}
            checked
            disabled
            badge={t('cookies.always')}
          />
          <CategoryRow
            title={t('cookies.analyticsTitle')}
            desc={t('cookies.analyticsDesc')}
            checked={analytics}
            onChange={setAnalytics}
          />
          <CategoryRow
            title={t('cookies.marketingTitle')}
            desc={t('cookies.marketingDesc')}
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => onSave({ analytics, marketing })}
            className="rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            {t('cookies.save')}
          </button>
          <button
            onClick={() => onSave({ analytics: true, marketing: true })}
            className="rounded-lg border border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-50"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  desc,
  checked,
  onChange,
  disabled,
  badge,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-navy-100 p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-navy-900">{title}</h3>
          {badge && (
            <span className="rounded-full bg-navy-100 px-2 py-0.5 text-[11px] font-medium text-navy-600">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-navy-500">{desc}</p>
      </div>
      <label className="relative mt-1 inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className="h-6 w-11 rounded-full bg-navy-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-gold-500 peer-checked:after:translate-x-full peer-disabled:opacity-60" />
      </label>
    </div>
  );
}
