import { User, Home, TrendingUp } from 'lucide-react';

export default function ForWhoSection() {
  const audiences = [
    {
      icon: User,
      title: 'Dla najemców',
      description: 'Potrzebujesz adresu do umowy najmu okazjonalnego? Zapewniamy legalny adres wraz z oświadczeniem właściciela, potwierdzonym notarialnie.',
      benefits: [
        'Szybkie uzyskanie wymaganych dokumentów',
        'Możliwość wyboru miasta',
        'Pełna zgodność z prawem',
        'Wsparcie w całym procesie',
      ],
    },
    {
      icon: Home,
      title: 'Dla wynajmujących',
      description: 'Wynajmujesz mieszkanie i chcesz zawrzeć umowę najmu okazjonalnego? Pomożemy Ci w uzyskaniu wszystkich niezbędnych dokumentów od najemcy.',
      benefits: [
        'Weryfikacja dokumentów najemcy',
        'Pomoc w przygotowaniu umowy',
        'Doradztwo prawne',
        'Bezpieczna forma najmu',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Dla inwestorów',
      description: 'Zarządzasz wieloma lokalami? Oferujemy rozwiązania skalowalne, dedykowane dla profesjonalnych wynajmujących i firm zarządzających nieruchomościami.',
      benefits: [
        'Pakiety dla wielu lokali',
        'Dedykowany opiekun klienta',
        'Priorytetowa obsługa',
        'Kompleksowe wsparcie prawne',
      ],
    },
  ];

  return (
    <section id="dla-kogo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Dla kogo jest ta usługa?
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Nasze rozwiązania są dedykowane dla różnych grup klientów
          </p>
        </div>

        {/* Audiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-navy-50 to-white p-8 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-xl"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  {audience.title}
                </h3>

                {/* Description */}
                <p className="text-navy-700 mb-6 leading-relaxed">
                  {audience.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {audience.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-navy-600">
                      <span className="text-gold-600 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
