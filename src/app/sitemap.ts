import type { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';
import { publishedArticles } from '@/lib/articles';

const BASE_URL = 'https://najemokazjonalny24.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/zamowienie`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/dla-wynajmujacych`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/obsluga-wielu-lokali`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/najem-okazjonalny`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/polityka-prywatnosci`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/regulamin`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/rodo`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE_URL}/najem-okazjonalny/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = publishedArticles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages, ...articlePages];
}
