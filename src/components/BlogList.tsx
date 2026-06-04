'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Lock, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { articles, BLOG_CATEGORIES } from '@/lib/articles';

export default function BlogList() {
  const [active, setActive] = useState<string>('Wszystkie');
  const [query, setQuery] = useState('');

  const categories = ['Wszystkie', ...BLOG_CATEGORIES];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = active === 'Wszystkie' || a.category === active;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [active, query]);

  return (
    <div>
      {/* Wyszukiwarka */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj artykułu, np. notariusz, obcokrajowiec, eksmisja..."
            className="w-full pl-12 pr-4 py-3 border-2 border-navy-200 rounded-full focus:border-gold-500 focus:outline-none transition-colors"
            aria-label="Szukaj w blogu"
          />
        </div>
      </div>

      {/* Filtr kategorii */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
              active === cat
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-white text-navy-700 border-navy-200 hover:border-gold-400'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-center text-navy-600 py-12">
          Brak artykułów pasujących do wyszukiwania. Spróbuj innej frazy lub kategorii.
        </p>
      )}

      {/* Siatka artykułów */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((article) => {
          const card = (
            <div
              className={cn(
                'h-full bg-gradient-to-br from-white to-navy-50 border-2 rounded-2xl overflow-hidden transition-all flex flex-col',
                article.published
                  ? 'border-navy-100 hover:border-gold-400 hover:shadow-xl group'
                  : 'border-navy-100 opacity-90'
              )}
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-navy-900 text-gold-400 text-xs font-semibold">
                    {article.category}
                  </span>
                  {!article.published && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-navy-100 text-navy-500 text-xs font-medium">
                      <Lock className="w-3 h-3" />
                      Wkrótce
                    </span>
                  )}
                </div>

                <h2
                  className={cn(
                    'text-lg font-bold text-navy-900 mb-2 leading-snug',
                    article.published && 'group-hover:text-gold-600 transition-colors'
                  )}
                >
                  {article.title}
                </h2>

                <p className="text-navy-700 text-sm leading-relaxed mb-4 flex-grow">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-navy-200 text-sm text-navy-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('pl-PL')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                  {article.published && (
                    <span className="flex items-center gap-1 text-gold-600 font-semibold group-hover:gap-2 transition-all">
                      Czytaj
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );

          return article.published ? (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block h-full">
              {card}
            </Link>
          ) : (
            <div key={article.slug} className="h-full cursor-default" title="Artykuł w przygotowaniu">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
