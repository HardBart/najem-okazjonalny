import { ShieldCheck } from 'lucide-react';

const CONCERNS = [
  {
    concern: 'Czy to legalne?',
    answer:
      'Tak. Najem okazjonalny reguluje ustawa o ochronie praw lokatorów, a ona nie wymaga pokrewieństwa z właścicielem wskazanego lokalu. Dostarczamy dokumenty dokładnie zgodne z jej wymogami.',
  },
  {
    concern: 'Czy notariusz zaakceptuje dokumenty?',
    answer:
      'Tak. Oświadczenie przygotowujemy zgodnie z wymogami, a podpis właściciela lokalu poświadcza notariusz. Otrzymujesz dokument gotowy do dołączenia do umowy.',
  },
  {
    concern: 'Czy adres może być w innym mieście?',
    answer:
      'Tak. Prawo nie wymaga, by lokal z oświadczenia był w tym samym mieście co wynajmowane mieszkanie. Adres może być w dowolnej części Polski.',
  },
  {
    concern: 'Co jeśli właściciel mieszkania zapyta, skąd mam adres?',
    answer:
      'To Twój zgodny z prawem komplet dokumentów. Wynajmujący oczekuje oświadczenia właściciela lokalu z poświadczeniem notarialnym — i dokładnie to mu przekazujesz. Pochodzenie nie ma znaczenia prawnego.',
  },
  {
    concern: 'Czy mogę wszystko załatwić online?',
    answer:
      'Tak. Cały proces prowadzimy zdalnie — zamawiasz przez formularz, a gotowe dokumenty wysyłamy pocztą lub kurierem. Nie musisz nigdzie jechać.',
  },
  {
    concern: 'Czy muszę znać właściciela lokalu?',
    answer:
      'Nie. Właściciela lokalu i jego oświadczenie zapewniamy my. Nie musisz nikogo znać ani prosić rodziny czy znajomych.',
  },
  {
    concern: 'Czy dokumenty są zgodne z ustawą?',
    answer:
      'Tak. Każdy komplet przygotowujemy zgodnie z wymogami ustawy o najmie okazjonalnym i poświadczamy notarialnie, dzięki czemu nadaje się do zawarcia umowy.',
  },
];

export default function ConcernsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Najczęstsze obawy klientów
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Rozumiemy wątpliwości. Oto szczere, konkretne odpowiedzi — zanim podejmiesz decyzję.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CONCERNS.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gold-500/15 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">„{item.concern}"</h3>
                <p className="text-navy-700 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
