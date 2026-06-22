'use client';

import Image from 'next/image';
import { Award, FileSignature, Stamp, Headphones } from 'lucide-react';
import { company, fullAddress, stats } from '@/lib/company';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

const PROCESS_ICONS = [FileSignature, Stamp, Headphones];

export default function AboutSection() {
  const t = useT();
  const { tx } = useLanguage();
  const yearsExperience = new Date().getFullYear() - company.foundedYear;
  const year = String(company.foundedYear);

  const process = tx<string[]>('about.process').map((label, i) => ({
    icon: PROCESS_ICONS[i],
    label,
  }));

  return (
    <section id="o-nas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Zdjęcie */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-navy-100 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=70"
                alt="Podpisywanie dokumentów najmu okazjonalnego z poświadczeniem notarialnym"
                width={1000}
                height={750}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge z liczbą */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border-2 border-gold-200">
              <div className="text-4xl font-bold text-navy-900">{stats.clients}</div>
              <div className="text-sm text-navy-600">{t('about.cases')}</div>
            </div>
          </div>

          {/* Treść */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <Award className="w-4 h-4 mr-2" />
              {yearsExperience}+ {t('about.yearsExp')} ({t('about.since')} {company.foundedYear})
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              {t('about.heading')}
            </h2>

            <div className="space-y-4 text-navy-700 leading-relaxed">
              <p>{t('about.para1').replace('{year}', year)}</p>
              <p>{t('about.para2')}</p>
            </div>

            {/* Jak pracujemy */}
            <div className="mt-8 space-y-3">
              {process.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <span className="text-navy-800 font-medium">{step.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Dane firmy */}
            <div className="mt-8 p-6 bg-navy-50 rounded-xl">
              <h3 className="font-semibold text-navy-900 mb-3">{t('about.companyData')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-navy-700">
                <div>
                  <span className="font-medium">{t('about.labelCompany')}</span> {company.legalName}
                </div>
                <div>
                  <span className="font-medium">NIP:</span> {company.nip}
                </div>
                <div>
                  <span className="font-medium">REGON:</span> {company.regon}
                </div>
                {company.krs && (
                  <div>
                    <span className="font-medium">KRS:</span> {company.krs}
                  </div>
                )}
                <div className="sm:col-span-2">
                  <span className="font-medium">{t('about.labelAddress')}</span> {fullAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
