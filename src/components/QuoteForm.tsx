'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Formularz indywidualnej wyceny dla zarządzających wieloma lokalami.
 * Wysyła zgłoszenie do /api/contact (message zawiera szczegóły zapytania).
 */
export default function QuoteForm() {
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
      setError('Musisz wyrazić zgodę na kontakt.');
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
        setError(data.error || 'Nie udało się wysłać zapytania.');
        setStatus('error');
      }
    } catch {
      setError('Wystąpił błąd połączenia. Spróbuj ponownie.');
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div className="bg-white rounded-2xl border-2 border-gold-200 p-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-gold-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy-900 mb-2">Dziękujemy za zapytanie!</h3>
        <p className="text-navy-700">
          Przygotujemy indywidualną wycenę i odezwiemy się zwykle w ciągu 1 dnia roboczego.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-5">
      <h3 className="text-2xl font-bold text-navy-900">Zapytaj o indywidualną wycenę</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">Imię i nazwisko *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">Firma</label>
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
          <label className="block text-sm font-medium text-navy-900 mb-2">E-mail *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">Telefon</label>
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
          Liczba lokali / skala współpracy
        </label>
        <input
          type="text"
          value={form.units}
          onChange={(e) => setForm({ ...form, units: e.target.value })}
          className={inputClass}
          placeholder="np. 15 mieszkań, stała współpraca"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-2">Wiadomość</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="Opisz krótko swoje potrzeby"
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
          Wyrażam zgodę na kontakt i przetwarzanie danych zgodnie z{' '}
          <a href="/polityka-prywatnosci" target="_blank" className="text-gold-600 hover:underline">
            polityką prywatności
          </a>
          . *
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
        {status === 'sending' ? 'Wysyłanie...' : 'Wyślij zapytanie o wycenę'}
      </button>
    </form>
  );
}
