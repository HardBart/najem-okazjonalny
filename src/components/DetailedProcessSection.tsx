import { FileText, UserCheck, FileCheck, NotebookPen, CheckCircle2, Clock } from 'lucide-react';

export default function DetailedProcessSection() {
  const steps = [
    {
      number: 1,
      icon: FileText,
      title: 'Wypełniasz formularz zamówienia',
      description: 'Wybierasz pakiet i wypełniasz prosty formularz z podstawowymi danymi. Zajmuje to 3-5 minut. Po wypełnieniu dokonujesz bezpiecznej płatności przez Przelewy24.',
      time: '5 minut',
    },
    {
      number: 2,
      icon: UserCheck,
      title: 'Weryfikujemy możliwość realizacji',
      description: 'Kontaktujemy się z Tobą (telefon lub email) aby potwierdzić szczegóły i upewnić się, że możemy pomóc. Odpowiadamy na wszystkie pytania.',
      time: '2-4 godziny',
    },
    {
      number: 3,
      icon: FileCheck,
      title: 'Przygotowujemy dokumenty',
      description: 'Nasz zespół przygotowuje oświadczenie właściciela lokalu oraz pozostałe dokumenty zgodnie z obowiązującymi przepisami prawa.',
      time: '12-24 godziny',
    },
    {
      number: 4,
      icon: NotebookPen,
      title: 'Organizujemy poświadczenie notarialne',
      description: 'Umawiamy termin z notariuszem i zajmujemy się poświadczeniem autentyczności podpisu właściciela. W większości przypadków nie musisz być obecny.',
      time: '1-2 dni',
    },
    {
      number: 5,
      icon: CheckCircle2,
      title: 'Otrzymujesz komplet dokumentów',
      description: 'Dostarczamy Ci gotowe dokumenty - oświadczenie właściciela poświadczone notarialnie oraz instrukcję jak wykorzystać je przy zawieraniu umowy najmu.',
      time: 'od razu',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-900 text-white text-sm font-medium mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Średni czas realizacji: 24-48 godzin
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Jak wygląda współpraca krok po kroku?
          </h2>

          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Prosty, przejrzysty proces. Zajmujemy się wszystkim,
            abyś mógł skupić się na wynajmie mieszkania.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 to-gold-200 hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 mb-12 bg-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-lg">
                  {/* Icon side */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-navy-900 to-navy-700 rounded-xl flex items-center justify-center relative z-10">
                      <Icon className="w-7 h-7 text-gold-400" />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-bold text-navy-900">
                        <span className="text-gold-600 mr-2">{step.number}.</span>
                        {step.title}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-medium mt-2 sm:mt-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.time}
                      </div>
                    </div>
                    <p className="text-navy-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-navy-900 text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-3">
            Gotowy żeby zacząć?
          </h3>
          <p className="text-navy-300 mb-6 max-w-2xl mx-auto">
            Wybierz pakiet i wypełnij formularz - cała reszta jest po naszej stronie.
            Realizujemy sprawy dla klientów z całej Polski.
          </p>
          <a
            href="#pakiety"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors"
          >
            Zobacz pakiety i ceny
          </a>
        </div>
      </div>
    </section>
  );
}
