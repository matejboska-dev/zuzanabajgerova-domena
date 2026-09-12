import 'server-only';

// prepocet EUR -> CZK z denniho kurzu CNB (SCRAPER-SPEC.md cast C).
// kurz se cachuje pres Next data cache (revalidate), nestahuje se pri kazdem requestu.
// kdyz CNB neodpovi (CI, vypadek), pouzije se orientacni zaloha — cena je stejne priblizna.

const CNB_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

// orientacni kurz pro pripad, ze se CNB nepodari nacist
export const FALLBACK_EUR_CZK = 25.3;

/**
 * denni kurz EUR/CZK. format CNB daily.txt:
 *   25 Jul 2025 #142
 *   Country|Currency|Amount|Code|Rate
 *   EMU|euro|1|EUR|24,835
 */
export async function eurCzkRate(): Promise<number> {
  try {
    const res = await fetch(CNB_URL, { next: { revalidate: 21600 } }); // 6 h
    if (!res.ok) return FALLBACK_EUR_CZK;
    const line = (await res.text()).split('\n').find((l) => l.includes('|EUR|'));
    const rate = line ? Number(line.split('|')[4]?.replace(',', '.')) : NaN;
    return Number.isFinite(rate) && rate > 0 ? rate : FALLBACK_EUR_CZK;
  } catch {
    return FALLBACK_EUR_CZK;
  }
}

/** EUR -> CZK, zaokrouhleno na tisice (cena je orientacni, nepredstirat presnost) */
export function eurToCzk(eur: number | null | undefined, rate: number): number | null {
  if (eur == null) return null;
  return Math.round((eur * rate) / 1000) * 1000;
}
