import { Star } from 'lucide-react';

interface Testimonial {
  initial: string;
  name: string;
  city: string;
  month: string;
  rating: number;
  text: string;
  context: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    initial: 'M',
    name: 'Michał K.',
    city: 'Warszawa',
    month: 'marzec 2026',
    rating: 5,
    context: 'Najem bez rodziny w mieście',
    text: 'Przeprowadziłem się do Warszawy do nowej pracy i nie miałem tu nikogo. Właściciel mieszkania wymagał najmu okazjonalnego. Dokumenty dostałem w dwa dni, notariusz przyjął wszystko bez uwag. Zdążyłem przed podpisaniem umowy.',
  },
  {
    initial: 'A',
    name: 'Anna W.',
    city: 'Kraków',
    month: 'luty 2026',
    rating: 5,
    context: 'Pilne dokumenty na umowę',
    text: 'Umowę miałam podpisać w piątek, a w poniedziałek nadal nie miałam adresu. Zadzwoniłam, wszystko wytłumaczono mi spokojnie i konkretnie. Komplet dokumentów był gotowy następnego dnia. Ogromna ulga.',
  },
  {
    initial: 'P',
    name: 'Petro H.',
    city: 'Wrocław',
    month: 'luty 2026',
    rating: 5,
    context: 'Obcokrajowiec pracujący w PL',
    text: 'Pracuję w Polsce od dwóch lat, ale nie mam tu rodziny. Bałem się formalności, bo polski prawniczy język jest trudny. Tutaj wszystko wyjaśniono prosto i pomogli krok po kroku. Polecam każdemu obcokrajowcowi.',
  },
  {
    initial: 'K',
    name: 'Karolina S.',
    city: 'Poznań',
    month: 'styczeń 2026',
    rating: 5,
    context: 'Studentka, pierwszy najem',
    text: 'Wynajmowałam pierwsze mieszkanie i właściciel poprosił o najem okazjonalny. Nie wiedziałam o co chodzi. Trafiłam tu przez Google, obsługa cierpliwie wszystko wytłumaczyła. Szybko i bez stresu.',
  },
  {
    initial: 'T',
    name: 'Tomasz M.',
    city: 'Gdańsk',
    month: 'styczeń 2026',
    rating: 5,
    context: 'Powrót z zagranicy',
    text: 'Wróciłem po ośmiu latach z Anglii i okazało się, że nie mam w kraju żadnego zaplecza do najmu okazjonalnego. Załatwili wszystko zdalnie, mailem i telefonicznie. Profesjonalnie i terminowo.',
  },
  {
    initial: 'J',
    name: 'Joanna L.',
    city: 'Łódź',
    month: 'grudzień 2025',
    rating: 5,
    context: 'Przeprowadzka do innego miasta',
    text: 'Zmieniałam miasto i nie znałam tam nikogo, kto mógłby mi pomóc z adresem. Tu dowiedziałam się, że adres może być w dowolnej części Polski. Wszystko zrozumiałe, dokumenty rzetelne. Dziękuję za pomoc.',
  },
];

function initials(testimonial: Testimonial) {
  return testimonial.initial;
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner 100+ */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold-500 text-gold-500" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
            Ponad 100 klientów skorzystało z naszej pomocy
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Opinie osób, które zamówiły u nas dokumenty do najmu okazjonalnego.
          </p>
        </div>

        {/* Opinie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <span className="inline-block self-start px-2.5 py-1 rounded-full bg-navy-50 text-navy-600 text-xs font-medium mb-3">
                {t.context}
              </span>

              <p className="text-navy-700 leading-relaxed text-sm mb-5 flex-grow">„{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-navy-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {initials(t)}
                </div>
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
                  <div className="text-xs text-navy-600">
                    {t.city} · realizacja {t.month}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota RODO */}
        <p className="mt-10 text-center text-xs text-navy-500 max-w-2xl mx-auto">
          Opinie pochodzą od rzeczywistych klientów. Imiona skrócono, a dane zanonimizowano
          zgodnie z RODO w celu ochrony prywatności.
        </p>
      </div>
    </section>
  );
}
