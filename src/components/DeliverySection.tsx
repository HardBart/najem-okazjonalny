'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Truck, Mail, ExternalLink } from 'lucide-react';
import type { PackageId } from '@/types';
import { useT } from '@/lib/i18n/LanguageProvider';

export interface DeliveryValue {
  method: 'paczkomat' | 'kurier' | 'email';
  pointCode?: string;
  pointAddress?: string;
  recipientName?: string;
  street?: string;
  postalCode?: string;
  city?: string;
}

/** Dozwolone metody dostawy zależnie od pakietu. */
const METHODS_BY_PACKAGE: Record<PackageId, DeliveryValue['method'][]> = {
  basic: ['email'], // Start — dokumenty elektronicznie
  standard: ['paczkomat', 'kurier'], // paczkomat w cenie, kurier za dopłatą
  premium: ['paczkomat', 'kurier'], // wybór, kurier w cenie
  vip: ['kurier'], // Komplet — kurier priorytetowy w cenie
};

const GEOWIDGET_TOKEN = process.env.NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN || '';

const inputClass =
  'w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none transition-colors';

/**
 * Osadza widget mapy InPost (Geowidget v5) — tylko gdy skonfigurowano token.
 * Po wyborze paczkomatu zwraca kod punktu i jego adres.
 */
function InpostGeowidget({ onSelect }: { onSelect: (code: string, address: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!GEOWIDGET_TOKEN || !containerRef.current) return;

    // CSS
    if (!document.querySelector('link[data-inpost-geowidget]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://geowidget.inpost.pl/inpost-geowidget.css';
      link.setAttribute('data-inpost-geowidget', 'true');
      document.head.appendChild(link);
    }
    // JS
    if (!document.querySelector('script[data-inpost-geowidget]')) {
      const script = document.createElement('script');
      script.src = 'https://geowidget.inpost.pl/inpost-geowidget.js';
      script.defer = true;
      script.setAttribute('data-inpost-geowidget', 'true');
      document.head.appendChild(script);
    }

    // Element web-componentu
    const el = document.createElement('inpost-geowidget');
    el.setAttribute('token', GEOWIDGET_TOKEN);
    el.setAttribute('language', 'pl');
    el.setAttribute('config', 'parcelCollect');
    el.style.width = '100%';
    el.style.height = '500px';
    el.style.display = 'block';

    const handlePoint = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      const code = detail.name || detail.id || '';
      const addr = detail.address
        ? `${detail.address.line1 || ''} ${detail.address.line2 || ''}`.trim()
        : '';
      if (code) onSelect(code, addr);
    };
    el.addEventListener('onpoint', handlePoint);

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(el);

    return () => el.removeEventListener('onpoint', handlePoint);
  }, [onSelect]);

  if (!GEOWIDGET_TOKEN) return null;
  return <div ref={containerRef} className="rounded-xl overflow-hidden border-2 border-navy-100 mb-3" />;
}

export default function DeliverySection({
  packageId,
  value,
  onChange,
  courierSurcharge = 0,
}: {
  packageId: PackageId;
  value: DeliveryValue;
  onChange: (v: DeliveryValue) => void;
  /** Dopłata za kuriera pod adres (0, gdy wliczony w pakiet). */
  courierSurcharge?: number;
}) {
  const t = useT();
  const allowed = METHODS_BY_PACKAGE[packageId] || ['email'];

  // Po zmianie pakietu wymuś dozwoloną metodę
  useEffect(() => {
    if (!allowed.includes(value.method)) {
      onChange({ ...value, method: allowed[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageId]);

  const set = (patch: Partial<DeliveryValue>) => onChange({ ...value, ...patch });

  return (
    <div className="pt-6 border-t-2 border-navy-100">
      <h3 className="text-xl font-bold text-navy-900 mb-1">{t('order.delivery.title')}</h3>
      <p className="text-sm text-navy-600 mb-4">
        {t('order.delivery.hint')}
      </p>

      {/* Wybór metody (jeśli więcej niż jedna) */}
      {allowed.length > 1 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {allowed.includes('paczkomat') && (
            <button
              type="button"
              onClick={() => set({ method: 'paczkomat' })}
              className={`flex items-center gap-2 p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                value.method === 'paczkomat'
                  ? 'border-gold-500 bg-gold-50 text-navy-900'
                  : 'border-navy-200 text-navy-700 hover:border-gold-300'
              }`}
            >
              <MapPin className="w-5 h-5 text-gold-600" />
              {t('order.delivery.paczkomat')}
            </button>
          )}
          {allowed.includes('kurier') && (
            <button
              type="button"
              onClick={() => set({ method: 'kurier' })}
              className={`flex items-center gap-2 p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                value.method === 'kurier'
                  ? 'border-gold-500 bg-gold-50 text-navy-900'
                  : 'border-navy-200 text-navy-700 hover:border-gold-300'
              }`}
            >
              <Truck className="w-5 h-5 text-gold-600" />
              {t('order.delivery.kurier')}
              {courierSurcharge > 0 && (
                <span className="ml-auto text-gold-700 font-bold whitespace-nowrap">+{courierSurcharge} zł</span>
              )}
            </button>
          )}
        </div>
      )}

      {/* Elektronicznie (Start) */}
      {value.method === 'email' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-50 border border-navy-100 text-sm text-navy-700">
          <Mail className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
          <span>
            {t('order.delivery.emailInfo')}
          </span>
        </div>
      )}

      {/* Paczkomat */}
      {value.method === 'paczkomat' && (
        <div>
          <InpostGeowidget
            onSelect={(code, addr) => set({ pointCode: code, pointAddress: addr })}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.delivery.pointCode')}</label>
              <input
                type="text"
                value={value.pointCode || ''}
                onChange={(e) => set({ pointCode: e.target.value.toUpperCase() })}
                className={inputClass}
                placeholder={t('order.delivery.pointCodePlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                {t('order.delivery.pointAddress')}
              </label>
              <input
                type="text"
                value={value.pointAddress || ''}
                onChange={(e) => set({ pointAddress: e.target.value })}
                className={inputClass}
                placeholder={t('order.delivery.pointAddressPlaceholder')}
              />
            </div>
          </div>
          {!GEOWIDGET_TOKEN && (
            <a
              href="https://inpost.pl/znajdz-paczkomat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm text-gold-700 hover:text-gold-800 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              {t('order.delivery.findLocker')}
            </a>
          )}
        </div>
      )}

      {/* Kurier */}
      {value.method === 'kurier' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.delivery.recipient')}</label>
            <input
              type="text"
              value={value.recipientName || ''}
              onChange={(e) => set({ recipientName: e.target.value })}
              className={inputClass}
              placeholder={t('order.delivery.recipientPlaceholder')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.delivery.street')}</label>
            <input
              type="text"
              value={value.street || ''}
              onChange={(e) => set({ street: e.target.value })}
              className={inputClass}
              placeholder={t('order.delivery.streetPlaceholder')}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.delivery.postalCode')}</label>
              <input
                type="text"
                value={value.postalCode || ''}
                onChange={(e) => set({ postalCode: e.target.value })}
                className={inputClass}
                placeholder="00-001"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.delivery.city')}</label>
              <input
                type="text"
                value={value.city || ''}
                onChange={(e) => set({ city: e.target.value })}
                className={inputClass}
                placeholder={t('order.delivery.cityPlaceholder')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
