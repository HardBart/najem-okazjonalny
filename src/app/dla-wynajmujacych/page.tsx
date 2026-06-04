import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTABand from '@/components/CTABand';
import {
  ShieldCheck,
  Scale,
  FileSignature,
  Clock,
  Wallet,
  UserCheck,
  Check,
  ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Najem okazjonalny dla wynajmujących — bezpieczny wynajem mieszkania',
  description:
    'Wynajmujesz mieszkanie? Najem okazjonalny chroni właściciela i ułatwia odzyskanie lokalu. Pomagamy skompletować dokumenty od najemcy — szybko i zgodnie z ustawą.',
  alternates: { canonical: '/dla-wynajmujacych' },
  openGraph: {
    title: 'Najem okazjonalny dla wynajmujących',
    description: 'Bezpieczny wynajem mieszkania — pomagamy właścicielom skompletować dokumenty najmu okazjonalnego.',
    type: 'website',
    url: 'https://najemokazjonalny24.com/dla-wynajmujacych',
    siteName: 'Najem Okazjonalny',
  },
};

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Realna ochrona właściciela',
    text: 'Najem okazjonalny daje silniejszą pozycję niż zwykła umowa — z góry wskazany lokal, do którego najemca może się wyprowadzić.',
  },
  {
    icon: Scale,
    title: 'Łatwiejsze odzyskanie lokalu',
    text: 'W razie problemów procedura opróżnienia mieszkania jest prostsza i szybsza niż przy najmie na zasadach ogólnych.',
  },
  {
    icon: Wallet,
    title: 'Mniejsze ryzyko zaległości',
    text: 'Najemca poddaje się egzekucji co do opróżnienia lokalu, co realnie dyscyplinuje płatności.',
  },
  {
    icon: Clock,
    title: 'Szybkie skompletowanie dokumentów',
    text: 'Gdy najemca nie ma adresu ani zaplecza, dostarczamy brakujące oświadczenie z poświadczeniem notarialnym w 24–48h.',
  },
];

const DOCUMENTS = [
  'Umowa najmu okazjonalnego w formie pisemnej',
  'Oświadczenie najemcy o poddaniu się egzekucji (akt notarialny)',
  'Wskazanie lokalu, do którego najemca się wyprowadzi',
  'Oświadczenie właściciela tego lokalu o zgodzie na zamieszkanie',
  'Zgłoszenie umowy do urzędu skarbowego w ciągu 14 dni',
];

export default function LandlordPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-16 bg-gradient-to-br from-navy-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Dla wynajmujących', href: '/dla-wynajmujacych' },
            ]}
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <UserCheck className="w-4 h-4 mr-2" />
              Dla właścicieli mieszkań
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-5 leading-tight">
              Najem okazjonalny dla wynajmujących
            </h1>
            <p className="text-xl text-navy-700 leading-relaxed mb-8">
              Chcesz wynająć mieszkanie bezpiecznie? Najem okazjonalny chroni Twoje interesy lepiej
              niż zwykła umowa. Jeśli Twój najemca nie ma kompletu dokumentów — pomożemy je zdobyć.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/zamowienie"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold text-lg rounded-lg hover:bg-gold-600 transition-all shadow-lg"
              >
                Zamów dokumenty dla najemcy
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

      {/* Dlaczego warto */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Dlaczego warto stosować najem okazjonalny
            </h2>
            <p className="text-lg text-navy-700 max-w-2xl mx-auto">
              Cztery powody, dla których właściciele wybierają tę formę umowy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-navy-900 to-navy-700 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{b.title}</h3>
                    <p className="text-sm text-navy-700 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand
        variant="dark"
        title="Twój najemca nie ma adresu do umowy?"
        subtitle="Dostarczymy komplet dokumentów, dzięki któremu podpiszecie najem okazjonalny."
      />

      {/* Jakie dokumenty */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-5">
              Jakie dokumenty są potrzebne
            </h2>
            <p className="text-navy-700 leading-relaxed mb-6">
              Aby umowa była najmem okazjonalnym, potrzebny jest komplet załączników. Najczęściej
              brakującym elementem po stronie najemcy jest oświadczenie właściciela lokalu zastępczego —
              i to właśnie zapewniamy.
            </p>
            <ul className="space-y-3">
              {DOCUMENTS.map((doc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-navy-800">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 text-white">
            <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center mb-5">
              <FileSignature className="w-6 h-6 text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Jak pomagamy właścicielom</h3>
            <ul className="space-y-3 text-navy-200">
              {[
                'Kompletujemy brakujące dokumenty od strony najemcy',
                'Organizujemy poświadczenie notarialne oświadczeń',
                'Doradzamy, jak prawidłowo zgłosić umowę do urzędu skarbowego',
                'Sprawdzamy poprawność dokumentów przed podpisaniem',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
