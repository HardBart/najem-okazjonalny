# 📌 STATUS PROJEKTU — Najem Okazjonalny (najemokazjonalny24.com)

**Ostatnia aktualizacja:** 2 czerwca 2026
**Firma:** ZoFiHel Rental Sp. z o.o. · NIP 739-399-72-40 · REGON 527952735 · KRS 0001091757 · ul. Dworcowa 18/45, 10-436 Olsztyn
**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · lucide-react. **Nie zmieniać technologii ani design systemu (navy + gold).**
**Logo:** ikona klucza (`KeyRound`) na granatowym/złotym kwadracie — w Header, Footer, Admin (zamiast dawnego „NO").
**ZASADA: bez doradztwa.** Strona i blog tylko informują; nie zapraszamy do kontaktu „po poradę". Telefon/e-mail wyłącznie do spraw technicznych/zamówień — widoczne tylko w stopce i sekcji Kontakt. CTA wszędzie = „Zamów online". Usunięto: CallbackSection (z home/miast/wynajmujących), pływający WhatsApp, telefon z Header/Hero/StickyCTA/CTABand/Pakiety/FAQ/Kreatora, zwroty „pomożemy dobrać / doradzimy / wolisz porozmawiać" (też w `faqs.ts`, `articleContent.ts`, mailach). Pliki `CallbackSection.tsx`, `WhatsAppButton.tsx`, `SolutionSelector.tsx` pozostają w repo, ale nie są renderowane.

> 👉 **Jak wznowić w nowej sesji:** patrz sekcja „JAK WRÓCIĆ DO PRACY" na końcu.

---

## 🚀 WDROŻENIE PRODUKCYJNE (LIVE — czerwiec 2026)

Strona działa na **Hostinger VPS** (`72.60.18.217`, Ubuntu 24.04, Node v24) OBOK innych stron
(sprzeciwnakaz.pl, panel., stats., spadek — **ich NIE ruszać**).

- **Kod:** GitHub `HardBart/najem-okazjonalny` (public). Na serwerze: `/var/www/najemokazjonalny24`.
- **Proces:** PM2 `najemokazjonalny24`, port **3002** (`pm2 start npm --name najemokazjonalny24 -- start -- -p 3002`; `pm2 save` zrobione).
- **Reverse proxy:** nginx → `/etc/nginx/sites-available/najemokazjonalny24.com` → 127.0.0.1:3002.
- **SSL:** Let's Encrypt (certbot, auto-renew). HTTPS OK.
- **TRYB „W BUDOWIE" (aktywny):** nginx zwraca 503 + `/var/www/maintenance/index.html`.
  - **Podgląd właściciela:** `https://najemokazjonalny24.com/podglad-zofihel` → ustawia ciasteczko `preview=ZOFIHEL2026` → widać prawdziwą stronę.
  - **Zdjęcie „budowy":** w configu nginx usuń linię `if ($cookie_preview != "ZOFIHEL2026") { return 503; }`, potem `nginx -t && systemctl reload nginx`.
- **`.env` na serwerze** (NIE w repo): NEXT_PUBLIC_*, JWT/CRON/ADMIN ustawione. Hasło admina: `lbf82ksv1jp6`.
- **Aktualizacja kodu:** `cd /var/www/najemokazjonalny24 && git pull && npm install && npm run build && pm2 reload najemokazjonalny24`.
- `pm2 startup` — ZROBIONE (autostart po reboot włączony) + `pm2 save`.

### ▶️ NASTĘPNA SESJA — OD CZEGO ZACZĄĆ (kolejność)
1. **Dokumenty do sprzedaży — wersja 1 gotowa, DO PRZEBUDOWY wg uwag klienta** (pliki .docx w `…\najem okazjonalny\Dokumenty najem okazjonalny\`, folder gitignored). **Model sprzedaży: pojedyncze dokumenty, NIE pakiety** (klient tak woli — pominąć sugestie pakietów/cen z ChatGPT).
   - **Wzory klienta (do wykorzystania) wyciągnięte do tekstu:** `C:\Users\barto\Desktop\_t_protokol.txt`, `_t_regulamin.txt`, `_t_umowa.txt` (oryginały: `C:\Bartek\Biznesy\Nieruchomości\Wynajem\Umowy Dworcowa 41\Zofihel\`). UWAGA: umowa klienta to NIE najem okazjonalny — adaptować.
   - **Protokół** (wg wzoru klienta): zostawić DUŻO wolnego miejsca na wyposażenie (NIE wypisywać mebli). Dodać: oświadczenie najemcy o zapoznaniu się ze stanem, sekcję „Zastane uszkodzenia”, klauzulę o prawidłowości odczytów liczników, załącznik „dokumentacja fotograficzna” (liczba zdjęć/data).
   - **Instrukcja US:** format — str. 1 instrukcja, str. 2 wzór; dodać e-Urząd Skarbowy, „wypełnij tylko zaznaczone pola”, checklistę (umowa podpisana / akt notarialny / zgłoszenie wysłane / potwierdzenie zachowane).
   - **Umowa najmu okazjonalnego (mocno rozbudować, 12–15 stron):** kary umowne (klucze/piloty), obowiązek udostępnienia lokalu (awarie/przeglądy), zakaz palenia, zwierzęta TAK/NIE, zakaz podnajmu (jest), doręczenia (e-mail/telefon/skuteczność), zasady wypowiedzenia, rozliczenie mediów (ryczałt/odczyty/termin), zgłaszanie usterek (termin), prace adaptacyjne (wiercenie/malowanie), odpowiedzialność za szkody (zużycie vs zniszczenia), klauzula RODO, komentarz rekomendujący poświadczenie notarialne adresu zastępczego. Wyciągnąć dobre zapisy z `_t_umowa.txt` i `_t_regulamin.txt`.
   - Po przebudowie: weryfikacja prawna + wpięcie dostarczania (załącznik w mailu / link po opłaceniu).
2. **Wrzucić poprawki na żywo:** lokalnie jest commit `f6fabf0` (interpunkcja Hero/sytuacje, generyczne CTA → `#pakiety` zamiast auto-Standard, rozwijane cechy pakietu w `/zamowienie`) — **NIE wypchnięty jeszcze na GitHub**. Trzeba: `git push` → na serwerze `cd /var/www/najemokazjonalny24 && git pull && npm install && npm run build && pm2 reload najemokazjonalny24`.
3. **Konta zewnętrzne:** Przelewy24 (URL powiadomień `…/api/przelewy24/notify`, sandbox→prod), Resend (weryfikacja domeny → maile), InPost (token Geowidget + ShipX). Po wpięciu kluczy do `.env` na serwerze → `npm run build` → `pm2 reload`.
4. **Cron przypomnień** na serwerze: `crontab -e` → `0 9 * * * curl -s -H "Authorization: Bearer <CRON_SECRET z .env>" https://najemokazjonalny24.com/api/cron/reminders`.
5. **Zdjąć tryb „w budowie"** (gdy wszystko przetestowane): w `/etc/nginx/sites-available/najemokazjonalny24.com` usunąć linię `if ($cookie_preview != "ZOFIHEL2026") { return 503; }` → `nginx -t && systemctl reload nginx`.

> ⚠️ Strona jest LIVE pod publiczną domeną (w trybie „w budowie"). Każdą zmianę w kodzie trzeba `git push` + `git pull`+build+`pm2 reload` na serwerze, żeby była widoczna. Lokalne edycje NIE pojawiają się same na produkcji.

---

## ✅ CO JUŻ ZROBIONE

### Strona główna (CRO/UX) — `src/app/page.tsx`
Kolejność sekcji: Hero (problem) → Liczniki → **QuickQuiz** (kreator 30s) → Typowe sytuacje → CTA → Jak to działa → Najczęstsze obawy → Dlaczego nam ufają (+pilność) → Cała Polska (mapa) → CTA → Pakiety → Proces → Opinie → Callback telefoniczny → FAQ (34 pyt.) → O firmie → Kontakt. CTA co 2-3 sekcje, sticky CTA mobile, WhatsApp floating.

### Konwersja i sprzedaż
- **Interaktywny kreator** `QuickQuiz.tsx` — 3 pytania → rekomendacja pakietu + telefon + WhatsApp.
- **Pakiety** `lib/packages.ts` — sprzedają poziom zabezpieczenia, nie obsługę. 4 poziomy, ceny ~10 zł poniżej konkurencji: **Start 289** (podpis profilem zaufanym — decoy) / **Standard 389** (oldPrice 489, notarialne poświadczenie, bestValue) / **Premium 689** (notarialne + ekspres 24h + logistyka) / **Komplet 1019** (pełna obsługa z art. 777 k.p.c., panel „jak to działa"). Punkty konkretne (co klient realnie otrzymuje), bez ogólnych zwrotów marketingowych, doradztwa ani „opiekun/konsultacji". Typ Package: `securityLevel`, `note`, `howItWorks`.
- **Cross-sell** `lib/addons.ts` — checkboxy w `/zamowienie`, **świadome pakietu** (`includedIn` → koszyk ukrywa dodatki już wliczone, czyści wybór przy zmianie pakietu): Wzór umowy (79), Instrukcja US (49), Protokół zdawczo-odbiorczy (39, uniwersalny), Dodatkowe egzemplarze (59), Wysyłka kurierska (39), Ekspres 24h (199). Same dokumenty/szybkość/logistyka — bez doradztwa. Dynamiczny total + kod rabatowy.
- **Sekcje zaufania:** Najczęstsze obawy (`ConcernsSection`), Dlaczego nam ufają + pilność (`TrustReasonsSection`), Callback 15 min (`CallbackSection`).

### Podstrony
- `/dla-wynajmujacych` — dla właścicieli mieszkań.
- `/obsluga-wielu-lokali` — inwestorzy/firmy + formularz wyceny (`QuoteForm` → /api/contact).
- `/najem-okazjonalny` (hub) + `/najem-okazjonalny/[miasto]` — **dynamiczne lokalne SEO, 33 miasta** (`lib/cities.ts`), generateStaticParams + generateMetadata.
- Blog: `/blog` z wyszukiwarką + 6 kategorii. **Wszystkie 50 artykułów opublikowanych** (`lib/articles.ts` + treść w `lib/articleContent.ts`). Pod każdym wpisem CTA + powiązane.
- **System treści bloga:** dynamiczna trasa `/blog/[slug]` zasilana z `lib/articleContent.ts` (model: intro + sekcje + FAQ). Dodanie artykułu = wpis treści + `published:true` w `lib/articles.ts`. Schema Article+FAQPage+Breadcrumb. Stary artykuł „czy-adres..." pozostaje ręcznie kodowany (ma pierwszeństwo).

### SEO
- Schema JSON-LD: Organization, LocalBusiness, FAQPage (home), Article + BreadcrumbList (blog, miasta).
- `sitemap.ts` (wszystkie strony + miasta), `robots.ts`, canonicale, metadataBase, OpenGraph. Domena wszędzie.

### Dokumenty prawne (wg wzoru sprzeciwnakaz, dane ZoFiHel)
- `/regulamin` — §1-12, nasza usługa, **Przelewy24**, prawo odstąpienia, disclaimer.
- `/polityka-prywatnosci` — TL;DR, nasze pola formularza (w tym PESEL), retencja, RODO, Przelewy24.
- `/rodo` — administrator ZoFiHel.
- Wdrożenia z „Do WDROŻENIA": checkbox utraty prawa odstąpienia, przycisk „Zamawiam i płacę", disclaimer pod przyciskiem, **wersjonowanie regulaminu** (`lib/legal.ts` → zapis w zamówieniu), zapis IP+zgód, disclaimer w stopce.

### Płatności — **Przelewy24** (`lib/przelewy24.ts`)
- `registerTransaction` + `verifyTransaction` + weryfikacja podpisu powiadomienia (SHA-384), sandbox/produkcja.
- `/api/orders` rejestruje płatność, `/api/przelewy24/notify` potwierdza i ustawia status.
- Stare pliki PayU usunięte. ⚠️ **Brak danych konta** — w `.env` placeholdery `P24_*`, `P24_SANDBOX=true`.

### E-mail — **Resend** (`lib/email.ts`)
- Potwierdzenie zamówienia na **trwałym nośniku** (klient + admin) po opłaceniu — z ID, datą, zakresem, kwotą, wersją regulaminu, zgodami, disclaimerem.
- Powiadomienie z formularza kontaktowego/wyceny.
- Bez `RESEND_API_KEY` wysyłka jest bezpiecznie pomijana (logowana) — nic nie blokuje.

### Dostawa dokumentów + InPost — `components/DeliverySection.tsx`
- Sekcja „Dostawa dokumentów" w `/zamowienie`, metody zależne od pakietu: Start → e-mail, Standard → paczkomat InPost, Premium → paczkomat lub kurier, Komplet → kurier.
- **Paczkomat:** picker InPost Geowidget v5 (gdy ustawiony `NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN`) + fallback: ręczny kod paczkomatu + link do mapy InPost.
- **Kurier:** dane odbiorcy i adres. Walidacja + zapis w zamówieniu (`Order.delivery`) + w mailu potwierdzającym.
- **InPost ShipX — szkielet gotowy** (`lib/inpost.ts`): tworzenie przesyłki (paczkomat/kurier) wpięte w webhook płatności `/api/przelewy24/notify` (po opłaceniu, w try/catch). Zapis `Order.shipment` (id, tracking). No-op bez konfiguracji. ⚠️ Do uruchomienia: `INPOST_SHIPX_TOKEN`, `INPOST_ORGANIZATION_ID`, dane nadawcy w `.env` + weryfikacja pól payloadu z aktualną dokumentacją ShipX. Pobieranie etykiety PDF: `InpostShipXService.getLabel()`.

### Kampania powrotna (retencja) — `lib/discounts.ts`
- **Przypomnienie po ~roku** (330 dni) + **kod rabatowy POWROT15 (−15%)** na kolejne zamówienie.
- `sendRenewalReminder` (email z kodem i CTA), cron `/api/cron/reminders` (chroniony `CRON_SECRET`), `vercel.json` (codziennie 9:00 UTC).
- Pole kodu w `/zamowienie` (prefill z `?kod=`), walidacja i przeliczenie **po stronie serwera**, zapis `discountCode`/`discountAmount` w zamówieniu. Wysyłka raz na zamówienie (`renewalReminderSentAt`).
- Zmiana % / kodu / timingu = jedna edycja w `lib/discounts.ts`.

### Dokumenty w repo
`AUDYT_BIZNESOWY.md` (ryzyka prawne, plan SEO 12 mies.), `ANALIZA_KONKURENCYJNA.md`, `WORK_SUMMARY.md`, ten plik.

---

## 🔜 CO JESZCZE DO ZROBIENIA (priorytety)

### 🔴 1. Baza danych (NASTĘPNY KROK — uzgodnione)
Zamówienia są w pliku `data/orders.json` (`lib/storage.ts`). **Na produkcji serverless (Vercel) to NIE zadziała** — dane zginą. Do zrobienia:
- Wybór bazy (Vercel Postgres / Supabase / Neon — darmowe progi).
- Przepisać `StorageService` na bazę (te same metody: saveOrder, getOrders, updateOrder, getOrderByOrderId).
- Zachować pole `payuOrderId` (przechowuje token/orderId Przelewy24).

### 🔴 2. Konta i dane produkcyjne (po stronie właściciela)
- **Przelewy24:** rejestracja firmy → wpisać `P24_MERCHANT_ID`, `P24_POS_ID`, `P24_CRC`, `P24_API_KEY` do `.env`, `P24_SANDBOX=false` na produkcji. Ustawić URL powiadomień: `/api/przelewy24/notify`.
- **Resend:** konto + **weryfikacja domeny najemokazjonalny24.com** (rekordy DNS) → wpisać `RESEND_API_KEY`. Skrzynka **kontakt@najemokazjonalny24.com** (EMAIL_TO już ustawione).
- **Domena/hosting:** deploy na Vercel, podpiąć domenę, `NEXT_PUBLIC_APP_URL=https://najemokazjonalny24.com`.

### 🟠 3. Pomiar i lokalne SEO (na starcie)
- Google Search Console (zgłosić sitemap) + GA4 + Google Business Profile (ZoFiHel) + zbieranie realnych opinii.
- ⚠️ `aggregateRating` w schema USUNIĘTE — przywrócić dopiero z realnymi opiniami.

### 🟠 4. Przegląd prawny treści
Regulamin/polityka/RODO + obietnice marketingowe → radca prawny (1-2h). Wzór wiernie odwzorowany, ale finalna akceptacja po stronie prawnika. Liczby „100+ klientów" urealnić (firma od 2024).

### 🟡 5. Domknięcie wytycznych „Do WDROŻENIA"
- Mail z PDF regulaminu danej wersji jako załącznik (teraz wysyłamy wersję tekstowo) — gdy będzie generowanie PDF.
- Umowy powierzenia (DPA) z hostingiem i Resend (art. 28 RODO).
- Rotacja logów ≤30 dni (po wyborze hostingu).

### 🟡 5b. Domknięcie kampanii powrotnej (po DB + Resend + deploy)
- Cron `/api/cron/reminders` działa już z obecnym storage, ale realnie zadziała gdy: jest **Resend** (klucz), jest **CRON_SECRET** (Vercel), i po migracji na **DB** (inaczej skan po pliku nie przetrwa). Po deployu Vercel uruchamia cron automatycznie.
- Opcjonalnie: kody jednorazowe per-klient zamiast wspólnego POWROT15 (wymaga tabeli kodów w DB).

### 🟢 6. Promocja (gdy strona sprzedaje)
- **Blog:** wszystkie 50 artykułów opublikowanych z treścią. Można dopisywać kolejne tematy (model w `lib/articleContent.ts` + wpis w `lib/articles.ts`).
- Uzupełnianie landingów miejskich, linkowanie wewnętrzne, Google Ads na frazy transakcyjne.
- Google Ads na frazy transakcyjne. Opinie Google po realizacji.

---

## 🗂️ MAPA KLUCZOWYCH PLIKÓW
- Dane firmy/liczby: `src/lib/company.ts`
- Pakiety: `src/lib/packages.ts` · Dodatki: `src/lib/addons.ts` · Miasta: `src/lib/cities.ts` · Artykuły: `src/lib/articles.ts`
- FAQ: `src/lib/faqs.ts` · Schema: `src/lib/schema.ts` · Wersje prawne: `src/lib/legal.ts`
- Płatności: `src/lib/przelewy24.ts` · E-mail: `src/lib/email.ts` · Storage: `src/lib/storage.ts`
- API: `src/app/api/orders`, `src/app/api/przelewy24/notify`, `src/app/api/contact`
- Strona główna: `src/app/page.tsx` · Zamówienie: `src/app/zamowienie/page.tsx`

## ⚙️ URUCHOMIENIE LOKALNE
```
cd "C:\Users\barto\Desktop\najem okazjonalny"
npm run dev   →  http://localhost:3000
```
Panel admina: `/admin` (login: admin / hasło: demo123). Type-check: `npx tsc --noEmit`.

---

## ▶️ JAK WRÓCIĆ DO PRACY (następna sesja)

Wpisz w nowej sesji dokładnie:

```
Przeczytaj plik STATUS_PROJEKTU.md z katalogu "najem okazjonalny" na pulpicie i wracamy do pracy. Zaczynamy od bazy danych.
```

(albo krócej: `Wczytaj STATUS_PROJEKTU.md i robimy bazę danych`)
