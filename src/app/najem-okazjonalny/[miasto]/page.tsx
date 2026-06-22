import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTABand from '@/components/CTABand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { cities, getCityBySlug } from '@/lib/cities';
import { SITE_URL } from '@/lib/company';
import { MapPin, Clock, Check, ArrowRight, FileSignature, Stamp, Users } from 'lucide-react';

interface Props {
  params: Promise<{ miasto: string }>;
}

export function generateStaticParams() {
  return cities.map((c) => ({ miasto: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { miasto } = await params;
  const city = getCityBySlug(miasto);
  if (!city) return {};

  const title = `Najem okazjonalny ${city.name} — adres do umowy i oświadczenie | Najem Okazjonalny`;
  const description = `Potrzebujesz adresu do najmu okazjonalnego w ${city.locative}? Zapewniamy oświadczenie właściciela lokalu z poświadczeniem notarialnym. Realizacja 24–48h, bez angażowania rodziny.`;

  return {
    title,
    description,
    alternates: { canonical: `/najem-okazjonalny/${city.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/najem-okazjonalny/${city.slug}`,
      siteName: 'Najem Okazjonalny',
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { miasto } = await params;
  const city = getCityBySlug(miasto);
  if (!city) notFound();

  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 8);

  const points = [
    { icon: FileSignature, text: `Oświadczenie właściciela lokalu` },
    { icon: Stamp, text: 'Poświadczenie notarialne podpisu' },
    { icon: Clock, text: 'Realizacja nawet w 24h (bez wysyłki)' },
    { icon: Users, text: 'Bez angażowania rodziny i znajomych' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', url: '/' },
          { name: 'Najem okazjonalny', url: '/najem-okazjonalny' },
          { name: city.name, url: `/najem-okazjonalny/${city.slug}` },
        ])}
      />
      <Header />

      {/* Hero */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-navy-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: city.name, href: `/najem-okazjonalny/${city.slug}` },
            ]}
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              {city.name} i okolice · woj. {city.region}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-5 leading-tight">
              Najem okazjonalny {city.name}
            </h1>
            <p className="text-xl text-navy-700 leading-relaxed mb-8">
              Wynajmujesz mieszkanie w {city.locative} i potrzebujesz adresu do umowy najmu
              okazjonalnego? Zapewniamy komplet dokumentów zgodny z ustawą — bez proszenia rodziny
              i znajomych. Cały proces załatwisz zdalnie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/zamowienie"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold text-lg rounded-lg hover:bg-gold-600 transition-all shadow-lg"
              >
                Zamów online
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/#pakiety"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-navy-900 text-navy-900 font-bold text-lg rounded-lg hover:bg-navy-900 hover:text-white transition-all"
              >
                Zobacz pakiety
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Co otrzymujesz */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 text-center">
            Adres do najmu okazjonalnego w {city.locative}
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto text-center mb-12">
            Komplet dokumentów gotowy do dołączenia do Twojej umowy najmu.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {points.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100 text-center"
                >
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-navy-800 font-medium text-sm">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand
        variant="dark"
        title={`Potrzebujesz adresu do najmu w ${city.locative}?`}
        subtitle="Zamów online — komplet dokumentów gotowy nawet w 24h (czas realizacji bez wysyłki)."
      />

      {/* Treść lokalna / SEO */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-custom">
          <h2 className="text-3xl font-bold text-navy-900 mb-5">
            Jak to działa dla mieszkańców {city.name}
          </h2>
          <div className="space-y-4 text-navy-700 leading-relaxed">
            <p>
              Wielu najemców w {city.locative} spotyka się z wymogiem najmu okazjonalnego — to coraz
              częstszy warunek właścicieli mieszkań. Problem pojawia się, gdy nie masz w okolicy
              rodziny ani znajomych, którzy udostępniliby adres do oświadczenia.
            </p>
            <p>
              Rozwiązujemy to za Ciebie: zapewniamy właściciela lokalu, który składa wymagane
              oświadczenie, a jego podpis poświadcza notariusz. Co ważne, adres wskazany w
              oświadczeniu nie musi znajdować się w {city.locative} — przepisy dopuszczają lokal w
              dowolnej części Polski.
            </p>
            <p>
              Cały proces prowadzimy zdalnie. Nie musisz przyjeżdżać do naszego biura — komplet
              dokumentów przygotowujemy zwykle w ciągu 24–48 godzin (czas realizacji nie obejmuje
              wysyłki) i wyślemy go tam, gdzie go potrzebujesz.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {[
              `Adres do umowy najmu okazjonalnego dla najemców z ${city.name} i okolic`,
              'Oświadczenie właściciela lokalu z poświadczeniem notarialnym',
              'Pełna obsługa online — bez wizyt i kolejek',
              'Wsparcie telefoniczne na każdym etapie',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-navy-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inne miasta — linkowanie wewnętrzne */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Obsługujemy też inne miasta</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/najem-okazjonalny/${c.slug}`}
                className="px-4 py-2 bg-white border border-navy-200 rounded-full text-sm text-navy-700 font-medium hover:border-gold-400 hover:text-gold-700 transition-colors"
              >
                Najem okazjonalny {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
