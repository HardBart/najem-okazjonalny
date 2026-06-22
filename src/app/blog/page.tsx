import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogList from '@/components/BlogList';
import CTABand from '@/components/CTABand';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog o najmie okazjonalnym — porady, dokumenty, prawo | Najem Okazjonalny',
  description:
    'Praktyczne poradniki o najmie okazjonalnym: adres do umowy, oświadczenie właściciela, notariusz, prawa najemcy i właściciela. Odpowiedzi na realne pytania.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog o najmie okazjonalnym — porady, dokumenty, prawo',
    description:
      'Praktyczne poradniki o najmie okazjonalnym: dokumenty, notariusz, prawa stron umowy.',
    type: 'website',
    url: 'https://najemokazjonalny24.com/blog',
    siteName: 'Najem Okazjonalny',
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Blog', href: '/blog' },
            ]}
          />

          <BlogList />
        </div>
      </div>

      <CTABand variant="dark" />

      <Footer />
    </main>
  );
}
