// Kanonicky slug nabidky.
//
// PROC NE slug z RE/MAXu: scraper ho bere z jejich URL, takze (a) se meni, kdyz
// makleřka prepise nazev zakazky v MAXISu, (b) neni unikatni — v datech z 27. 8. 2026
// jsou 3 kolize (napr. dva ruzne byty maji oba 'prodej-bytu-3-kk-...-montesilvano').
// Obojí je v rozporu se SCRAPER-SPEC.md ("slug se nikdy nemeni") a rozbiji SEO.
//
// Kanonicky tvar: <typ>-<obec>-<id>, napr. byt-tollo-445838
//   - unikatni, protoze konci ID (primarni klic z URL detailu na RE/MAXu)
//   - stabilni, protoze ID se nikdy nemeni
//   - citelny a nese klicova slova
//
// Rozliseni je vzdy podle koncoveho ID, ne podle celeho slugu. Kdyz se tedy
// zmeni typ nebo obec, stara URL porad funguje a jen presmeruje (301) na novy tvar.
// Diky tomu web nikdy nevrati 404 na driv indexovanou nabidku.

import type { Property } from './types';

const TYPE_SEGMENT: Record<string, string> = {
  byt: 'byt',
  dum: 'dum',
  vila: 'vila',
  pozemek: 'pozemek',
  chata: 'chata',
  komercni: 'komercni',
};

/** diakritika pryc, mezery na pomlcky, jen [a-z0-9-] */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** kanonicky slug nabidky: <typ>-<obec>-<id> */
export function propertySlug(p: Pick<Property, 'id' | 'type' | 'locality'>): string {
  const typ = TYPE_SEGMENT[p.type] || slugify(p.type) || 'nemovitost';
  const misto = slugify(p.locality?.obec || p.locality?.provincie || p.locality?.zeme || '');
  return [typ, misto, String(p.id)].filter(Boolean).join('-');
}

/** ID z libovolneho slugu — bere koncove cislo. 'byt-tollo-445838' -> '445838' */
export function idFromSlug(slug: string): string | null {
  const m = /(\d+)$/.exec(slug);
  return m ? m[1] : null;
}
