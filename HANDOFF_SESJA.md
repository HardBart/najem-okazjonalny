# 🔄 HANDOFF — stan pracy i co dalej

> Plik do wznowienia pracy w nowej sesji. Wklej go lub napisz: „Przeczytaj HANDOFF_SESJA.md i wracamy do pracy".
> Projekt: `C:\Users\barto\Desktop\Najem okazjonalny` (Next.js 15, App Router, TS, Tailwind). **Wszystko poniżej jest LOKALNIE — nic nie wypchnięte na produkcję.**

---

## ✅ CO ZROBIONO W TEJ SESJI

### 1. Dokumenty sprzedażowe (.docx) — przebudowane
Folder `Dokumenty najem okazjonalny\` (gitignored). Generowane skryptami w `C:\Users\barto\docbuild` (Node + `docx`), walidowane przez Worda (COM). Marka: eyebrow „najemokazjonalny24.com", stopka „Opracowano przez zespół NajemOkazjonalny24 · Wersja 2026/06".
- **Umowa najmu okazjonalnego** — ~8 str., 17 paragrafów, **bez kar umownych** (na życzenie), 10 pt. Zawiera m.in. media, doręczenia, RODO, art. 19a/777 (do weryfikacji prawnej), zwierzęta tak/nie, prace adaptacyjne, wizyty kontrolne max raz/3 mies., zakaz zmiany zamków bez zgody, klauzula e-mail.
- **Protokół zdawczo-odbiorczy** — dużo wolnego miejsca na wyposażenie, zastane uszkodzenia, klauzula prawidłowości odczytów, dokumentacja fotograficzna, koszty sprzątania, „wydanie/zwrot".
- **Instrukcja zgłoszenia do US** — instrukcja + wzór, e-Urząd Skarbowy, checklista, „najczęstszy błąd" (14 dni od rozpoczęcia, nie od podpisania), podstawa prawna.
- **Lista kontrolna wynajmującego** — wygenerowana, ale NIE sprzedawana osobno (poza pakietem).

### 2. Sklep / oferta (kod)
- **Pakiet „Bezpieczny Najem"** (`lib/addons.ts`, id `pakiet-bezpieczny-najem`, 129 zł, `featured`) = umowa + protokół + instrukcja US (BEZ listy kontrolnej). Sprzedajemy TYLKO w pakiecie — usunięte pojedyncze dodatki-dokumenty i zapis „taniej niż osobno".
- `dodatkowe-egzemplarze` (59 zł): `excludedFrom: ['basic']` (Start = e-mail, papier bez sensu); `ekspres` `includedIn: ['premium','vip']`.
- **Dostawa** (`DeliverySection`): paczkomat w cenie; **kurier pod adres +25 zł** w Standard; w Premium/Komplet kurier w cenie. Dopłata liczona też po stronie serwera (`courierSurchargeFor` w `lib/addons.ts` + `api/orders/route.ts`).
- Usunięte z formularza zamówienia pole **„preferowane miasto"** (`desiredCity`) — wszędzie (form, typ, mail, polityka prywatności).
- Reklama pakietu na `/dla-wynajmujacych`.

### 3. Treść / poprawki (kod)
- **Mapa Polski** usunięta (sztuczna) → czysty panel „Cała Polska" (16 województw / 100% zdalnie) w `PolandCoverageSection`.
- **Ikony social (FB, LinkedIn)** usunięte ze stopki.
- **Poprawki notarialne**: nie twierdzimy, że podpis ZAWSZE notarialny — od Standardu notariusz, w Start profil zaufany. Plus **pouczenie** (ConcernsSection, faqs.ts, packages.ts Start): „sprawdź jakiej formy podpisu wymaga druga strona / kancelaria".
- **Adnotacja „czas realizacji bez wysyłki"** dodana WSZĘDZIE gdzie pojawia się 24h/24-48h.
- „Jak wygląda współpraca krok po kroku" (`DetailedProcessSection`) — czasy zakotwiczone w Standard, krok 5 dostawa „1–2 dni robocze (wysyłka)" (nie „od razu"), krok 4 notariusz „w pakietach z poświadczeniem".
- „Otrzymujesz komplet" — usunięte „wysyłamy e-mailem" (tylko Start/profil zaufany dostaje wersję elektroniczną).
- Interpunkcja: kropki na tytułach kart, nagłówkach itp.
- Kontakt: telefon **pon.–pt. 9:00–16:00**, e-mail „odpowiedź w dni robocze, w ciągu 24h".

### 4. 🌍 WIELOJĘZYCZNOŚĆ PL / EN / UA — gotowa dla całego lejka
Lekki przełącznik flag (bez zmiany URL). Architektura:
- `src/lib/i18n/config.ts` — Locale, `LOCALE_CODES` (uk→**UA**), ciasteczko `lang`.
- `src/lib/i18n/messages.ts` — słowniki PL/EN/UA + `translate`/`translateRaw` (fallback do PL). **DUŻY plik** — namespace'y: nav, hero, cta, sticky, footer, stats, situations, how, concerns, trust, coverage, process, about, contact, pkg, packagesData, faq, testimonials, quiz, business, order, addonsData, success, blog, landlord, common.
- `src/lib/i18n/LanguageProvider.tsx` — `useT()` (string), `useLanguage().tx()` (tablice/obiekty). Owinięte w `app/layout.tsx`.
- `src/components/LanguageSwitcher.tsx` — flagi SVG (Windows nie renderuje emoji flag), w nagłówku desktop+mobile.

**Przetłumaczone i zweryfikowane na żywo (PL/EN/UA):** nagłówek, stopka, hero, liczniki, typowe sytuacje, jak to działa, obawy, dlaczego nam ufają, zasięg, pakiety (+dane), proces, o firmie, opinie, FAQ (32), QuickQuiz, kontakt, paski CTA, StickyCTA; podstrony: `dla-wynajmujacych`, `obsluga-wielu-lokali` (+QuoteForm), `zamowienie` (+DeliverySection), `platnosc/sukces`; **blog**: chrome listy i artykułów + `BlogLangNotice` (notka „treść po polsku" poza PL).
**Wzorzec dla stron z `metadata`:** serwerowy wrapper (SEO) + komponent kliencki (`LandlordContent`, `InvestorsContent`).
`npx tsc --noEmit` — czysto.

---

## 📋 DO ZROBIENIA (lista zadań — w systemie TaskList #1–#5)

1. **#1 — Deploy na produkcję (NA KOŃCU, zależny od #2–#5).** Wszystko jest lokalnie; strona w trybie „w budowie" (nginx 503 + podgląd `/podglad-zofihel`). Kroki: `git push` → na serwerze `cd /var/www/najemokazjonalny24 && git pull && npm install && npm run build && pm2 reload najemokazjonalny24`. Najpierw `npx tsc --noEmit`. Zdjęcie trybu „w budowie": usunąć w nginx linię z `cookie_preview`.
2. **#2 — Wielojęzyczność (w toku).** Lejek + blog-chrome gotowe. **Zostało (świadomie PL):** treść 50 artykułów bloga (`lib/articleContent.ts`, ~84 KB — etapami, od najpopularniejszych, z weryfikacją), strony miejskie `/najem-okazjonalny/[miasto]` (SEO-PL, gramatyka — rekomendacja: zostają PL), strony prawne (po #3). Opcjonalnie: pełne i18n z `/en` `/uk` (next-intl) = większy refactor.
3. **#3 — Regulamin / polityka prywatności / RODO** — finalna treść po weryfikacji radcy prawnego (wzorowane na innym serwisie). Potem ewentualnie tłumaczenia.
4. **#4 — Testy Przelewy24 na sandbox** — pełny przepływ płatności → `/api/przelewy24/notify` → status zamówienia. Dane w `.env` (`P24_*`, `P24_SANDBOX=true`).
5. **#5 — System wystawiania rachunków** za opłacone zamówienie (PDF na e-mail, numeracja, pozycje: pakiet + dodatki + dopłata kurier).

> ⚠️ Do weryfikacji prawnej w umowie/opisach: podstawa dla najmu okazjonalnego to **art. 19a ust. 2 pkt 1 ustawy o ochronie praw lokatorów** (obecnie miejscami jest sam art. 777 § 1 pkt 4 k.p.c.).

---

## ▶️ JAK WZNOWIĆ
- Serwer dev: `cd "C:\Users\barto\Desktop\Najem okazjonalny" && npm run dev` → http://localhost:3000
- Skrypty .docx: `C:\Users\barto\docbuild` (`node umowa.js "<ścieżka docelowa>"` itd.)
- Główny plik statusu projektu: `STATUS_PROJEKTU.md` (szerszy kontekst).
- Podgląd ustawiony na język wg ciasteczka — przełączasz flagą w nagłówku (PL/EN/UA).

---

## 🧾 AKTUALIZACJA: System rachunków/faktur (#5) + RODO (#6)

### Zadanie #5 — faktury/rachunki: KROKI A i B GOTOWE, dalej C→D→E
**Wzór:** `faktura przykład.pdf` (układ Raj Capital). **Wystawca = ZoFiHel Rental Sp. z o.o.**

**Decyzje (potwierdzone z klientem):**
- VAT bazowo **zwolniony (art. 113 ust. 1)** → „zw.". Po przekroczeniu **240 000 zł** sprzedaży w roku → **VAT 23%** (cena brutto bez zmian = `order.amount`, netto = amount/1,23, VAT = różnica). Próg liczy **CAŁĄ sprzedaż** (faktury + rachunki). Reguła: `(sprzedaż_w_roku_przed + amount) > 240000` → 23%.
- **Jedna zbiorcza pozycja** „Usługa elektroniczna – przygotowanie kompletu dokumentów do najmu okazjonalnego".
- **Osobne serie numeracji**: faktury `FV {nr}/{rok}/NO`, rachunki `R {nr}/{rok}/NO`, reset co rok.
- `wantInvoice=true` → FAKTURA; `false` → RACHUNEK. Po opłaceniu PDF od razu e-mailem (idempotentnie).
- ⚠️ System ustawia tylko stawkę na dokumencie — **rejestracja VAT-R, JPK, deklaracje, KSeF = obowiązek spółki/księgowej**. Potwierdzić z księgową limit 240k dla ZoFiHel 2026.

**ZROBIONE:**
- **A)** Pola faktury w formularzu `/zamowienie`: checkbox „Chcę fakturę" → Firma (nazwa+NIP) / Osoba (imię+nazwisko) + adres + „Przeklej dane z formularza". `validateNIP` w `lib/utils.ts`. i18n PL/EN/UA (`order.invoiceForm.*`). Typ `Order.invoice` / `Order.invoiceDoc` / `Order.p24TransactionId`. Payload + zapis w `/api/orders`.
- **B)** Generator PDF: `src/lib/invoice/generateInvoice.ts` → `generateInvoicePdf(order, opts): Promise<Buffer>`; `src/lib/invoice/seller.ts` (dane ZoFiHel, `SERVICE_NAME`, `VAT_EXEMPTION_BASIS`, `VAT_EXEMPTION_LIMIT=240000`, `VAT_RATE`). Lib: **pdfmake@0.2.12** + font Roboto (`src/lib/invoice/fonts/Roboto-*.ttf`). **next.config.mjs: `serverExternalPackages:['pdfmake']`** (konieczne — webpack gubi `data.trie`). Obsługa faktura/rachunek + „zw."/23%. Zweryfikowane 3 warianty (renderują się poprawnie, polskie znaki OK). Dev-podgląd: `GET /api/faktura-podglad?type=faktura|rachunek&vat=zw|23&buyer=company|person` (404 w produkcji — do usunięcia lub przejęcia przez panel admina).

**DALEJ — KROK C (następny):** licznik numeracji + suma sprzedaży/rok + idempotencja.
- Dołożyć trwały, **atomowy** licznik (VPS = 1 proces PM2). Rekomendacja: **SQLite (`better-sqlite3`)** — też dodać do `serverExternalPackages`. Tabela liczników per seria/rok (FV, R) + tabela sumy sprzedaży per rok + rejestr wystawionych dokumentów (nr, typ, orderId, kwota, data, vat).
- API/util `issueDocumentNumber(type, year)` → atomowy increment, zwraca `FV n/rok/NO` / `R n/rok/NO`.
- `getYearSalesTotal(year)` + reguła progu 240k → ustala `vat: 'zw'|'23'`.
- Idempotencja: jeśli `order.invoiceDoc` istnieje, nie generuj ponownie.
**KROK D:** w webhooku `/api/przelewy24/notify` po potwierdzeniu płatności: pobierz nr transakcji P24 z payloadu → `order.p24TransactionId`; policz vat (próg) + numer (C) → `generateInvoicePdf` → wyślij e-mail przez Resend (`lib/email.ts`) z załącznikiem PDF → zapisz `order.invoiceDoc`. (zależność: #4 sandbox P24).
**KROK E:** panel admina — lista i pobieranie wystawionych dokumentów.

### Zadanie #6 — RODO: minimalna retencja + warunkowy PESEL (NOWE)
Decyzje: model **MINIMALNY** + **PESEL warunkowo i kasowany po realizacji**.
- Trzymamy długo tylko: dokument księgowy (nabywca, NIP, adres, kwota, nr P24, data, numer) **5 lat**; **e-mail** do przypominajki POWROT15 (wg zgody). Resztę (cel najmu, telefon, adres dostawy, pozostałe dane) kasujemy/anonimizujemy **po realizacji**.
- **PESEL**: zbierać tylko gdy potrzebny (najpewniej Komplet/notarialny — potwierdzić z prawnikiem), szyfrować, usuwać po wygenerowaniu dokumentów. Dziś formularz wymaga PESEL zawsze → zmienić na warunkowy.
- Mechanizm: anonimizacja przy statusie „zrealizowane" lub cron. Ryzyko bieżące: `data/orders.json` = plaintext z PESEL → przy migracji na DB zaszyfrować. Okresy/podstawy → polityka prywatności (#3).

### Lista zadań (TaskList): #1 deploy (na końcu), #2 i18n (lejek+blog-chrome gotowe), #3 prawne, #4 Przelewy24 sandbox, #5 faktury, #6 RODO/retencja.

---

## 🧾 AKTUALIZACJA 2 — Faktury #5: KROKI A–D GOTOWE, zostało E

**Zweryfikowane na żywo.** Pliki: `src/lib/invoice/{seller.ts, generateInvoice.ts, registry.ts, issueInvoice.ts, fonts/Roboto-*.ttf}`. `next.config.mjs`: `serverExternalPackages:['pdfmake']`. Lib: `pdfmake@0.2.12`.

- **A) Formularz** `/zamowienie`: checkbox „Chcę fakturę" → Firma(nazwa+NIP)/Osoba(imię+nazwisko)+adres+„przeklej z formularza". `validateNIP` (utils). i18n `order.invoiceForm.*`. `Order.invoice/invoiceDoc/p24TransactionId`. Zapis w `/api/orders`.
- **B) Generator PDF** `generateInvoicePdf(order, opts)`: faktura/rachunek, „zw."(art.113)/23% (brutto bez zmian = amount, netto=amount/1,23). Układ wg wzoru. Dev-podgląd: `GET /api/faktura-podglad?type=&vat=&buyer=` (404 w prod — można przejąć w panelu admina, krok E).
- **C) Rejestr** `registry.ts`: `issueDocument()` + `getYearSalesTotal()`. Plik `data/invoice-registry.json` (synchroniczny, atomowy na 1 procesie PM2; SQLite = przyszły upgrade). Serie **FV/R**, reset roczny, **idempotencja po orderId**, **próg VAT 240k** licząc CAŁĄ sprzedaż (FV+rachunki). Numer: `FV {n}/{rok}/NO` / `R {n}/{rok}/NO`.
- **D) Orchestrator + webhook + e-mail**: `issueInvoiceForOrder()` = registry→PDF. `lib/email.ts`: `sendEmail` rozszerzony o `attachments`, nowa `sendInvoiceEmail()`. Wpięte w `/api/przelewy24/notify` po potwierdzeniu płatności (jeśli `!order.invoiceDoc`): wystaw → zapisz `order.invoiceDoc`+`order.p24TransactionId` (z `notification.orderId`) → wyślij PDF e-mailem. try/catch (nie blokuje płatności).
- **Aktywacja w realu**: wymaga **#4** (P24 sandbox → realny nr transakcji) + **`RESEND_API_KEY`** (bez klucza e-mail logowany i pomijany — bezpiecznie). Kod gotowy.

**KROK E (następny, ostatni dla #5):** panel admina `/admin` — lista wystawionych dokumentów (z `registry`: number, type, orderId, buyer, amount, vat, issuedAt) + pobieranie PDF na żądanie (regeneracja przez `issueInvoiceForOrder`/`generateInvoicePdf` po orderId; rejestr jest idempotentny, więc regeneracja nada istniejący numer). Można przejąć `/api/faktura-podglad` jako chroniony endpoint pobierania.

**Decyzje #5 (potwierdzone):** VAT zw→23 po 240k (cała sprzedaż, brutto bez zmian); jedna pozycja zbiorcza; serie FV/R; `wantInvoice=true`→FV / `false`→rachunek; po opłaceniu PDF od razu e-mailem. System ustawia tylko stawkę — VAT-R/JPK/KSeF = obowiązek spółki/księgowej. Potwierdzić limit 240k dla ZoFiHel 2026.

**Wznowienie:** „Przeczytaj HANDOFF_SESJA.md i dokończ krok E faktur (panel admina)".

---

## 🆕 AKTUALIZACJA 3 (NAJNOWSZA) — #3, #4, #5, #6 ZAMKNIĘTE; trwa #7

> Stan na bieżącą sesję. Wszystko nadal LOKALNIE (nic na produkcji).

### Lista zadań (TaskList) — aktualne statusy
- **#1 Wdrożenie** — ⚪ na końcu. Checklista w opisie zadania: aktywacja maili (RESEND + domena Resend SPF/DKIM), produkcyjne P24 (`P24_SANDBOX=false`, USUNĄĆ `P24_MOCK_VERIFY`), `NEXT_PUBLIC_APP_URL`=domena, reset `data/`, **systemowy crontab na VPS** dla `/api/cron/reminders` i `/api/cron/retention` (vercel.json crons = tylko Vercel), **logrotate** logów ≤30 dni.
- **#2 i18n** — 🔵 lejek + strony prawne (PL/EN/UA) gotowe; **świadomie PL**: treść 50 artykułów bloga + strony miast.
- **#3 Regulamin/Polityka** — ✅ GOTOWE (draft do podpisu prawnika). 3 rundy uwag ChatGPT wdrożone (z moimi korektami). Wersje: **regulamin v5_2026-06-21, polityka v3_2026-06-21** (`src/lib/legal.ts`).
- **#4 Przelewy24 sandbox** — ✅ GOTOWE. Realny round-trip (konto 400807) + lokalny test webhooka.
- **#5 Faktury/rachunki + maile** — ✅ GOTOWE (kod). Realna wysyłka maili → aktywacja przy wdrożeniu (#1).
- **#6 RODO retencja + PESEL** — ✅ GOTOWE.
- **#7 Banner cookies + zgody** — 🔵 W TOKU (przed GA4/Pixel/Ads).
- **#8 VAT u księgowej** — ⚪ akcja klienta (mail/opinia: art. 113 + 240k + czynności notarialne).

### #3 — co dodano (regulamin/polityka, PL/EN/UA + Word)
- Renderer `src/components/LegalDocument.tsx` (data-driven, tokeny {{...}} z company/legal). Treść w `messages.ts` pod `legal.privacy` / `legal.terms`. Strony = cienkie serwer-wrappery (metadata).
- Kluczowe klauzule: usługa = „dokumenty wskazane w opisie wybranego pakietu" (BEZ słowa „komplet"); NIE sporządzamy umowy (umowa = tylko wzór w dodatku); brak gwarancji eksmisji/egzekucji; brak weryfikacji stanu prawnego lokalu/tytułu właściciela; prawo odmowy realizacji (naruszenie prawa); charakter techniczno-organizacyjny + „nie jesteśmy stroną najmu"; utracone korzyści wyłączone **tylko B2B** (nie konsument — ryzyko abuzywności); ODR usunięte (wygaszone VII 2025) → Inspekcja Handlowa/rzecznik; PESEL z wyjątkiem na roszczenia; kopie zapasowe; klauzula zmian; cookies (`lang`, sesyjne, `admin-token`); transfer USA (Resend, SCC/DPF).
- **Word dla prawnika**: `dokumenty-prawne\{Regulamin_ZoFiHel, Polityka-prywatnosci_ZoFiHel, Opis-serwisu_dla-prawnika}.docx`. Generatory: `scripts/build-legal-docx.js`, `scripts/build-brief-docx.js` (czytają treść z `messages.ts` i wersje z `legal.ts` — zawsze zgodne ze stroną). Regen: `node scripts/build-legal-docx.js && node scripts/build-brief-docx.js` (wymaga `npm i -g docx`).

### #4 — Przelewy24 sandbox (zweryfikowane w boju)
- Dane sandbox w `.env`: `P24_MERCHANT_ID=400807`, `P24_POS_ID=400807`, `P24_CRC`, `P24_API_KEY` (= „klucz do raportów"). `P24_SANDBOX=true`, `P24_MOCK_VERIFY=false`.
- **Mock weryfikacji** `P24_MOCK_VERIFY` w `src/lib/przelewy24.ts` — działa TYLKO `NODE_ENV!=production` (do testu lokalnego bez konta).
- Test lokalny webhooka: `scripts/test-webhook-p24.js` (11/11 — happy/idempotencja/404/400 podpis/400 kwota; sam sprząta rejestr). Tunel do realnego testu: cloudflared (`C:\Users\barto\cloudflared.exe`, pobrany; uruchom `cloudflared tunnel --url http://localhost:3000`, ustaw `NEXT_PUBLIC_APP_URL` na adres .trycloudflare.com, restart dev).

### #5 — faktury: zweryfikowane PDF + integracja maili
- PDF (faktura zw/23%, rachunek) obejrzane — poprawne. Nazwa usługi bez „komplet". `SERVICE_NAME` w `seller.ts`.
- **Mail po płatności (webhook)**: do KLIENTA rachunek/faktura PDF (`sendInvoiceEmail`); do WŁAŚCICIELA (`EMAIL_TO`) rozbudowany `buildOrderAdminHtml` (eksport z `email.ts`): **termin realizacji** (SLA wg pakietu/ekspres + orientacyjna data), pełne dane klienta (+flag PESEL), **lista dokumentów do przygotowania** wg pakietu/dodatków, zakres, dostawa. Dev-podgląd: `GET /api/dev/order-mail-preview?orderId=` (404 w prod).
- Realna wysyłka wymaga `RESEND_API_KEY` + weryfikacji domeny w Resend (→ #1).

### #6 — RODO retencja (zweryfikowane, test 9/9)
- `src/lib/retention.ts`: `RETENTION` (peselDays=30, minimizeDays=730, accountingYears=5 — tunable, do potw. z prawnikiem), `retentionUpdatesFor()`, `scrubPeselUpdates()`.
- `/api/cron/retention` (chronione `CRON_SECRET`) — kasuje PESEL po realizacji, minimalizuje dane realizacyjne, pełna anonimizacja po 5 latach. Test: `scripts/test-retention.js` (9/9).
- Panel admina: przycisk **„Oznacz zrealizowane"** → natychmiastowe kasowanie PESEL; API `/api/admin/order-status` (guard admin-token); kolumna „RODO / Akcje" + status PESEL. Typy: `peselDeletedAt/dataMinimizedAt/fullyAnonymizedAt`. Cron w `vercel.json`.

### Skrypty pomocnicze (dev)
`scripts/`: `test-webhook-p24.js`, `test-retention.js`, `build-legal-docx.js`, `build-brief-docx.js`, `legal-data-pl.js`, `build-brief-docx.js`. Dev-routy (404 w prod): `/api/faktura-podglad`, `/api/dev/order-mail-preview`.

**Wznowienie:** „Przeczytaj HANDOFF_SESJA.md (AKTUALIZACJA 3) i kontynuuj #7 — banner cookies".

---

## 🆕 AKTUALIZACJA 4 (NAJNOWSZA) — WDROŻENIE NA PRODUKCJĘ + podłączanie płatności P24

> Wszystkie zadania #2–#8 zamknięte. Trwa #1 (wdrożenie). P24 dało zielone światło na konto produkcyjne.

### Co zrobione (serwer Hostinger VPS)
- **Kod wdrożony:** GitHub `origin/main` (HardBart/najem-okazjonalny) → na serwerze `/var/www/najemokazjonalny24`: `git pull` + `npm ci` + `npm run build` + `pm2 reload najemokazjonalny24`. Build OK.
- **WAŻNE — porty:** aplikacja najem działa na **porcie 3002** (pm2 `najemokazjonalny24`). Port **3000 zajmuje sąsiednia apka sprzeciwnakaz** — NIE mylić. (`ecosystem.config.js` w repo ma błędnie 3000 — do poprawienia na 3002 dla zgodności, niekrytyczne.)
- **Brama dostępu (soft-launch):** strona za **HTTP Basic Auth** (login `demo` / hasło `demo123`, plik `/etc/nginx/.htpasswd-najem`). Zastąpiła tryb „w budowie". Config: `/etc/nginx/sites-available/najemokazjonalny24.com` (kopie: `.bak` = stary maintenance, `.bak2` = wersja tylko-auth). `proxy_pass` → **127.0.0.1:3002**.
- **Webhook P24 odsłonięty:** w nginx dodany `location = /api/przelewy24/notify` BEZ auth_basic (P24 musi się dodzwonić mimo bramy). Reszta strony dalej za hasłem. Zweryfikowane: webhook → 405 (bez 401), strona → 401. ✅
- `NEXT_PUBLIC_APP_URL=https://najemokazjonalny24.com` w `.env` na serwerze (potwierdzone) — urlReturn/urlStatus poprawne, bez potrzeby rebuildu przy zmianie kluczy P24 (P24_* to zmienne runtime).

### Decyzje klienta (ta sesja)
- **Soft-launch za bramą** (NIE pełne otwarcie) — najpierw realny test płatności produkcyjnej za `demo`/`demo123`.
- **Maile (Resend) na razie OFF** — płatność działa, dokument się wystawia i jest w panelu admina, ale klient nie dostaje maila (tylko log). Resend dopinamy później.

### ⏯️ RESUME POINT (wieczorem) — KROK 2 w toku
Na serwerze, w `/var/www/najemokazjonalny24`, wpisać produkcyjne dane P24 do `.env` (klient ma je z panel.przelewy24.pl):
```
sed -i 's|^P24_MERCHANT_ID=.*|P24_MERCHANT_ID=...|' .env
sed -i 's|^P24_POS_ID=.*|P24_POS_ID=...|' .env
sed -i 's|^P24_CRC=.*|P24_CRC=...|' .env
sed -i 's|^P24_API_KEY=.*|P24_API_KEY=...|' .env
sed -i 's|^P24_SANDBOX=.*|P24_SANDBOX=false|' .env
```
weryfikacja (masko­wana): `awk -F= '/^P24_/{v=$2; if(length(v)>6) v=substr(v,1,4)"…("length($2)")"; print $1"="v}' .env`
potem: `pm2 reload najemokazjonalny24` (NIE trzeba rebuildu — P24_* są runtime, NEXT_PUBLIC_APP_URL już OK).

### KROK 3 (po KROKU 2) — test realnej płatności
- W panelu P24 (produkcja) ustawić/potwierdzić **adres powiadomień (urlStatus): `https://najemokazjonalny24.com/api/przelewy24/notify`**.
- Złożyć realne testowe zamówienie (wejście przez bramę `demo`/`demo123` → `/zamowienie` → płatność) → sprawdzić: webhook → status `completed`, dokument w panelu `/admin`, `p24TransactionId` zapisany.
- (Opcjonalnie po teście) wyzerować serwerowy `data/invoice-registry.json`, żeby pierwszy realny klient dostał numer 1 — UWAGA: nie kasować, jeśli będą tam już realne zamówienia.

### DO PEŁNEGO OTWARCIA (później, gdy gotowy)
- **Maile:** `RESEND_API_KEY` + weryfikacja domeny w Resend (SPF/DKIM) + DPA + certyfikacja DPF (wymóg prawnika).
- **Crony na VPS** (`crontab -e`): `/api/cron/reminders` i `/api/cron/retention` (z `CRON_SECRET`).
- **logrotate** logów ≤30 dni.
- **Sekrety produkcyjne** w `.env`: mocny `JWT_SECRET`, `ADMIN_PASSWORD_HASH`, `CRON_SECRET`.
- **Podpis prawnika** pod dokumentami (Wordy w `dokumenty-prawne/`).
- **Zdjęcie bramy** `demo`/`demo123`: usunąć 3 linie `auth_basic`/`auth_basic_user_file` z `location /` (webhook-location zostawić bez zmian) → `nginx -t` → `systemctl reload nginx`.

**Wznowienie:** „Przeczytaj HANDOFF_SESJA.md (AKTUALIZACJA 4) — wracamy do KROKU 2: wpisanie produkcyjnych P24 do .env + reload, potem test płatności".
