import { Award, Users, Clock, Scale, MapPin, Timer } from 'lucide-react';
import { company } from '@/lib/company';

export default function TrustReasonsSection() {
  const reasons = [
    {
      icon: Award,
      metric: `od ${company.foundedYear}`,
      title: 'Doświadczenie i stała działalność',
      text: `Spółka ${company.legalName} działa od ${company.foundedYear} roku i wyspecjalizowała się wyłącznie w dokumentach do najmu okazjonalnego.`,
    },
    {
      icon: Users,
      metric: '100+',
      title: 'Obsłużonych klientów',
      text: 'Setki spraw doprowadzonych do gotowego kompletu dokumentów — najemcy, studenci, obcokrajowcy, osoby po przeprowadzce.',
    },
    {
      icon: Clock,
      metric: '24–48h',
      title: 'Szybka realizacja',
      text: 'Komplet dokumentów przygotowujemy zwykle w jeden–dwa dni, a w trybie ekspresowym tego samego dnia.',
    },
    {
      icon: Scale,
      metric: 'Notariusz',
      title: 'Współpraca z kancelariami',
      text: 'Stała współpraca z kancelariami notarialnymi — podpis właściciela lokalu zawsze jest poświadczony notarialnie.',
    },
    {
      icon: MapPin,
      metric: 'Cała Polska',
      title: 'Obsługa ogólnopolska',
      text: 'Działamy zdalnie w całym kraju, a adres w oświadczeniu może znajdować się w dowolnym mieście.',
    },
    {
      icon: Timer,
      metric: '15 min',
      title: 'Szybki kontakt',
      text: 'W godzinach pracy oddzwaniamy zwykle w ciągu 15 minut. Rozmawiasz z człowiekiem, nie z automatem.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Dlaczego klienci nam ufają?
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Bez pustych haseł — konkretne fakty, które możesz sprawdzić.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{r.metric}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{r.title}</h3>
                <p className="text-sm text-navy-700 leading-relaxed">{r.text}</p>
              </div>
            );
          })}
        </div>

        {/* Subtelna pilność */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white border-2 border-navy-100 rounded-2xl px-6 py-5 max-w-3xl mx-auto text-center sm:text-left">
          <Timer className="w-8 h-8 text-gold-600 flex-shrink-0" />
          <p className="text-navy-700 text-sm">
            <strong className="text-navy-900">Średni czas realizacji to 24–48 godzin.</strong>{' '}
            Większość klientów zamawia usługę na 1–3 dni przed podpisaniem umowy najmu —
            jeśli masz wyznaczony termin, najlepiej zacząć już teraz.
          </p>
        </div>
      </div>
    </section>
  );
}
