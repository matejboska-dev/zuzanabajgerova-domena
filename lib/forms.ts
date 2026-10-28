// Společné odesílání formulářů přímo do Web3Forms. Klíč je veřejný.

export type LeadSource = 'homepage' | 'kontakt' | 'konzultace' | 'dotaznik' | 'nemovitost' | 'hlidac' | 'nabidka-na-miru' | 'sluzba';

export type LeadResult = { ok: boolean; error?: string };

const SOURCE_LABELS: Record<string, string> = {
  homepage: 'hlavní strana',
  sluzba: 'poptávka služby',
  kontakt: 'kontakt',
  konzultace: 'nezávazná konzultace',
  dotaznik: 'dotazník pro vážné zájemce',
  nemovitost: 'detail nemovitosti',
  hlidac: 'hlídač nabídek',
  'nabidka-na-miru': 'nabídka na míru (nenašli jste)',
};

const FIELD_LABELS: Record<string, string> = {
  jmeno: 'Jméno',
  sluzba: 'Služba',
  jazyk: 'Jazyk stránky',
  email: 'E-mail',
  telefon: 'Telefon nebo WhatsApp',
  ucel: 'Účel koupě',
  rozpocet: 'Rozpočet',
  zprava: 'Zpráva',
  termin: 'Preferovaný den hovoru',
  cas: 'Preferovaná část dne',
  kanal: 'Jak se ozvat',
  poznamka: 'Poznámka',
  typ: 'Typ nemovitosti',
  lokalita: 'Preferovaná lokalita',
  vzdalenost: 'Vzdálenost od moře',
  financovani: 'Financování',
  kdy: 'Kdy chce koupit',
  rekonstrukce: 'Zájem o rekonstrukci',
  sprava: 'Zájem o správu a pronájem',
  abruzzo: 'Byl(a) už v Abruzzu',
  zdroj: 'Jak se dozvěděl(a)',
  predstava: 'Představa',
  nemovitost: 'Nemovitost',
  odkaz: 'Odkaz na nabídku',
  lokalita_hledani: 'Lokalita',
  typ_hledani: 'Typ nemovitosti',
};

/** Odeslání včetně ochranného pole a kontroly příliš rychlého vyplnění. */
export async function submitLead(
  source: LeadSource,
  data: Record<string, FormDataEntryValue>,
  elapsedMs: number,
): Promise<LeadResult> {
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) if (typeof v === 'string') fields[k] = v;
  const { website = '', ...clean } = fields;
  if (website || elapsedMs < 2500) return { ok: false, error: 'invalid_fields' };
  const emailOk = !!clean.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean.email);
  if (clean.email && !emailOk) return { ok: false, error: 'invalid_email' };
  if (!clean.jmeno?.trim() || (!emailOk && !clean.telefon?.trim())) {
    return { ok: false, error: 'invalid_fields' };
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...Object.fromEntries(Object.entries(clean).map(([key, value]) => [FIELD_LABELS[key] ?? key, value])),
        access_key: '6a974f3a-0ec8-4667-af6b-c68182775b66',
        subject: `Nová poptávka z webu (${SOURCE_LABELS[source]}): ${clean.jmeno}`,
        from_name: 'Web Zuzana Bajgerová',
        ...(emailOk ? { email: clean.email } : {}),
        botcheck: false,
        'Zdroj formuláře': SOURCE_LABELS[source],
        'Stránka': window.location.href,
        'Odkud návštěvník přišel': document.referrer,
        'Čas odeslání': new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(20000),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    return { ok: res.ok && json.success === true, error: res.status === 429 ? 'rate_limited' : 'delivery_failed' };
  } catch {
    return { ok: false, error: 'network' };
  }
}

/** udalost pro GA4 / Google Tag Manager (dataLayer), az bude analytika nasazena */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: name, ...params });
}
