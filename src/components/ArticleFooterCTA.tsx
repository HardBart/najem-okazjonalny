import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { articles } from '@/lib/articles';
import type { BlogCategory } from '@/lib/articles';

interface Props {
  currentSlug: string;
  category: BlogCategory;
}

/**
 * Stopka artykułu: mocne CTA sprzedażowe + powiązane artykuły (linkowanie wewnętrzne).
 * Wstawiana pod treścią każdego wpisu bloga.
 */
export default function ArticleFooterCTA({ currentSlug, category }: Props) {
  const related = articles
    .filter((a) => a.slug !== currentSlug && a.category === category)
    .slice(0, 3);
  // dopełnij innymi artykułami, jeśli w kategorii jest za mało
  const fill = articles
    .filter((a) => a.slug !== currentSlug && a.category !== category)
    .slice(0, Math.max(0, 3 - related.length));
  const list = [...related, ...fill];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* CTA sprzedażowe */}
      <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 md:p-10 text-center my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Potrzebujesz adresu do najmu okazjonalnego?
        </h2>
        <p className="text-navy-300 mb-6 max-w-xl mx-auto">
          Zapewniamy oświadczenie właściciela lokalu z poświadczeniem notarialnym — bez angażowania
          rodziny. Realizacja nawet w 24h (czas realizacji nie obejmuje wysyłki).
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/zamowienie"
            className="inline-flex items-center justify-center px-7 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-colors"
          >
            Zamów online
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            href="/#pakiety"
            className="inline-flex items-center justify-center px-7 py-4 bg-white text-navy-900 font-bold rounded-lg hover:bg-navy-50 transition-colors"
          >
            Zobacz pakiety
          </Link>
        </div>
      </div>

      {/* Powiązane artykuły */}
      {list.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Powiązane artykuły</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {list.map((a) => {
              const inner = (
                <div className="h-full bg-gradient-to-br from-white to-navy-50 border-2 border-navy-100 rounded-2xl p-5 hover:border-gold-400 transition-all flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-navy-900 text-gold-400 text-xs font-semibold">
                      {a.category}
                    </span>
                    {!a.published && (
                      <span className="inline-flex items-center gap-1 text-navy-400 text-xs">
                        <Lock className="w-3 h-3" /> Wkrótce
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm leading-snug flex-grow">
                    {a.title}
                  </h3>
                </div>
              );
              return a.published ? (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="block h-full">
                  {inner}
                </Link>
              ) : (
                <div key={a.slug} className="h-full">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
