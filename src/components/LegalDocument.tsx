'use client';

import { Fragment, type ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { company, fullAddress } from '@/lib/company';
import { LEGAL } from '@/lib/legal';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

/**
 * Generyczny renderer dokumentów prawnych (regulamin, polityka prywatności).
 * Treść pochodzi ze słownika i18n pod kluczem `docKey` (np. 'legal.privacy'),
 * dzięki czemu jeden komponent obsługuje wszystkie języki. Dane firmy i wersje
 * dokumentów wstrzykiwane są przez tokeny {{...}} z jednego źródła prawdy.
 */

type Block =
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'h3'; text: string }
  | { t: 'note'; text: string };

interface Section {
  h?: string;
  blocks: Block[];
}

interface Highlight {
  h: string;
  items: string[];
}

export interface LegalDoc {
  title: string;
  meta: string;
  breadcrumb: string;
  notice?: string;
  highlight?: Highlight;
  sections: Section[];
}

const TOKENS: Record<string, string> = {
  legalName: company.legalName,
  fullAddress,
  nip: company.nip,
  regon: company.regon,
  krs: company.krs,
  email: company.email,
  domain: company.domain,
  payment: LEGAL.paymentProvider,
  date: LEGAL.effectiveDate,
  version: LEGAL.politykaVersion,
  versionTerms: LEGAL.regulaminVersion,
};

function subst(text: string): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, k: string) => TOKENS[k] ?? `{{${k}}}`);
}

/** Parsuje proste znaczniki **pogrubienie** oraz [etykieta](/link). */
function inline(raw: string, keyBase: string): ReactNode[] {
  const text = subst(raw);
  const nodes: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(<strong key={`${keyBase}-${i}`}>{m[1]}</strong>);
    } else {
      nodes.push(
        <a key={`${keyBase}-${i}`} href={m[3]} className="text-gold-600 hover:underline">
          {m[2]}
        </a>
      );
    }
    last = regex.lastIndex;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderBlock(block: Block, key: string): ReactNode {
  switch (block.t) {
    case 'h3':
      return (
        <h3 key={key} className="font-semibold text-navy-900 mb-2 mt-6">
          {inline(block.text, key)}
        </h3>
      );
    case 'ul':
      return (
        <ul key={key} className="list-disc pl-6 space-y-1 mb-3">
          {block.items.map((it, j) => (
            <li key={`${key}-${j}`}>{inline(it, `${key}-${j}`)}</li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <p key={key}>
          {subst(block.text)
            .split('\n')
            .map((line, j, arr) => (
              <Fragment key={`${key}-${j}`}>
                {inline(line, `${key}-${j}`)}
                {j < arr.length - 1 && <br />}
              </Fragment>
            ))}
        </p>
      );
    default:
      return (
        <p key={key} className="mb-2">
          {inline(block.text, key)}
        </p>
      );
  }
}

const HOME_LABEL: Record<string, string> = {
  pl: 'Strona główna',
  en: 'Home',
  uk: 'Головна',
};

export default function LegalDocument({ docKey }: { docKey: string }) {
  const { tx, locale } = useLanguage();
  const doc = tx<LegalDoc>(docKey);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: HOME_LABEL[locale] ?? HOME_LABEL.pl, href: '/' },
              { name: doc.breadcrumb, href: '#' },
            ]}
          />

          <h1 className="text-4xl font-bold text-navy-900 mb-2">{doc.title}</h1>
          <p className="text-sm text-navy-500 mb-6">{subst(doc.meta)}</p>

          {doc.notice && (
            <p className="text-sm italic text-navy-500 border-l-4 border-navy-100 pl-4 mb-10">
              {inline(doc.notice, 'notice')}
            </p>
          )}

          <div className="space-y-10 text-navy-700 leading-relaxed">
            {doc.highlight && (
              <section className="bg-navy-50 border-2 border-navy-100 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-3">{doc.highlight.h}</h2>
                <ul className="list-disc pl-6 space-y-1">
                  {doc.highlight.items.map((it, j) => (
                    <li key={`hl-${j}`}>{inline(it, `hl-${j}`)}</li>
                  ))}
                </ul>
              </section>
            )}

            {doc.sections.map((sec, i) => (
              <section key={`sec-${i}`}>
                {sec.h && (
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">{inline(sec.h, `sec-${i}-h`)}</h2>
                )}
                {sec.blocks.map((b, j) => renderBlock(b, `sec-${i}-b${j}`))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
