import type { Metadata } from 'next';
import { HTML_LANG, LOCALES, DEFAULT_LOCALE, type Locale } from './i18n';
import { absolute, path, type RouteId } from './routes';

const SITE_NAME = 'Bc. Zuzana Bajgerová';

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
}): Metadata {
  const { id, locale, slug, title, description } = opts;
  const canonical = absolute(path(id, locale, slug));

  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HTML_LANG[l]] = absolute(path(id, l, slug));
  languages['x-default'] = absolute(path(id, DEFAULT_LOCALE, slug));

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: HTML_LANG[locale],
      type: 'website',
    },
  };
}
