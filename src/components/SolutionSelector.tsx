'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Home, FileText, Briefcase, HelpCircle } from 'lucide-react';
import Button from './Button';

export default function SolutionSelector() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    {
      id: 'tenant',
      icon: User,
      title: 'Jestem najemcą',
      description: 'Szukam adresu do umowy najmu okazjonalnego',
      recommendedPackage: 'standard',
      benefits: ['Szybka realizacja', 'Pełne wsparcie', 'Gotowe dokumenty'],
    },
    {
      id: 'landlord',
      icon: Home,
      title: 'Jestem wynajmującym',
      description: 'Chcę zawrzeć umowę najmu okazjonalnego',
      recommendedPackage: 'standard',
      benefits: ['Pomoc z dokumentami', 'Wsparcie prawne', 'Obsługa notarialna'],
    },
    {
      id: 'address-only',
      icon: FileText,
      title: 'Potrzebuję tylko adresu',
      description: 'Resztę załatwię sam',
      recommendedPackage: 'basic',
      benefits: ['Najniższa cena', 'Szybka realizacja', 'Proste rozwiązanie'],
    },
    {
      id: 'full-service',
      icon: Briefcase,
      title: 'Potrzebuję pełnej obsługi',
      description: 'Chcę aby wszystko było załatwione za mnie',
      recommendedPackage: 'premium',
      benefits: ['Kompleksowa obsługa', 'Priorytet', 'Gwarancja'],
    },
  ];

  const handleSelect = (optionId: string, packageId: string) => {
    setSelectedOption(optionId);
    // Scroll to packages or redirect
    setTimeout(() => {
      router.push(`/zamowienie?pakiet=${packageId}`);
    }, 300);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Pomożemy Ci wybrać
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Jakiego rozwiązania potrzebujesz?
          </h2>

          <p className="text-lg text-navy-300 max-w-2xl mx-auto">
            Wybierz swoją sytuację, a my zaproponujemy najlepsze rozwiązanie
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all text-left
                  ${
                    isSelected
                      ? 'bg-white text-navy-900 border-gold-500 shadow-2xl scale-105'
                      : 'bg-navy-800/50 border-navy-700 hover:border-navy-600 hover:bg-navy-800'
                  }
                `}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? 'bg-navy-900' : 'bg-navy-700'
                  }`}
                >
                  <Icon className={isSelected ? 'w-6 h-6 text-gold-400' : 'w-6 h-6 text-navy-300'} />
                </div>

                <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-navy-900' : 'text-white'}`}>
                  {option.title}
                </h3>

                <p className={`text-sm mb-4 ${isSelected ? 'text-navy-600' : 'text-navy-300'}`}>
                  {option.description}
                </p>

                <ul className="space-y-2">
                  {option.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <span className={isSelected ? 'text-gold-600' : 'text-gold-400'}>✓</span>
                      <span className={isSelected ? 'text-navy-700' : 'text-navy-300'}>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-navy-200">
                    <Button
                      variant="primary"
                      fullWidth
                      size="sm"
                      onClick={() => handleSelect(option.id, option.recommendedPackage)}
                    >
                      Przejdź dalej →
                    </Button>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-navy-300 mb-4">
            Nie jesteś pewien? Skontaktuj się z nami - pomożemy dobrać najlepsze rozwiązanie
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-navy-900 font-semibold rounded-lg hover:bg-navy-50 transition-colors"
            >
              Zadzwoń: {process.env.NEXT_PUBLIC_PHONE}
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-900 transition-colors"
            >
              Napisz na WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
