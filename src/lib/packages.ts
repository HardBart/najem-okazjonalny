import { Package } from '@/types';

/**
 * JEDNO ŹRÓDŁO PRAWDY dla pakietów — strona pakietów, formularz zamówienia,
 * API zamówień i kreator QuickQuiz.
 *
 * Drabina zabezpieczenia (rośnie z ceną):
 *  1. Start (289)    — podpis właściciela profilem zaufanym (bez notariusza),
 *  2. Standard (389) — notarialne poświadczenie podpisu właściciela,
 *  3. Premium (689)  — to samo + realizacja ekspresowa 24h + komplet i logistyka,
 *  4. Komplet (1019) — pełna obsługa z poddaniem się egzekucji art. 777 k.p.c.
 *
 * Ceny zakotwiczone ~10 zł poniżej konkurencji. Punkty są konkretne (co klient
 * realnie otrzymuje), bez ogólnych zwrotów marketingowych.
 */

export const packages: Package[] = [
  {
    id: 'basic',
    name: 'Start',
    tagline: 'Załatwię podstawowy wymóg formalny',
    securityLevel: 'Podpis profilem zaufanym',
    price: 289,
    period: 'jednorazowo',
    description: 'Adres i oświadczenie właściciela z podpisem profilem zaufanym',
    features: [
      'Wskazanie adresu do umowy najmu okazjonalnego',
      'Oświadczenie właściciela lokalu o zgodzie na zamieszkanie najemcy',
      'Podpis właściciela lokalu złożony profilem zaufanym',
      'Dokumenty przesyłane elektronicznie',
      'Realizacja w ciągu 2–3 dni roboczych',
    ],
    note: 'Podpis profilem zaufanym, bez poświadczenia notarialnego. Notarialne poświadczenie podpisu — często wymagane przez wynajmujących — dostępne od pakietu Standard.',
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Otrzymam komplet z poświadczeniem notarialnym',
    securityLevel: 'Poświadczenie notarialne',
    price: 389,
    oldPrice: 489,
    period: 'jednorazowo',
    description: 'Komplet z notarialnym poświadczeniem podpisu właściciela',
    features: [
      'Wskazanie adresu do umowy najmu okazjonalnego',
      'Oświadczenie właściciela lokalu o zgodzie na zamieszkanie najemcy',
      'Notarialne poświadczenie podpisu właściciela lokalu',
      'Dokument wysyłany do paczkomatu InPost',
      'Wysyłka w 2–3 dni robocze',
    ],
    popular: true,
    bestValue: true,
    badge: 'Najczęściej wybierany',
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Wszystko gotowe ekspresowo, w 24 godziny',
    securityLevel: 'Notarialne + ekspres 24h',
    price: 689,
    period: 'jednorazowo',
    description: 'Notarialne poświadczenie z realizacją w 24 godziny i pełną logistyką',
    features: [
      'Wskazanie adresu do umowy najmu okazjonalnego',
      'Oświadczenie właściciela lokalu o zgodzie na zamieszkanie najemcy',
      'Notarialne poświadczenie podpisu właściciela lokalu',
      'Realizacja ekspresowa w 24 godziny',
      'Priorytetowe przygotowanie dokumentów poza kolejnością',
      'Komplet w wersji papierowej i elektronicznej',
      'Dodatkowe egzemplarze kompletu dokumentów',
      'Wysyłka do paczkomatu lub kurierska',
      'Wysyłka ekspresowa w 1 dzień roboczy',
    ],
    badge: 'Realizacja w 24h',
  },
  {
    id: 'vip',
    name: 'Komplet',
    tagline: 'Załatwię wszystko w jednym miejscu, z art. 777 k.p.c.',
    securityLevel: 'Pełna obsługa z art. 777 k.p.c.',
    price: 1019,
    period: 'jednorazowo',
    description: 'Oświadczenie o adresie + poddanie się egzekucji u notariusza (art. 777 k.p.c.)',
    features: [
      'Oświadczenie o adresie do umowy najmu okazjonalnego, podpisane przez właściciela nieruchomości',
      'Poddanie się dobrowolnej egzekucji z art. 777 k.p.c. § 1 pkt 4 w kancelarii notarialnej',
      'Ustalenie terminu wizyty w kancelarii notarialnej',
      'Notarialne poświadczenie podpisu właściciela lokalu',
      'Wysyłka kurierska priorytetowa w cenie',
      'Realizacja priorytetowa',
    ],
    note: 'Usługa z wizytą u notariusza — dla osób przebywających na terenie Polski. Dostępność w danym mieście potwierdzamy po złożeniu zamówienia. Koszt ewentualnego tłumacza przysięgłego pokrywa najemca.',
    howItWorks: [
      'Wypełniasz formularz: dane właściciela wynajmowanej nieruchomości, dokładny adres nieruchomości oraz dane najemcy.',
      'Otrzymujesz mailem oświadczenie o adresie podpisane przez właściciela nieruchomości.',
      'Przesyłasz nam podpisaną umowę najmu oraz proponowany termin wizyty w kancelarii notarialnej (termin ustalamy po otrzymaniu podpisanej umowy).',
      'Otrzymujesz mailem termin wizyty u notariusza do potwierdzenia.',
      'Na wizytę zabierasz oświadczenie o adresie oraz oryginał podpisanej umowy najmu i poddajesz się egzekucji z art. 777 k.p.c.',
    ],
    badge: 'Pełna obsługa w jednym miejscu',
  },
];

export function getPackageById(id: string): Package | undefined {
  return packages.find((pkg) => pkg.id === id);
}
