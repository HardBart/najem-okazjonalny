'use client';

import { FileText, UserCheck, FileCheck, NotebookPen, CheckCircle2, Clock } from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

const ICONS = [FileText, UserCheck, FileCheck, NotebookPen, CheckCircle2];

export default function DetailedProcessSection() {
  const t = useT();
  const { tx } = useLanguage();
  const steps = tx<{ title: string; description: string; time: string }[]>('process.steps').map(
    (s, i) => ({ ...s, number: i + 1, icon: ICONS[i] })
  );

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-900 text-white text-sm font-medium mb-4">
            <Clock className="w-4 h-4 mr-2" />
            {t('process.headerBadge')}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('process.heading')}
          </h2>

          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
          <p className="text-sm text-navy-500 max-w-2xl mx-auto mt-3">
            {t('process.note')}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 to-gold-200 hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 mb-12 bg-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-lg">
                  {/* Icon side */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-navy-900 to-navy-700 rounded-xl flex items-center justify-center relative z-10">
                      <Icon className="w-7 h-7 text-gold-400" />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-bold text-navy-900">
                        <span className="text-gold-600 mr-2">{step.number}.</span>
                        {step.title}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-medium mt-2 sm:mt-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.time}
                      </div>
                    </div>
                    <p className="text-navy-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-navy-900 text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-3">
            {t('process.ctaTitle')}
          </h3>
          <p className="text-navy-300 mb-6 max-w-2xl mx-auto">
            {t('process.ctaText')}
          </p>
          <a
            href="#pakiety"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors"
          >
            {t('process.ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
}
