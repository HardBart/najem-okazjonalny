'use client';

import { useRouter } from 'next/navigation';
import {
  Users,
  Home,
  Zap,
  Truck,
  Plane,
  GraduationCap,
  Globe,
  Building2,
  ArrowRight,
} from 'lucide-react';

const SITUATIONS = [
  {
    icon: Users,
    title: 'Nie masz rodziny w Polsce',
    text: 'Nie masz kogo poprosić o adres do oświadczenia? Zapewniamy go bez angażowania bliskich.',
  },
  {
    icon: Home,
    title: 'Wynajmujący wymaga najmu okazjonalnego',
    text: 'Właściciel mieszkania zgodzi się podpisać umowę tylko w formie najmu okazjonalnego. Dostarczymy brakujące dokumenty.',
  },
  {
    icon: Zap,
    title: 'Potrzebujesz dokumentów na już',
    text: 'Podpisanie umowy za kilka dni? Realizujemy komplet dokumentów nawet w 24 godziny.',
  },
  {
    icon: Truck,
    title: 'Przeprowadzasz się do innego miasta',
    text: 'Zmieniasz miasto i nie znasz tam nikogo. Adres w oświadczeniu może być w dowolnej części Polski.',
  },
  {
    icon: Plane,
    title: 'Wróciłeś z zagranicy',
    text: 'Po latach za granicą nie masz aktualnego zaplecza w kraju. Załatwiamy formalności od ręki.',
  },
  {
    icon: GraduationCap,
    title: 'Jesteś studentem',
    text: 'Wynajmujesz pierwsze mieszkanie i właściciel prosi o najem okazjonalny. Pomożemy bez stresu.',
  },
  {
    icon: Globe,
    title: 'Jesteś obcokrajowcem',
    text: 'Mieszkasz i pracujesz w Polsce, ale nie masz tu rodziny. Przygotujemy komplet dokumentów po polsku.',
  },
  {
    icon: Building2,
    title: 'Zarządzasz najmem zawodowo',
    text: 'Obsługujesz wiele lokali i potrzebujesz sprawdzonego partnera do dokumentów najmu okazjonalnego.',
  },
];

export default function TypicalSituationsSection() {
  const router = useRouter();

  return (
    <section id="kiedy-potrzebna" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Kiedy ta usługa jest potrzebna?
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Jeśli rozpoznajesz u siebie którąś z poniższych sytuacji — jesteś we właściwym miejscu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITUATIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={i}
                onClick={() => router.push('/zamowienie')}
                className="group text-left bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center mb-4 shadow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-navy-700 leading-relaxed mb-4">{s.text}</p>
                <span className="inline-flex items-center gap-1 text-gold-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Zamów dokumenty
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
