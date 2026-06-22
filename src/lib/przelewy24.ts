import axios from 'axios';
import crypto from 'crypto';

/**
 * Integracja z Przelewy24 (PayPro S.A.) — REST API v1.
 *
 * Przepływ:
 *  1. registerTransaction() → rejestruje płatność, zwraca token i URL przekierowania.
 *  2. Klient płaci w Przelewy24, po czym P24 wysyła powiadomienie (POST) na urlStatus.
 *  3. W handlerze powiadomienia wywołujemy verifyTransaction() — to autorytatywne
 *     potwierdzenie płatności po stronie P24.
 *
 * Podpisy: SHA-384 z JSON (bez spacji, ustalona kolejność pól) + klucz CRC.
 *
 * Wymagane zmienne środowiskowe:
 *  P24_MERCHANT_ID, P24_POS_ID, P24_CRC, P24_API_KEY, P24_SANDBOX ("true"/"false")
 */

const SANDBOX = process.env.P24_SANDBOX === 'true';
const BASE_URL = SANDBOX ? 'https://sandbox.przelewy24.pl' : 'https://secure.przelewy24.pl';

const MERCHANT_ID = Number(process.env.P24_MERCHANT_ID || 0);
const POS_ID = Number(process.env.P24_POS_ID || process.env.P24_MERCHANT_ID || 0);
const CRC = process.env.P24_CRC || '';
const API_KEY = process.env.P24_API_KEY || '';
const CURRENCY = 'PLN';

function sha384(payload: Record<string, unknown>): string {
  // P24 wymaga JSON bez spacji, w ustalonej kolejności kluczy (kolejność wstawiania).
  return crypto.createHash('sha384').update(JSON.stringify(payload)).digest('hex');
}

function authHeader(): string {
  const token = Buffer.from(`${POS_ID}:${API_KEY}`).toString('base64');
  return `Basic ${token}`;
}

export interface P24RegisterParams {
  /** Nasz identyfikator zamówienia — używany jako sessionId w P24. */
  sessionId: string;
  /** Kwota w groszach (np. 49900 dla 499 zł). */
  amount: number;
  description: string;
  email: string;
  urlReturn: string;
  urlStatus: string;
}

export interface P24Notification {
  merchantId: number;
  posId: number;
  sessionId: string;
  amount: number;
  originAmount: number;
  currency: string;
  orderId: number;
  methodId: number;
  statement: string;
  sign: string;
}

export class Przelewy24Service {
  /** Rejestruje transakcję i zwraca token + URL do przekierowania klienta. */
  static async registerTransaction(
    params: P24RegisterParams
  ): Promise<{ token: string; redirectUrl: string }> {
    const sign = sha384({
      sessionId: params.sessionId,
      merchantId: MERCHANT_ID,
      amount: params.amount,
      currency: CURRENCY,
      crc: CRC,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/transaction/register`,
        {
          merchantId: MERCHANT_ID,
          posId: POS_ID,
          sessionId: params.sessionId,
          amount: params.amount,
          currency: CURRENCY,
          description: params.description,
          email: params.email,
          country: 'PL',
          language: 'pl',
          urlReturn: params.urlReturn,
          urlStatus: params.urlStatus,
          sign,
          encoding: 'UTF-8',
        },
        { headers: { 'Content-Type': 'application/json', Authorization: authHeader() } }
      );

      const token = response.data?.data?.token as string | undefined;
      if (!token) throw new Error('Przelewy24: brak tokenu w odpowiedzi');

      return { token, redirectUrl: `${BASE_URL}/trnRequest/${token}` };
    } catch (error) {
      console.error('Przelewy24 register error:', error);
      throw new Error('Failed to register Przelewy24 transaction');
    }
  }

  /** Weryfikuje podpis powiadomienia przesłanego przez P24 na urlStatus. */
  static verifyNotificationSignature(n: P24Notification): boolean {
    const expected = sha384({
      merchantId: n.merchantId,
      posId: n.posId,
      sessionId: n.sessionId,
      amount: n.amount,
      originAmount: n.originAmount,
      currency: n.currency,
      orderId: n.orderId,
      methodId: n.methodId,
      statement: n.statement,
      crc: CRC,
    });
    return expected === n.sign;
  }

  /** Autorytatywne potwierdzenie płatności po stronie P24 (krok wymagany). */
  static async verifyTransaction(params: {
    sessionId: string;
    orderId: number;
    amount: number;
  }): Promise<boolean> {
    // Tryb testowy WYŁĄCZNIE poza produkcją: pozwala lokalnie przejść webhook bez
    // realnego konta P24. W produkcji (NODE_ENV=production) flaga jest ignorowana.
    if (process.env.NODE_ENV !== 'production' && process.env.P24_MOCK_VERIFY === 'true') {
      console.warn('Przelewy24 verifyTransaction: TRYB TESTOWY (mock) — pomijam realną weryfikację P24.');
      return true;
    }

    const sign = sha384({
      sessionId: params.sessionId,
      orderId: params.orderId,
      amount: params.amount,
      currency: CURRENCY,
      crc: CRC,
    });

    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/transaction/verify`,
        {
          merchantId: MERCHANT_ID,
          posId: POS_ID,
          sessionId: params.sessionId,
          amount: params.amount,
          currency: CURRENCY,
          orderId: params.orderId,
          sign,
        },
        { headers: { 'Content-Type': 'application/json', Authorization: authHeader() } }
      );

      return response.data?.data?.status === 'success';
    } catch (error) {
      console.error('Przelewy24 verify error:', error);
      return false;
    }
  }
}
