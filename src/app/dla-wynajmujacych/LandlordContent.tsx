'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTABand from '@/components/CTABand';
import {
  ShieldCheck,
  Scale,
  FileSignature,
  Clock,
  Wallet,
  UserCheck,
  Check,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

const BENEFIT_ICONS = [ShieldCheck, Scale, Wallet, Clock];

export default function LandlordContent() {
  const t = useT();
  const { tx } = useLanguage();
  const benefits = tx<{ title: string; text: string }[]>('landlord.benefits');
  const documents = tx<string[]>('landlord.documents');
  const helpItems = tx<string[]>('landlord.helpItems');
  const pkgCards = tx<{ title: string; text: string }[]>('landlord.pkgCards');

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-16 bg-gradient-to-br from-navy-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: t('common.home'), href: '/' },
              { name: t('landlord.crumb'), href: '/dla-wynajmujacych' },
            ]}
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <UserCheck className="w-4 h-4 mr-2" />
              {t('landlord.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-5 leading-tight">
              {t('landlord.h1')}
            </h1>
            <p className="text-xl text-navy-700 leading-relaxed mb-8">
              {t('landlord.lead')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/zamowienie"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold text-lg rounded-lg hover:bg-gold-600 transition-all shadow-lg"
              >
                {t('landlord.ctaOrder')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/#pakiety"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-navy-900 text-navy-900 font-bold text-lg rounded-lg hover:bg-navy-900 hover:text-white transition-all"
              >
                {t('landlord.ctaPackages')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dlaczego warto */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('landlord.whyHeading')}
            </h2>
            <p className="text-lg text-navy-700 max-w-2xl mx-auto">
              {t('landlord.whySubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <div
                  key={i}
                  className="flex gap-4 bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-navy-900 to-navy-700 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{b.title}</h3>
                    <p className="text-sm text-navy-700 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand variant="dark" title={t('landlord.bandTitle')} subtitle={t('landlord.bandSubtitle')} />

      {/* Jakie dokumenty */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-5">
              {t('landlord.docsHeading')}
            </h2>
            <p className="text-navy-700 leading-relaxed mb-6">
              {t('landlord.docsLead')}
            </p>
            <ul className="space-y-3">
              {documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-navy-800">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 text-white">
            <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center mb-5">
              <FileSignature className="w-6 h-6 text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('landlord.helpTitle')}</h3>
            <ul className="space-y-3 text-navy-200">
              {helpItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pakiet Bezpieczny Najem */}
      <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <FileText className="w-4 h-4 mr-2" />
              {t('landlord.pkgBadge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('landlord.pkgHeading')}
            </h2>
            <p className="text-lg text-navy-700 max-w-2xl mx-auto">
              {t('landlord.pkgSubtitle')}
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-navy-100 p-8 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-3">
              {pkgCards.map((doc) => (
                <div key={doc.title} className="rounded-2xl border-2 border-navy-100 p-5">
                  <div className="flex items-start gap-2 mb-2">
                    <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="font-bold text-navy-900">{doc.title}</span>
                  </div>
                  <p className="text-sm text-navy-700 leading-relaxed">{doc.text}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-navy-500 mt-6 text-center">
              {t('landlord.pkgNote')}
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/zamowienie"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold text-lg rounded-lg hover:bg-gold-600 transition-all shadow-lg"
              >
                {t('landlord.pkgBtn')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
