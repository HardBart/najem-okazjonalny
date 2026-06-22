import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ArticleFooterCTA from '@/components/ArticleFooterCTA';
import BlogLangNotice from '@/components/BlogLangNotice';
import { articleSchema } from '@/lib/schema';
import { Calendar, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Czy adres do najmu okazjonalnego jest legalny? | Najem Okazjonalny',
  description: 'Szczegółowe wyjaśnienie legalności udostępniania adresu do umowy najmu okazjonalnego. Podstawy prawne, orzecznictwo i praktyczne informacje.',
  keywords: 'najem okazjonalny legalność, adres do najmu okazjonalnego, czy najem okazjonalny jest legalny, oświadczenie właściciela lokalu',
  alternates: {
    canonical: '/blog/czy-adres-do-najmu-okazjonalnego-jest-legalny',
  },
  openGraph: {
    title: 'Czy adres do najmu okazjonalnego jest legalny?',
    description: 'Wszystko co musisz wiedzieć o legalności udostępniania adresu do umowy najmu okazjonalnego',
    type: 'article',
    publishedTime: '2026-06-02T10:00:00Z',
    url: 'https://najemokazjonalny24.com/blog/czy-adres-do-najmu-okazjonalnego-jest-legalny',
    siteName: 'Najem Okazjonalny',
  },
};

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={articleSchema({
          title: 'Czy adres do najmu okazjonalnego jest legalny?',
          description:
            'Szczegółowe wyjaśnienie legalności udostępniania adresu do umowy najmu okazjonalnego.',
          slug: 'czy-adres-do-najmu-okazjonalnego-jest-legalny',
          datePublished: '2026-06-02',
        })}
      />
      <Header />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Blog', href: '/blog' },
              {
                name: 'Czy adres do najmu okazjonalnego jest legalny?',
                href: '/blog/czy-adres-do-najmu-okazjonalnego-jest-legalny',
              },
            ]}
          />

          {/* Article Header */}
          <header className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-navy-900 text-gold-400 text-xs font-semibold mb-4">
              Prawo
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              Czy adres do najmu okazjonalnego jest legalny?
            </h1>

            <div className="flex items-center space-x-6 text-sm text-navy-600 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <time dateTime="2026-06-02">2 czerwca 2026</time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>8 min czytania</span>
              </div>
            </div>

            <p className="text-xl text-navy-700 leading-relaxed">
              To najczęstsze pytanie które słyszymy. Odpowiadamy jasno i szczegółowo
              wyjaśniając wszystkie aspekty prawne udostępniania adresu do umowy najmu
              okazjonalnego.
            </p>
          </header>

          <BlogLangNotice />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gold-50 border-l-4 border-gold-500 p-6 mb-8 rounded-r-lg">
              <p className="text-navy-900 font-semibold mb-2">TL;DR - Krótka odpowiedź</p>
              <p className="text-navy-700 mb-0">
                <strong>Tak, jest w pełni legalne.</strong> Udostępnianie adresu do najmu okazjonalnego
                jest zgodne z obowiązującymi przepisami prawa. Ustawa nie wymaga pokrewieństwa,
                a lokal może znajdować się w dowolnym mieście.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-navy-900 mt-12 mb-6">
              Podstawa prawna
            </h2>

            <p className="text-navy-700 leading-relaxed mb-6">
              Najem okazjonalny reguluje <strong>ustawa z dnia 21 czerwca 2001 r. o ochronie praw
              lokatorów, mieszkaniowym zasobie gminy i o zmianie Kodeksu cywilnego</strong> (Dz.U. 2001
              nr 71 poz. 733).
            </p>

            <p className="text-navy-700 leading-relaxed mb-6">
              Kluczowy jest art. 19a tej ustawy, który określa wymogi dla umowy najmu okazjonalnego.
              Przepis wymaga aby najemca wskazał adres dla celów doręczeń, ale{' '}
              <strong>nie wymaga aby był to adres członka rodziny</strong>.
            </p>

            <h2 className="text-3xl font-bold text-navy-900 mt-12 mb-6">
              Co dokładnie mówią przepisy?
            </h2>

            <p className="text-navy-700 leading-relaxed mb-6">
              Zgodnie z ustawą, umowa najmu okazjonalnego może być zawarta jeśli najemca
              złoży oświadczenie o posiadaniu tytułu prawnego do innego lokalu. Przepisy
              <strong> nie wymagają</strong>:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                <span className="text-navy-700">
                  Pokrewieństwa z właścicielem lokalu wskazanego w oświadczeniu
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                <span className="text-navy-700">
                  Aby lokal znajdował się w tym samym mieście co miejsce zamieszkania
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                <span className="text-navy-700">
                  Osobistej znajomości z właścicielem lokalu
                </span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-navy-900 mt-12 mb-6">
              Dlaczego to budzi wątpliwości?
            </h2>

            <p className="text-navy-700 leading-relaxed mb-6">
              Wiele osób mylnie zakłada, że przepisy wymagają wskazania adresu członka rodziny.
              To nieporozumienie wynika prawdopodobnie z praktyki, gdzie najczęściej najemcy
              rzeczywiście wskazują adresy rodziny.
            </p>

            <p className="text-navy-700 leading-relaxed mb-6">
              Jednak <strong>praktyka nie równa się obowiązkowi prawnemu</strong>. Przepisy
              wyraźnie tego nie wymagają.
            </p>

            <h2 className="text-3xl font-bold text-navy-900 mt-12 mb-6">
              Poświadczenie notarialne
            </h2>

            <p className="text-navy-700 leading-relaxed mb-6">
              Kluczowe znaczenie ma poświadczenie notarialne. Oświadczenie właściciela lokalu
              <strong> musi być poświadczone przez notariusza</strong>. To wymóg ustawowy,
              który zapewnia autentyczność dokumentu.
            </p>

            <p className="text-navy-700 leading-relaxed mb-6">
              Notariusz potwierdza tożsamość osoby składającej oświadczenie oraz fakt złożenia
              oświadczenia. Dzięki temu dokument ma pełną moc prawną.
            </p>

            <h2 className="text-3xl font-bold text-navy-900 mt-12 mb-6">
              Czy wynajmujący może odmówić?
            </h2>

            <p className="text-navy-700 leading-relaxed mb-6">
              Jeśli przedstawisz właścicielowi mieszkania (które chcesz wynająć) prawidłowe
              oświadczenie poświadczone notarialnie, <strong>nie może on odmówić</strong> zawarcia
              umowy najmu okazjonalnego.
            </p>

            <p className="text-navy-700 leading-relaxed mb-6">
              Najem okazjonalny to forma umowy najmu dostępna z mocy prawa. Właściciel nie ma
              podstaw prawnych aby odmówić, jeśli spełniasz wszystkie wymogi formalne.
            </p>

            <h2 className="text-3xl font-bold text-navy-900 mt-12 mb-6">
              Podsumowanie
            </h2>

            <div className="bg-navy-50 p-8 rounded-2xl mb-8">
              <p className="text-navy-900 font-semibold mb-4">
                Udostępnianie adresu do najmu okazjonalnego jest:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-navy-700">
                    <strong>Legalne</strong> - zgodne z ustawą o ochronie praw lokatorów
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-navy-700">
                    <strong>Dopuszczalne</strong> - przepisy nie wymagają pokrewieństwa
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-navy-700">
                    <strong>Praktykowane</strong> - stosowane przez tysiące osób w Polsce
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-navy-700">
                    <strong>Akceptowane</strong> - notariusze i urzędy przyjmują takie dokumenty
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-navy-700 leading-relaxed">
              Pamiętaj jednak, że kluczowe jest zachowanie wszelkich formalności -
              przede wszystkim notarialne poświadczenie oświadczenia właściciela lokalu.
            </p>
          </div>

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t border-navy-200">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-navy-600 hover:text-navy-900 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Wróć do wszystkich artykułów</span>
            </Link>
          </div>
        </div>
      </article>

      <ArticleFooterCTA
        currentSlug="czy-adres-do-najmu-okazjonalnego-jest-legalny"
        category="Prawo najmu"
      />

      <Footer />
    </main>
  );
}
