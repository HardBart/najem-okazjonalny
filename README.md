# Najem Okazjonalny - Profesjonalny Serwis Next.js

Nowoczesny, profesjonalny serwis internetowy dla usługi związanej z najmem okazjonalnym w Polsce. Projekt zbudowany z Next.js 15, TypeScript, Tailwind CSS i integracją płatności PayU.

## 🚀 Funkcje

- ✅ Responsywny design (mobile-first)
- ✅ Next.js 15 z App Router
- ✅ TypeScript dla bezpieczeństwa typów
- ✅ Tailwind CSS dla stylizacji
- ✅ Integracja płatności PayU (sandbox + production)
- ✅ Panel administracyjny z autentykacją
- ✅ Formularze kontaktowe i zamówień
- ✅ Strony prawne (polityka prywatności, RODO, regulamin)
- ✅ SEO optimized
- ✅ Eksport danych do CSV
- ✅ Bezpieczne przechowywanie zamówień

## 📋 Wymagania

- Node.js 18.17 lub nowszy
- npm lub yarn
- Konto PayU (sandbox do testów, produkcyjne do wdrożenia)

## 🛠️ Instalacja lokalna

### 1. Klonowanie repozytorium

```bash
cd "C:\Users\barto\Desktop\najem okazjonalny"
```

### 2. Instalacja zależności

```bash
npm install
```

### 3. Konfiguracja zmiennych środowiskowych

Skopiuj plik `.env.example` i utwórz `.env`:

```bash
copy .env.example .env
```

Następnie edytuj plik `.env` i uzupełnij wartości:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Admin Credentials
ADMIN_USERNAME=admin
# Wygeneruj hash hasła:
# node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('twoje-haslo', 10));"
ADMIN_PASSWORD_HASH=$2a$10$YourHashedPasswordHere

# JWT Secret
# Wygeneruj: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-secret-key-change-this-in-production

# PayU Sandbox (do testów)
PAYU_POS_ID=your-sandbox-pos-id
PAYU_SECOND_KEY=your-sandbox-second-key
PAYU_CLIENT_ID=your-sandbox-client-id
PAYU_CLIENT_SECRET=your-sandbox-client-secret
PAYU_API_URL=https://secure.snd.payu.com

# Contact Information
NEXT_PUBLIC_PHONE=+48 123 456 789
NEXT_PUBLIC_EMAIL=kontakt@twojadomena.pl
NEXT_PUBLIC_WHATSAPP=48123456789
```

### 4. Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

### 5. Build produkcyjny

```bash
npm run build
npm start
```

## 🔐 Konfiguracja PayU

### PayU Sandbox (testowanie)

1. Zarejestruj się na [sandbox.payu.com](https://www.payu.pl/jak-zaczac-jak-rozwiazanie-platnosci-sandbox)
2. Uzyskaj dane dostępowe (POS ID, Second Key, Client ID, Client Secret)
3. Wpisz je do pliku `.env`
4. Użyj testowych kart kredytowych dostępnych w dokumentacji PayU

### PayU Production

1. Załóż konto produkcyjne w PayU
2. Przejdź proces weryfikacji
3. Uzyskaj dane dostępowe produkcyjne
4. Zamień w `.env` dane sandbox na produkcyjne
5. Zmień `PAYU_API_URL` na `https://secure.payu.com`

## 👤 Panel Admina

Panel administracyjny dostępny pod adresem: `/admin`

**Domyślne dane logowania (ZMIEŃ!)**:
- Login: `admin`
- Hasło: `admin`

### Jak zmienić hasło admina:

1. Wygeneruj hash hasła:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('nowe-haslo', 10));"
```

2. Wklej wygenerowany hash do `.env`:
```env
ADMIN_PASSWORD_HASH=$2a$10$wygenerowany_hash
```

## 📁 Struktura projektu

```
najem-okazjonalny/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Panel admina
│   │   ├── api/               # API routes
│   │   ├── platnosc/          # Strona sukcesu płatności
│   │   ├── zamowienie/        # Formularz zamówienia
│   │   ├── polityka-prywatnosci/
│   │   ├── regulamin/
│   │   ├── rodo/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Strona główna
│   │   └── globals.css        # Global styles
│   ├── components/            # React komponenty
│   ├── lib/                   # Utility functions, PayU, storage
│   └── types/                 # TypeScript types
├── public/                    # Pliki statyczne
├── data/                      # JSON storage dla zamówień
├── .env                       # Zmienne środowiskowe (nie commituj!)
├── .env.example               # Przykład zmiennych
└── README.md                  # Ten plik
```

## 🌐 Wdrożenie na Hostinger

### Wymagania Hostinger

- **Hosting Node.js** lub **Hosting VPS**
- Node.js 18+
- Git zainstalowany na serwerze

### Krok 1: Przygotowanie repozytorium

1. Utwórz repozytorium Git (GitHub, GitLab, Bitbucket)
2. Dodaj wszystkie pliki do repozytorium (UWAGA: `.env` NIE powinien być w repozytorium!)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/twoj-username/najem-okazjonalny.git
git push -u origin main
```

### Krok 2: Konfiguracja Hostinger

#### Opcja A: Hosting Node.js (Łatwiejsza)

1. Zaloguj się do panelu Hostinger
2. Przejdź do **Hosting → Node.js**
3. Kliknij **Create Application**
4. Wypełnij dane:
   - **Application name**: najem-okazjonalny
   - **Node.js version**: 18.x lub nowsza
   - **Application mode**: Production
   - **Repository**: Link do Twojego repozytorium
   - **Branch**: main
5. Skonfiguruj zmienne środowiskowe w panelu (wszystkie z `.env.example`)
6. Kliknij **Deploy**

#### Opcja B: VPS (Bardziej zaawansowana)

SSH do serwera:

```bash
ssh root@your-vps-ip
```

Instalacja Node.js i npm:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Klonowanie repozytorium:

```bash
cd /var/www
git clone https://github.com/twoj-username/najem-okazjonalny.git
cd najem-okazjonalny
```

Instalacja zależności:

```bash
npm install
```

Tworzenie pliku `.env`:

```bash
nano .env
# Wklej wszystkie zmienne środowiskowe
```

Build produkcyjny:

```bash
npm run build
```

Instalacja PM2 (process manager):

```bash
npm install -g pm2
```

Uruchomienie aplikacji:

```bash
pm2 start npm --name "najem-okazjonalny" -- start
pm2 save
pm2 startup
```

### Krok 3: Konfiguracja domeny

1. W panelu Hostinger przejdź do **Domeny**
2. Dodaj swoją domenę lub subdomenę
3. Ustaw A record na IP serwera VPS lub skonfiguruj zgodnie z instrukcjami Node.js hostingu
4. Zaktualizuj `NEXT_PUBLIC_APP_URL` w `.env` na swoją domenę

### Krok 4: Konfiguracja HTTPS

Hostinger automatycznie instaluje certyfikat SSL Let's Encrypt. Jeśli używasz VPS:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d twojadomena.pl -d www.twojadomena.pl
```

### Krok 5: Konfiguracja Nginx (VPS)

```bash
sudo nano /etc/nginx/sites-available/najem-okazjonalny
```

Wklej konfigurację:

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

## 🔄 Aktualizacja aplikacji

### Na Hostinger Node.js Hosting

Zmiany automatycznie wdrażają się po pushu do repozytorium.

### Na VPS

```bash
cd /var/www/najem-okazjonalny
git pull
npm install
npm run build
pm2 restart najem-okazjonalny
```

## 📊 Monitoring zamówień

Wszystkie zamówienia zapisywane są w pliku `data/orders.json`.

**WAŻNE**:
- Regularnie twórz kopie zapasowe tego pliku
- Ogranicz dostęp do katalogu `data/` na serwerze
- W produkcji rozważ użycie bazy danych (MongoDB, PostgreSQL)

## 🔒 Bezpieczeństwo

- ✅ Wszystkie hasła są hashowane (bcrypt)
- ✅ JWT dla sesji admina
- ✅ Walidacja formularzy (zod)
- ✅ Sanityzacja inputów
- ✅ HTTPS wymaga certyfikat SSL
- ✅ Weryfikacja podpisu PayU webhook

**Przed wdrożeniem produkcyjnym:**
1. Zmień wszystkie domyślne hasła
2. Wygeneruj nowy JWT_SECRET
3. Skonfiguruj produkcyjne dane PayU
4. Ogranicz dostęp do `/admin`
5. Włącz rate limiting (np. nginx)
6. Regularnie aktualizuj zależności npm

## 📝 Najczęstsze problemy

### PayU błąd autentykacji
- Sprawdź czy dane PayU są poprawne
- Sprawdź czy używasz właściwego API URL (sandbox vs production)

### Błąd podczas budowania
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Port 3000 jest zajęty
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📞 Wsparcie

W razie problemów skontaktuj się:
- Email: kontakt@twojadomena.pl
- GitHub Issues: [link do repozytorium]

## 📄 Licencja

Projekt prywatny. Wszelkie prawa zastrzeżone.

---

**Ważne uwagi prawne:**
- Uzupełnij strony prawne danymi swojej firmy
- Zaktualizuj dane kontaktowe w całym projekcie
- Skonsultuj teksty prawne z prawnikiem
- Zarejestruj przetwarzanie danych w UODO jeśli wymagane
