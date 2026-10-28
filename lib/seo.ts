import { translate } from './localize.server';
import type { Metadata } from 'next';
import { HTML_LANG, DEFAULT_LOCALE, type Locale } from './i18n';
import { absolute, path, publishedLocales, type RouteId } from './routes';

const SITE_NAME = 'Bc. Zuzana Bajgerová';

// 1200x630, karta ve stylu webu (public/og/). Pro jednotlive stranky jde prebit parametrem image.
const DEFAULT_OG_IMAGE = '/og/default.jpg';

/**
 * Metadata jedne stranky vcetne kanonicke URL a hreflang.
 * x-default miri na ceskou verzi (PROJEKT-BAJGEROVA.md 4.3).
 */
export function pageMetadata(opts: {
  id: RouteId;
  locale: Locale;
  slug?: string;
  title: string;
  description: string;
  /** obrazek pro sdileni (cesta v /public). Default: obecna karta webu */
  image?: string;
  /** stranka existuje jen cesky: bez hreflang na /en a /it (ty zatim neexistuji) */
  onlyCs?: boolean;
  /** adresa (slug) stranky v jednotlivych jazycich, kdyz se lisi (clanky) */
  slugs?: Partial<Record<Locale, string>>;
}): Metadata {
  const { id, locale, slug } = opts;
  const title = translate(opts.title, locale);
  const description = translate(opts.description, locale);
  const ogImage = absolute(opts.image ?? DEFAULT_OG_IMAGE);
  const slugFor = (l: Locale) => opts.slugs?.[l] ?? slug;
  const canonical = absolute(path(id, locale, slugFor(locale)));

  const languages: Record<string, string> = {};
  const readyLocales = opts.onlyCs ? [DEFAULT_LOCALE] : publishedLocales(id);
  for (const l of readyLocales) {
    languages[HTML_LANG[l]] = absolute(path(id, l, slugFor(l)));
  }
  languages['x-default'] = absolute(path(id, DEFAULT_LOCALE, slugFor(DEFAULT_LOCALE)));

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical, languages },
    // jazykova verze, ktera jeste neni hotova (LIVE_LOCALES), nesmi do indexu
    robots: { index: readyLocales.includes(locale), follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: HTML_LANG[locale],
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${SITE_NAME}, ${title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
