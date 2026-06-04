'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import { majorCities } from '@/lib/company';

/**
 * Sekcja zasięgu ogólnopolskiego. Stylizowana mapa (SVG) z pinami głównych miast
 * + lista miast. Buduje zaufanie i wspiera long-tail SEO (nazwy miast).
 */

// Przybliżone pozycje pinów na panelu mapy (procentowo), rozłożone jak na mapie PL.
const PINS = [
  { city: 'Gdańsk', x: 48, y: 14 },
  { city: 'Szczecin', x: 16, y: 22 },
  { city: 'Bydgoszcz', x: 42, y: 30 },
  { city: 'Poznań', x: 30, y: 40 },
  { city: 'Warszawa', x: 60, y: 42 },
  { city: 'Białystok', x: 76, y: 32 },
  { city: 'Łódź', x: 50, y: 50 },
  { city: 'Wrocław', x: 32, y: 60 },
  { city: 'Lublin', x: 74, y: 56 },
  { city: 'Katowice', x: 48, y: 70 },
  { city: 'Kraków', x: 56, y: 74 },
  { city: 'Rzeszów', x: 74, y: 72 },
];

export default function PolandCoverageSection() {
  const router = useRouter();

  return (
    <section id="cala-polska" className="py-20 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mapa */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* delikatna siatka w tle */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              {/* Stylizowany obrys Polski */}
              <svg viewBox="0 0 100 100" className="absolute inset-8" aria-hidden="true">
                <path
                  d="M14 24 L30 16 L46 12 L58 16 L72 20 L84 30 L82 44 L86 58 L78 68 L80 80 L66 84 L52 82 L40 84 L28 78 L18 66 L12 52 L16 38 Z"
                  fill="rgba(212,175,55,0.08)"
                  stroke="rgba(212,175,55,0.35)"
                  strokeWidth="1"
                />
              </svg>
              {/* Piny miast */}
              {PINS.map((pin) => (
                <div
                  key={pin.city}
                  className="absolute group"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-gold-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-gold-500 ring-2 ring-white/30" />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium text-gold-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    {pin.city}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Treść */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Działamy w całym kraju
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-5">
              Obsługujemy klientów z całej Polski
            </h2>

            <p className="text-lg text-navy-700 leading-relaxed mb-6">
              Nie musisz nigdzie jechać. Cały proces prowadzimy zdalnie, a adres wskazany
              w oświadczeniu właściciela może znajdować się w dowolnej części Polski —
              niezależnie od tego, gdzie wynajmujesz mieszkanie.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Adres dopasowany do Twojej sytuacji — także w innym mieście',
                'Pełna obsługa online, bez wychodzenia z domu',
                'Współpraca z notariuszami w całym kraju',
                'Dokumenty wysyłamy tam, gdzie ich potrzebujesz',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-navy-800">{item}</span>
                </li>
              ))}
            </ul>

            {/* Lista miast */}
            <div className="flex flex-wrap gap-2 mb-8">
              {majorCities.map((city) => (
                <span
                  key={city}
                  className="px-3 py-1.5 bg-white border border-navy-200 rounded-full text-sm text-navy-700 font-medium"
                >
                  {city}
                </span>
              ))}
            </div>

            <button
              onClick={() => router.push('/zamowienie')}
              className="inline-flex items-center px-7 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl"
            >
              Sprawdź dostępność w Twoim mieście
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
