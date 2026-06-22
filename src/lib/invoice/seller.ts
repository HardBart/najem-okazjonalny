/**
 * Dane sprzedawcy na dokumencie sprzedaży (faktura / rachunek).
 * Wystawca: ZoFiHel Rental Sp. z o.o. Układ wg wzoru „faktura przykład.pdf".
 */
export const SELLER = {
  name: 'ZoFiHel Rental sp. z o.o.',
  addressLine: '10-436 Olsztyn, ul. Dworcowa 18/45',
  nip: '739-399-72-40',
  regon: '527952735',
  krs: '0001091757',
  court: 'Sąd Rejonowy w Olsztynie, VIII Wydział Gospodarczy KRS',
  // Kapitał zakładowy — uzupełnić, gdy potwierdzony (na razie pominięty na dokumencie).
  shareCapital: '' as string,
};

/** Nazwa usługi (jedna zbiorcza pozycja) + podstawa zwolnienia z VAT. */
export const SERVICE_NAME =
  'Usługa elektroniczna – przygotowanie i dostarczenie pakietu dokumentów najmu okazjonalnego';

export const VAT_EXEMPTION_BASIS =
  'Sprzedawca zwolniony z podatku od towarów i usług na podstawie art. 113 ust. 1 ustawy o VAT (zwolnienie podmiotowe).';

/** Limit zwolnienia podmiotowego (zł) w roku — od 2026. POTWIERDZIĆ z księgową. */
export const VAT_EXEMPTION_LIMIT = 240000;

export const VAT_RATE = 0.23;
