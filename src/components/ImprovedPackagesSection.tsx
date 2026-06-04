'use client';

import { Check, Star, Zap, Crown, Gem, Timer, ShieldCheck, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { packages } from '@/lib/packages';
import type { PackageId } from '@/types';

const ICONS: Record<PackageId, typeof Zap> = {
  basic: Zap,
  standard: Star,
  premium: Crown,
  vip: Gem,
};

export default function ImprovedPackagesSection() {
  const router = useRouter();

  return (
    <section id="pakiety" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Wybierz poziom zabezpieczenia umowy
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Im wyższy pakiet, tym mniej organizujesz samodzielnie — od podpisu profilem zaufanym,
            przez notarialne poświadczenie podpisu, po pełną obsługę u notariusza (art. 777 k.p.c.).
          </p>
        </div>

        {/* Subtelna pilność nad pakietami */}
        <div className="flex items-center justify-center gap-2 text-sm text-navy-600 mb-12 text-center">
          <Timer className="w-4 h-4 text-gold-600 flex-shrink-0" />
          Realizacja nawet w <strong className="text-navy-900">24 godziny</strong> · podpis profilem
          zaufanym lub poświadczenie notarialne
        </div>

        {/* Siatka pakietów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg) => {
            const Icon = ICONS[pkg.id];
            const highlighted = !!pkg.bestValue;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl overflow-hidden transition-all flex flex-col ${
                  highlighted
                    ? 'bg-gradient-to-br from-navy-900 to-navy-800 text-white shadow-2xl lg:-mt-2 lg:mb-2 ring-2 ring-gold-500 z-10'
                    : 'bg-gradient-to-br from-white to-navy-50 border-2 border-navy-100 hover:border-gold-400 hover:shadow-xl'
                }`}
              >
                {pkg.badge && (
                  <div
                    className={`text-center py-2 text-xs font-semibold ${
                      highlighted ? 'bg-gold-500 text-navy-900' : 'bg-navy-900 text-gold-400'
                    }`}
                  >
                    {highlighted && <Star className="w-3.5 h-3.5 inline mr-1 fill-current" />}
                    {pkg.badge}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      highlighted ? 'bg-gold-500' : 'bg-navy-900'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${highlighted ? 'text-navy-900' : 'text-gold-400'}`} />
                  </div>

                  <h3 className={`text-xl font-bold ${highlighted ? 'text-white' : 'text-navy-900'}`}>
                    Pakiet {pkg.name}
                  </h3>
                  <p className={`text-sm mt-1 mb-3 ${highlighted ? 'text-navy-300' : 'text-navy-600'}`}>
                    „{pkg.tagline}"
                  </p>

                  {pkg.securityLevel && (
                    <div
                      className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-xs font-semibold mb-4 ${
                        highlighted ? 'bg-gold-500/20 text-gold-300' : 'bg-navy-50 text-navy-700'
                      }`}
                    >
                      <ShieldCheck className={`w-3.5 h-3.5 ${highlighted ? 'text-gold-400' : 'text-gold-600'}`} />
                      {pkg.securityLevel}
                    </div>
                  )}

                  {/* Cena + decoy oldPrice */}
                  <div className="mb-5">
                    {pkg.oldPrice && (
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm line-through ${
                            highlighted ? 'text-navy-400' : 'text-navy-400'
                          }`}
                        >
                          {formatPrice(pkg.oldPrice)}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold-500 text-navy-900">
                          -{formatPrice(pkg.oldPrice - pkg.price)}
                        </span>
                      </div>
                    )}
                    <div className={`text-3xl font-bold ${highlighted ? 'text-white' : 'text-navy-900'}`}>
                      {formatPrice(pkg.price)}
                    </div>
                    <div className={`text-xs ${highlighted ? 'text-navy-400' : 'text-navy-600'}`}>
                      {pkg.period}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            highlighted ? 'text-gold-400' : 'text-gold-600'
                          }`}
                          strokeWidth={3}
                        />
                        <span className={`text-sm ${highlighted ? 'text-navy-200' : 'text-navy-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {pkg.note && (
                    <div
                      className={`flex items-start gap-2 text-xs leading-relaxed mb-4 rounded-lg p-3 ${
                        highlighted ? 'bg-white/10 text-navy-300' : 'bg-navy-50 text-navy-500'
                      }`}
                    >
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{pkg.note}</span>
                    </div>
                  )}

                  <button
                    onClick={() => router.push(`/zamowienie?pakiet=${pkg.id}`)}
                    className={`w-full inline-flex items-center justify-center px-5 py-3.5 font-bold rounded-lg transition-all ${
                      highlighted
                        ? 'bg-gold-500 text-navy-900 hover:bg-gold-600 shadow-lg'
                        : 'bg-navy-900 text-white hover:bg-navy-800'
                    }`}
                  >
                    Wybierz {pkg.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pasek zaufania / risk-reversal */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: ShieldCheck, t: 'Poświadczenie notarialne', d: 'Notarialne poświadczenie podpisu właściciela — od pakietu Standard' },
            { icon: Star, t: 'Art. 777 k.p.c.', d: 'Poddanie się egzekucji u notariusza w pakiecie Komplet' },
            { icon: Timer, t: 'Nawet w 24h', d: 'Realizacja ekspresowa w pakietach Premium i Komplet' },
          ].map((b, i) => {
            const BIcon = b.icon;
            return (
              <div key={i} className="flex items-start gap-3 bg-navy-50 rounded-xl p-4 border border-navy-100">
                <BIcon className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{b.t}</div>
                  <div className="text-xs text-navy-600 leading-relaxed">{b.d}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jak to działa — dla pakietów z wizytą u notariusza (art. 777) */}
        {packages
          .filter((p) => p.howItWorks && p.howItWorks.length > 0)
          .map((p) => (
            <div
              key={`how-${p.id}`}
              className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-navy-50 to-white border-2 border-navy-100 rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-navy-900 mb-5">
                Jak działa pakiet {p.name} (art. 777 k.p.c.)
              </h3>
              <ol className="space-y-4">
                {p.howItWorks!.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-navy-700 text-sm leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

        {/* Pomoc w wyborze */}
        <div className="text-center max-w-3xl mx-auto mt-8 bg-navy-50 p-6 rounded-xl border-2 border-navy-100">
          <p className="text-navy-800 font-semibold mb-1">Nie wiesz, który pakiet wybrać?</p>
          <p className="text-navy-600 mb-4">
            Skorzystaj z kreatora „Sprawdź w 30 sekund" na górze strony — dobierze pakiet do Twojej
            sytuacji. Najczęściej wybierany jest pakiet Standard.
          </p>
          <button
            onClick={() => router.push('/zamowienie?pakiet=standard')}
            className="inline-flex items-center justify-center px-7 py-3 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-colors"
          >
            Zamów online
          </button>
        </div>
      </div>
    </section>
  );
}
