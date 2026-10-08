import 'server-only';
import { listProperties } from './data.server';
import { localityOf } from './localities';
import type { Property } from './types';

// Cisla k lokalitam, spoctena z aktualni nabidky na webu (scraper). Nic odhadovaneho:
// kdyz je v lokalite malo nabidek, prumer za m2 se neukazuje (byl by zavadejici).

export type LocalityStats = {
  items: Property[];
  count: number;
  minPrice: number | null;
  medianPrice: number | null;
  /** median ceny za m2 uzitne plochy, jen kdyz jsou aspon 3 nabidky s plochou */
  medianPerM2: number | null;
};

const median = (xs: number[]) => {
  if (xs.length === 0) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
};

export async function localityStats(slug: string): Promise<LocalityStats> {
  const items = (await listProperties()).filter((p) => p.status === 'aktivní' && localityOf(p) === slug);
  const prices = items.map((p) => p.price_eur).filter((x): x is number => typeof x === 'number' && x > 0);
  const perM2 = items
    .filter((p) => p.price_eur && p.area_usable_m2 && p.area_usable_m2 >= 15)
    .map((p) => Math.round((p.price_eur as number) / (p.area_usable_m2 as number)));
  return {
    items,
    count: items.length,
    minPrice: prices.length ? Math.min(...prices) : null,
    medianPrice: median(prices),
    medianPerM2: perM2.length >= 3 ? median(perM2) : null,
  };
}

export const eur = (n: number | null) => (n == null ? '–' : `${n.toLocaleString('cs-CZ')} €`);
