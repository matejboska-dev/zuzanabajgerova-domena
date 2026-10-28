import 'server-only';
import type { ReactNode } from 'react';
import type { Locale } from './i18n';
import { localizeTree as tree, translate as shortText } from './localize';
import en from './translations/en.server.json';
import it from './translations/it.server.json';
export { localized } from './localize';

const content: Record<'en' | 'it', Record<string, string>> = { en, it };
/** Long editorial text and source listing descriptions never enter the client bundle. */
export function translate(text: string, locale: Locale): string {
  if (locale === 'cs') return text;
  return content[locale][text.replace(/\s+/g, ' ').trim()] ?? shortText(text, locale);
}
export function localizeTree(node: ReactNode, locale: Locale): ReactNode {
  return tree(node, locale, translate);
}

/** A changed or new scraper description must not reuse an outdated translation. */
export function propertyDescription(text: string, locale: Locale): string {
  const translated = translate(text, locale);
  if (locale === 'cs' || translated !== text) return translated;
  return locale === 'en'
    ? 'Contact me for a translated description and the current details of this property.'
    : 'Contattami per una descrizione tradotta e i dettagli aggiornati di questo immobile.';
}
