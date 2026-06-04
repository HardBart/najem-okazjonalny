/**
 * Generatory danych strukturalnych schema.org (JSON-LD).
 * Wstrzykiwane przez <script type="application/ld+json"> w odpowiednich stronach.
 * Poprawia widoczność w Google (rich results: FAQ, oceny, breadcrumbs, firma).
 */
import { company, fullAddress, SITE_URL, majorCities } from './company';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.legalName,
    alternateName: company.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: company.email,
    telephone: company.phone,
    sameAs: [] as string[],
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: company.address.country,
    },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${SITE_URL}/#business`,
    name: company.legalName,
    description:
      'Kompleksowa obsługa najmu okazjonalnego: adres do umowy, oświadczenie właściciela lokalu z poświadczeniem notarialnym. Obsługa klientów z całej Polski.',
    url: SITE_URL,
    telephone: company.phone,
    email: company.email,
    priceRange: 'zł',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: company.address.country,
    },
    areaServed: majorCities.map((city) => ({ '@type': 'City', name: city })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    image: `${SITE_URL}/og-image.png`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: { '@type': 'Organization', name: company.brandName },
    publisher: {
      '@type': 'Organization',
      name: company.brandName,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${opts.slug}`,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** Helper komponent do renderu JSON-LD. Użycie: <JsonLd data={faqSchema(...)} /> */
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}
