'use client';

import { Check, Star } from 'lucide-react';
import { packages } from '@/lib/packages';
import { formatPrice } from '@/lib/utils';
import Button from './Button';
import { useRouter } from 'next/navigation';

export default function PackagesSection() {
  const router = useRouter();

  return (
    <section id="pakiety" className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Wybierz odpowiedni pakiet
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Dopasuj rozwiązanie do swoich potrzeb. Każdy pakiet gwarantuje legalność i profesjonalną obsługę.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl ${
                pkg.popular ? 'ring-2 ring-gold-500 transform md:scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gold-500 text-navy-900 px-4 py-1 rounded-bl-lg font-semibold text-sm flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Najpopularniejszy</span>
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <h3 className="text-2xl font-bold text-navy-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-navy-600 text-sm mb-6">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-navy-900">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-navy-600 ml-2">jednorazowo</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span className="text-navy-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={pkg.popular ? 'secondary' : 'primary'}
                  fullWidth
                  size="lg"
                  onClick={() => router.push(`/zamowienie?pakiet=${pkg.id}`)}
                >
                  Wybierz pakiet
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-navy-700">
            Nie jesteś pewien, który pakiet wybrać?{' '}
            <a
              href="#kontakt"
              className="text-gold-600 hover:text-gold-700 font-semibold underline"
            >
              Skontaktuj się z nami
            </a>
            {' '}– pomożemy dobrać najlepsze rozwiązanie.
          </p>
        </div>
      </div>
    </section>
  );
}
