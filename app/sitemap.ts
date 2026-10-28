import type { MetadataRoute } from 'next';
import { ARTICLES, articleFor } from '@/lib/articles';
import { listProperties } from '@/lib/data.server';
import { propertySlug } from '@/lib/slug';
import { LOCALITY_SLUGS } from '@/lib/localities';
import { HTML_LANG, DEFAULT_LOCALE, LOCALES } from '@/lib/i18n';
import { NOINDEX, SERVICE_IDS, publishedLocales, absolute, path, type RouteId } from '@/lib/routes';

// sitemap se generuje z routes.ts, ne rucne — kdyz pribude stranka, pribude i tady

const STATIC: RouteId[] = [
  'home',
  'nemovitosti',
  'lokality',
  'jakKoupit',
  'koupePrakticky',
  'sluzby',
  ...SERVICE_IDS,
  'oMne',
  'reference',
  'kontakt',
  'konzultace',
  'clanky',
  'ochranaUdaju',
  'podminky',
  'cookies',
  'mapaStranek',
];

function alternates(id: RouteId, slug?: string) {
  const languages: Record<string, string> = {};
  for (const l of publishedLocales(id)) {
    languages[HTML_LANG[l]] = absolute(path(id, l, slug));
  }
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const id of STATIC) {
    if (NOINDEX.includes(id)) continue;
    for (const locale of publishedLocales(id)) entries.push({
      url: absolute(path(id, locale)),
      changeFrequency: id === 'home' || id === 'nemovitosti' ? 'daily' : 'monthly',
      priority: id === 'home' ? 1 : 0.7,
      alternates: alternates(id),
    });
  }

  for (const slug of LOCALITY_SLUGS) {
    for (const locale of publishedLocales('lokalita')) entries.push({
      url: absolute(path('lokalita', locale, slug)),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: alternates('lokalita', slug),
    });
  }

  for (const a of ARTICLES) {
    const slugs = Object.fromEntries(LOCALES.map((l) => [l, articleFor(l, a.slug)?.slug ?? a.slug]));
    const languages = Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], absolute(path('clanek', l, slugs[l]))]));
    for (const l of LOCALES) {
      entries.push({
        url: absolute(path('clanek', l, slugs[l])),
        lastModified: new Date(a.updated),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  // stazene nabidky zustavaji v sitemap: stranka zije dal ("tahle je pryc, mam podobne")
  for (const p of await listProperties()) {
    const slug = propertySlug(p);
    for (const locale of publishedLocales('nemovitost')) entries.push({
      url: absolute(path('nemovitost', locale, slug)),
      lastModified: p.last_change ? new Date(p.last_change) : undefined,
      changeFrequency: 'weekly',
      priority: p.status === 'aktivní' ? 0.8 : 0.3,
      alternates: alternates('nemovitost', slug),
    });
  }

  return entries;
}
