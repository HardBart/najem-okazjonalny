'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/lib/i18n/LanguageProvider';

interface CTABandProps {
  /** Wariant tła: 'dark' (granat) lub 'light' (jasny gradient). */
  variant?: 'dark' | 'light';
  /** Który zestaw przetłumaczonych tekstów użyć, gdy nie podano własnych. */
  content?: 'default' | 'light';
  /** Jawny tekst (np. dynamiczny na stronach miast) — pomija tłumaczenie. */
  title?: string;
  subtitle?: string;
}

/**
 * Powtarzalny pasek CTA wstawiany co 2-3 sekcje. Kieruje wyłącznie do zamówienia
 * online (bez kanałów kontaktu „po poradę").
 */
export default function CTABand({
  variant = 'dark',
  content = 'default',
  title,
  subtitle,
}: CTABandProps) {
  const router = useRouter();
  const t = useT();
  const isDark = variant === 'dark';
  const resolvedTitle = title ?? t(content === 'light' ? 'cta.titleLight' : 'cta.title');
  const resolvedSubtitle = subtitle ?? t(content === 'light' ? 'cta.subtitleLight' : 'cta.subtitle');

  return (
    <section
      className={
        isDark
          ? 'py-14 bg-gradient-to-br from-navy-900 to-navy-800'
          : 'py-14 bg-gradient-to-br from-gold-50 to-navy-50'
      }
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <h2
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-navy-900'
              }`}
            >
              {resolvedTitle}
            </h2>
            <p className={isDark ? 'text-navy-300' : 'text-navy-700'}>{resolvedSubtitle}</p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => router.push('/#pakiety')}
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              {t('sticky.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
