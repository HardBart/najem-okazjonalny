/**
 * Metadane dokumentów prawnych — jedno źródło dla stron regulaminu/polityki
 * oraz zapisu wersji zaakceptowanej przy zamówieniu (istotne dowodowo przy sporach).
 *
 * Po każdej zmianie treści regulaminu/polityki ZWIĘKSZ wersję i datę.
 */
export const LEGAL = {
  /** Data obowiązywania bieżących wersji dokumentów. */
  effectiveDate: '2 czerwca 2026',
  /** Wersja regulaminu zapisywana przy zamówieniu (np. v1_2026-06-02). */
  regulaminVersion: 'v1_2026-06-02',
  /** Wersja polityki prywatności. */
  politykaVersion: 'v1_2026-06-02',
  /** Operator płatności wykorzystywany w serwisie. */
  paymentProvider: 'Przelewy24 (PayPro S.A.)',
} as const;
