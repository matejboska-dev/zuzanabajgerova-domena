import { NextResponse } from 'next/server';

// Prijem poptavek z formularu (kontakt, konzultace, hlavni strana, dotaznik).
// Doruceni: e-mail pres Resend (RESEND_API_KEY + LEAD_TO_EMAIL) a/nebo webhook (LEAD_WEBHOOK_URL,
// napr. Make, Zapier, Google Apps Script do Google Sheets). Stacil jeden z nich.
// Kdyz neni nastaveny zadny, vraci 503 a formular ukaze zalozni kontakty. Poptavka se NIKDY
// netvari jako odeslana, kdyz nedorazila. Viz web/.env.example.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SOURCES: Record<string, string> = {
  homepage: 'hlavní strana',
  sluzba: 'poptávka služby',
  kontakt: 'kontakt',
  konzultace: 'rezervace hovoru',
  dotaznik: 'dotazník pro vážné zájemce',
  nemovitost: 'detail nemovitosti',
  hlidac: 'hlídač nabídek',
  'nabidka-na-miru': 'nabídka na míru (nenašli jste)',
};

const LABELS: Record<string, string> = {
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

const MAX_LEN = 2000;
const MAX_FIELDS = 30;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // pamet jedne instance, na spam staci

function ipOf(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function tooMany(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  // stejny puvod: formular smi odesilat jen tenhle web
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return fail(403, 'forbidden');
    } catch {
      return fail(403, 'forbidden');
    }
  }

  if (Number(req.headers.get('content-length') ?? 0) > 20_000) return fail(413, 'too_large');

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, 'invalid_json');
  }

  const source = String(body.source ?? '');
  if (!(source in SOURCES)) return fail(400, 'invalid_source');

  // pasti na boty: skryte pole musi byt prazdne, formular nesmi odejit za par vterin
  const honeypot = String(body.hp ?? '');
  const elapsed = Number(body.t ?? 0);
  if (honeypot || elapsed < 2500) return NextResponse.json({ ok: true }); // tvarime se, ze jo

  const ip = ipOf(req);
  if (tooMany(ip)) return fail(429, 'rate_limited');

  const raw = (body.fields ?? {}) as Record<string, unknown>;
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw).slice(0, MAX_FIELDS)) {
    if (typeof v !== 'string') continue;
    const val = v.trim().slice(0, MAX_LEN);
    if (val && /^[a-z0-9_]{1,40}$/i.test(k)) fields[k] = val;
  }

  const emailOk = !!fields.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email);
  if (fields.email && !emailOk) return fail(422, 'invalid_email');
  if (!fields.jmeno || (!emailOk && !fields.telefon)) return fail(422, 'invalid_fields');

  const meta = {
    page: String(body.page ?? '').slice(0, 200),
    referrer: String(body.ref ?? '').slice(0, 300),
    utm: String(body.utm ?? '').slice(0, 300),
    at: new Date().toISOString(),
  };

  const subject = `Nová poptávka z webu (${SOURCES[source]}): ${fields.jmeno}`;
  const rows = Object.entries(fields).map(([k, v]) => [LABELS[k] ?? k, v] as const);
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\nZdroj: ${SOURCES[source]}\nStránka: ${meta.page}\nOdkud přišel: ${meta.referrer || 'přímo'}\n${
      meta.utm ? `UTM: ${meta.utm}\n` : ''
    }Čas: ${meta.at}`;
  const html =
    `<table cellpadding="6" style="border-collapse:collapse;font:15px Arial,sans-serif">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="color:#555;vertical-align:top"><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`,
      )
      .join('') +
    `</table><p style="font:13px Arial,sans-serif;color:#777">Zdroj: ${esc(SOURCES[source])}<br>Stránka: ${esc(meta.page)}<br>Odkud přišel: ${esc(meta.referrer || 'přímo')}<br>Čas: ${esc(meta.at)}</p>`;

  const resendKey = process.env.RESEND_API_KEY;
  const to = (process.env.LEAD_TO_EMAIL ?? '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  const webhook = process.env.LEAD_WEBHOOK_URL;

  const jobs: Promise<boolean>[] = [];

  if (resendKey && to.length) {
    jobs.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? 'Web Bajgerová <onboarding@resend.dev>',
          to,
          reply_to: emailOk ? fields.email : undefined,
          subject,
          text,
          html,
        }),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }

  if (webhook) {
    jobs.push(
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, subject, fields, meta }),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }

  if (jobs.length === 0) {
    console.error('[lead] doruceni neni nastavene (RESEND_API_KEY + LEAD_TO_EMAIL nebo LEAD_WEBHOOK_URL)');
    return fail(503, 'not_configured');
  }

  const results = await Promise.all(jobs);
  if (results.some(Boolean)) return NextResponse.json({ ok: true });
  console.error('[lead] doruceni selhalo u vsech kanalu');
  return fail(502, 'delivery_failed');
}
