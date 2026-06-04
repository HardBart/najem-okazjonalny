import { ShieldCheck, BookOpen, Stamp } from 'lucide-react';

/**
 * Zwięzła sekcja budująca spokój klienta. Kwestię podstawy prawnej wyjaśniamy
 * RAZ, krótko — bez wielokrotnego powtarzania słów "legalnie / zgodnie z prawem".
 * Dalej strona koncentruje się na szybkości, wygodzie i rozwiązaniu problemu.
 */
export default function LegalitySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-navy-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-navy-100 p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Ikona / nagłówek */}
            <div className="md:col-span-1 text-center md:text-left">
              <div className="inline-flex w-16 h-16 bg-gradient-to-br from-navy-900 to-navy-700 rounded-2xl items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-gold-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
                Możesz być spokojny
              </h2>
            </div>

            {/* Wyjaśnienie — raz, konkretnie */}
            <div className="md:col-span-2 space-y-4 text-navy-700 leading-relaxed">
              <p>
                Najem okazjonalny reguluje ustawa z dnia 21 czerwca 2001 r. o ochronie praw
                lokatorów. <strong className="text-navy-900">Nie wymaga ona pokrewieństwa</strong>{' '}
                między najemcą a właścicielem lokalu wskazanego w oświadczeniu — dlatego nie
                musisz angażować rodziny ani znajomych.
              </p>
              <p>
                Każde oświadczenie przygotowujemy zgodnie z wymogami ustawy, a podpis właściciela
                lokalu poświadcza notariusz. Otrzymujesz dokument gotowy do dołączenia do umowy —
                bez stresu, że coś zostanie zakwestionowane.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                  <BookOpen className="w-5 h-5 text-gold-600" />
                  Zgodne z ustawą o najmie okazjonalnym
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-navy-800">
                  <Stamp className="w-5 h-5 text-gold-600" />
                  Poświadczenie notarialne podpisu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
