import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { Dataset, Property } from './types';
import { idFromSlug, propertySlug } from './slug';
import { eurCzkRate, eurToCzk } from './fx.server';

// slozka se scraperem a jeho daty (scraper.py + data/). default: o uroven vys nez web/
export const SCRAPER_DIR = path.resolve(process.cwd(), process.env.SCRAPER_DIR ?? '..');
export const DATA_FILE = path.join(SCRAPER_DIR, 'data', 'properties.json');

// zabudovana kopie dat primo v repu (pro nasazeni bez sesedni slozky se scraperem,
// napr. Netlify) — pouzije se jen kdyz DATA_FILE (SCRAPER_DIR) neni k dispozici
const FALLBACK_DATA_FILE = path.join(process.cwd(), 'data', 'properties.json');

async function readDataFile(): Promise<string> {
  try {
    return await fs.readFile(DATA_FILE, 'utf8');
  } catch {
    return await fs.readFile(FALLBACK_DATA_FILE, 'utf8');
  }
}

export async function readDataset(): Promise<Dataset | null> {
  try {
    const raw = JSON.parse(await readDataFile()) as Dataset;
    // prepocet EUR -> CZK z denniho kurzu CNB. rucne zadana cena v CZK
    // (manual_overrides) ma prednost pred vypoctem.
    const rate = await eurCzkRate();
    return {
      ...raw,
      eur_czk_rate: rate,
      properties: raw.properties.map((p) => ({
        ...p,
        price_czk: p.price_czk ?? eurToCzk(p.price_eur, rate),
      })),
    };
  } catch {
    return null;
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  const ds = await readDataset();
  return ds?.properties.find((p) => String(p.id) === String(id)) ?? null;
}

/**
 * Nabidka podle slugu. Rozlisuje se podle KONCOVEHO ID, ne podle celeho slugu —
 * viz lib/slug.ts. Vraci i kanonicky tvar, aby stranka mohla presmerovat,
 * kdyz prisel zastaraly slug (zmenil se typ nebo obec).
 */
export async function getPropertyBySlug(
  slug: string,
): Promise<{ property: Property; canonicalSlug: string } | null> {
  const id = idFromSlug(slug);
  if (!id) return null;
  const property = await getProperty(id);
  if (!property) return null;
  return { property, canonicalSlug: propertySlug(property) };
}

/** vsechny viditelne nabidky, serazene: aktivni driv, doporucene nahoru */
export async function listProperties(): Promise<Property[]> {
  const ds = await readDataset();
  return (ds?.properties ?? [])
    .filter((p) => !p.hidden)
    .sort(
      (a, b) =>
        Number(a.status === 'neaktivní') - Number(b.status === 'neaktivní') ||
        Number(b.featured) - Number(a.featured),
    );
}
