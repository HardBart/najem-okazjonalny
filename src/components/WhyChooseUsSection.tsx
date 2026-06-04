import { UserX, Clock, Stamp, LifeBuoy, Monitor, PhoneCall } from 'lucide-react';

const REASONS = [
  {
    icon: UserX,
    title: 'Bez angażowania rodziny',
    text: 'Nie musisz prosić bliskich ani znajomych o podpis. Adres i oświadczenie zapewniamy my.',
  },
  {
    icon: Clock,
    title: 'Szybka realizacja',
    text: 'Komplet dokumentów przygotowujemy nawet w 24 godziny — zdążysz przed podpisaniem umowy.',
  },
  {
    icon: Stamp,
    title: 'Poświadczenie notarialne',
    text: 'Podpis właściciela lokalu poświadcza notariusz, dzięki czemu dokument jest gotowy do użycia.',
  },
  {
    icon: LifeBuoy,
    title: 'Wsparcie na każdym etapie',
    text: 'Prowadzimy Cię od zamówienia po gotowe dokumenty. Tłumaczymy każdy krok prostym językiem.',
  },
  {
    icon: Monitor,
    title: 'Pełna obsługa online',
    text: 'Wszystko załatwisz zdalnie — bez wizyt, kolejek i tracenia dnia wolnego.',
  },
  {
    icon: PhoneCall,
    title: 'Kontakt telefoniczny',
    text: 'Masz pytanie? Dzwonisz i rozmawiasz z człowiekiem, a nie z automatem. Doradzimy konkretnie.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Dlaczego klienci nas wybierają
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Konkretne powody, dla których setki osób powierzyło nam swoje formalności.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="flex gap-4 bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-navy-900 to-navy-700 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-navy-700 leading-relaxed">{r.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
