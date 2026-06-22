'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';

/** Notka o języku artykułu (treść po polsku) — pokazywana poza PL. Klient, by nie psuć SSG. */
export default function BlogLangNotice() {
  const { locale, t } = useLanguage();
  if (locale === 'pl') return null;
  return (
    <div className="mb-8 text-sm text-navy-600 bg-navy-50 border border-navy-100 rounded-xl px-4 py-3">
      {t('blog.polishNote')}
    </div>
  );
}
