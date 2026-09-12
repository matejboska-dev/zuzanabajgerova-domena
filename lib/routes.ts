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
//   /ochrana-osobnich-udaju /cookies /mapa-stranek /dekujeme
//
// Jazykove verze: cs bez prefixu, /en/... a /it/... se stejnymi segmenty.
// Prelozene segmenty (napr. /en/how-to-buy-property-in-italy) zamerne NE:
// vyzadovaly by prepisovaci tabulku v middleware a pro 9 podstranek se to nevyplati.
// Az to bude potreba, meni se jen tenhle soubor + middleware.

import { DEFAULT_LOCALE, localePrefix, type Locale } from './i18n';

export const SEGMENTS = {
  home: '',
  nemovitosti: 'nemovitosti',
  nemovitost: 'nemovitosti', // detail visi pod vypisem
  lokality: 'lokality',
  lokalita: 'lokality',
  jakKoupit: 'jak-koupit-nemovitost-v-italii',
  sluzby: 'sluzby',
  oMne: 'o-mne',
  reference: 'reference',
  kontakt: 'kontakt',
  konzultace: 'konzultace',
  clanky: 'clanky',
  clanek: 'clanky',
  ochranaUdaju: 'ochrana-osobnich-udaju',
  cookies: 'cookies',
  mapaStranek: 'mapa-stranek',
  dekujeme: 'dekujeme',
} as const;

export type RouteId = keyof typeof SEGMENTS;

/** routy, ktere maji dynamicky segment navic */
const DYNAMIC: Partial<Record<RouteId, true>> = {
  nemovitost: true,
  lokalita: true,
  clanek: true,
};

/** stranky mimo indexaci — nepatri do sitemap.xml */
export const NOINDEX: RouteId[] = ['dekujeme'];

/**
 * Sestavi cestu. path('nemovitost', 'cs', 'byt-tollo-445838') -> /nemovitosti/byt-tollo-445838
 * path('kontakt', 'en') -> /en/kontakt ; path('home', 'cs') -> /
 */
export function path(id: RouteId, locale: Locale = DEFAULT_LOCALE, slug?: string): string {
  const parts = [localePrefix(locale), SEGMENTS[id], DYNAMIC[id] ? slug : undefined].filter(
    (x): x is string => Boolean(x),
  );
  return '/' + parts.join('/').replace(/^\/+/, '');
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
  { id: 'oMne', label: { cs: 'O mně', en: 'About', it: 'Chi sono' } },
  { id: 'kontakt', label: { cs: 'Kontakt', en: 'Contact', it: 'Contatti' } },
];

export const FOOTER_NAV: RouteId[] = ['ochranaUdaju', 'cookies', 'mapaStranek'];

/** verejna adresa webu — do sitemap, kanonickych URL a hreflang */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zuzanabajgerova.cz').replace(
  /\/$/,
  '',
);

export function absolute(p: string): string {
  return SITE_URL + p;
}
