import { Addon, PackageId } from '@/types';

/**
 * Dodatki cross-sell prezentowane jako opcjonalne checkboxy w formularzu zamówienia.
 * Zgodne z filozofią pakietów: DOKUMENTY, SZYBKOŚĆ, LOGISTYKA — bez doradztwa.
 *
 * `includedIn` wskazuje pakiety, w których dodatek jest już w cenie — koszyk ukrywa
 * wtedy taki dodatek, żeby nie sprzedawać tego samego dwa razy. Dzięki temu lista
 * dodatków dopasowuje się do wybranego pakietu.
 */
export const addons: Addon[] = [
  {
    id: 'umowa-wzor',
    name: 'Wzór umowy najmu okazjonalnego',
    description: 'Gotowy, edytowalny wzór umowy — wystarczy uzupełnić dane.',
    price: 79,
  },
  {
    id: 'instrukcja-us',
    name: 'Instrukcja zgłoszenia do urzędu skarbowego',
    description: 'Krok po kroku, jak zgłosić najem okazjonalny w 14 dni.',
    price: 49,
  },
  {
    id: 'protokol',
    name: 'Protokół zdawczo-odbiorczy mieszkania (wzór)',
    description: 'Gotowy wzór protokołu — zabezpiecza kaucję i stan lokalu przy przekazaniu mieszkania.',
    price: 39,
  },
  {
    id: 'dodatkowe-egzemplarze',
    name: 'Dodatkowe egzemplarze dokumentów',
    description: 'Drugi papierowy komplet poświadczonych dokumentów wysłany na Twój adres.',
    price: 59,
    includedIn: ['premium', 'vip'],
  },
  {
    id: 'kurier',
    name: 'Wysyłka kurierska priorytetowa',
    description: 'Komplet dokumentów dostarczony kurierem priorytetowo, z numerem do śledzenia.',
    price: 39,
    includedIn: ['premium', 'vip'],
  },
  {
    id: 'ekspres',
    name: 'Realizacja ekspresowa (24h)',
    description: 'Priorytetowe przygotowanie kompletu dokumentów w ciągu 24 godzin.',
    price: 199,
    includedIn: ['premium', 'vip'],
  },
];

export function getAddonById(id: string): Addon | undefined {
  return addons.find((a) => a.id === id);
}

/** Suma cen wybranych dodatków (po id). Pomija nieznane id. */
export function sumAddons(ids: string[] = []): number {
  return ids.reduce((sum, id) => sum + (getAddonById(id)?.price ?? 0), 0);
}

/** Dodatki dostępne dla danego pakietu (z pominięciem już wliczonych). */
export function addonsForPackage(packageId: PackageId): Addon[] {
  return addons.filter((a) => !a.includedIn?.includes(packageId));
}
