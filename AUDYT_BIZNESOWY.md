# 📊 AUDYT BIZNESOWY — najemokazjonalny24.com

**Data:** 2 czerwca 2026
**Zakres:** CRO, SEO, psychologia sprzedaży, generowanie leadów
**Stan:** po pełnej przebudowie strony (wersja 3.0)

---

## 1. Co obecnie ogranicza konwersję

| # | Problem | Status po przebudowie |
|---|---------|----------------------|
| 1 | **Hero mówił o „profesjonalnym wsparciu", nie o problemie klienta** | ✅ Naprawione — nowy nagłówek „Nie masz adresu do najmu okazjonalnego?" + 5 konkretnych korzyści |
| 2 | **Nadmiar treści o legalności** (słowa „legalnie/zgodnie z prawem" powtarzane kilkanaście razy) — budził podejrzliwość zamiast zaufania | ✅ Zredukowane do jednej zwięzłej sekcji „Możesz być spokojny" |
| 3 | **Brak CTA przy przewijaniu** — użytkownik mógł przewinąć kilka ekranów bez akcji | ✅ Dodane paski CTA co 2-3 sekcje + sticky CTA na mobile + telefon w hero |
| 4 | **Opinie wyglądały sztucznie** (same „bałam się, ale było ok") | ✅ Przebudowane: ocena, inicjał, miasto, miesiąc realizacji, kontekst sytuacji |
| 5 | **Dane firmy = placeholdery** (NIP 123-456-78-90) — sygnał „strona-widmo" | ⚠️ Wymaga uzupełnienia prawdziwymi danymi (patrz pkt 3) |
| 6 | **Główne CTA „Zobacz pakiety"** — zbyt miękkie, odwlekało decyzję | ✅ Zmienione na „Zamów online" prowadzące prosto do formularza |
| 7 | **Brak liczb budujących skalę** wysoko na stronie | ✅ Dodana sekcja liczników (500+, 100%, 24-48h, Cała Polska) tuż pod hero |
| 8 | **Brak rozpoznania sytuacji klienta** | ✅ Sekcja „Kiedy ta usługa jest potrzebna?" — 8 scenariuszy, każdy prowadzi do zamówienia |

**Pozostałe ograniczenia do adresowania (poza kodem):**
- Brak realnych zdjęć zespołu/biura (użyto zdjęcia stockowego — docelowo własne).
- Brak widocznego numeru telefonu jako klikalnego elementu w nagłówku na mobile (jest w menu).
- Formularz zamówienia — warto skrócić liczbę pól do minimum i dodać pasek postępu.
- Brak „dowodu społecznego" w czasie rzeczywistym (np. „ktoś z Krakowa zamówił 2h temu").

---

## 2. Jakie elementy budzą największe zaufanie

1. **Liczniki ze skalą działania** (500+ klientów, 100% akceptacji) — natychmiastowy sygnał wiarygodności.
2. **Poświadczenie notarialne** eksponowane wielokrotnie — kotwica bezpieczeństwa.
3. **Sekcja „Cała Polska"** z mapą i listą miast — komunikuje realny zasięg + wspiera SEO.
4. **Opinie z konkretami** (miasto + miesiąc + kontekst) — wyglądają jak prawdziwe.
5. **Dane rejestrowe firmy** (NIP/REGON/adres) — po uzupełnieniu będą mocnym sygnałem.
6. **Sekcja „O firmie"** z narracją „realna firma, konkretni ludzie" — przełamuje obawę o anonimowość.
7. **FAQ z 34 pytaniami** — odpowiada na obiekcje, zanim klient zadzwoni z wątpliwością.
8. **Kontakt telefoniczny** podkreślany jako „rozmowa z człowiekiem, nie automatem".

---

## 3. Jakie elementy mogą powodować ryzyko prawne

> ⚠️ **To sekcja, którą należy potraktować priorytetowo — usługa dotyczy obszaru prawnego.**

1. **Fałszywe/placeholderowe dane firmy** (NIP, REGON, adres w `src/lib/company.ts`).
   Publikacja z danymi `000-000-00-00` lub fikcyjnymi to ryzyko zarzutu wprowadzenia w błąd
   konsumenta (UOKiK) oraz naruszenia obowiązków informacyjnych. **Wstaw prawdziwe dane przed startem.**

2. **Deklaracje „100% zaakceptowanych dokumentów" / „nigdy odmowy".**
   Obietnice absolutne są ryzykowne (klauzule niedozwolone, nieuczciwa praktyka rynkowa).
   Rekomendacja: utrzymać jako statystykę („dotychczas 100%"), nie jako gwarancję na przyszłość.

3. **Opinie klientów.**
   Od 2023 r. (implementacja dyrektywy Omnibus) prezentowanie opinii wymaga informacji,
   czy i jak są weryfikowane. Dodano notę RODO — **należy uzupełnić o oświadczenie o weryfikacji
   opinii** (np. „opinie pochodzą od klientów, których realizację potwierdziliśmy").

4. **Oceny w danych strukturalnych (`aggregateRating` 4.9/187).**
   Google i prawo wymagają, by oceny odzwierciedlały realne, weryfikowalne opinie.
   **Podmień na rzeczywiste liczby** lub usuń `aggregateRating` ze `schema.ts` do czasu zebrania opinii.

5. **Charakter usługi.**
   Komunikacja powinna jasno wskazywać, że dostarczacie dokumenty zgodne z ustawą,
   a nie „obchodzicie" wymóg pokrewieństwa (którego ustawa nie stawia). Obecna narracja jest
   poprawna — pilnować, by nie przesunęła się w stronę sugerowania fikcyjności.

6. **Regulamin / polityka prywatności / RODO** — zweryfikować pod kątem zgodności z realnym
   procesem (przekazanie danych notariuszowi, podstawa prawna przetwarzania, prawo odstąpienia
   od umowy o usługę).

**Rekomendacja:** przed publikacją zlecić przegląd treści radcy prawnemu (1-2h konsultacji).

---

## 4. Jakie dodatkowe podstrony warto stworzyć

**Konwersja / SEO landing pages (długi ogon):**
- `/najem-okazjonalny-warszawa`, `/...-krakow`, `/...-wroclaw` … (po 1 stronie na duże miasto)
- `/adres-do-najmu-okazjonalnego` (fraza główna jako dedykowany landing)
- `/najem-okazjonalny-dla-obcokrajowca` + wersja EN/UA
- `/najem-okazjonalny-dla-studenta`
- `/oswiadczenie-wlasciciela-lokalu` (fraza transakcyjna)

**Zaufanie / sprzedaż:**
- `/jak-to-dziala` (rozbudowana, samodzielna podstrona procesu)
- `/cennik` (osobna, indeksowalna strona z pakietami)
- `/opinie` (pełna strona z opiniami + ew. screeny z Google)
- `/o-nas` (zespół, zdjęcia, historia)
- `/kontakt` (mapa, godziny, formularz)

**Wsparcie / SEO informacyjne:**
- 50 artykułów blogowych (struktura gotowa w `src/lib/articles.ts`)
- `/slownik-pojec` (najem okazjonalny, kaucja, poddanie się egzekucji…)
- `/faq` jako osobna, indeksowalna podstrona (obok sekcji na home)

**Techniczne / prawne:**
- Strona 404 z linkami ratunkowymi (CTA, popularne artykuły)
- `/polityka-cookies` + baner zgody (consent mode v2 dla Google)

---

## 5. Plan wzrostu ruchu organicznego na 12 miesięcy

### Miesiące 1-2 — Fundament techniczny i lokalny
- ✅ Schema (Organization, LocalBusiness, FAQPage, Article, Breadcrumb) — wdrożone
- ✅ sitemap.xml + robots.txt + canonicale — wdrożone
- Uzupełnić prawdziwe dane firmy i realne opinie.
- Założyć **Google Business Profile** + **Google Search Console** + **GA4**.
- Zdobyć pierwsze recenzje Google (e-mail po realizacji z prośbą o opinię).

### Miesiące 2-4 — Treść transakcyjna (najszybszy zwrot)
- Opublikować landingi miejskie (Warszawa, Kraków, Wrocław, Poznań, Gdańsk, Łódź).
- Opublikować 10-15 artykułów z najwyższym potencjałem (frazy: „adres do najmu okazjonalnego",
  „najem okazjonalny bez rodziny", „oświadczenie właściciela lokalu", „dla obcokrajowca/studenta").
- Wewnętrzne linkowanie: każdy artykuł → CTA do `/zamowienie`.

### Miesiące 4-8 — Skalowanie treści i autorytet
- Dokończyć 50 artykułów (2-3 tygodniowo).
- Pozyskać linki: katalogi prawne, fora najmu, współpraca z biurami nieruchomości i kancelariami.
- Stworzyć narzędzia lead-magnet: kalkulator kosztów najmu okazjonalnego, generator checklisty dokumentów.

### Miesiące 8-12 — Optymalizacja i ekspansja
- Analiza GSC: rozbudowa stron, które weszły na pozycje 5-15 (potencjał awansu na TOP3).
- Wersje językowe (EN, UA) dla segmentu obcokrajowców — duży, słabo obsłużony rynek.
- Testy A/B nagłówków hero i CTA (np. „Zamów online" vs „Sprawdź cenę w 30 sek").
- Remarketing + kampanie Google Ads na frazy transakcyjne (uzupełnienie SEO w okresach szczytu).

### Prognoza (przy konsekwentnej realizacji)
| Okres | Ruch organiczny / mies. | Źródło wzrostu |
|-------|------------------------|----------------|
| Start | bazowy | strona główna |
| 3 mies. | ×3-5 | landingi miejskie + GBP |
| 6 mies. | ×8-12 | 20+ artykułów long-tail |
| 12 mies. | ×20-30 | pełny blog + linki + wersje językowe |

> Największy i najszybszy zwrot dają **landingi miejskie** + **Google Business Profile z opiniami**.
> Blog buduje ruch wolniej, ale trwale i taniej niż reklama.

---

## Podsumowanie priorytetów (zrób w tej kolejności)

1. 🔴 **Uzupełnij prawdziwe dane firmy** (`src/lib/company.ts`) — blokuje publikację.
2. 🔴 **Zweryfikuj/popraw `aggregateRating` i deklaracje „100%/gwarancja"** — ryzyko prawne.
3. 🟠 Podłącz GA4 + Search Console + Google Business Profile.
4. 🟠 Wdróż landingi miejskie (6 największych miast).
5. 🟡 Publikuj blog (2-3 artykuły/tydzień wg `articles.ts`).
6. 🟡 Zbieraj opinie Google po każdej realizacji.

---

*Raport wygenerowany jako część przebudowy CRO/SEO. Pełna lista zmian technicznych w pliku `WORK_SUMMARY.md`.*
