import { Shield, Lock, FileCheck, UserCheck } from 'lucide-react';

export default function TrustSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: 'Zgodność z prawem',
      description: 'Wszystkie nasze rozwiązania są w pełni zgodne z obowiązującym prawem polskim. Współpracujemy wyłącznie z licencjonowanymi notariuszami.',
    },
    {
      icon: Lock,
      title: 'Bezpieczeństwo danych',
      description: 'Twoje dane osobowe są chronione zgodnie z RODO. Stosujemy najwyższe standardy bezpieczeństwa w przechowywaniu i przetwarzaniu informacji.',
    },
    {
      icon: FileCheck,
      title: 'Autentyczne dokumenty',
      description: 'Każdy dokument jest przygotowywany indywidualnie i potwierdzany przez notariusza. Gwarantujemy autentyczność wszystkich oświadczeń.',
    },
    {
      icon: UserCheck,
      title: 'Weryfikacja klientów',
      description: 'Przeprowadzamy dokładną weryfikację każdego klienta, aby zapewnić najwyższą jakość usług i eliminować potencjalne nadużycia.',
    },
  ];

  return (
    <section className="py-20 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bezpieczeństwo i zaufanie
          </h2>
          <p className="text-lg text-navy-300 max-w-2xl mx-auto">
            Twoje bezpieczeństwo i legalność działań są dla nas priorytetem
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500 rounded-xl mb-4">
                  <Icon className="w-8 h-8 text-navy-900" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{point.title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Info */}
        <div className="bg-navy-800 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Dlaczego możesz nam zaufać?
            </h3>
            <p className="text-navy-300 leading-relaxed mb-6">
              Specjalizujemy się w profesjonalnym wsparciu przy najmie okazjonalnym.
              Nasze usługi opierają się na solidnych podstawach prawnych i wieloletnim
              doświadczeniu w branży nieruchomości. Każdy przypadek traktujemy indywidualnie,
              zapewniając pełne bezpieczeństwo prawne naszych klientów.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-navy-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-gold-400 mb-2">100%</div>
                <div className="text-sm text-navy-300">Zgodność z prawem</div>
              </div>
              <div className="bg-navy-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-gold-400 mb-2">100+</div>
                <div className="text-sm text-navy-300">Zrealizowanych spraw</div>
              </div>
              <div className="bg-navy-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-gold-400 mb-2">24/7</div>
                <div className="text-sm text-navy-300">Wsparcie dla klientów</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
