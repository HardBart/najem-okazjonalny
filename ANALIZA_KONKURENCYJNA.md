# 🥊 ANALIZA KONKURENCYJNA + WDROŻENIE CRO

**Data:** 2 czerwca 2026
**Perspektywa:** CRO · UX · psychologia decyzji zakupowych · biznes usługowy
**Cel:** wyższa konwersja, zaufanie i średnia wartość zamówienia (AOV)

---

## 1. Co wyglądało jak strona kancelarii zamiast strony rozwiązującej problem

| Element „kancelaryjny" | Problem | Co wdrożono |
|---|---|---|
| Sekcje przeładowane słowem „legalnie / zgodnie z prawem / przepisy" | Klient nie szuka prawa, szuka rozwiązania; nadmiar budził podejrzliwość | Kwestię legalności sprowadzono do **jednej** odpowiedzi w sekcji „Najczęstsze obawy" |
| `LegalitySection` (4 karty o podstawach prawnych) | Ton wykładu prawnego, nie sprzedaży | **Usunięta ze strony głównej** (zastąpiona sekcją obaw) |
| `TrustSection` „Bezpieczeństwo i zaufanie" z ogólnikami | Puste slogany („priorytetem jest…") | Zastąpiona **konkretnymi metrykami** (`TrustReasonsSection`) |
| `SolutionSelector` (statyczny wybór sytuacji) | Bierny, nie prowadził do decyzji | Zastąpiony **interaktywnym kreatorem 30 s** z rekomendacją pakietu |
| Hero: „Profesjonalne wsparcie przy najmie okazjonalnym" | Opis usługi, nie problem klienta | Wcześniej zmienione na **„Nie masz adresu…?"** |

**Efekt:** strona prowadzi teraz ścieżką *problem → rozwiązanie → dowód → oferta → działanie*, a nie *„jesteśmy profesjonalni"*.

---

## 2. Sekcje zbędne / redundantne (usunięte z home, pliki pozostały w repo)

- **`LegalitySection`** — temat legalności pokrywa `ConcernsSection`.
- **`WhyChooseUsSection`** — pokrywany przez `TrustReasonsSection` (konkretne fakty) + `TypicalSituationsSection`.
- **`TrustSection`** — duplikował liczniki (100%, 100+) i ton „o nas".
- **`SolutionSelector`** — zastąpiony przez `QuickQuiz` (wyższa interaktywność i konwersja).
- **`FAQSection` / `PackagesSection` (stare)** — niewykorzystywane, do skasowania przy porządkach.

Mniej sekcji = krótsza ścieżka do decyzji i mniejsze zmęczenie przewijaniem.

---

## 3. Co przeniesiono wyżej (priorytet uwagi)

1. **Liczniki zaufania** (100+, 100%, 24–48h, cała Polska) — tuż pod hero.
2. **Interaktywny kreator 30 s** — zaraz po licznikach: angażuje i od razu prowadzi do pakietu.
3. **Typowe sytuacje klienta** — wysoko, by użytkownik szybko rozpoznał „to o mnie".
4. **CTA co 2–3 sekcje** — działanie zawsze w zasięgu (paski CTA + sticky mobile + telefon w hero).

---

## 4. Elementy mogące podnieść konwersję o ≥20% (wdrożone)

1. **Interaktywny kreator (`QuickQuiz`)** — mikrozaangażowanie + personalizacja rekomendacji. Quizy potrafią podnosić konwersję dwucyfrowo, bo redukują „paraliż wyboru".
2. **Sekcja „Najczęstsze obawy klientów"** — usuwa opór zakupowy w punktach, w których klient zwykle rezygnuje.
3. **Decoy pricing w pakietach** — Basic jako wabik, Standard z przekreśloną ceną (649→499) jako „oczywisty wybór", Premium i VIP kotwiczą cenę wysoko.
4. **Moduł konwersji telefonicznej** („oddzwaniamy w 15 minut") — przechwytuje niezdecydowanych, którzy nie kupią online.
5. **Subtelna pilność** — „średni czas 24–48h, większość zamawia 1–3 dni przed podpisaniem" — bez sztucznych liczników.
6. **CTA pod każdym artykułem bloga** — zamienia ruch informacyjny w leady.

**Wzrost AOV (średnia wartość zamówienia):**
- **Cross-sell** — opcjonalne checkboxy w koszyku (wzór umowy, instrukcja US, konsultacja, ekspres, dodatkowe egzemplarze, analiza umowy).
- **Pakiet VIP (1499 zł)** — kotwica i realna opcja dla klientów premium.

---

## 5. Funkcje rzadkie u konkurencji = przewaga

| Funkcja | Dlaczego przewaga |
|---|---|
| **Interaktywny kreator rekomendacji** | Konkurenci mają statyczne cenniki; kreator personalizuje i skraca decyzję |
| **Dynamiczne podstrony miast** (`/najem-okazjonalny/[miasto]`) | Dziesiątki stron long-tail z linkowaniem wewnętrznym — większość konkurencji ma 1 stronę |
| **Cross-sell w koszyku** | Rzadkość w usługach prawnych; realnie podnosi AOV |
| **Osobne ścieżki**: najemca / wynajmujący / inwestor | Konkurenci mówią „do wszystkich"; my mówimy „do Ciebie" |
| **Obietnica oddzwonienia w 15 min** | Konkretny, mierzalny standard kontaktu — buduje zaufanie |
| **Pełne dane strukturalne** (Organization, LegalService, FAQ, Article, Breadcrumb) | Lepsze rich resulty w Google niż większość lokalnej konkurencji |

---

## 6. Pełna lista wdrożeń w tej rundzie

**Nowe moduły / sekcje**
- `QuickQuiz` — interaktywny kreator 30 s (3 pytania → rekomendacja pakietu + telefon + WhatsApp)
- `ConcernsSection` — „Najczęstsze obawy klientów" (7 obaw, konkretne odpowiedzi)
- `TrustReasonsSection` — „Dlaczego klienci nam ufają?" + subtelna pilność
- `CallbackSection` — moduł konwersji telefonicznej (oddzwaniamy w 15 min)
- `ArticleFooterCTA` — CTA sprzedażowe + powiązane artykuły pod wpisem

**Pakiety i koszyk**
- Zunifikowane `lib/packages.ts` (jedno źródło) + pakiet **VIP 1499 zł**
- **Decoy pricing**: Standard `bestValue` z przekreśloną ceną 649→499
- `lib/addons.ts` + **cross-sell** w `/zamowienie` z dynamicznym total
- API `orders`: walidacja dodatków, suma po stronie serwera, produkty PayU, zapis w zamówieniu

**Nowe podstrony**
- `/dla-wynajmujacych` — najem okazjonalny dla właścicieli
- `/obsluga-wielu-lokali` — inwestorzy/firmy + formularz indywidualnej wyceny
- `/najem-okazjonalny` (hub) + `/najem-okazjonalny/[miasto]` — dynamiczne lokalne SEO (33 miasta)

**Blog**
- Wyszukiwarka + filtr kategorii + stan „brak wyników"
- Powiązane artykuły i CTA pod wpisem

**SEO / nawigacja**
- `sitemap.ts` rozszerzony o nowe strony i wszystkie miasta
- Nawigacja (Header/Footer) z nowymi podstronami; CTA „Zamów" → `/zamowienie`

---

## 7. Rekomendacje na kolejny etap (jeszcze niewdrożone)

1. **A/B testy** nagłówka hero i CTA kreatora (np. „Zamów online" vs „Sprawdź cenę w 30 s”).
2. **Dowód społeczny w czasie rzeczywistym** (dyskretne „ktoś z {miasto} zamówił niedawno”).
3. **Skrócenie formularza zamówienia** — PESEL warto zbierać dopiero po płatności (mniejszy opór na starcie).
4. **Publikacja artykułów** wg `lib/articles.ts` (50 tematów) — 2–3 tygodniowo.
5. **GA4 + Search Console + Google Business Profile** + zbieranie realnych opinii Google.
6. **E-mail po zakupie** z up-sellem konsultacji i prośbą o opinię.

---

*Plik towarzyszący: `AUDYT_BIZNESOWY.md` (ryzyka prawne, plan SEO 12 mies.) oraz `WORK_SUMMARY.md`.*
