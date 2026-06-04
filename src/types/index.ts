export type PackageId = 'basic' | 'standard' | 'premium' | 'vip';

export interface Package {
  id: PackageId;
  name: string;
  price: number;
  /** Cena "przed" (przekreślona) — kotwica wartości / decoy pricing. */
  oldPrice?: number;
  description: string;
  /** Krótkie hasło pod nazwą pakietu (obietnica sprzedażowa). */
  tagline?: string;
  /** Poziom zabezpieczenia pokazywany przy cenie (np. "Pełne zabezpieczenie"). */
  securityLevel?: string;
  features: string[];
  /** Dyskretna nota pod listą (np. czego pakiet NIE zawiera). */
  note?: string;
  /** Opcjonalny przebieg „jak to działa" — dla pakietów z wizytą u notariusza. */
  howItWorks?: string[];
  popular?: boolean;
  /** Oznaczenie "najlepszy wybór" — pakiet docelowy konwersji. */
  bestValue?: boolean;
  /** Tekst plakietki nad pakietem. */
  badge?: string;
  period?: string;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Pakiety, w których dodatek jest już wliczony — koszyk go wtedy ukrywa. */
  includedIn?: PackageId[];
}

export interface Order {
  id: string;
  orderId: string;
  package: Package['id'];
  /** Wybrane dodatki cross-sell (id z lib/addons.ts). */
  addons?: string[];
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    pesel: string;
  };
  rentalData: {
    currentAddress: string;
    desiredCity: string;
    rentalPurpose: string;
  };
  /** Dane dostawy dokumentów (paczkomat InPost / kurier / elektronicznie). */
  delivery?: {
    method: 'paczkomat' | 'kurier' | 'email';
    /** Kod punktu InPost (np. KRA010) — dla metody paczkomat. */
    pointCode?: string;
    /** Adres paczkomatu (opis) — dla metody paczkomat. */
    pointAddress?: string;
    /** Dane do wysyłki kurierskiej. */
    recipientName?: string;
    street?: string;
    postalCode?: string;
    city?: string;
  };
  paymentStatus: 'pending' | 'completed' | 'failed' | 'cancelled';
  orderStatus: 'new' | 'in_progress' | 'completed' | 'cancelled';
  payuOrderId?: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  /** Wersja regulaminu zaakceptowana przy zamówieniu (dowodowo przy sporach). */
  regulaminVersion?: string;
  /** Adres IP z chwili złożenia zamówienia (logi/dowody zgód). */
  ip?: string;
  /** Użyty kod rabatowy (jeśli był). */
  discountCode?: string;
  /** Zastosowana kwota zniżki w zł. */
  discountAmount?: number;
  /** Znacznik wysłania przypomnienia po roku (ISO) — zapobiega ponownej wysyłce. */
  renewalReminderSentAt?: string;
  /** Dane przesyłki utworzonej w InPost ShipX po opłaceniu zamówienia. */
  shipment?: {
    provider: 'inpost';
    shipmentId?: string;
    trackingNumber?: string;
    status?: string;
  };
  consents: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
    /** Zgoda na natychmiastowe wykonanie i utratę prawa odstąpienia (Konsument). */
    immediateService?: boolean;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

export interface PayUOrder {
  orderId: string;
  customerIp: string;
  merchantPosId: string;
  description: string;
  currencyCode: string;
  totalAmount: number;
  buyer: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
  products: Array<{
    name: string;
    unitPrice: number;
    quantity: number;
  }>;
  continueUrl: string;
  notifyUrl: string;
}

export interface PayUNotification {
  order: {
    orderId: string;
    extOrderId: string;
    orderCreateDate: string;
    notifyUrl: string;
    customerIp: string;
    merchantPosId: string;
    description: string;
    currencyCode: string;
    totalAmount: number;
    status: string;
    products: Array<{
      name: string;
      unitPrice: number;
      quantity: number;
    }>;
  };
  localReceiptDateTime?: string;
  properties?: Array<{
    name: string;
    value: string;
  }>;
}
