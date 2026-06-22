'use client';

import { Mail, FileSearch, FileText, CheckCircle } from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

const ICONS = [Mail, FileSearch, FileText, CheckCircle];

export default function HowItWorksSection() {
  const t = useT();
  const { tx } = useLanguage();
  const steps = tx<{ title: string; description: string }[]>('how.steps').map((s, i) => ({
    ...s,
    icon: ICONS[i],
  }));

  return (
    <section id="jak-to-dziala" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('how.heading')}
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            {t('how.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gold-200" />
                )}

                <div className="relative bg-white p-6 rounded-xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-lg">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-navy-900 to-navy-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-gold-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-navy-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center bg-navy-50 rounded-xl p-8">
          <p className="text-navy-800 font-medium">
            {t('how.info')}
          </p>
        </div>
      </div>
    </section>
  );
}
