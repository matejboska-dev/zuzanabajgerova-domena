import type { Metadata } from 'next';
import { HTML_LANG, LIVE_LOCALES, DEFAULT_LOCALE, type Locale } from './i18n';
import { absolute, path, type RouteId } from './routes';

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
}): Metadata {
  const { id, locale, slug, title, description } = opts;
  const ogImage = absolute(opts.image ?? DEFAULT_OG_IMAGE);
  const canonical = absolute(path(id, locale, slug));

  const languages: Record<string, string> = {};
  for (const l of opts.onlyCs ? [DEFAULT_LOCALE] : LIVE_LOCALES) {
    languages[HTML_LANG[l]] = absolute(path(id, l, slug));
  }
  languages['x-default'] = absolute(path(id, DEFAULT_LOCALE, slug));

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical, languages },
    // jazykova verze, ktera jeste neni hotova (LIVE_LOCALES), nesmi do indexu
    ...(LIVE_LOCALES.includes(locale) ? {} : { robots: { index: false, follow: true } }),
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
