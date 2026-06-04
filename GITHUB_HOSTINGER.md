# 🟢 Najprostsze wdrożenie: GitHub → Hostinger (Coolify)

Hostinger VPS ma gotowy szablon **Coolify** — to self-hostowany odpowiednik Vercela:
podpinasz repo z GitHub, a Coolify **sam buduje, uruchamia, daje SSL i obsługuje zmienne**.
Po wstępnej konfiguracji kolejne wdrożenia to jedno `git push`.

---

## Krok 1 — Wrzuć projekt na GitHub (z komputera)

W folderze projektu (`C:\Users\barto\Desktop\najem okazjonalny`) repozytorium git jest już
zainicjowane z pierwszym commitem. Teraz utwórz repo na GitHub i wypchnij kod:

1. Wejdź na https://github.com/new → nazwa np. `najem-okazjonalny` → **Private** → Create.
2. W terminalu (PowerShell) w folderze projektu:
```powershell
git remote add origin https://github.com/TWOJ_LOGIN/najem-okazjonalny.git
git branch -M main
git push -u origin main
```
> `.env` NIE trafi na GitHub (jest w `.gitignore`) — sekrety są bezpieczne. Wpiszesz je w Coolify.

---

## Krok 2 — Coolify na Hostinger VPS

1. Hostinger hPanel → VPS → **Operating System / Templates** → wybierz szablon **Coolify**
   (albo, jeśli już masz system, zainstaluj Coolify komendą z coolify.io).
2. Otwórz panel Coolify (adres: `http://IP_VPS:8000`) i dokończ konfigurację startową.
3. **Sources** → połącz konto **GitHub** (GitHub App) i daj dostęp do repo `najem-okazjonalny`.

---

## Krok 3 — Nowa aplikacja w Coolify

1. **+ New** → **Application** → źródło: GitHub → repo `najem-okazjonalny`, branch `main`.
2. **Build Pack:** wybierz **Dockerfile** (jest w repo) — albo zostaw **Nixpacks** (Coolify sam
   wykryje Next.js). Oba zadziałają.
3. **Port:** `3000`.
4. **Domains:** wpisz `https://najemokazjonalny24.com` (i `www`). Coolify wystawi SSL automatycznie.
   W DNS domeny ustaw rekord **A → IP VPS** (oraz `www`).

---

## Krok 4 — Zmienne środowiskowe (Environment Variables)

W zakładce **Environment Variables** dodaj poniższe. Zmienne `NEXT_PUBLIC_*` zaznacz jako
**Build Variable** (są potrzebne podczas budowania), resztę zostaw jako runtime:

```
NEXT_PUBLIC_APP_URL=https://najemokazjonalny24.com   (Build)
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=...        # bcrypt hash nowego hasła
JWT_SECRET=...                 # długi losowy ciąg

P24_SANDBOX=true
P24_MERCHANT_ID=
P24_POS_ID=
P24_CRC=
P24_API_KEY=

RESEND_API_KEY=
EMAIL_FROM=noreply@najemokazjonalny24.com
EMAIL_TO=kontakt@najemokazjonalny24.com

CRON_SECRET=...                # długi losowy ciąg

NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN=        (Build)
INPOST_SANDBOX=true
INPOST_SHIPX_TOKEN=
INPOST_ORGANIZATION_ID=
INPOST_SENDER_NAME=ZoFiHel Rental Sp. z o.o.
INPOST_SENDER_EMAIL=kontakt@najemokazjonalny24.com
INPOST_SENDER_PHONE=

NEXT_PUBLIC_PHONE=+48881244700             (Build)
NEXT_PUBLIC_EMAIL=kontakt@najemokazjonalny24.com   (Build)
NEXT_PUBLIC_WHATSAPP=48881244700           (Build)
```

---

## Krok 5 — Trwały dysk na zamówienia (WAŻNE)

Zamówienia zapisują się do pliku `data/orders.json`. W kontenerze trzeba podpiąć **trwały wolumen**,
inaczej dane przepadną przy każdym wdrożeniu:

- Coolify → aplikacja → **Storages / Persistent Storage** → dodaj:
  **Mount Path:** `/app/data`

> Docelowo i tak warto przejść na bazę danych (backupy, skala) — `StorageService` ma te same
> metody, więc podmiana będzie punktowa.

---

## Krok 6 — Deploy

Kliknij **Deploy**. Coolify zbuduje obraz i uruchomi aplikację. Po chwili strona będzie pod
`https://najemokazjonalny24.com` z certyfikatem SSL.

Kolejne aktualizacje: `git push` → Coolify zbuduje i wdroży automatycznie (jeśli włączysz auto-deploy).

---

## Krok 7 — Cron przypomnień (po roku)

Coolify → **Scheduled Tasks** (lub osobny „Cron job"): codziennie 9:00, komenda:
```
curl -s -H "Authorization: Bearer TWOJ_CRON_SECRET" https://najemokazjonalny24.com/api/cron/reminders
```

---

## Krok 8 — P24 i InPost (po wdrożeniu)

- **Przelewy24:** w panelu P24 ustaw URL powiadomień:
  `https://najemokazjonalny24.com/api/przelewy24/notify`. Testuj w sandbox (`P24_SANDBOX=true`),
  potem przełącz na `false` i ponownie deploy.
- **InPost:** wpisz token Geowidget (mapa paczkomatów) + dane ShipX (token, ID organizacji, nadawca).

---

## ✅ Test po wdrożeniu
- Strona, blog, `/zamowienie` ładują się przez HTTPS.
- Testowe zamówienie (P24 sandbox) → bramka płatności → e-mail potwierdzający.
- `/admin` pokazuje zamówienia (po opłaceniu zapisane na trwałym dysku).

> Pełna ścieżka „ręczna" (Node + PM2 + nginx, bez Coolify) jest w `DEPLOYMENT_VPS.md`.
