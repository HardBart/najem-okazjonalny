import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

interface Crumb {
  name: string;
  href: string;
}

/**
 * Okruszki nawigacyjne + dane strukturalne BreadcrumbList (SEO).
 * Ostatni element traktowany jako bieżąca strona (bez linku).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items.map((i) => ({ name: i.name, url: i.href })))} />
      <nav aria-label="Okruszki" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-navy-600">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {isLast ? (
                  <span className="text-navy-900 font-medium">{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-gold-600 transition-colors">
                    {item.name}
                  </Link>
                )}
                {!isLast && <ChevronRight className="w-4 h-4 text-navy-400" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
