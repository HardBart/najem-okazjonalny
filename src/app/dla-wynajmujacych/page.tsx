import type { Metadata } from 'next';
import LandlordContent from './LandlordContent';

export const metadata: Metadata = {
  title: 'Najem okazjonalny dla wynajmujących — bezpieczny wynajem mieszkania',
  description:
    'Wynajmujesz mieszkanie? Najem okazjonalny chroni właściciela i ułatwia odzyskanie lokalu. Pomagamy skompletować dokumenty od najemcy — szybko i zgodnie z ustawą.',
  alternates: { canonical: '/dla-wynajmujacych' },
  openGraph: {
    title: 'Najem okazjonalny dla wynajmujących',
    description: 'Bezpieczny wynajem mieszkania — pomagamy właścicielom skompletować dokumenty najmu okazjonalnego.',
    type: 'website',
    url: 'https://najemokazjonalny24.com/dla-wynajmujacych',
    siteName: 'Najem Okazjonalny',
  },
};

export default function LandlordPage() {
  return <LandlordContent />;
}
