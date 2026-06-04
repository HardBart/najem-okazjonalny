'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface CTABandProps {
  /** Wariant tła: 'dark' (granat) lub 'light' (jasny gradient). */
  variant?: 'dark' | 'light';
  title?: string;
  subtitle?: string;
}

/**
 * Powtarzalny pasek CTA wstawiany co 2-3 sekcje. Kieruje wyłącznie do zamówienia
 * online (bez kanałów kontaktu „po poradę").
 */
export default function CTABand({
  variant = 'dark',
  title = 'Potrzebujesz dokumentów do najmu okazjonalnego?',
  subtitle = 'Zamów online — komplet dokumentów gotowy nawet w 24h.',
}: CTABandProps) {
  const router = useRouter();
  const isDark = variant === 'dark';

  return (
    <section
      className={
        isDark
          ? 'py-14 bg-gradient-to-br from-navy-900 to-navy-800'
          : 'py-14 bg-gradient-to-br from-gold-50 to-navy-50'
      }
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <h2
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-navy-900'
              }`}
            >
              {title}
            </h2>
            <p className={isDark ? 'text-navy-300' : 'text-navy-700'}>{subtitle}</p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => router.push('/zamowienie')}
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Zamów online
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
