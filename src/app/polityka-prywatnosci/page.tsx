import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { company, fullAddress } from '@/lib/company';
import { LEGAL } from '@/lib/legal';

export const metadata = {
  title: 'Polityka Prywatności - Najem Okazjonalny',
  description: 'Zasady przetwarzania i ochrony danych osobowych w serwisie najemokazjonalny24.com.',
  alternates: { canonical: '/polityka-prywatnosci' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Polityka Prywatności', href: '/polityka-prywatnosci' },
            ]}
          />

          <h1 className="text-4xl font-bold text-navy-900 mb-2">Polityka Prywatności</h1>
          <p className="text-sm text-navy-500 mb-10">
            Ostatnia aktualizacja: {LEGAL.effectiveDate} · wersja {LEGAL.politykaVersion} · {company.domain}
          </p>

          <div className="space-y-10 text-navy-700 leading-relaxed">
            {/* TL;DR */}
            <section className="bg-navy-50 border-2 border-navy-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-navy-900 mb-3">TL;DR (w skrócie)</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nie tworzymy kont użytkowników ani profili.</li>
                <li>Przetwarzamy tylko dane niezbędne do realizacji zamówienia.</li>
                <li>Przechowujemy ograniczony zakres danych (m.in. dane zamówienia i identyfikator płatności).</li>
                <li>Płatności obsługuje {LEGAL.paymentProvider}.</li>
                <li>Danych nie sprzedajemy ani nie wykorzystujemy do profilowania.</li>
              </ul>
            </section>

            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Administrator danych</h2>
              <p className="mb-2">Administratorem Pani/Pana danych osobowych jest:</p>
              <p>
                {company.legalName}
                <br />
                {fullAddress}
                <br />
                NIP: {company.nip} · REGON: {company.regon} · KRS: {company.krs}
                <br />
                Kontakt: {company.email}
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Jakie dane zbieramy i w jakim celu?</h2>

              <h3 className="font-semibold text-navy-900 mb-2">2.1. Dane z formularza zamówienia</h3>
              <p className="mb-2">Zbieramy dane przekazane przez Klienta:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>imię i nazwisko,</li>
                <li>adres e-mail,</li>
                <li>numer telefonu,</li>
                <li>numer PESEL,</li>
                <li>obecny adres zamieszkania,</li>
                <li>preferowane miasto dla adresu,</li>
                <li>informacje dotyczące celu najmu.</li>
              </ul>
              <p className="mb-2">Cel przetwarzania:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>przygotowanie i przekazanie kompletu dokumentów do najmu okazjonalnego,</li>
                <li>kontakt w sprawie realizacji zamówienia.</li>
              </ul>
              <p>Podanie danych jest dobrowolne, jednak niezbędne do skorzystania z Usługi.</p>

              <h3 className="font-semibold text-navy-900 mb-2 mt-6">2.2. Dane techniczne i operacyjne</h3>
              <p className="mb-2">
                W celu realizacji Usługi oraz zapewnienia jej bezpieczeństwa przetwarzamy:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>identyfikator zamówienia,</li>
                <li>datę i godzinę zamówienia,</li>
                <li>identyfikator płatności ({LEGAL.paymentProvider}),</li>
                <li>zakres udzielonych zgód oraz wersję zaakceptowanego regulaminu,</li>
                <li>adres IP użytkownika,</li>
                <li>informacje o przeglądarce i systemie operacyjnym (logi serwera).</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Jak długo przechowujemy dane?</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>dane dotyczące zamówień i płatności: nie dłużej niż 5 lat (cele księgowe i dowodowe),</li>
                <li>logi serwera: nie dłużej niż 30 dni,</li>
                <li>dane przetwarzane na podstawie zgody: do czasu jej wycofania.</li>
              </ul>
              <p className="mt-2">Po upływie tych okresów dane są usuwane lub anonimizowane.</p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Podstawa prawna przetwarzania</h2>
              <p className="mb-2">Przetwarzamy dane na podstawie:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>art. 6 ust. 1 lit. b RODO — wykonanie umowy (realizacja Usługi),</li>
                <li>art. 6 ust. 1 lit. c RODO — obowiązki prawne (m.in. podatkowe i księgowe),</li>
                <li>art. 6 ust. 1 lit. f RODO — uzasadniony interes administratora (bezpieczeństwo, obsługa reklamacji, dochodzenie lub obrona roszczeń),</li>
                <li>art. 6 ust. 1 lit. a RODO — zgoda (jeśli została udzielona).</li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Odbiorcy danych</h2>
              <p className="mb-2">Dane mogą być przekazywane:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{LEGAL.paymentProvider} — operator płatności (odrębny administrator),</li>
                <li>notariuszowi — w zakresie niezbędnym do poświadczenia podpisu właściciela lokalu,</li>
                <li>dostawcom usług technicznych (np. hosting, poczta e-mail) — jako podmiotom przetwarzającym na podstawie umów powierzenia.</li>
              </ul>
              <p className="mt-2">Nie sprzedajemy ani nie udostępniamy danych w celach marketingowych.</p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Transfer danych poza EOG</h2>
              <p>Dane nie są przekazywane poza Europejski Obszar Gospodarczy (EOG).</p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Twoje prawa (RODO)</h2>
              <p className="mb-2">Masz prawo do:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>dostępu do danych,</li>
                <li>sprostowania danych,</li>
                <li>usunięcia danych,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>wniesienia sprzeciwu,</li>
                <li>przenoszenia danych,</li>
                <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
              </ul>
              <p className="mt-2">Kontakt w sprawie danych: {company.email}.</p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Bezpieczeństwo danych</h2>
              <p className="mb-2">Stosujemy m.in.:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>szyfrowanie HTTPS/SSL,</li>
                <li>ograniczony dostęp do danych,</li>
                <li>przechowywanie danych na serwerach w UE,</li>
                <li>maskowanie danych w logach.</li>
              </ul>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Pliki cookies</h2>
              <p>
                Serwis wykorzystuje wyłącznie pliki cookies niezbędne do jego prawidłowego działania,
                w szczególności w celu utrzymania sesji i zapewnienia bezpieczeństwa. Serwis nie
                wykorzystuje cookies marketingowych ani profilujących.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Charakter usługi (zastrzeżenie)</h2>
              <p>
                Serwis {company.domain} dostarcza komplet dokumentów do najmu okazjonalnego na
                podstawie danych przekazanych przez użytkownika. Administrator nie weryfikuje
                poprawności ani kompletności tych danych. Korzystanie z Serwisu nie stanowi
                świadczenia pomocy prawnej. Użytkownik ponosi odpowiedzialność za poprawność danych
                oraz sposób wykorzystania otrzymanych dokumentów.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Zautomatyzowane podejmowanie decyzji</h2>
              <p>
                Serwis nie stosuje zautomatyzowanego podejmowania decyzji w rozumieniu art. 22 RODO
                ani profilowania użytkowników. Decyzję o wykorzystaniu otrzymanych dokumentów
                podejmuje samodzielnie użytkownik.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
