// typy + helpery pouzitelne i v klientskych komponentach (zadny 'fs' apod.)

export type Locality = {
  obec: string | null;
  provincie: string | null;
  region: string | null;
  zeme: string | null;
  adresa: string | null;
};

export type Property = {
  id: string;
  order_id: string | null;
  slug: string;
  source_url: string;
  title: string;
  status: 'aktivní' | 'rezervováno' | 'prodáno' | 'neaktivní';
  type: string;
  price_eur: number | null;
  price_czk: number | null;
  locality: Locality;
  gps: { lat: number; lng: number } | null;
  disposition: string | null;
  area_usable_m2: number | null;
  area_total_m2: number | null;
  area_land_m2: number | null;
  floor: number | null;
  floors_total: number | null;
  condition: string | null;
  condition_raw: string | null;
  energy_label: string | null;
  features: Record<string, boolean>;
  parking: number | null;
  description: string;
  video_url: string | null;
  photos: string[];
  photos_local: string[];
  thumb?: string;
  display_address?: string;
  alt_text?: string;
  first_seen: string;
  last_change: string;
  price_history: { date: string; price_eur: number | null }[];
  manual_overrides: Record<string, unknown>;
  featured: boolean;
  hidden: boolean;
  disappeared_since?: string;
};

export type Dataset = {
  generated_at: string;
  source_url: string;
  agent_id: string;
  count: number;
  count_all: number;
  total_reported: number | null;
  pages_scraped: number;
  /** denni kurz EUR/CZK pouzity pro prepocet price_czk (doplnuje lib/data.server) */
  eur_czk_rate?: number;
  properties: Property[];
};

/** nahled: lehky _th350 z RE/MAX CDN (i kdyz mame lokalni plne rozliseni) */
export function thumbUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (url.startsWith('http')) return url.replace(/(\/\d+)\.(jpe?g|png|webp)$/i, '$1_th350.$2');
  return url;
}

/**
 * Fotky nabidky. Default = hotlink primo na RE/MAX CDN (mlsf.remax-czech.cz),
 * nic se nestahuje. Lokalne hostovane fotky (scraper --images + /api/media) se
 * pouziji jen kdyz je zapnuty SERVE_LOCAL_IMAGES — pro ostrou verzi, viz DEPLOY.md.
 */
const USE_LOCAL =
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SERVE_LOCAL_IMAGES === '1';

export function photoUrls(
  p: Pick<Property, 'photos' | 'photos_local'> & { thumb?: string },
): string[] {
  if (USE_LOCAL && p.photos_local?.length) {
    return p.photos_local.map((rel) => '/api/media/' + rel.replace(/^data[\\/]+images[\\/]+/, ''));
  }
  if (p.photos?.length) return p.photos;
  return p.thumb ? [p.thumb] : [];
}

export const STATUS_LABEL: Record<string, string> = {
  aktivní: '',
  rezervováno: 'Rezervováno',
  prodáno: 'Prodáno',
  neaktivní: 'Staženo z nabídky',
};

export function fmtEur(n: number | null): string {
  return n == null ? 'cena na dotaz' : new Intl.NumberFormat('cs-CZ').format(n) + ' €';
}

/** cena v Kc jako doplnek k EUR. prazdny retezec = nezobrazovat (neni prepocet) */
export function fmtCzk(n: number | null | undefined): string {
  return n == null ? '' : new Intl.NumberFormat('cs-CZ').format(n) + ' Kč';
}
