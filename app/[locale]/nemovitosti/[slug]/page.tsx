import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyBySlug, listProperties } from '@/lib/data.server';
import { photoUrls, fmtEur, fmtCzk, STATUS_LABEL } from '@/lib/types';
import { propertySlug } from '@/lib/slug';
import { isLocale, DEFAULT_LOCALE } from '@/lib/i18n';
import { absolute, path } from '@/lib/routes';
import { pageMetadata } from '@/lib/seo';
import Gallery from '@/components/Gallery';
import PropertyDescription from '@/components/PropertyDescription';
import LandscapeLine from '@/components/LandscapeLine';
import PropertyCard from '@/components/PropertyCard';
import LeadForm, { type LeadField } from '@/components/forms/LeadForm';
import PriceColumns from '@/components/page/PriceColumns';
import StepCards from '@/components/page/StepCards';
import { BUY_STEPS } from '@/lib/content/glossary';
import { waLink } from '@/lib/contact';
import { LOCALITIES, localityOf } from '@/lib/localities';

const INQUIRY_FIELDS: LeadField[] = [
  { name: 'jmeno', label: 'Jméno', type: 'text', required: true, autoComplete: 'name', half: true },
  { name: 'telefon', label: 'Telefon nebo WhatsApp', type: 'tel', autoComplete: 'tel', placeholder: '+420', half: true },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
  {
    name: 'zprava',
    label: 'Zpráva',
    type: 'textarea',
    rows: 3,
    placeholder: 'Například: chci videoprohlídku, nebo se ptám na náklady a termín',
  },
];

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const properties = await listProperties();
  return properties.map((p) => ({ locale: DEFAULT_LOCALE, slug: propertySlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const hit = await getPropertyBySlug(slug);
  if (!hit) return { title: 'Nemovitost nenalezena' };
  return pageMetadata({
    id: 'nemovitost',
    locale,
    slug: hit.canonicalSlug,
    title: hit.property.title,
    description: hit.property.description.slice(0, 155),
  });
}

const TYPE_LABEL: Record<string, string> = {
  byt: 'Byt',
  dum: 'Dům',
  vila: 'Vila',
  pozemek: 'Pozemek',
  chata: 'Chata',
  komercni: 'Komerční',
};

const FEATURE_LABEL: Record<string, string> = {
  balkon: 'Balkon',
  terasa: 'Terasa',
  zahrada: 'Zahrada',
  garaz: 'Garáž',
  sklep: 'Sklep',
  vytah: 'Výtah',
  parkovani: 'Parkování',
};

export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const hit = await getPropertyBySlug(slug);
  if (!hit) notFound();

  // zastaraly slug (zmenil se typ nebo obec) -> 308 na kanonicky tvar, nikdy 404
  if (slug !== hit.canonicalSlug) {
    permanentRedirect(path('nemovitost', locale, hit.canonicalSlug));
  }

  const p = hit.property;
  const photos = photoUrls(p);
  const eyebrow = [
    TYPE_LABEL[p.type] || p.type,
    [p.locality?.obec, p.locality?.provincie].filter(Boolean).join(', '),
  ]
    .filter(Boolean)
    .join(' · ');

  const specs: [string, string | number | null | undefined][] = [
    ['Dispozice', p.disposition],
    ['Užitná plocha', p.area_usable_m2 && `${p.area_usable_m2} m²`],
    ['Celková plocha', p.area_total_m2 && `${p.area_total_m2} m²`],
    ['Plocha pozemku', p.area_land_m2 && `${p.area_land_m2} m²`],
    ['Podlaží', p.floor != null ? `${p.floor}${p.floors_total ? ` / ${p.floors_total}` : ''}` : null],
    ['Stav objektu', p.condition_raw || p.condition],
    ['Energetická třída', p.energy_label],
    ['Parkování', p.parking ? `${p.parking}×` : null],
    ['Obec', p.locality?.obec],
    ['Provincie', p.locality?.provincie],
    ['Region', p.locality?.region],
    ['Číslo zakázky', p.order_id],
  ];

  const feats = Object.entries(p.features || {})
    .filter(([, v]) => v)
    .map(([k]) => FEATURE_LABEL[k] || k);

  const gps = p.gps ? `${p.gps.lat},${p.gps.lng}` : null;
  const locSlug = localityOf(p);
  const loc = locSlug ? LOCALITIES[locSlug] : null;
  const url = absolute(path('nemovitost', DEFAULT_LOCALE, propertySlug(p)));
  const waText = `Dobrý den, mám zájem o nemovitost: ${p.title} (${url}). Prosím, ozvěte se mi.`;
  const all = await listProperties();
  const similar = all
    .filter((x) => x.id !== p.id && x.status === 'aktivní')
    .map((x) => ({ x, score: (localityOf(x) === locSlug ? 2 : 0) + (x.type === p.type ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.x);
  const statusTag =
    p.status === 'rezervováno'
      ? 'tag--reserved'
      : p.status === 'prodáno'
        ? 'tag--sold'
        : p.status === 'neaktivní'
          ? 'tag--inactive'
          : null;

  // schema.org — bez nej se nabidka neobjevi v bohatych vysledcich ani v AI odpovedich
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: p.title,
    description: p.description.slice(0, 500),
    url: absolute(path('nemovitost', locale, hit.canonicalSlug)),
    image: photos.slice(0, 8),
    datePosted: p.first_seen,
    ...(p.price_eur != null && {
      offers: {
        '@type': 'Offer',
        price: p.price_eur,
        priceCurrency: 'EUR',
        availability:
          p.status === 'aktivní'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
      },
    }),
    ...(p.gps && {
      geo: { '@type': 'GeoCoordinates', latitude: p.gps.lat, longitude: p.gps.lng },
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: p.locality?.obec ?? undefined,
      addressRegion: p.locality?.region ?? undefined,
      addressCountry: 'IT',
    },
  };

  return (
    <article className="pd">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pd-inner">
        <nav className="pd-crumbs" aria-label="Drobečková navigace">
          <Link href={path('home', locale)}>Domů</Link>
          <span aria-hidden="true"> / </span>
          <Link href={path('nemovitosti', locale)}>Nemovitosti</Link>
          <span aria-hidden="true"> / </span>
          <span>{p.title}</span>
        </nav>

        <h1 className="pd-title">{p.title}</h1>

        <div className="pd-meta">
          <span className="pd-addr">{eyebrow}</span>
          <span className="pd-price">
            {fmtEur(p.price_eur)}
            {p.price_czk != null && <span className="pd-price__czk">{fmtCzk(p.price_czk)}</span>}
          </span>
          {statusTag && <span className={`tag ${statusTag}`}>{STATUS_LABEL[p.status]}</span>}
          {p.locality?.adresa && (
            <span className="pd-addr">
              {[p.locality.adresa, p.locality.obec].filter(Boolean).join(', ')}
            </span>
          )}
          <a className="btn btn--saffron pd-inquiry-link" href="#poptavka">
            Zeptat se na nemovitost
          </a>
        </div>
      </div>

      <LandscapeLine />

      <div className="pd-inner">
        <Gallery photos={photos} alt={p.alt_text || p.title} />
      </div>

      <div className="pd-inner">
        <div className="pd-body">
          <div className="pd-main">
            <h2 className="pd-h2">O nemovitosti</h2>
            <PropertyDescription text={p.description} />

            {p.price_history?.length > 1 && (
              <p className="pd-history">
                Vývoj ceny:{' '}
                {p.price_history.map((h, i) => (
                  <span key={h.date}>
                    {i > 0 && ' → '}
                    <b>{fmtEur(h.price_eur)}</b> ({h.date})
                  </span>
                ))}
              </p>
            )}
          </div>

          <aside className="pd-aside">
            <div className="pd-quote">
              <div className="pd-advisor"><img src="/services/curated/zuzana-office.webp" alt="Bc. Zuzana Bajgerová" width="788" height="1400" /><div><strong>Zuzana Bajgerová</strong><span>Osobně vás provedu koupí.</span></div></div>
              <div className="pd-quote__price">{fmtEur(p.price_eur)}</div>
              {p.price_czk != null && (
                <div className="pd-quote__czk">≈ {fmtCzk(p.price_czk)}</div>
              )}
              <div className="pd-quote__note">cena za nemovitost</div>
              <a className="btn btn--saffron" href="#poptavka">
                Mám zájem o prohlídku
              </a>
              <a className="btn btn--ghost" href={waLink(waText)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a className="btn btn--ghost" href="tel:+420723824348">
                +420 723 824 348
              </a>
              {gps && (
                <a
                  className="btn btn--ghost"
                  href={`https://www.google.com/maps?q=${gps}`}
                  target="_blank"
                  rel="noopener"
                >
                  Ukázat na mapě
                </a>
              )}
              {p.video_url && (
                <a className="btn btn--ghost" href={p.video_url} target="_blank" rel="noopener">
                  Video / prohlídka
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>

      <LandscapeLine accent />

      <div className="pd-inner">
        <h2 className="pd-h2">Parametry</h2>
        <dl className="pd-specs">
          {specs
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
        </dl>
        {feats.length > 0 && (
          <div className="pd-features">
            {feats.map((f) => (
              <span className="chip" key={f}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      <section className="pd-inner pd-sec" aria-labelledby="pd-cena">
        <h2 id="pd-cena" className="pd-h2">Co je v ceně</h2>
        <p className="pd-lead">
          Cena, kterou vidíte, je konečná. Zahrnuje cenu nemovitosti, daň z převodu, odměnu notáře i naši provizi a k
          tomu první rok základního servisu s mými asistentkami.
        </p>
        <PriceColumns />
      </section>

      {loc && locSlug && (
        <section className="pd-inner pd-sec" aria-labelledby="pd-lokalita">
          <Link href={path('lokalita', DEFAULT_LOCALE, locSlug)} className="pd-loc media-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={loc.image.webp} alt={loc.image.alt} width={loc.image.width} height={loc.image.height} loading="lazy" />
            <span className="pd-loc__body">
              <span id="pd-lokalita" className="pd-loc__t">{loc.title}</span>
              <span className="pd-loc__d">{loc.lead}</span>
              <span className="pd-loc__more">Více o lokalitě</span>
            </span>
          </Link>
        </section>
      )}

      <section className="pd-inner pd-sec" aria-labelledby="pd-postup">
        <h2 id="pd-postup" className="pd-h2">Jak koupit právě tuhle nemovitost</h2>
        <StepCards items={BUY_STEPS.slice(3, 7)} cols={4} />
        <p className="pd-more">
          <Link href={path('jakKoupit', DEFAULT_LOCALE)}>Celý postup koupě v Itálii krok za krokem</Link>
        </p>
      </section>

      <section className="pd-inner pd-sec pd-inquiry" id="poptavka" aria-labelledby="pd-poptavka">
        <div className="pd-inquiry__text">
          <h2 id="pd-poptavka" className="pd-h2">Mám zájem o tuto nemovitost</h2>
          <p className="pd-lead">
            Napište mi a domluvíme videoprohlídku nebo osobní prohlídku. Ozvu se vám osobně, nejrychleji přes WhatsApp.
          </p>
          <a className="btn btn--ghost" href={waLink(waText)} target="_blank" rel="noopener noreferrer">
            Napsat na WhatsApp
          </a>
        </div>
        <LeadForm
          source="nemovitost"
          variant="light"
          ariaLabel={`Poptávka nemovitosti ${p.title}`}
          fields={INQUIRY_FIELDS}
          submitLabel="Odeslat poptávku"
          hidden={{ nemovitost: `${p.title} (ID ${p.id})`, odkaz: url }}
          fine={
            <>
              Údaje použiji jen k odpovědi na vaši poptávku a na webu se neukládají. Více v{' '}
              <Link href={path('ochranaUdaju', DEFAULT_LOCALE)}>zásadách ochrany osobních údajů</Link>.
            </>
          }
        />
      </section>

      {similar.length > 0 && (
        <section className="pd-inner pd-sec" aria-labelledby="pd-podobne">
          <h2 id="pd-podobne" className="pd-h2">Podobné nemovitosti</h2>
          <div className="listing-grid pd-similar">
            {similar.map((x) => (
              <PropertyCard key={x.id} p={x} locale={DEFAULT_LOCALE} />
            ))}
          </div>
        </section>
      )}

      <LandscapeLine />

      <div className="pd-inner">
        <Link href={path('nemovitosti', locale)} className="btn btn--ghost">
          Všechny nabídky
        </Link>
      </div>
    </article>
  );
}
