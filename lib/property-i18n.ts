import type { Property } from './types';
import { NUMBER_LOCALE, type Locale } from './i18n';

// Nazvy nabidek prichazeji z RE/MAX cesky ("Prodej bytu 3+kk ... 83 m², Silvi").
// Pro EN a IT se sklada z strukturovanych poli, aby nikde nezustal cesky text.

const TYPE: Record<Exclude<Locale, 'cs'>, Record<string, string>> = {
  en: { byt: 'Apartment', dum: 'House', pozemek: 'Land plot', vila: 'Villa', chata: 'Cottage', komercni: 'Commercial property' },
  it: { byt: 'Appartamento', dum: 'Casa', pozemek: 'Terreno', vila: 'Villa', chata: 'Chalet', komercni: 'Immobile commerciale' },
};
const FOR_SALE = { en: 'for sale', it: 'in vendita' } as const;

export function localizedTitle(p: Property, locale: Locale): string {
  if (locale === 'cs') return p.title;
  const type = TYPE[locale][p.type] ?? { en: 'Property', it: 'Immobile' }[locale];
  const disp = p.disposition ? p.disposition.replace(/\s*a více/, '+') : null;
  const parts = [`${type}${disp ? ` ${disp}` : ''}`, p.area_usable_m2 ? `${p.area_usable_m2} m²` : null, p.locality?.obec].filter(Boolean);
  return `${parts.join(', ')} ${FOR_SALE[locale]}`;
}

export function fmtEurL(n: number | null, locale: Locale): string {
  if (n == null) return { cs: 'cena na dotaz', en: 'price on request', it: 'prezzo su richiesta' }[locale];
  return new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(n) + ' €';
}

export const PROPERTY_UI = {
  cs: { recommended: 'Doporučujeme', exclusive: 'Exkluzivně', energy: 'Energetická třída' },
  en: { recommended: 'Recommended', exclusive: 'Exclusive', energy: 'Energy class' },
  it: { recommended: 'Consigliato', exclusive: 'Esclusiva', energy: 'Classe energetica' },
} as const;

export const STATUS_LABEL_L: Record<Locale, Record<string, string>> = {
  cs: { aktivní: '', rezervováno: 'Rezervováno', prodáno: 'Prodáno', neaktivní: 'Staženo z nabídky' },
  en: { aktivní: '', rezervováno: 'Reserved', prodáno: 'Sold', neaktivní: 'Withdrawn' },
  it: { aktivní: '', rezervováno: 'Riservato', prodáno: 'Venduto', neaktivní: 'Ritirato' },
};
