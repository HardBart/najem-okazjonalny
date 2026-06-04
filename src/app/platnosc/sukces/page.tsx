'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Mail, Phone } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Płatność zakończona pomyślnie!
            </h1>

            {/* Order ID */}
            {orderId && (
              <div className="bg-navy-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-navy-600 mb-1">Numer zamówienia:</p>
                <p className="text-xl font-bold text-navy-900">{orderId}</p>
              </div>
            )}

            {/* Description */}
            <p className="text-lg text-navy-700 mb-8 leading-relaxed">
              Dziękujemy za złożenie zamówienia. Potwierdzenie zostało wysłane na podany
              adres e-mail. W ciągu najbliższych godzin nasz zespół skontaktuje się z Tobą,
              aby omówić szczegóły realizacji.
            </p>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-gold-50 to-white border-2 border-gold-200 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-navy-900 mb-4">
                Co dalej?
              </h2>
              <ol className="space-y-3 text-navy-700">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <span>
                    Sprawdź swoją skrzynkę e-mail – przesłaliśmy potwierdzenie zamówienia
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <span>
                    Nasz opiekun skontaktuje się z Tobą telefonicznie lub mailowo
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <span>
                    Przygotujemy dokumenty i umówimy termin u notariusza
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <span>
                    Otrzymasz komplet dokumentów gotowych do użycia
                  </span>
                </li>
              </ol>
            </div>

            {/* Contact Info */}
            <div className="border-t-2 border-navy-100 pt-8">
              <p className="text-navy-700 mb-4">
                Masz pytania? Skontaktuj się z nami:
              </p>
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
                Wróć na stronę główną
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900 mx-auto mb-4"></div>
          <p className="text-navy-700">Ładowanie...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
