import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import StatsCounter from '@/components/StatsCounter';
import QuickQuiz from '@/components/QuickQuiz';
import TypicalSituationsSection from '@/components/TypicalSituationsSection';
import CTABand from '@/components/CTABand';
import HowItWorksSection from '@/components/HowItWorksSection';
import ConcernsSection from '@/components/ConcernsSection';
import TrustReasonsSection from '@/components/TrustReasonsSection';
import PolandCoverageSection from '@/components/PolandCoverageSection';
import ImprovedPackagesSection from '@/components/ImprovedPackagesSection';
import DetailedProcessSection from '@/components/DetailedProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ImprovedFAQSection from '@/components/ImprovedFAQSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import StickyCTA from '@/components/StickyCTA';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, localBusinessSchema, faqSchema } from '@/lib/schema';
import { faqForSchema } from '@/lib/faqs';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Dane strukturalne (SEO) */}
      <JsonLd data={organizationSchema()} />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(faqForSchema)} />

      <Header />

      <HeroSection />
      <StatsCounter />
      <QuickQuiz />
      <TypicalSituationsSection />

      <CTABand variant="dark" />

      <HowItWorksSection />
      <ConcernsSection />
      <TrustReasonsSection />
      <PolandCoverageSection />

      <CTABand variant="light" content="light" />

      <ImprovedPackagesSection />
      <DetailedProcessSection />
      <TestimonialsSection />

      <ImprovedFAQSection />
      <AboutSection />
      <ContactSection />

      <Footer />

      {/* Element pływający */}
      <StickyCTA />
    </main>
  );
}
