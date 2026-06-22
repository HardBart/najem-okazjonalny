import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ArticleFooterCTA from '@/components/ArticleFooterCTA';
import BlogLangNotice from '@/components/BlogLangNotice';
import { Calendar, Clock, Check } from 'lucide-react';
import { articles } from '@/lib/articles';
import { getArticleContent } from '@/lib/articleContent';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/company';

interface Props {
  params: Promise<{ slug: string }>;
}

/** Generujemy strony tylko dla opublikowanych artykułów, które mają treść. */
export function generateStaticParams() {
  return articles
    .filter((a) => a.published && getArticleContent(a.slug))
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | Najem Okazjonalny`,
    description: article.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'Najem Okazjonalny',
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const content = getArticleContent(slug);
  if (!article || !content) notFound();

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.excerpt,
          slug,
          datePublished: article.date,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${slug}` },
        ])}
      />
      {content.faq && content.faq.length > 0 && (
        <JsonLd data={faqSchema(content.faq.map((f) => ({ question: f.q, answer: f.a })))} />
      )}

      <Header />

      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name: article.title, href: `/blog/${slug}` },
            ]}
          />

          <header className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-navy-900 text-gold-400 text-xs font-semibold mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-5 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-navy-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('pl-PL')}
                </time>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} czytania
              </span>
            </div>
          </header>

          <BlogLangNotice />

          {/* Lead */}
          <p className="text-xl text-navy-700 leading-relaxed mb-10">{content.intro}</p>

          {/* Sekcje */}
          <div className="space-y-8">
            {content.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">{section.heading}</h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-navy-700 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-navy-800">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* FAQ artykułu */}
          {content.faq && content.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Najczęstsze pytania</h2>
              <div className="space-y-4">
                {content.faq.map((f, i) => (
                  <div key={i} className="bg-gradient-to-br from-white to-navy-50 border border-navy-100 rounded-xl p-5">
                    <h3 className="font-semibold text-navy-900 mb-2">{f.q}</h3>
                    <p className="text-navy-700 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <ArticleFooterCTA currentSlug={slug} category={article.category} />

      <Footer />
    </main>
  );
}
