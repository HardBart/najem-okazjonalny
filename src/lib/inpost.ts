import { Order } from '@/types';

/**
 * SZKIELET integracji InPost ShipX (tworzenie przesyłek + etykiety).
 *
 * Status: gotowy do uruchomienia po uzupełnieniu danych konta InPost ShipX.
 * Bez konfiguracji funkcje są bezpiecznym no-op (logują i zwracają null), więc
 * nie blokują potwierdzenia płatności.
 *
 * Wymagane zmienne środowiskowe (.env):
 *   INPOST_SHIPX_TOKEN     — token API ShipX z panelu InPost (ManagerPaczek)
 *   INPOST_ORGANIZATION_ID — ID organizacji w ShipX
 *   INPOST_SANDBOX         — "true" (sandbox) / "false" (produkcja)
 *   INPOST_SENDER_NAME, INPOST_SENDER_EMAIL, INPOST_SENDER_PHONE — dane nadawcy
 *
 * Dokumentacja: https://dokumentacja-inpost.atlassian.net/wiki/spaces/PL/ (ShipX API)
 *
 * ⚠️ Kod nieprzetestowany na żywym API (brak konta) — przed produkcją zweryfikować
 *    nazwy pól payloadu z aktualną dokumentacją ShipX.
 */

const SANDBOX = process.env.INPOST_SANDBOX !== 'false';
const BASE_URL = SANDBOX
  ? 'https://sandbox-api-shipx-pl.easypack24.net/v1'
  : 'https://api-shipx-pl.easypack24.net/v1';

const TOKEN = process.env.INPOST_SHIPX_TOKEN || '';
const ORG_ID = process.env.INPOST_ORGANIZATION_ID || '';

const SENDER = {
  name: process.env.INPOST_SENDER_NAME || '',
  email: process.env.INPOST_SENDER_EMAIL || '',
  phone: process.env.INPOST_SENDER_PHONE || '',
};

export function isInpostConfigured(): boolean {
  return Boolean(TOKEN && ORG_ID);
}

/** Telefon w formacie wymaganym przez InPost (9 cyfr, bez kierunkowego). */
function normalizePhone(phone?: string): string {
  const digits = (phone || '').replace(/\D/g, '');
  return digits.slice(-9);
}

function authHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  };
}

export interface ShipmentResult {
  shipmentId: string;
  trackingNumber?: string;
  status?: string;
}

export class InpostShipXService {
  /**
   * Tworzy przesyłkę na podstawie danych zamówienia.
   * Zwraca null, jeśli integracja nie jest skonfigurowana lub brak danych dostawy.
   */
  static async createShipment(order: Order): Promise<ShipmentResult | null> {
    if (!isInpostConfigured()) {
      console.log('[inpost] Brak konfiguracji ShipX — pomijam tworzenie przesyłki', order.orderId);
      return null;
    }
    const d = order.delivery;
    if (!d || d.method === 'email') {
      // Dostawa elektroniczna — brak przesyłki fizycznej.
      return null;
    }

    const isLocker = d.method === 'paczkomat';

    // Odbiorca
    const receiver: Record<string, unknown> = {
      first_name: order.personalData.firstName,
      last_name: order.personalData.lastName,
      email: order.personalData.email,
      phone: normalizePhone(order.personalData.phone),
    };
    if (!isLocker) {
      receiver.address = {
        street: d.street,
        post_code: d.postalCode,
        city: d.city,
        country_code: 'PL',
      };
    }

    // Ładunek — komplet dokumentów traktujemy jako małą paczkę / gabaryt A
    const parcels = isLocker ? [{ template: 'small' }] : [{ template: 'small' }];

    const payload: Record<string, unknown> = {
      receiver,
      sender: {
        name: SENDER.name,
        email: SENDER.email,
        phone: normalizePhone(SENDER.phone),
      },
      parcels,
      service: isLocker ? 'inpost_locker_standard' : 'inpost_courier_standard',
      reference: order.orderId,
      custom_attributes: isLocker ? { target_point: d.pointCode } : {},
    };

    try {
      const res = await fetch(`${BASE_URL}/organizations/${ORG_ID}/shipments`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error('[inpost] Błąd tworzenia przesyłki:', res.status, await res.text());
        return null;
      }

      const data = await res.json();
      return {
        shipmentId: String(data.id ?? ''),
        trackingNumber: data.tracking_number ?? undefined,
        status: data.status ?? undefined,
      };
    } catch (error) {
      console.error('[inpost] Wyjątek tworzenia przesyłki:', error);
      return null;
    }
  }

  /**
   * Pobiera etykietę przesyłki (PDF) jako ArrayBuffer.
   * Uwaga: etykieta bywa dostępna dopiero po przejściu przesyłki w status "confirmed".
   */
  static async getLabel(shipmentId: string): Promise<ArrayBuffer | null> {
    if (!isInpostConfigured()) return null;
    try {
      const res = await fetch(`${BASE_URL}/shipments/${shipmentId}/label?format=pdf&type=normal`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!res.ok) {
        console.error('[inpost] Błąd pobierania etykiety:', res.status);
        return null;
      }
      return await res.arrayBuffer();
    } catch (error) {
      console.error('[inpost] Wyjątek pobierania etykiety:', error);
      return null;
    }
  }
}
