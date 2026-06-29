'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Clock, XCircle, Mail, Phone } from 'lucide-react';
import { useT } from '@/lib/i18n/LanguageProvider';

type PayState = 'loading' | 'completed' | 'pending' | 'failed';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const t = useT();
  const [state, setState] = useState<PayState>('loading');

  useEffect(() => {
    if (!orderId) {
      setState('pending');
      return;
    }
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 6; // ~15 s — czas na dotarcie webhooka P24

    const check = async () => {
      try {
        const res = await fetch(`/api/orders/status?orderId=${encodeURIComponent(orderId)}`, {
          cache: 'no-store',
        });
        const data = await res.json().catch(() => ({}));
        const s: string = data?.status;

        if (s === 'completed') {
          if (!cancelled) setState('completed');
          return;
        }
        if (s === 'failed' || s === 'cancelled') {
          if (!cancelled) setState('failed');
          return;
        }
        // 'pending' / 'not_found' (krótki wyścig) — ponawiamy, potem stan oczekujący
        attempts += 1;
        if (attempts >= maxAttempts) {
          if (!cancelled) setState('pending');
          return;
        }
        setTimeout(check, 2500);
      } catch {
        attempts += 1;
        if (attempts >= maxAttempts) {
          if (!cancelled) setState('pending');
          return;
        }
        setTimeout(check, 2500);
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (state === 'loading') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
        <Header />
        <div className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900 mx-auto mb-4" />
              <p className="text-navy-700">{t('success.verifying')}</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const icon =
    state === 'completed' ? (
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
    ) : state === 'failed' ? (
      <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
        <XCircle className="w-12 h-12 text-red-600" />
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6">
        <Clock className="w-12 h-12 text-gold-600" />
      </div>
    );

  const title =
    state === 'completed'
      ? t('success.title')
      : state === 'failed'
      ? t('success.failedTitle')
      : t('success.pendingTitle');

  const desc =
    state === 'completed'
      ? t('success.desc')
      : state === 'failed'
      ? t('success.failedDesc')
      : t('success.pendingDesc');

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            {icon}

            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">{title}</h1>

            {orderId && (
              <div className="bg-navy-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-navy-600 mb-1">{t('success.orderNumber')}</p>
                <p className="text-xl font-bold text-navy-900">{orderId}</p>
              </div>
            )}

            <p className="text-lg text-navy-700 mb-8 leading-relaxed">{desc}</p>

            {/* Kolejne kroki — tylko przy potwierdzonej płatności */}
            {state === 'completed' && (
              <div className="bg-gradient-to-br from-gold-50 to-white border-2 border-gold-200 rounded-xl p-6 mb-8 text-left">
                <h2 className="text-xl font-bold text-navy-900 mb-4">{t('success.whatNext')}</h2>
                <ol className="space-y-3 text-navy-700">
                  {[t('success.step1'), t('success.step2'), t('success.step3'), t('success.step4')].map(
                    (step, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ol>
              </div>
            )}

            {/* Ponów płatność — gdy nieudana lub oczekująca */}
            {state !== 'completed' && (
              <div className="mb-8">
                <Link
                  href="/zamowienie"
                  className="inline-block px-8 py-3 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
                >
                  {t('success.retry')}
                </Link>
              </div>
            )}

            <div className="border-t-2 border-navy-100 pt-8">
              <p className="text-navy-700 mb-4">{t('success.questions')}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="inline-flex items-center justify-center space-x-2 text-gold-600 hover:text-gold-700 font-medium"
                >
                  <Mail className="w-5 h-5" />
                  <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
                </a>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="inline-flex items-center justify-center space-x-2 text-gold-600 hover:text-gold-700 font-medium"
                >
                  <Phone className="w-5 h-5" />
                  <span>{process.env.NEXT_PUBLIC_PHONE}</span>
                </a>
              </div>

              <Link
                href="/"
                className="inline-block px-8 py-3 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors"
              >
                {t('success.backHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900 mx-auto mb-4"></div>
            <p className="text-navy-700">Ładowanie...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
