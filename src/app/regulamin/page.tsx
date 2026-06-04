import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { company, fullAddress } from '@/lib/company';
import { LEGAL } from '@/lib/legal';

export const metadata = {
  title: 'Regulamin świadczenia usług - Najem Okazjonalny',
  description: 'Regulamin świadczenia usług drogą elektroniczną w serwisie najemokazjonalny24.com.',
  alternates: { canonical: '/regulamin' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Regulamin', href: '/regulamin' },
            ]}
          />

          <h1 className="text-4xl font-bold text-navy-900 mb-2">Regulamin świadczenia usług</h1>
          <p className="text-sm text-navy-500 mb-10">
            Obowiązuje od: {LEGAL.effectiveDate} · wersja {LEGAL.regulaminVersion} · {company.domain}
          </p>

          <div className="space-y-10 text-navy-700 leading-relaxed">
            {/* §1 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§1. Postanowienia ogólne</h2>
              <h3 className="font-semibold text-navy-900 mb-2">1.1. Definicje</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Serwis</strong> — serwis internetowy działający pod adresem {company.domain}.</li>
                <li>
                  <strong>Usługodawca</strong> — {company.legalName} z siedzibą w {fullAddress},
                  NIP: {company.nip}, REGON: {company.regon}, KRS: {company.krs}.
                </li>
                <li><strong>Klient / Usługobiorca</strong> — osoba korzystająca z Serwisu.</li>
                <li><strong>Konsument</strong> — osoba fizyczna dokonująca czynności niezwiązanej bezpośrednio z działalnością gospodarczą lub zawodową.</li>
                <li><strong>Usługa</strong> — przygotowanie kompletu dokumentów niezbędnych do zawarcia umowy najmu okazjonalnego, w szczególności oświadczenia właściciela lokalu o wyrażeniu zgody na zamieszkanie najemcy wraz z poświadczeniem notarialnym podpisu właściciela.</li>
              </ul>

              <h3 className="font-semibold text-navy-900 mb-2 mt-6">1.2. Wymagania techniczne</h3>
              <p className="mb-2">Do korzystania z Serwisu wymagane jest:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>dostęp do Internetu,</li>
                <li>aktywny adres e-mail,</li>
                <li>aktualna przeglądarka internetowa,</li>
                <li>oprogramowanie umożliwiające odczyt plików PDF.</li>
              </ul>
            </section>

            {/* §2 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§2. Usługa</h2>
              <p className="mb-3">
                Serwis świadczy usługę polegającą na przygotowaniu, na podstawie danych przekazanych
                przez Klienta, kompletu dokumentów niezbędnych do zawarcia umowy najmu okazjonalnego.
              </p>
              <p className="mb-2">Usługa:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>ma charakter jednorazowy,</li>
                <li>jest odpłatna,</li>
                <li>obejmuje zapewnienie oświadczenia właściciela lokalu wraz z poświadczeniem notarialnym podpisu,</li>
                <li>nie obejmuje doradztwa prawnego ani reprezentacji Klienta przed sądami lub organami.</li>
              </ul>
              <p className="mb-3">
                Zakres Usługi oraz cena zależą od wybranego pakietu (Basic, Standard, Premium, VIP)
                oraz ewentualnych dodatków. Aktualne ceny prezentowane są w Serwisie przed złożeniem
                zamówienia. Wszystkie ceny są cenami brutto.
              </p>
              <p className="mb-2">Komplet dokumentów:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>jest przekazywany Klientowi pocztą, kurierem lub w formie elektronicznej,</li>
                <li>w zakresie poświadczenia notarialnego dostarczany jest w formie wymaganej przepisami prawa.</li>
              </ul>
              <p className="mb-3">
                Czas realizacji zależy od wybranego pakietu i wynosi zwykle 24–48 godzin, a w opcji
                ekspresowej — tego samego lub następnego dnia roboczego. Czas liczony jest od
                zaksięgowania płatności i przekazania przez Klienta wszystkich niezbędnych danych.
              </p>
              <p>
                Serwis stanowi wsparcie w skompletowaniu dokumentów i nie zastępuje indywidualnej
                porady prawnej.
              </p>
            </section>

            {/* §3 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§3. Zawarcie umowy</h2>
              <p className="mb-2">W celu skorzystania z Usługi Klient:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>wypełnia formularz zamówienia,</li>
                <li>akceptuje Regulamin oraz Politykę Prywatności,</li>
                <li>dokonuje płatności.</li>
              </ul>
              <p className="mb-2">Po dokonaniu płatności:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Usługodawca przystępuje do realizacji zamówienia,</li>
                <li>Klient otrzymuje potwierdzenie zawarcia umowy oraz udzielonych zgód drogą e-mailową na trwałym nośniku.</li>
              </ul>
              <p className="mb-2">Klient będący Konsumentem:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>wyraża zgodę na rozpoczęcie świadczenia Usługi przed upływem terminu do odstąpienia od umowy,</li>
                <li>przyjmuje do wiadomości, że po pełnym wykonaniu Usługi traci prawo odstąpienia od umowy.</li>
              </ul>
            </section>

            {/* §4 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§4. Płatności</h2>
              <p className="mb-2">
                Płatności obsługiwane są przez {LEGAL.paymentProvider}.
              </p>
              <p className="mb-2">Dostępne metody płatności:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>BLIK,</li>
                <li>przelewy online,</li>
                <li>karty płatnicze,</li>
                <li>Apple Pay / Google Pay.</li>
              </ul>
              <p className="mb-2">Płatność:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>ma charakter jednorazowy,</li>
                <li>nie stanowi subskrypcji.</li>
              </ul>
            </section>

            {/* §5 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§5. Prawo odstąpienia od umowy</h2>
              <p className="mb-2">
                Zgodnie z art. 38 ustawy z dnia 30 maja 2014 r. o prawach konsumenta, prawo
                odstąpienia od umowy nie przysługuje Konsumentowi w odniesieniu do umów o świadczenie
                usług, jeżeli Usługodawca wykonał w pełni usługę, a:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Konsument wyraził zgodę na rozpoczęcie świadczenia przed upływem terminu do odstąpienia od umowy,</li>
                <li>Konsument został poinformowany, że po spełnieniu świadczenia przez Usługodawcę utraci prawo odstąpienia od umowy.</li>
              </ul>
            </section>

            {/* §6 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§6. Reklamacje</h2>
              <p className="mb-2">
                Reklamacje można składać na adres: {company.email}.
              </p>
              <p className="mb-2">Termin rozpatrzenia reklamacji: 14 dni.</p>
              <p className="mb-2">Reklamacje mogą dotyczyć w szczególności:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>niewykonania lub nienależytego wykonania Usługi,</li>
                <li>nieprzekazania kompletu dokumentów.</li>
              </ul>
              <p>
                Reklamacje nie obejmują skutków wynikających z nieprawidłowych lub niekompletnych
                danych przekazanych przez Klienta. W przypadku uznania reklamacji następuje zwrot
                płatności lub ponowne wykonanie Usługi.
              </p>
            </section>

            {/* §7 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§7. Odpowiedzialność</h2>
              <p className="mb-2">Usługodawca nie ponosi odpowiedzialności za:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>błędy w danych przekazanych przez Klienta,</li>
                <li>skutki prawne wykorzystania dokumentów niezgodnie z ich przeznaczeniem,</li>
                <li>decyzje osób trzecich (np. wynajmującego) co do zawarcia umowy najmu,</li>
                <li>problemy techniczne po stronie Klienta,</li>
                <li>działanie siły wyższej.</li>
              </ul>
              <p>
                Odpowiedzialność Usługodawcy wobec Klienta niebędącego Konsumentem ograniczona jest
                do wysokości zapłaconej ceny Usługi.
              </p>
            </section>

            {/* §8 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§8. Ochrona danych osobowych</h2>
              <p>
                Dane osobowe przetwarzane są zgodnie z{' '}
                <a href="/polityka-prywatnosci" className="text-gold-600 hover:underline">
                  Polityką Prywatności
                </a>
                .
              </p>
            </section>

            {/* §9 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§9. Pozasądowe sposoby rozpatrywania sporów</h2>
              <p className="mb-2">Konsument ma możliwość skorzystania z:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>polubownych sądów konsumenckich,</li>
                <li>platformy ODR (Online Dispute Resolution) Unii Europejskiej.</li>
              </ul>
            </section>

            {/* §10 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§10. Postanowienia końcowe</h2>
              <p className="mb-2">Regulamin podlega prawu polskiemu.</p>
              <p className="mb-2">W sprawach nieuregulowanych zastosowanie mają przepisy:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kodeksu cywilnego,</li>
                <li>ustawy o prawach konsumenta,</li>
                <li>ustawy o świadczeniu usług drogą elektroniczną.</li>
              </ul>
            </section>

            {/* §11 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§11. Kontakt</h2>
              <p>
                {company.legalName}
                <br />
                {fullAddress}
                <br />
                NIP: {company.nip} · REGON: {company.regon} · KRS: {company.krs}
                <br />
                E-mail: {company.email}
              </p>
            </section>

            {/* §12 */}
            <section>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">§12. Charakter usługi (zastrzeżenie)</h2>
              <p className="mb-2">Serwis:</p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>nie świadczy usług doradztwa prawnego,</li>
                <li>nie analizuje indywidualnej sytuacji prawnej Klienta,</li>
                <li>nie weryfikuje poprawności danych przekazanych przez Klienta.</li>
              </ul>
              <p className="mb-2">
                Serwis nie monitoruje terminów dotyczących umowy najmu Klienta. Obowiązek dochowania
                terminów (np. zgłoszenia najmu okazjonalnego do urzędu skarbowego w ciągu 14 dni)
                spoczywa wyłącznie na Kliencie.
              </p>
              <p className="mb-2">Klient ponosi odpowiedzialność za:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>poprawność i kompletność przekazanych danych,</li>
                <li>sposób wykorzystania otrzymanych dokumentów.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
