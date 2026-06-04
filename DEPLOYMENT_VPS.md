# 🚀 Wdrożenie na Hostinger VPS (Next.js + Node + PM2 + nginx)

Przewodnik krok po kroku. Zakłada VPS z **Ubuntu 22.04** i dostęp przez SSH.
Komendy wykonujesz na serwerze (po `ssh root@TWOJE_IP`), chyba że zaznaczono inaczej.

> Kolejność: **najpierw deploy (ten dokument), potem wpięcie kluczy P24/InPost** — bo ich
> powiadomienia (webhooki) wymagają publicznego adresu HTTPS.

---

## 0. Zanim zaczniesz
- IP Twojego VPS (panel Hostinger → VPS → Overview).
- Dostęp SSH (login `root` + hasło lub klucz).
- W DNS domeny `najemokazjonalny24.com` ustaw rekord **A → IP VPS** (oraz `www` A → to samo IP).
  Jeśli domena jest w Hostinger: hPanel → Domeny → DNS / Strefa DNS.

---

## 1. Aktualizacja i pakiety bazowe
```bash
apt update && apt upgrade -y
apt install -y git nginx
```

## 2. Node.js 20 + PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
node -v   # powinno pokazać v20.x
```

## 3. Wgranie kodu na serwer
**Opcja A (zalecana) — przez GitHub:**
```bash
# najpierw wypchnij projekt do prywatnego repo na GitHub (z komputera lokalnego),
# potem na serwerze:
mkdir -p /var/www && cd /var/www
git clone https://github.com/TWOJ_LOGIN/najem-okazjonalny.git najem-okazjonalny
cd najem-okazjonalny
```

**Opcja B — upload przez SFTP:**
Programem WinSCP/FileZilla wgraj cały folder projektu (BEZ `node_modules` i `.next`)
do `/var/www/najem-okazjonalny`.

## 4. Plik `.env` z danymi produkcyjnymi
⚠️ **Ważne:** zmienne `NEXT_PUBLIC_*` są wstrzykiwane przy `build`, więc `.env` musi istnieć
**przed** krokiem 5. Utwórz go:
```bash
cd /var/www/najem-okazjonalny
nano .env
```
Wklej i uzupełnij (patrz sekcja „Zmienne środowiskowe" na końcu):
```
NEXT_PUBLIC_APP_URL=https://najemokazjonalny24.com
NODE_ENV=production

ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=...        # wygeneruj nowy hash hasła
JWT_SECRET=...                 # długi losowy ciąg

# Przelewy24 (na start sandbox: P24_SANDBOX=true)
P24_SANDBOX=true
P24_MERCHANT_ID=
P24_POS_ID=
P24_CRC=
P24_API_KEY=

# Resend (e-maile)
RESEND_API_KEY=
EMAIL_FROM=noreply@najemokazjonalny24.com
EMAIL_TO=kontakt@najemokazjonalny24.com

# Cron
CRON_SECRET=...               # długi losowy ciąg

# InPost (opcjonalnie)
NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN=
INPOST_SANDBOX=true
INPOST_SHIPX_TOKEN=
INPOST_ORGANIZATION_ID=
INPOST_SENDER_NAME=ZoFiHel Rental Sp. z o.o.
INPOST_SENDER_EMAIL=kontakt@najemokazjonalny24.com
INPOST_SENDER_PHONE=

# Kontakt (publiczne)
NEXT_PUBLIC_PHONE=+48881244700
NEXT_PUBLIC_EMAIL=kontakt@najemokazjonalny24.com
NEXT_PUBLIC_WHATSAPP=48881244700
```
Zapisz: `Ctrl+O`, `Enter`, `Ctrl+X`.

> Nowy hash hasła admina:
> `node -e "console.log(require('bcryptjs').hashSync('TWOJE_HASLO',10))"` (po `npm ci`).

## 5. Instalacja zależności i build
```bash
npm ci
npm run build
```

## 6. Uruchomienie przez PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup        # wykonaj komendę, którą wypisze (autostart po reboot)
pm2 status         # aplikacja "najem-okazjonalny" powinna być online
```
Test lokalny: `curl -I http://127.0.0.1:3000` → powinno zwrócić `200`.

## 7. nginx (reverse proxy)
```bash
cp /var/www/najem-okazjonalny/deploy/nginx.conf.example /etc/nginx/sites-available/najemokazjonalny24.com
ln -s /etc/nginx/sites-available/najemokazjonalny24.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```
Teraz `http://najemokazjonalny24.com` powinno otwierać stronę.

## 8. SSL (HTTPS) — Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d najemokazjonalny24.com -d www.najemokazjonalny24.com
```
Certbot dopisze HTTPS i przekierowanie z http→https. Odnowienie jest automatyczne.

## 9. Cron przypomnień (zamiast vercel.json)
```bash
crontab -e
```
Dodaj linię (codziennie 9:00), podmień CRON_SECRET na ten z `.env`:
```
0 9 * * * curl -s -H "Authorization: Bearer TWOJ_CRON_SECRET" https://najemokazjonalny24.com/api/cron/reminders >/dev/null 2>&1
```

---

## 🔁 Aktualizacja strony (po zmianach w kodzie)
```bash
cd /var/www/najem-okazjonalny
git pull               # lub ponowny upload plików (bez nadpisywania folderu data/)
npm ci
npm run build
pm2 reload najem-okazjonalny
```
> Folder `data/` (zamówienia `orders.json`) NIE jest w repo — nie usuwaj go przy aktualizacji.

---

## 💳 Po wdrożeniu: P24 i InPost
1. **Przelewy24:** w panelu P24 ustaw adres powiadomień (urlStatus):
   `https://najemokazjonalny24.com/api/przelewy24/notify`. Wpisz `P24_*` do `.env`,
   testuj w sandboxie (`P24_SANDBOX=true`), potem `P24_SANDBOX=false` + `npm run build` + `pm2 reload`.
2. **InPost:** wpisz `NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN` (mapa paczkomatów) oraz dane
   ShipX (`INPOST_SHIPX_TOKEN`, `INPOST_ORGANIZATION_ID`, dane nadawcy). Po każdej zmianie
   `NEXT_PUBLIC_*` wykonaj `npm run build` + `pm2 reload`.

## 🗄️ Baza danych (zalecane wkrótce)
Na VPS plik `data/orders.json` przetrwa (trwały dysk), więc start jest możliwy bez bazy.
Dla bezpieczeństwa (backupy, skala) docelowo przejść na bazę — `StorageService` ma te same
metody, więc podmiana jest punktowa.

---

## 🔐 Zmienne środowiskowe — co skąd wziąć
| Zmienna | Źródło |
|---|---|
| `P24_MERCHANT_ID`, `P24_POS_ID`, `P24_CRC`, `P24_API_KEY` | panel Przelewy24 |
| `RESEND_API_KEY` | resend.com (po weryfikacji domeny) |
| `CRON_SECRET` | dowolny długi losowy ciąg |
| `INPOST_*` | panel InPost / ManagerPaczek (ShipX) |
| `ADMIN_PASSWORD_HASH` | `bcryptjs.hashSync()` |
| `JWT_SECRET` | losowy ciąg (np. `openssl rand -hex 32`) |

## ✅ Szybki test po wdrożeniu
- Strona główna, blog, `/zamowienie` ładują się przez HTTPS.
- Złożenie testowego zamówienia (sandbox P24) → przekierowanie do bramki.
- Po opłaceniu (sandbox) przychodzi e-mail potwierdzający i (jeśli skonfigurowany InPost) tworzy się przesyłka.
- `/admin` (login admin) pokazuje zamówienia.
