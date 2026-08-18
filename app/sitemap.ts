import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

const ROUTES = [
  '',
  '/what-is-yellowzone',
  '/criteria',
  '/why-certify',
  '/certified-schools',
  '/about',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: route === '/certified-schools' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
