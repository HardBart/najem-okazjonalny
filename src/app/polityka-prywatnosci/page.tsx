import LegalDocument from '@/components/LegalDocument';

export const metadata = {
  title: 'Polityka Prywatności - Najem Okazjonalny',
  description: 'Zasady przetwarzania i ochrony danych osobowych w serwisie najemokazjonalny24.com.',
  alternates: { canonical: '/polityka-prywatnosci' },
};

export default function PrivacyPolicyPage() {
  return <LegalDocument docKey="legal.privacy" />;
}
