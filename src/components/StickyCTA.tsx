'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import Button from './Button';
import { useT } from '@/lib/i18n/LanguageProvider';

export default function StickyCTA() {
  const router = useRouter();
  const t = useT();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      if (window.scrollY > 500 && !isClosed) {
        setIsVisible(true);
      } else if (window.scrollY <= 500) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClosed]);

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-navy-900 border-t-2 border-gold-500 shadow-2xl">
        <div className="relative px-4 py-3">
          {/* Close button */}
          <button
            onClick={() => setIsClosed(true)}
            className="absolute top-2 right-2 p-1 text-navy-400 hover:text-white transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between gap-4 pr-8">
            <div className="flex-1">
              <div className="text-xs text-gold-400 font-medium mb-1">
                {t('sticky.eyebrow')}
              </div>
              <div className="text-white font-semibold text-sm">
                {t('sticky.title')}
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => router.push('/#pakiety')}>
              {t('sticky.button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
