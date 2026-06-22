'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Check, ArrowRight, Globe2, Home } from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

/**
 * Sekcja zasięgu ogólnopolskiego. Bez mapy — czytelny panel „Cała Polska”
 * komunikujący w pełni zdalną obsługę w całym kraju.
 */

export default function PolandCoverageSection() {
  const router = useRouter();
  const t = useT();
  const { tx } = useLanguage();
  const FACTS = [
    { icon: Globe2, label: t('coverage.fact1') },
    { icon: Home, label: t('coverage.fact2') },
  ];
  const bullets = tx<string[]>('coverage.bullets');

  return (
    <section id="cala-polska" className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Panel zasięgu */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
              {/* delikatna siatka w tle */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gold-500/15 ring-4 ring-gold-500/30 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-12 h-12 text-gold-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{t('coverage.panelTitle')}</div>
                <p className="text-navy-200 mb-8 max-w-xs mx-auto">
                  {t('coverage.panelSubtitle')}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {FACTS.map((f) => {
                    const Icon = f.icon;
                    return (
                      <span
                        key={f.label}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold-500/30 text-gold-200 text-sm font-medium"
                      >
                        <Icon className="w-4 h-4" />
                        {f.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Treść */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              {t('coverage.badge')}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-5">
              {t('coverage.heading')}
            </h2>

            <p className="text-lg text-navy-700 leading-relaxed mb-6">
              {t('coverage.lead')}
            </p>

            <ul className="space-y-3 mb-8">
              {bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-navy-800">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => router.push('/zamowienie')}
              className="inline-flex items-center px-7 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl"
            >
              {t('coverage.cta')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
