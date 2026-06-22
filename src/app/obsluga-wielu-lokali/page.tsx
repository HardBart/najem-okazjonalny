import type { Metadata } from 'next';
import InvestorsContent from './InvestorsContent';

export const metadata: Metadata = {
  title: 'Obsługa wielu lokali — najem okazjonalny dla firm i inwestorów',
  description:
    'Zarządzasz wieloma mieszkaniami? Stała obsługa najmu okazjonalnego dla inwestorów, firm, operatorów mieszkań i zarządców nieruchomości. Indywidualna wycena.',
  alternates: { canonical: '/obsluga-wielu-lokali' },
  openGraph: {
    title: 'Obsługa wielu lokali — najem okazjonalny dla firm i inwestorów',
    description: 'Stała obsługa najmu okazjonalnego dla zarządzających wieloma lokalami. Indywidualna wycena.',
    type: 'website',
    url: 'https://najemokazjonalny24.com/obsluga-wielu-lokali',
    siteName: 'Najem Okazjonalny',
  },
};

export default function InvestorsPage() {
  return <InvestorsContent />;
}
