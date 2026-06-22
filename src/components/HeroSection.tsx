'use client';

import { Clock, MapPin, FileSignature, Stamp, Users, Check, ArrowRight } from 'lucide-react';
import { useT } from '@/lib/i18n/LanguageProvider';

export default function HeroSection() {
  const t = useT();
  const points = [
    { icon: Clock, text: t('hero.point1') },
    { icon: MapPin, text: t('hero.point2') },
    { icon: FileSignature, text: t('hero.point3') },
    { icon: Stamp, text: t('hero.point4') },
    { icon: Users, text: t('hero.point5') },
  ];

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Lewa kolumna — komunikat oparty na problemie */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-6">
              <Clock className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-5 leading-tight">
              {t('hero.titleLine1')}
              <span className="block text-gold-600 mt-1">{t('hero.titleLine2')}</span>
            </h1>

            <p className="text-xl text-navy-700 mb-8 leading-relaxed">
              {t('hero.lead')}
            </p>

            {/* Punkty korzyści */}
            <ul className="space-y-3 mb-8">
              {points.map((p, i) => {
                const Icon = p.icon;
                return (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-navy-900" strokeWidth={3} />
                    </span>
                    <span className="text-navy-800 font-medium flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gold-600" />
                      {p.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document.getElementById('pakiety')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold text-lg rounded-lg hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl"
              >
                {t('hero.ctaPackages')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() =>
                  document.getElementById('jak-to-dziala')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-navy-900 text-navy-900 font-bold text-lg rounded-lg hover:bg-navy-900 hover:text-white transition-all"
              >
                {t('hero.ctaHow')}
              </button>
            </div>

            <p className="text-xs text-navy-500 mt-4">
              {t('hero.footnote')}
            </p>

          </div>

          {/* Prawa kolumna — karta zaufania z liczbami */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-navy-100 p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-navy-100">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                  <FileSignature className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-navy-900">{t('hero.cardTitle')}</div>
                  <div className="text-sm text-navy-600">{t('hero.cardSubtitle')}</div>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  t('hero.cardItem1'),
                  t('hero.cardItem2'),
                  t('hero.cardItem3'),
                  t('hero.cardItem4'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-navy-800">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-navy-100 text-center">
                <div>
                  <div className="text-2xl font-bold text-navy-900">100+</div>
                  <div className="text-xs text-navy-600">{t('hero.statClients')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy-900">24-48h</div>
                  <div className="text-xs text-navy-600">{t('hero.statTime')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy-900">100%</div>
                  <div className="text-xs text-navy-600">{t('hero.statAccept')}</div>
                </div>
              </div>
            </div>

            {/* Pływający badge */}
            <div className="absolute -top-4 -right-4 bg-navy-900 text-gold-400 px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-3">
              Cała Polska
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
