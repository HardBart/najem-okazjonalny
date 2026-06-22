'use client';

import { Award, Users, Clock, Scale, MapPin, Timer } from 'lucide-react';
import { company } from '@/lib/company';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

const ICONS = [Award, Users, Clock, Scale, MapPin];

export default function TrustReasonsSection() {
  const t = useT();
  const { tx } = useLanguage();
  const items = tx<{ metric: string; title: string; text: string }[]>('trust.items');
  const reasons = items.map((it, i) => ({
    icon: ICONS[i],
    metric: i === 0 ? `${t('trust.since')} ${company.foundedYear}` : it.metric,
    title: it.title,
    text: it.text
      .replace('{company}', company.legalName)
      .replace('{year}', String(company.foundedYear)),
  }));

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('trust.heading')}
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            {t('trust.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{r.metric}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{r.title}</h3>
                <p className="text-sm text-navy-700 leading-relaxed">{r.text}</p>
              </div>
            );
          })}
        </div>

        {/* Subtelna pilność */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white border-2 border-navy-100 rounded-2xl px-6 py-5 max-w-3xl mx-auto text-center sm:text-left">
          <Timer className="w-8 h-8 text-gold-600 flex-shrink-0" />
          <p className="text-navy-700 text-sm">
            <strong className="text-navy-900">{t('trust.urgencyBold')}</strong>
            {t('trust.urgencyRest')}
          </p>
        </div>
      </div>
    </section>
  );
}
