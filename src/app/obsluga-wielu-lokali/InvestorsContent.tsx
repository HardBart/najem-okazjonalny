'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteForm from '@/components/QuoteForm';
import { Building2, TrendingUp, Users, Briefcase, Check } from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

const AUDIENCE_ICONS = [TrendingUp, Briefcase, Building2, Users];

export default function InvestorsContent() {
  const t = useT();
  const { tx } = useLanguage();
  const audience = tx<string[]>('business.audience');
  const benefits = tx<string[]>('business.benefits');

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-16 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="[&_a]:text-navy-200 [&_span]:text-white">
            <Breadcrumbs
              items={[
                { name: t('common.home'), href: '/' },
                { name: t('business.crumb'), href: '/obsluga-wielu-lokali' },
              ]}
            />
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              {t('business.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {t('business.h1')}
            </h1>
            <p className="text-xl text-navy-200 leading-relaxed mb-8">
              {t('business.lead')}
            </p>
            <div className="flex flex-wrap gap-3">
              {audience.map((label, i) => {
                const Icon = AUDIENCE_ICONS[i];
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-navy-800/60 border border-navy-700 rounded-full text-sm font-medium"
                  >
                    <Icon className="w-4 h-4 text-gold-400" />
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          {/* Korzyści */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              {t('business.benefitsHeading')}
            </h2>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-navy-900" strokeWidth={3} />
                  </span>
                  <span className="text-navy-800 text-lg">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-navy-50 rounded-2xl border-2 border-navy-100">
              <p className="text-navy-700">{t('business.quoteNote')}</p>
            </div>
          </div>

          {/* Formularz wyceny */}
          <div id="wycena">
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
