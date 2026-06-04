import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteForm from '@/components/QuoteForm';
import { Building2, TrendingUp, Users, Briefcase, Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obsługa wielu lokali — najem okazjonalny dla firm i inwestorów',
  description:
    'Zarządzasz wieloma mieszkaniami? Stała obsługa najmu okazjonalnego dla inwestorów, firm, operatorów mieszkań i zarządców nieruchomości. Indywidualna wycena.',
  alternates: { canonical: '/obsluga-wielu-lokali' },
  openGraph: {
    title: 'Obsługa wielu lokali — najem okazjonalny dla firm i inwestorów',
    description: 'Stała obsługa najmu okazjonalnego dla zarządzających wieloma lokalami. Indywidualna wycena.',
    type: 'website',
    url: 'https://najemokazjonalny24.com/obsluga-wielu-lokali',
    siteName: 'Najem Okazjonalny',
  },
};

const AUDIENCE = [
  { icon: TrendingUp, label: 'Inwestorzy' },
  { icon: Briefcase, label: 'Firmy' },
  { icon: Building2, label: 'Operatorzy mieszkań' },
  { icon: Users, label: 'Zarządcy nieruchomości' },
];

const BENEFITS = [
  'Stała współpraca i priorytetowa realizacja zamówień',
  'Dedykowany opiekun i jeden punkt kontaktu',
  'Indywidualne warunki cenowe przy większej liczbie lokali',
  'Powtarzalny, sprawdzony proces dla każdego najemcy',
  'Wsparcie przy dokumentach i zgłoszeniach do urzędu skarbowego',
  'Faktura i wygodne rozliczenie zbiorcze',
];

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-16 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="[&_a]:text-navy-200 [&_span]:text-white">
            <Breadcrumbs
              items={[
                { name: 'Strona główna', href: '/' },
                { name: 'Obsługa wielu lokali', href: '/obsluga-wielu-lokali' },
              ]}
            />
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Dla zarządzających najmem
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Obsługa wielu lokali
            </h1>
            <p className="text-xl text-navy-200 leading-relaxed mb-8">
              Jeśli zarządzasz wieloma mieszkaniami, zapewnimy stałą, powtarzalną obsługę najmu
              okazjonalnego dla Twoich najemców — z indywidualną wyceną i priorytetem realizacji.
            </p>
            <div className="flex flex-wrap gap-3">
              {AUDIENCE.map((a) => {
                const Icon = a.icon;
                return (
                  <span
                    key={a.label}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-navy-800/60 border border-navy-700 rounded-full text-sm font-medium"
                  >
                    <Icon className="w-4 h-4 text-gold-400" />
                    {a.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          {/* Korzyści */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Co zyskujesz przy stałej współpracy
            </h2>
            <ul className="space-y-4">
              {BENEFITS.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-navy-900" strokeWidth={3} />
                  </span>
                  <span className="text-navy-800 text-lg">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-navy-50 rounded-2xl border-2 border-navy-100">
              <p className="text-navy-700">
                Wycenę przygotowujemy indywidualnie — zależnie od liczby lokali, częstotliwości
                zleceń i zakresu wsparcia. Wypełnij formularz, a odezwiemy się z propozycją.
              </p>
            </div>
          </div>

          {/* Formularz wyceny */}
          <div id="wycena">
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
