'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/lib/cookie-consent/CookieConsent';

/**
 * Ładuje skrypty analityczne/marketingowe WYŁĄCZNIE po wyrażeniu zgody.
 * Obecnie obsługuje Google Analytics 4 (gdy ustawiony NEXT_PUBLIC_GA_ID).
 * Bez ID lub bez zgody — nic nie jest ładowane (zgodnie z polityką cookies).
 */
export default function ConsentScripts() {
  const { consent } = useCookieConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!consent?.analytics || !gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
