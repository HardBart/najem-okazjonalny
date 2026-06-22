import LegalDocument from '@/components/LegalDocument';

export const metadata = {
  title: 'Regulamin świadczenia usług - Najem Okazjonalny',
  description: 'Regulamin świadczenia usług drogą elektroniczną w serwisie najemokazjonalny24.com.',
  alternates: { canonical: '/regulamin' },
};

export default function TermsPage() {
  return <LegalDocument docKey="legal.terms" />;
}
