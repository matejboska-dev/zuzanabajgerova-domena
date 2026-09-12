// jazykove verze. cs je vychozi a jede BEZ prefixu (/), en a it s prefixem (/en, /it).
// slovenska verze se zamerne nedela — SK klient cte cesky a dve skoro stejne verze
// by si konkurovaly v SERP (viz PROJEKT-BAJGEROVA.md 4.3).

export const LOCALES = ['cs', 'en', 'it'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'cs';

/** locale, ktere maji v URL prefix (vse krome vychoziho) */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

/** hodnota do <html lang> a do hreflang */
export const HTML_LANG: Record<Locale, string> = { cs: 'cs', en: 'en', it: 'it' };

/** nazev jazyka pro prepinac, vzdy ve vlastnim jazyce */
export const LOCALE_NAME: Record<Locale, string> = {
  cs: 'Čeština',
  en: 'English',
  it: 'Italiano',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** '' pro cs, '/en' a '/it' pro zbytek */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

/** menova a ciselna lokalizace podle jazyka */
export const NUMBER_LOCALE: Record<Locale, string> = {
  cs: 'cs-CZ',
  en: 'en-GB',
  it: 'it-IT',
};
