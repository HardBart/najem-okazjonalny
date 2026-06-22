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
    id: 'pakiet-bezpieczny-najem',
    name: 'Pakiet „Bezpieczny Najem”',
    description:
      'Komplet dokumentów najmu okazjonalnego — trzy edytowalne wzory gotowe do wydruku, opracowane przez praktyków rynku najmu. Obejmują wydanie lokalu, treść umowy i zgłoszenie do urzędu skarbowego.',
    price: 129,
    featured: true,
    highlights: [
      'Profesjonalna umowa najmu okazjonalnego (kilkanaście paragrafów).',
      'Protokół zdawczo-odbiorczy — stan lokalu, liczniki, wyposażenie.',
      'Instrukcja zgłoszenia do urzędu skarbowego (z e-Urzędem i checklistą).',
    ],
  },
  {
    id: 'dodatkowe-egzemplarze',
    name: 'Dodatkowe egzemplarze dokumentów',
    description: 'Drugi papierowy komplet poświadczonych dokumentów wysłany na Twój adres.',
    price: 59,
    excludedFrom: ['basic'],
  },
  {
    id: 'ekspres',
    name: 'Realizacja ekspresowa (24h)',
    description: 'Priorytetowe przygotowanie kompletu dokumentów w ciągu 24 godzin. Czas dotyczy przygotowania dokumentów i nie obejmuje czasu wysyłki.',
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

/** Dodatki dostępne dla danego pakietu (z pominięciem już wliczonych i wykluczonych). */
export function addonsForPackage(packageId: PackageId): Addon[] {
  return addons.filter(
    (a) => !a.includedIn?.includes(packageId) && !a.excludedFrom?.includes(packageId)
  );
}

/** Dopłata za kuriera pod wskazany adres. Kurier jest w cenie w Premium i Komplet. */
export const COURIER_SURCHARGE = 25;
export function courierSurchargeFor(packageId: PackageId | string, method?: string): number {
  if (method !== 'kurier') return 0;
  if (packageId === 'premium' || packageId === 'vip') return 0;
  return COURIER_SURCHARGE;
}
