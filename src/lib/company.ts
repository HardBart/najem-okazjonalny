/**
 * JEDNO ŹRÓDŁO PRAWDY dla danych firmy i kluczowych liczb.
 * Zmień wartości tutaj raz — zaktualizują się w całym serwisie (strona, stopka,
 * strony prawne, dane strukturalne schema.org).
 *
 * Dane rejestrowe potwierdzone w KRS (stan: czerwiec 2026).
 */

export const SITE_URL = 'https://najemokazjonalny24.com';

export const company = {
  // Marka
  brandName: 'Najem Okazjonalny',
  brandShort: 'NO',
  domain: 'najemokazjonalny24.com',

  // Dane rejestrowe (KRS 0001091757)
  legalName: 'ZoFiHel Rental Sp. z o.o.',
  nip: '739-399-72-40',
  regon: '527952735',
  krs: '0001091757',

  // Adres siedziby
  address: {
    street: 'ul. Dworcowa 18/45',
    postalCode: '10-436',
    city: 'Olsztyn',
    country: 'PL',
  },

  // Kontakt (telefon/email/whatsapp czytane ze zmiennych środowiskowych)
  phone: process.env.NEXT_PUBLIC_PHONE || '+48881244700',
  email: process.env.NEXT_PUBLIC_EMAIL || 'kontakt@najemokazjonalny24.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '48881244700',

  // Rok rejestracji spółki w KRS (1 marca 2024)
  foundedYear: 2024,
} as const;

/** Kluczowe liczby pokazywane w licznikach i sekcjach zaufania. */
export const stats = {
  clients: '100+',
  clientsLabel: 'obsłużonych klientów',
  acceptance: '100%',
  acceptanceLabel: 'zaakceptowanych dokumentów',
  turnaround: '24-48h',
  turnaroundLabel: 'średni czas realizacji',
  coverage: 'Cała Polska',
  coverageLabel: 'obszar działania',
} as const;

/** Największe miasta — używane w sekcji zasięgu i pod long-tail SEO. */
export const majorCities = [
  'Warszawa',
  'Kraków',
  'Łódź',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Szczecin',
  'Bydgoszcz',
  'Lublin',
  'Białystok',
  'Katowice',
  'Gdynia',
  'Częstochowa',
  'Radom',
  'Rzeszów',
  'Toruń',
] as const;

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
