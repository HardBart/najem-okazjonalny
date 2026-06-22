'use client';

import { ShieldCheck } from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

export default function ConcernsSection() {
  const t = useT();
  const { tx } = useLanguage();
  const CONCERNS = tx<{ concern: string; answer: string }[]>('concerns.items');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('concerns.heading')}
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            {t('concerns.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CONCERNS.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gold-500/15 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">„{item.concern}"</h3>
                <p className="text-navy-700 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
