import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { company, fullAddress } from '@/lib/company';

export const metadata = {
  title: 'Klauzula RODO - Najem Okazjonalny',
  description: 'Informacja o przetwarzaniu danych osobowych zgodnie z RODO',
};

export default function RODOPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy-900 mb-8">
            Klauzula informacyjna RODO
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-navy-700">
            <section>
              <p>
                Zgodnie z art. 13 ust. 1 i 2 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
                z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
                danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy
                95/46/WE (ogólne rozporządzenie o ochronie danych „RODO"), informujemy, że:
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Administrator danych</h2>
              <p>
                Administratorem Pani/Pana danych osobowych jest:
              </p>
              <ul className="list-none pl-0 space-y-1">
                <li><strong>{company.legalName}</strong></li>
                <li>Adres: {fullAddress}</li>
                <li>NIP: {company.nip}</li>
                <li>REGON: {company.regon}</li>
                <li>KRS: {company.krs}</li>
                <li>Email: {process.env.NEXT_PUBLIC_EMAIL}</li>
                <li>Telefon: {process.env.NEXT_PUBLIC_PHONE}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Cele i podstawy przetwarzania</h2>
              <p>Pani/Pana dane osobowe będą przetwarzane w celu:</p>

              <div className="space-y-4">
                <div className="bg-navy-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy-900 mb-2">Realizacji umowy</h3>
                  <p className="text-sm">
                    Podstawa prawna: art. 6 ust. 1 lit. b RODO (wykonanie umowy lub działania przed jej zawarciem)
                  </p>
                </div>

                <div className="bg-navy-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy-900 mb-2">Wypełnienia obowiązków prawnych</h3>
                  <p className="text-sm">
                    Podstawa prawna: art. 6 ust. 1 lit. c RODO (obowiązek prawny ciążący na administratorze)
                  </p>
                </div>

                <div className="bg-navy-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy-900 mb-2">Marketingu bezpośredniego</h3>
                  <p className="text-sm">
                    Podstawa prawna: art. 6 ust. 1 lit. a RODO (zgoda) oraz art. 6 ust. 1 lit. f RODO
                    (prawnie uzasadniony interes administratora)
                  </p>
                </div>

                <div className="bg-navy-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy-900 mb-2">Dochodzenia roszczeń</h3>
                  <p className="text-sm">
                    Podstawa prawna: art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora)
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Odbiorcy danych</h2>
              <p>
                Pani/Pana dane osobowe mogą być przekazywane następującym kategoriom odbiorców:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notariusze - w zakresie niezbędnym do realizacji usługi notarialnej</li>
                <li>Podmioty obsługujące płatności elektroniczne (Przelewy24 / PayPro S.A.)</li>
                <li>Dostawcy usług IT, hostingu i poczty elektronicznej</li>
                <li>Biura rachunkowe i kancelarie prawne</li>
                <li>Organy państwowe lub inne podmioty uprawnione na podstawie przepisów prawa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Okres przechowywania danych</h2>
              <p>
                Pani/Pana dane osobowe będą przechowywane:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  W celu realizacji umowy - przez czas jej trwania oraz przez okres przedawnienia
                  roszczeń (zgodnie z Kodeksem cywilnym)
                </li>
                <li>
                  W celu wypełnienia obowiązków prawnych - przez okres wymagany przepisami prawa
                  (np. 5 lat dla dokumentacji księgowej)
                </li>
                <li>
                  W celach marketingowych - do czasu wycofania zgody lub wniesienia sprzeciwu
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Przysługujące Pani/Panu prawa</h2>
              <p>
                W związku z przetwarzaniem danych osobowych przysługuje Pani/Panu prawo do:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dostępu</strong> do swoich danych osobowych (art. 15 RODO)
                </li>
                <li>
                  <strong>Sprostowania</strong> danych (art. 16 RODO)
                </li>
                <li>
                  <strong>Usunięcia</strong> danych - w określonych przypadkach (art. 17 RODO)
                </li>
                <li>
                  <strong>Ograniczenia przetwarzania</strong> - w określonych przypadkach (art. 18 RODO)
                </li>
                <li>
                  <strong>Przenoszenia</strong> danych (art. 20 RODO)
                </li>
                <li>
                  <strong>Wniesienia sprzeciwu</strong> wobec przetwarzania danych (art. 21 RODO)
                </li>
                <li>
                  <strong>Cofnięcia zgody</strong> w dowolnym momencie bez wpływu na zgodność z prawem
                  przetwarzania dokonanego przed jej cofnięciem
                </li>
                <li>
                  <strong>Wniesienia skargi</strong> do Prezesa Urzędu Ochrony Danych Osobowych
                  (ul. Stawki 2, 00-193 Warszawa)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Wymóg podania danych</h2>
              <p>
                Podanie danych osobowych jest:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Wymogiem umownym</strong> - w zakresie niezbędnym do zawarcia i wykonania umowy.
                  Konsekwencją niepodania danych będzie niemożność zawarcia umowy.
                </li>
                <li>
                  <strong>Dobrowolne</strong> - w zakresie zgód marketingowych. Konsekwencją niepodania
                  danych będzie brak możliwości otrzymywania informacji marketingowych.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Zautomatyzowane podejmowanie decyzji</h2>
              <p>
                Informujemy, że Pani/Pana dane nie będą przetwarzane w sposób zautomatyzowany
                (w tym w formie profilowania) w sposób wpływający na Pani/Pana prawa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Bezpieczeństwo danych</h2>
              <p>
                Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające
                ochronę przetwarzanych danych osobowych odpowiednią do zagrożeń oraz kategorii
                danych objętych ochroną, a w szczególności zabezpiecza dane przed ich udostępnieniem
                osobom nieupoważnionym, zabraniem przez osobę nieuprawnioną, przetwarzaniem z
                naruszeniem obowiązujących przepisów oraz zmianą, utratą, uszkodzeniem lub zniszczeniem.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Kontakt w sprawie ochrony danych</h2>
              <p>
                W sprawach dotyczących przetwarzania danych osobowych oraz realizacji swoich praw
                można kontaktować się:
              </p>
              <ul className="list-none pl-0 space-y-1">
                <li>Email: {process.env.NEXT_PUBLIC_EMAIL}</li>
                <li>Telefon: {process.env.NEXT_PUBLIC_PHONE}</li>
                <li>Korespondencyjnie: {fullAddress}</li>
              </ul>
            </section>

            <section className="text-sm text-navy-600 bg-navy-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Potwierdzenie zapoznania się z klauzulą:</p>
              <p>
                Poprzez złożenie zamówienia lub wypełnienie formularza kontaktowego potwierdzam,
                że zapoznałem/am się z powyższą klauzulą informacyjną i rozumiem zasady przetwarzania
                moich danych osobowych.
              </p>
            </section>

            <section className="text-sm text-navy-600">
              <p>Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
