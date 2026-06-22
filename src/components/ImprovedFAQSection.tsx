'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

interface FaqItem { category: string; question: string; answer: string }

export default function ImprovedFAQSection() {
  const router = useRouter();
  const t = useT();
  const { tx } = useLanguage();
  const allLabel = t('faq.all');
  const faqs = tx<FaqItem[]>('faq.items');
  const [openKey, setOpenKey] = useState<string | null>('0');
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);

  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(faqs.map((f) => f.category)))],
    [allLabel, faqs]
  );

  // Po zmianie języka stara etykieta kategorii może nie istnieć — wróć do „wszystkie”.
  const effectiveCategory = categories.includes(activeCategory) ? activeCategory : allLabel;

  const visible = useMemo(
    () =>
      faqs
        .map((f, i) => ({ ...f, key: String(i) }))
        .filter((f) => effectiveCategory === allLabel || f.category === effectiveCategory),
    [effectiveCategory, allLabel, faqs]
  );

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('faq.heading')}
          </h2>
          <p className="text-lg text-navy-700">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Filtr kategorii */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                effectiveCategory === cat
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-navy-700 border-navy-200 hover:border-gold-400'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista pytań */}
        <div className="space-y-3">
          {visible.map((faq) => (
            <div
              key={faq.key}
              className="bg-gradient-to-br from-white to-navy-50 rounded-xl shadow-sm overflow-hidden border border-navy-100 hover:border-gold-400 transition-all"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-start gap-4 hover:bg-navy-50/50 transition-colors"
                onClick={() => setOpenKey(openKey === faq.key ? null : faq.key)}
                aria-expanded={openKey === faq.key}
              >
                <span className="font-semibold text-navy-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gold-600 flex-shrink-0 transition-transform mt-0.5',
                    openKey === faq.key && 'transform rotate-180'
                  )}
                />
              </button>
              {openKey === faq.key && (
                <div className="px-6 pb-5 text-navy-700 leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-navy-900 to-navy-800 p-8 rounded-2xl">
          <p className="text-white font-semibold text-lg mb-2">
            {t('faq.ctaTitle')}
          </p>
          <p className="text-navy-300 mb-6">
            {t('faq.ctaText')}
          </p>
          <button
            onClick={() => router.push('/zamowienie')}
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-colors"
          >
            {t('faq.ctaBtn')}
          </button>
        </div>
      </div>
    </section>
  );
}
