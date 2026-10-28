// JEDINY zdroj pravdy pro URL webu. Zadny <Link href="/necim"> natvrdo v komponentach,
// vzdy path('id', locale). Kdyz se segment zmeni, zmeni se na jednom miste.
//
// Schema (schvalena struktura, PROJEKT-BAJGEROVA.md 4.2):
//   /                                 domu
//   /nemovitosti                      vypis
//   /nemovitosti/<slug>               detail nabidky
//   /lokality                         rozcestnik
//   /lokality/<slug>                  lokalita
//   /jak-koupit-nemovitost-v-italii   pilirova stranka
//   /sluzby /o-mne /reference /kontakt /konzultace
//   /clanky /clanky/<slug>
//   /ochrana-osobnich-udaju /podminky-uziti /cookies /mapa-stranek /dekujeme
//
// Jazykove verze: cs bez prefixu. Hotove sluzby maji lokalizovane EN/IT segmenty;
// ostatni existujici routy si ponechavaji sve adresy.

import { articleBySlug, articleFor } from './articles';
import { DEFAULT_LOCALE, LIVE_LOCALES, LOCALES, localePrefix, type Locale } from './i18n';

export const SEGMENTS = {
  home: '',
  nemovitosti: 'nemovitosti',
  nemovitost: 'nemovitosti', // detail visi pod vypisem
  lokality: 'lokality',
  lokalita: 'lokality',
  jakKoupit: 'jak-koupit-nemovitost-v-italii',
  koupePrakticky: 'jak-koupit-nemovitost-v-italii/prakticke-informace',
  sluzby: 'sluzby',
  koupe: 'sluzby/koupe',
  rekonstrukce: 'sluzby/rekonstrukce',
  sprava: 'sluzby/sprava',
  pronajem: 'sluzby/pronajem',
  oMne: 'o-mne',
  reference: 'reference',
  kontakt: 'kontakt',
  konzultace: 'konzultace',
  clanky: 'clanky',
  clanek: 'clanky',
  ochranaUdaju: 'ochrana-osobnich-udaju',
  cookies: 'cookies',
  podminky: 'podminky-uziti',
  mapaStranek: 'mapa-stranek',
  dekujeme: 'dekujeme',
  dotaznik: 'dotaznik', // neverejna stranka: bez odkazu v menu, noindex, mimo sitemap
} as const;

export type RouteId = keyof typeof SEGMENTS;

/** routy, ktere maji dynamicky segment navic */
const DYNAMIC: Partial<Record<RouteId, true>> = {
  nemovitost: true,
  lokalita: true,
  clanek: true,
};

/** All current routes are available in each published language. */
export const CS_ONLY: RouteId[] = [];

/** stranky mimo indexaci — nepatri do sitemap.xml */
export const NOINDEX: RouteId[] = ['dekujeme', 'dotaznik'];

export const SERVICE_IDS = ['koupe', 'rekonstrukce', 'sprava', 'pronajem'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];
const SERVICE_SEGMENTS: Record<Locale, Record<ServiceId | 'sluzby', string>> = {
  cs: { sluzby: 'sluzby', koupe: 'sluzby/koupe', rekonstrukce: 'sluzby/rekonstrukce', sprava: 'sluzby/sprava', pronajem: 'sluzby/pronajem' },
  en: { sluzby: 'services', koupe: 'services/property-purchase', rekonstrukce: 'services/renovation', sprava: 'services/property-management', pronajem: 'services/holiday-rental-management' },
  it: { sluzby: 'servizi', koupe: 'servizi/acquisto-immobili', rekonstrukce: 'servizi/ristrutturazioni', sprava: 'servizi/gestione-immobili', pronajem: 'servizi/gestione-affitti-brevi' },
};

/** Blog ma v kazdem jazyce vlastni segment (cs /clanky, en a it /blog). */
const BLOG_SEGMENT: Record<Locale, string> = { cs: 'clanky', en: 'blog', it: 'blog' };
const isBlog = (id: RouteId) => id === 'clanky' || id === 'clanek';

/** Published language variants used by metadata, navigation and the sitemap. */
export function publishedLocales(id: RouteId): Locale[] {
  if (id === 'sluzby' || isBlog(id) || SERVICE_IDS.includes(id as ServiceId)) return ['cs', 'en', 'it'];
  return CS_ONLY.includes(id) ? [DEFAULT_LOCALE] : LIVE_LOCALES;
}

export function serviceFromSlug(locale: Locale, slug: string): ServiceId | undefined {
  return SERVICE_IDS.find((id) => SERVICE_SEGMENTS[locale][id].split('/')[1] === slug);
}

export function serviceSlug(id: ServiceId, locale: Locale): string {
  return SERVICE_SEGMENTS[locale][id].split('/')[1];
}

/**
 * Sestavi cestu. path('nemovitost', 'cs', 'byt-tollo-445838') -> /nemovitosti/byt-tollo-445838
 * path('kontakt', 'en') -> /en/kontakt ; path('home', 'cs') -> /
 */
export function path(id: RouteId, locale: Locale = DEFAULT_LOCALE, slug?: string): string {
  const loc = CS_ONLY.includes(id) ? DEFAULT_LOCALE : locale;
  const segment = isBlog(id) ? BLOG_SEGMENT[loc] : id === 'sluzby' || SERVICE_IDS.includes(id as ServiceId)
    ? SERVICE_SEGMENTS[loc][id as ServiceId | 'sluzby'] : SEGMENTS[id];
  const parts = [localePrefix(loc), segment, DYNAMIC[id] ? slug : undefined].filter(
    (x): x is string => Boolean(x),
  );
  return '/' + parts.join('/').replace(/^\/+/, '');
}

/** Keep translated pages in context across all three languages. */
export function languagePath(pathname: string, locale: Locale): string {
  const current = pathname.replace(/\/$/, '') || '/';
  const blog = current.match(/^(?:\/(?:cs|en|it))?\/(?:clanky|blog)\/([^/]+)$/);
  if (blog) {
    const from = LOCALES.find((l) => articleBySlug(l, blog[1]));
    const art = from && articleBySlug(from, blog[1]);
    const target = art && articleFor(locale, art.id);
    return target ? path('clanek', locale, target.slug) : path('clanky', locale);
  }
  const withoutLocale = current.replace(/^\/(cs|en|it)(?=\/|$)/, '') || '/';
  for (const id of Object.keys(SEGMENTS) as RouteId[]) {
    const base = path(id, DEFAULT_LOCALE);
    const exact = LOCALES.some(l => current === path(id, l)) || withoutLocale === base;
    const detail = DYNAMIC[id] && withoutLocale.startsWith(base + '/');
    if (exact || detail) {
      return publishedLocales(id).includes(locale)
        ? path(id, locale, detail ? withoutLocale.slice(base.length + 1) : undefined)
        : path('home', locale);
    }
  }
  return path('home', locale);
}

/** polozky hlavniho menu v poradi ze schvalene struktury */
export const MAIN_NAV: { id: RouteId; label: Record<Locale, string> }[] = [
  {
    id: 'nemovitosti',
    label: { cs: 'Nemovitosti', en: 'Properties', it: 'Immobili' },
  },
  { id: 'lokality', label: { cs: 'Lokality', en: 'Locations', it: 'Località' } },
  {
    id: 'jakKoupit',
    label: { cs: 'Jak koupit v Itálii', en: 'How to buy', it: 'Come comprare' },
  },
  { id: 'sluzby', label: { cs: 'Služby', en: 'Services', it: 'Servizi' } },
  { id: 'clanky', label: { cs: 'Blog', en: 'Blog', it: 'Blog' } },
  { id: 'oMne', label: { cs: 'O mně', en: 'About', it: 'Chi sono' } },
  { id: 'kontakt', label: { cs: 'Kontakt', en: 'Contact', it: 'Contatti' } },
];

export const FOOTER_NAV: RouteId[] = ['ochranaUdaju', 'podminky', 'cookies', 'mapaStranek'];

/** verejna adresa webu — do sitemap, kanonickych URL a hreflang */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zuzanabajgerova.cz').replace(
  /\/$/,
  '',
);

export function absolute(p: string): string {
  return SITE_URL + p;
}
