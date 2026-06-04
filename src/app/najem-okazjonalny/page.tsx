import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTABand from '@/components/CTABand';
import { cities } from '@/lib/cities';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Najem okazjonalny w Twoim mieście — adres do umowy w całej Polsce',
  description:
    'Adres do najmu okazjonalnego i oświadczenie właściciela lokalu w największych miastach Polski. Wybierz swoje miasto i zamów komplet dokumentów online.',
  alternates: { canonical: '/najem-okazjonalny' },
  openGraph: {
    title: 'Najem okazjonalny w Twoim mieście — cała Polska',
    description: 'Adres do umowy najmu okazjonalnego w największych miastach Polski. Zamów online.',
    type: 'website',
    url: 'https://najemokazjonalny24.com/najem-okazjonalny',
    siteName: 'Najem Okazjonalny',
  },
};

export default function CitiesHubPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Najem okazjonalny', href: '/najem-okazjonalny' },
            ]}
          />
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Najem okazjonalny w Twoim mieście
            </h1>
            <p className="text-lg text-navy-700">
              Działamy w całej Polsce. Wybierz miasto, w którym wynajmujesz mieszkanie — pokażemy,
              jak szybko zdobyć adres i komplet dokumentów do umowy najmu okazjonalnego.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/najem-okazjonalny/${c.slug}`}
                className="group flex items-center justify-between gap-2 p-4 rounded-xl border-2 border-navy-100 hover:border-gold-400 hover:shadow-md transition-all"
              >
                <span className="flex items-center gap-2 text-navy-900 font-semibold">
                  <MapPin className="w-4 h-4 text-gold-600" />
                  {c.name}
                </span>
                <ArrowRight className="w-4 h-4 text-navy-300 group-hover:text-gold-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CTABand variant="dark" />
      <Footer />
    </main>
  );
}
