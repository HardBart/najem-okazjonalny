'use client';

import { Star } from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

interface Testimonial {
  initial: string;
  name: string;
  city: string;
  rating: number;
}

// Dane niezależne od języka (inicjał, imię, miasto, ocena).
const BASE: Testimonial[] = [
  { initial: 'M', name: 'Michał K.', city: 'Warszawa', rating: 5 },
  { initial: 'A', name: 'Anna W.', city: 'Kraków', rating: 5 },
  { initial: 'P', name: 'Petro H.', city: 'Wrocław', rating: 5 },
  { initial: 'K', name: 'Karolina S.', city: 'Poznań', rating: 5 },
  { initial: 'T', name: 'Tomasz M.', city: 'Gdańsk', rating: 5 },
  { initial: 'J', name: 'Joanna L.', city: 'Łódź', rating: 5 },
];

export default function TestimonialsSection() {
  const tr = useT();
  const { tx } = useLanguage();
  const localized = tx<{ context: string; text: string; month: string }[]>('testimonials.items');
  const TESTIMONIALS = BASE.map((b, i) => ({ ...b, ...localized[i] }));
  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner 100+ */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold-500 text-gold-500" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
            {tr('testimonials.heading')}
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            {tr('testimonials.subtitle')}
          </p>
        </div>

        {/* Opinie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <span className="inline-block self-start px-2.5 py-1 rounded-full bg-navy-50 text-navy-600 text-xs font-medium mb-3">
                {t.context}
              </span>

              <p className="text-navy-700 leading-relaxed text-sm mb-5 flex-grow">„{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-navy-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
                  <div className="text-xs text-navy-600">
                    {t.city} · {tr('testimonials.realized')} {t.month}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota RODO */}
        <p className="mt-10 text-center text-xs text-navy-500 max-w-2xl mx-auto">
          {tr('testimonials.rodoNote')}
        </p>
      </div>
    </section>
  );
}
