'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Czy udostępnianie adresu do najmu okazjonalnego jest legalne?',
      answer: 'Tak, jest to w pełni legalne. Udostępniamy adres wraz z oświadczeniem właściciela lokalu, które jest następnie potwierdzone przez notariusza. Rozwiązanie to jest zgodne z obowiązującymi przepisami prawa dotyczącymi najmu okazjonalnego. Wszystkie dokumenty przygotowujemy zgodnie z wymogami prawa cywilnego i są one prawnie wiążące.',
    },
    {
      question: 'Czy adres może być w innym mieście niż moje miejsce zamieszkania?',
      answer: 'Tak, prawo nie wymaga, aby adres wskazany w umowie najmu okazjonalnego był tożsamy z Twoim aktualnym miejscem zamieszkania. Możesz swobodnie wybrać miasto, w którym znajduje się udostępniony lokal. Ważne jest jedynie, aby oświadczenie właściciela było autentyczne i potwierdzone notarialnie, co zapewniamy w każdym pakiecie.',
    },
    {
      question: 'Co się stanie, jeśli dojdzie do eksmisji?',
      answer: 'Najem okazjonalny to forma umowy najmu, która rzeczywiście ułatwia wynajmującemu proces eksmisji w przypadku zaległości czynszowych. Jeśli jesteś najemcą i korzystasz z naszej usługi, ważne jest, aby wywiązywać się z zobowiązań płatniczych wobec wynajmującego. Udostępniony adres służy wyłącznie do zawarcia umowy i nie wpływa na Twoje faktyczne miejsce zamieszkania.',
    },
    {
      question: 'Jak wygląda proces z notariuszem?',
      answer: 'Po wypełnieniu formularza i weryfikacji danych, przygotowujemy wszystkie niezbędne dokumenty. Następnie umawiamy termin u notariusza, który potwierdzi autentyczność oświadczenia właściciela lokalu. W zależności od wybranego pakietu, możemy zapewnić Ci wsparcie podczas wizyty u notariusza lub zająć się wszystkim samodzielnie. Po zakończeniu procedury notarialnej otrzymujesz komplet dokumentów gotowych do wykorzystania.',
    },
    {
      question: 'Ile czasu trwa realizacja usługi?',
      answer: 'Czas realizacji zależy od wybranego pakietu: Pakiet Basic - do 5 dni roboczych, Pakiet Standard - do 3 dni roboczych, Pakiet Premium - realizacja express w ciągu 24 godzin. Czas liczymy od momentu potwierdzenia płatności i dostarczenia wszystkich wymaganych dokumentów z Twojej strony.',
    },
    {
      question: 'Czy muszę być obecny osobiście u notariusza?',
      answer: 'W większości przypadków nie jest to konieczne. W pakiecie Premium oferujemy pełną obsługę, gdzie nasz przedstawiciel zajmuje się wszystkimi formalnościami. W pakietach Basic i Standard możemy zorganizować spotkanie z notariuszem według Twoich preferencji. Wszystko zależy od indywidualnych ustaleń i wybranego wariantu obsługi.',
    },
    {
      question: 'Co jeśli notariusz odmówi potwierdzenia dokumentów?',
      answer: 'W pakiecie Premium oferujemy gwarancję zwrotu pieniędzy w przypadku odmowy notariusza. W innych pakietach staramy się minimalizować to ryzyko poprzez dokładną weryfikację wstępną i przygotowanie dokumentacji zgodnie z wymogami prawa. W przypadku jakichkolwiek komplikacji, nasz zespół prawny wspiera klientów w rozwiązaniu problemu.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Najczęściej zadawane pytania
          </h2>
          <p className="text-lg text-navy-700">
            Odpowiadamy na najważniejsze wątpliwości dotyczące naszej usługi
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-navy-100 hover:border-gold-400 transition-all"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-navy-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-navy-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gold-600 flex-shrink-0 transition-transform',
                    openIndex === index && 'transform rotate-180'
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-navy-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center bg-white p-8 rounded-xl shadow-md">
          <p className="text-navy-800 font-medium mb-4">
            Nie znalazłeś odpowiedzi na swoje pytanie?
          </p>
          <a
            href="#kontakt"
            className="text-gold-600 hover:text-gold-700 font-semibold underline"
          >
            Skontaktuj się z nami →
          </a>
        </div>
      </div>
    </section>
  );
}
