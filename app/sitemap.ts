import type { MetadataRoute } from 'next';
import { listProperties } from '@/lib/data.server';
import { propertySlug } from '@/lib/slug';
import { LOCALITY_SLUGS } from '@/lib/localities';
import { HTML_LANG, LOCALES, DEFAULT_LOCALE } from '@/lib/i18n';
import { NOINDEX, absolute, path, type RouteId } from '@/lib/routes';

// sitemap se generuje z routes.ts, ne rucne — kdyz pribude stranka, pribude i tady

const STATIC: RouteId[] = [
  'home',
  'nemovitosti',
  'lokality',
  'jakKoupit',
  'sluzby',
  'oMne',
  'reference',
  'kontakt',
  'konzultace',
  'clanky',
  'ochranaUdaju',
  'cookies',
  'mapaStranek',
];

function alternates(id: RouteId, slug?: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HTML_LANG[l]] = absolute(path(id, l, slug));
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const id of STATIC) {
    if (NOINDEX.includes(id)) continue;
    entries.push({
      url: absolute(path(id, DEFAULT_LOCALE)),
      changeFrequency: id === 'home' || id === 'nemovitosti' ? 'daily' : 'monthly',
      priority: id === 'home' ? 1 : 0.7,
      alternates: alternates(id),
    });
  }

  for (const slug of LOCALITY_SLUGS) {
    entries.push({
      url: absolute(path('lokalita', DEFAULT_LOCALE, slug)),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: alternates('lokalita', slug),
    });
  }

  // stazene nabidky zustavaji v sitemap: stranka zije dal ("tahle je pryc, mam podobne")
  for (const p of await listProperties()) {
    const slug = propertySlug(p);
    entries.push({
      url: absolute(path('nemovitost', DEFAULT_LOCALE, slug)),
      lastModified: p.last_change ? new Date(p.last_change) : undefined,
      changeFrequency: 'weekly',
      priority: p.status === 'aktivní' ? 0.8 : 0.3,
      alternates: alternates('nemovitost', slug),
    });
  }

  return entries;
}
