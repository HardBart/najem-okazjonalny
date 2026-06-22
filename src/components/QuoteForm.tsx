'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useT } from '@/lib/i18n/LanguageProvider';

/**
 * Formularz indywidualnej wyceny dla zarządzających wieloma lokalami.
 * Wysyła zgłoszenie do /api/contact (message zawiera szczegóły zapytania).
 */
export default function QuoteForm() {
  const t = useT();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    units: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.consent) {
      setError(t('business.form.consentError'));
      return;
    }

    setStatus('sending');
    try {
      const message = [
        `Zapytanie o wycenę obsługi wielu lokali.`,
        form.company && `Firma: ${form.company}`,
        form.units && `Liczba lokali / skala: ${form.units}`,
        form.message && `Wiadomość: ${form.message}`,
      ]
        .filter(Boolean)
        .join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message,
          consent: form.consent,
        }),
      });

      if (res.ok) {
        setStatus('ok');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || t('business.form.sendError'));
        setStatus('error');
      }
    } catch {
      setError(t('business.form.connError'));
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div className="bg-white rounded-2xl border-2 border-gold-200 p-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-gold-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy-900 mb-2">{t('business.form.successTitle')}</h3>
        <p className="text-navy-700">
          {t('business.form.successText')}
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-5">
      <h3 className="text-2xl font-bold text-navy-900">{t('business.form.title')}</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">{t('business.form.name')}</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">{t('business.form.company')}</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">{t('business.form.email')}</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">{t('business.form.phone')}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
            placeholder="+48 123 456 789"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-2">
          {t('business.form.units')}
        </label>
        <input
          type="text"
          value={form.units}
          onChange={(e) => setForm({ ...form, units: e.target.value })}
          className={inputClass}
          placeholder={t('business.form.unitsPlaceholder')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-2">{t('business.form.message')}</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder={t('business.form.messagePlaceholder')}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-navy-700">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 w-4 h-4 accent-gold-600"
        />
        <span>
          {t('business.form.consentPre')}
          <a href="/polityka-prywatnosci" target="_blank" className="text-gold-600 hover:underline">
            {t('business.form.consentLink')}
          </a>
          {t('business.form.consentPost')}
        </span>
      </label>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-6 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? t('business.form.sending') : t('business.form.submit')}
      </button>
    </form>
  );
}
