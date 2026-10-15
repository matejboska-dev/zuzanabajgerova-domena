// JEDINE misto, odkud odchazeji formulare (kontakt, konzultace, hlavni strana, dotaznik).
// Posila na /api/lead (app/api/lead/route.ts), tam se rozhoduje o doruceni (e-mail, webhook).

export type LeadSource = 'homepage' | 'kontakt' | 'konzultace' | 'dotaznik' | 'nemovitost' | 'hlidac' | 'nabidka-na-miru' | 'sluzba';

export type LeadResult = { ok: boolean; error?: string };

/** ms od zobrazeni formulare. server tim odfiltruje boty, ktere odesilaji okamzite */
export async function submitLead(
  source: LeadSource,
  data: Record<string, FormDataEntryValue>,
  elapsedMs: number,
): Promise<LeadResult> {
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) if (typeof v === 'string') fields[k] = v;
  const { website = '', ...clean } = fields; // skryte pole proti botum

  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source,
        fields: clean,
        hp: website,
        t: elapsedMs,
        page: window.location.pathname,
        ref: document.referrer,
        utm: window.location.search.slice(1),
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    return { ok: res.ok && json.ok === true, error: json.error };
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
