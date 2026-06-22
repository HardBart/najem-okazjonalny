import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { CookieConsentProvider } from '@/lib/cookie-consent/CookieConsent';
import CookieBanner from '@/components/CookieBanner';
import ConsentScripts from '@/components/ConsentScripts';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://najemokazjonalny24.com'),
  title: 'Najem Okazjonalny - Profesjonalne Wsparcie Prawne i Notarialne',
  description: 'Legalne wsparcie przy najmie okazjonalnym. Udostępnienie adresu, oświadczenie właściciela, obsługa notarialna. Szybko, bezpiecznie, zgodnie z prawem.',
  keywords: 'najem okazjonalny, adres do najmu, oświadczenie właściciela, notariusz, umowa najmu, wynajem mieszkania',
  authors: [{ name: 'Najem Okazjonalny' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Najem Okazjonalny - Profesjonalne Wsparcie Prawne',
    description: 'Legalne wsparcie przy najmie okazjonalnym. Kompleksowa obsługa prawna i notarialna.',
    type: 'website',
    locale: 'pl_PL',
    url: 'https://najemokazjonalny24.com',
    siteName: 'Najem Okazjonalny',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider>
          <CookieConsentProvider>
            {children}
            <CookieBanner />
            <ConsentScripts />
          </CookieConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
