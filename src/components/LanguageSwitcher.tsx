'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { LOCALES, LOCALE_LABELS, LOCALE_CODES, Locale } from '@/lib/i18n/config';

/** Małe flagi SVG (Windows nie renderuje emoji flag). */
function Flag({ locale, className = '' }: { locale: Locale; className?: string }) {
  const common = { width: 20, height: 14, className: `rounded-[2px] ${className}`, viewBox: '0 0 20 14' };
  if (locale === 'pl') {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="20" height="7" y="0" fill="#ffffff" />
        <rect width="20" height="7" y="7" fill="#dc143c" />
      </svg>
    );
  }
  if (locale === 'uk') {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="20" height="7" y="0" fill="#0057b7" />
        <rect width="20" height="7" y="7" fill="#ffd700" />
      </svg>
    );
  }
  // en — uproszczona flaga UK (Union Jack)
  return (
    <svg {...common} aria-hidden="true">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#ffffff" strokeWidth="2.6" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#c8102e" strokeWidth="1.2" />
      <path d="M10 0 V14 M0 7 H20" stroke="#ffffff" strokeWidth="3.6" />
      <path d="M10 0 V14 M0 7 H20" stroke="#c8102e" strokeWidth="2" />
    </svg>
  );
}

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-navy-200 hover:border-gold-400 transition-colors"
      >
        <Flag locale={locale} />
        <span className="text-xs font-semibold text-navy-800 uppercase">{LOCALE_CODES[locale]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-navy-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-navy-100 py-1 z-50"
        >
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-navy-50 transition-colors ${
                  l === locale ? 'font-semibold text-navy-900' : 'text-navy-700'
                }`}
              >
                <Flag locale={l} />
                {LOCALE_LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
