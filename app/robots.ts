import type { MetadataRoute } from 'next';
import { SEGMENTS, SITE_URL } from '@/lib/routes';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // dekovaci stranka nesmi do indexu (schvalena struktura ji ma jako [T] noindex)
      disallow: [`/${SEGMENTS.dekujeme}`, `/en/${SEGMENTS.dekujeme}`, `/it/${SEGMENTS.dekujeme}`],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
