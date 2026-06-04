# Instrukcja wdrożenia na Hostinger

Szczegółowa instrukcja krok po kroku jak wdrożyć aplikację Najem Okazjonalny na Hostinger.

## 📋 Przygotowanie

### Co będzie potrzebne:

1. ✅ Konto Hostinger z planem Node.js lub VPS
2. ✅ Konto GitHub/GitLab/Bitbucket
3. ✅ Konto PayU (sandbox do testów, produkcyjne do wdrożenia)
4. ✅ Domena (można kupić w Hostinger lub podłączyć zewnętrzną)

## 🚀 Metoda 1: Hostinger Node.js Hosting (Zalecana)

### Krok 1: Przygotowanie repozytorium

1. Zaloguj się na GitHub.com
2. Kliknij **New repository**
3. Nazwa: `najem-okazjonalny`
4. Ustaw jako **Private**
5. Kliknij **Create repository**

### Krok 2: Upload kodu do GitHub

Otwórz terminal w folderze projektu:

```bash
cd "C:\Users\barto\Desktop\najem okazjonalny"

# Inicjalizacja Git
git init

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "Initial commit: Najem Okazjonalny"

# Połącz z GitHub (zamień na swój link)
git remote add origin https://github.com/TWOJ_USERNAME/najem-okazjonalny.git

# Wyślij kod
git branch -M main
git push -u origin main
```

### Krok 3: Konfiguracja w Hostinger

1. Zaloguj się do panelu Hostinger: [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Przejdź do **Hosting → Node.js**
3. Kliknij **Create Application**

### Krok 4: Wypełnienie formularza aplikacji

**Application Details:**
- **Application name**: `najem-okazjonalny`
- **Node.js version**: Wybierz `18.x` lub nowszą
- **Application mode**: `Production`

**Git Repository:**
- **Repository URL**: Wklej link do swojego repozytorium GitHub
- **Branch**: `main`
- **Deploy Token**: Wygeneruj token na GitHub (Settings → Developer settings → Personal access tokens)

**Build Configuration:**
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Krok 5: Konfiguracja zmiennych środowiskowych

W sekcji **Environment Variables** dodaj wszystkie zmienne z `.env.example`:

```
NEXT_PUBLIC_APP_URL=https://twojadomena.pl
NODE_ENV=production

ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=[wygeneruj hash hasła]
JWT_SECRET=[wygeneruj losowy string]

PAYU_POS_ID=[z konta PayU]
PAYU_SECOND_KEY=[z konta PayU]
PAYU_CLIENT_ID=[z konta PayU]
PAYU_CLIENT_SECRET=[z konta PayU]
PAYU_API_URL=https://secure.snd.payu.com

NEXT_PUBLIC_PHONE=+48 123 456 789
NEXT_PUBLIC_EMAIL=kontakt@twojadomena.pl
NEXT_PUBLIC_WHATSAPP=48123456789
```

**Jak wygenerować ADMIN_PASSWORD_HASH:**

Lokalnie uruchom:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('TWOJE_HASLO', 10));"
```

**Jak wygenerować JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Krok 6: Deploy

1. Kliknij **Create & Deploy**
2. Poczekaj na zakończenie procesu (3-5 minut)
3. Po zakończeniu zobaczysz URL aplikacji (np. `najem-okazjonalny.hostinger.app`)

### Krok 7: Podłączenie domeny

1. W panelu Hostinger przejdź do **Domeny**
2. Jeśli masz domenę:
   - Kliknij **Manage**
   - Przejdź do **DNS Zone**
   - Dodaj/edytuj **A Record**:
     - Type: `A`
     - Name: `@`
     - Value: `[IP z Node.js hosting]`
   - Dodaj **CNAME** dla `www`:
     - Type: `CNAME`
     - Name: `www`
     - Value: `@`

3. W aplikacji Node.js:
   - Przejdź do **Settings → Domains**
   - Kliknij **Add Domain**
   - Wpisz swoją domenę
   - Kliknij **Add**

### Krok 8: Konfiguracja SSL

1. W aplikacji Node.js przejdź do **SSL/TLS**
2. Kliknij **Enable SSL**
3. Wybierz **Let's Encrypt** (darmowy)
4. Poczekaj na wygenerowanie certyfikatu (2-5 minut)

### Krok 9: Weryfikacja

1. Otwórz swoją domenę w przeglądarce
2. Sprawdź czy strona działa
3. Przetestuj:
   - Formularz kontaktowy
   - Formularz zamówienia
   - Panel admina (`/admin`)
   - Płatności PayU (sandbox)

## 🔧 Metoda 2: Hostinger VPS (Zaawansowana)

### Krok 1: Konfiguracja VPS

1. Zaloguj się do panelu Hostinger
2. Przejdź do **VPS**
3. Połącz się przez SSH

### Krok 2: Instalacja Node.js

```bash
# Aktualizacja systemu
sudo apt update && sudo apt upgrade -y

# Instalacja Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Weryfikacja
node --version
npm --version
```

### Krok 3: Instalacja Git

```bash
sudo apt install git -y
```

### Krok 4: Klonowanie projektu

```bash
cd /var/www
sudo git clone https://github.com/TWOJ_USERNAME/najem-okazjonalny.git
cd najem-okazjonalny
sudo chown -R $USER:$USER /var/www/najem-okazjonalny
```

### Krok 5: Instalacja zależności

```bash
npm install
```

### Krok 6: Konfiguracja .env

```bash
nano .env
```

Wklej wszystkie zmienne środowiskowe:

```env
NEXT_PUBLIC_APP_URL=https://twojadomena.pl
NODE_ENV=production
# ... pozostałe zmienne
```

Zapisz: `Ctrl + O`, Enter, `Ctrl + X`

### Krok 7: Build aplikacji

```bash
npm run build
```

### Krok 8: Instalacja PM2

```bash
sudo npm install -g pm2
```

### Krok 9: Uruchomienie aplikacji

```bash
pm2 start npm --name "najem-okazjonalny" -- start
pm2 save
pm2 startup
```

Skopiuj i uruchom komendę, którą wyświetli `pm2 startup`.

### Krok 10: Instalacja Nginx

```bash
sudo apt install nginx -y
```

### Krok 11: Konfiguracja Nginx

```bash
sudo nano /etc/nginx/sites-available/najem-okazjonalny
```

Wklej:

```nginx
server {
    listen 80;
    server_name twojadomena.pl www.twojadomena.pl;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktywuj konfigurację:

```bash
sudo ln -s /etc/nginx/sites-available/najem-okazjonalny /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Krok 12: Konfiguracja SSL

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d twojadomena.pl -d www.twojadomena.pl
```

Postępuj zgodnie z instrukcjami (podaj email, zaakceptuj ToS).

### Krok 13: Automatyczne odnawianie SSL

```bash
sudo certbot renew --dry-run
```

## 🔄 Aktualizacja aplikacji

### Hostinger Node.js Hosting

Zmiany wdrażają się automatycznie po:

```bash
git add .
git commit -m "Update: opis zmian"
git push
```

### VPS

```bash
cd /var/www/najem-okazjonalny
git pull
npm install
npm run build
pm2 restart najem-okazjonalny
```

## 🔐 Konfiguracja PayU Production

### Krok 1: Aktywacja konta produkcyjnego PayU

1. Zaloguj się na [payu.pl](https://payu.pl)
2. Przejdź proces weryfikacji firmy
3. Aktywuj płatności produkcyjne

### Krok 2: Pobranie danych dostępowych

1. Przejdź do **Konfiguracja → Punkty płatności**
2. Skopiuj:
   - POS ID
   - Second Key (MD5)
3. Przejdź do **Konfiguracja → OAuth**
4. Skopiuj:
   - Client ID
   - Client Secret

### Krok 3: Konfiguracja notyfikacji

1. W panelu PayU przejdź do **Konfiguracja → Punkty płatności**
2. Ustaw **Adres powiadomień**:
   ```
   https://twojadomena.pl/api/payu/notify
   ```
3. Zapisz

### Krok 4: Aktualizacja zmiennych środowiskowych

W panelu Hostinger lub w pliku `.env` na VPS:

```env
# Zmień na production
PAYU_API_URL=https://secure.payu.com

# Wklej dane produkcyjne
PAYU_POS_ID=[production POS ID]
PAYU_SECOND_KEY=[production Second Key]
PAYU_CLIENT_ID=[production Client ID]
PAYU_CLIENT_SECRET=[production Client Secret]
```

### Krok 5: Restart aplikacji

**Node.js Hosting**: Automatyczny restart
**VPS**: `pm2 restart najem-okazjonalny`

## ✅ Checklist przed uruchomieniem produkcyjnym

- [ ] Zmienione hasło admina
- [ ] Wygenerowany nowy JWT_SECRET
- [ ] Skonfigurowane produkcyjne dane PayU
- [ ] Dodane prawne dane firmy w stronach prawnych
- [ ] Zaktualizowane dane kontaktowe
- [ ] Włączony SSL (HTTPS)
- [ ] Przetestowane wszystkie formularze
- [ ] Przetestowana płatność PayU
- [ ] Sprawdzony panel admina
- [ ] Skonfigurowane kopie zapasowe `data/orders.json`
- [ ] Sprawdzone logowanie błędów
- [ ] Google Analytics/Tag Manager (opcjonalnie)

## 🐛 Troubleshooting

### Aplikacja nie startuje

```bash
# Sprawdź logi
pm2 logs najem-okazjonalny

# Restart
pm2 restart najem-okazjonalny
```

### Błąd 502 Bad Gateway

```bash
# Sprawdź czy aplikacja działa
pm2 status

# Sprawdź nginx
sudo nginx -t
sudo systemctl status nginx
```

### PayU błąd połączenia

- Sprawdź czy `PAYU_API_URL` jest poprawny
- Sprawdź czy dane dostępowe są produkcyjne (jeśli wdrożenie produkcyjne)
- Sprawdź logi aplikacji

### Brak dostępu do panelu admina

- Sprawdź czy `ADMIN_PASSWORD_HASH` jest poprawnie wygenerowany
- Wyczyść cookies przeglądarki
- Sprawdź `JWT_SECRET`

## 📞 Wsparcie Hostinger

- Live Chat: dostępny w panelu Hostinger 24/7
- Email: support@hostinger.com
- Baza wiedzy: [support.hostinger.com](https://support.hostinger.com)

---

**Powodzenia z wdrożeniem!** 🚀
