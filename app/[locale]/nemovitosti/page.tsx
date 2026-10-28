import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import ClickVideo from '@/components/page/ClickVideo';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import PropertyCard from '@/components/PropertyCard';
import ScrapeButton from '@/components/ScrapeButton';
import ListingFilter from '@/components/listings/ListingFilter';
import LeadForm, { type LeadField } from '@/components/forms/LeadForm';
import { listProperties, readDataset } from '@/lib/data.server';
import { BUDGET_OPTIONS, PURPOSE_OPTIONS } from '@/lib/contact';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { COASTAL, LOCALITIES, LOCALITY_SLUGS, localityOf } from '@/lib/localities';
import { absolute, path } from '@/lib/routes';
import { propertySlug } from '@/lib/slug';
import { propertyCategories } from '@/lib/property-categories';
import { agentNode, breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

// Vypis nabidek. Plni se sam ze scraperu (revalidate). Filtr bezi v prohlizeci nad kartami,
// ktere vykresli server, takze stranka je cela v HTML (Google ji vidi i bez JS).
export const revalidate = 300;
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const TITLE = 'Nemovitosti v Abruzzu na prodej';
const DESC =
  'Byty, domy a pozemky v Abruzzu od pobřeží u Pescary po vnitrozemí. Cena, kterou vidíte, je konečná. Filtr podle oblasti, ceny, plochy a stavu.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'nemovitosti', locale, title: TITLE, description: DESC, });
}

const COND: Record<string, string> = {
  'po rekonstrukci': 'po-rekonstrukci',
  udrzovany: 'udrzovany',
  'k rekonstrukci': 'k-rekonstrukci',
  novostavba: 'novostavba',
};

/** 1+kk -> 1, 3+1 -> 3, "6 a vice" -> 4 */
function dispGroup(d: string | null): string {
  const n = parseInt(d ?? '', 10);
  if (!n) return '';
  return String(Math.min(n, 4));
}

const WATCH_FIELDS: LeadField[] = [
  { name: 'jmeno', label: 'Jméno', type: 'text', required: true, autoComplete: 'name', half: true },
  { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email', half: true },
  {
    name: 'lokalita_hledani',
    label: 'Oblast',
    type: 'select',
    options: ['Celé Abruzzo', 'Pobřeží', ...LOCALITY_SLUGS.map((s) => LOCALITIES[s].title)],
    half: true,
  },
  { name: 'typ_hledani', label: 'Typ nemovitosti', type: 'select', options: ['Byt', 'Dům nebo vila', 'Pozemek', 'Zatím nevím'], half: true },
  { name: 'rozpocet', label: 'Rozpočet včetně všech nákladů', type: 'select', options: BUDGET_OPTIONS },
];

const CUSTOM_FIELDS: LeadField[] = [
  { name: 'jmeno', label: 'Jméno', type: 'text', required: true, autoComplete: 'name', half: true },
  { name: 'telefon', label: 'Telefon nebo WhatsApp', type: 'tel', autoComplete: 'tel', placeholder: '+420', half: true },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
  { name: 'ucel', label: 'Co hledáte', type: 'select', options: PURPOSE_OPTIONS, half: true },
  { name: 'rozpocet', label: 'Rozpočet', type: 'select', options: BUDGET_OPTIONS, half: true },
  {
    name: 'zprava',
    label: 'Vaše představa',
    type: 'textarea',
    rows: 3,
    placeholder: 'Například: byt 2+kk do 300 m od moře, s terasou, do 150 000 €',
  },
];

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const here = path('nemovitosti', locale);
  const properties = await listProperties();
  const ds = await readDataset();
  const showScrapeButton =
    process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_SHOW_SCRAPE_BUTTON !== '0';
  const privacy = path('ochranaUdaju', locale);
  const oblasti = LOCALITY_SLUGS.map((s) => ({ value: s, label: LOCALITIES[s].title }));

  return (
    <main className="subpage listings-page">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ type: 'CollectionPage', path: here, name: TITLE, description: DESC, image: '/media/lok-pescara-colle.webp' }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Nemovitosti', href: here },
          ]),
          {
            '@type': 'ItemList',
            name: TITLE,
            numberOfItems: properties.length,
            itemListElement: properties.slice(0, 30).map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absolute(path('nemovitost', locale, propertySlug(p))),
              name: p.title,
            })),
          },
        )}
      />

      <SubHero
        id="nemovitosti-h1"
        portrait={{ src: '/hero/portret-4k.webp', alt: 'Bc. Zuzana Bajgerová' }}
        badge="Aktuální nabídka · Abruzzo"
        title="Nemovitosti v Abruzzu"
        accent="s konečnou cenou"
        lead="Byty, domy a pozemky od pobřeží u Pescary po vnitrozemí. Cena, kterou vidíte, je konečná. Nenajdete-li to pravé, mám přístup i k neveřejným nabídkám."
        bg={{ src: '/media/lok-pescara-colle.webp', width: 1600, height: 1000 }}
        bgPosition="center 55%"
        ctas={[
          { href: '#filtr', label: 'Procházet nabídky' },
          { href: '#na-miru', label: 'Najít na míru', variant: 'glass' },
        ]}
        chips={[
          `${properties.length} nabídek`,
          'Aktualizuje se automaticky',
          'Cena je konečná',
        ]}
      />

      <Crumbs items={[{ name: 'Nemovitosti', href: here }]} />

      <section className="sec sec--tight" id="filtr" aria-label="Nabídky nemovitostí">
        <div className="wrap">
          <Suspense fallback={<p>Načítám filtr nabídek…</p>}>
            <ListingFilter gridId="listing-grid" moreId="listing-more" oblasti={oblasti} total={properties.length} />
          </Suspense>
          {showScrapeButton && (
            <div className="flt__dev">
              <ScrapeButton />
            </div>
          )}
          <div className="listing-grid flt__grid" id="listing-grid">
            {properties.map((p, i) => {
              const o = localityOf(p);
              return (
                <div
                  className="flt__item"
                  key={p.id}
                  data-o={o ?? 'ostatni'}
                  data-coast={o && COASTAL.includes(o) ? '1' : '0'}
                  data-t={p.type}
                  data-k={propertyCategories(p.id).join(' ')}
                  data-c={p.price_eur ?? 0}
                  data-a={p.area_usable_m2 ?? 0}
                  data-d={dispGroup(p.disposition)}
                  data-s={COND[p.condition ?? ''] ?? ''}
                  data-i={i}
                >
                  <PropertyCard p={p} locale={locale} priority={i < 6} />
                </div>
              );
            })}
          </div>
          <div className="flt__more" id="listing-more" />
        </div>
      </section>

      <section className="sec tours" id="videa" aria-labelledby="videa-h">
        <div className="wrap">
          <SecHead
            id="videa-h"
            badge="Videoprohlídky"
            title="Prohlídka dřív,"
            accent="než přiletíte"
            lead="Než do Itálie poletíte, projdeme nemovitost na videu. Tady je ukázka, jak takové prohlídky vypadají."
          />
          <div className="tours__grid">
            <figure className="tour tour--tall">
              <ClickVideo src="/media/prohlidka-garsonka.mp4" poster="/media/prohlidka-garsonka.webp" label="Videoprohlídka garsonky s výhledem na moře" ratio="9 / 16" />
              <figcaption>
                <b>Garsonka s výhledem na moře</b>
                <span>Ukázka videoprohlídky</span>
              </figcaption>
            </figure>
            <figure className="tour">
              <ClickVideo src="/media/prohlidka-colle.mp4" poster="/media/prohlidka-colle.webp" label="Videoprohlídka nemovitosti v Montesilvano Colle" ratio="16 / 9" />
              <figcaption>
                <b>Terasa s výhledem, Montesilvano Colle</b>
                <span>Ukázka videoprohlídky</span>
              </figcaption>
            </figure>
            <figure className="tour">
              <ClickVideo src="/media/prohlidka-vila-silvi.mp4" poster="/media/prohlidka-vila-silvi.webp" label="Videoprohlídka vily v Silvi" ratio="16 / 9" />
              <figcaption>
                <b>Vila v Silvi</b>
                <span>Ukázka videoprohlídky</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sec sec--soft" id="hlidac" aria-labelledby="hlidac-h">
        <div className="wrap split-form">
          <div className="split-form__text">
            <SecHead
              id="hlidac-h"
              badge="Hlídač nabídek"
              title="Nechte si poslat"
              accent="nové nabídky"
              lead="Napište mi, co hledáte. Jakmile budu mít nabídku, která odpovídá vašemu zadání, pošlu vám ji e-mailem. Žádný newsletter, jen konkrétní nemovitosti."
              left
            />
          </div>
          <LeadForm
            source="hlidac"
            variant="light"
            ariaLabel="Hlídač nabídek"
            fields={WATCH_FIELDS}
            submitLabel="Hlídat nabídky"
            fine={
              <>
                E-mail použiji jen k zasílání nabídek podle vašeho zadání. Stačí odepsat a přestanu. Více v{' '}
                <a href={privacy}>zásadách ochrany osobních údajů</a>.
              </>
            }
          />
        </div>
      </section>

      <section className="sec" id="na-miru" aria-labelledby="na-miru-h">
        <div className="wrap split-form split-form--flip">
          <div className="split-form__text">
            <SecHead
              id="na-miru-h"
              badge="Nabídka na míru"
              title="Nenašli jste?"
              accent="Mám i nabídky mimo systém"
              lead="Ne všechno je na internetu. Popište mi svou představu a já vám vyberu i z neveřejných nabídek prověřených partnerů v regionu."
              left
            />
            <ul className="split-form__list">
              <li>Výběr podle vašeho rozpočtu včetně všech nákladů</li>
              <li>Videoprohlídka ještě před příletem</li>
              <li>Odpovím vám osobně</li>
            </ul>
          </div>
          <LeadForm
            source="nabidka-na-miru"
            variant="light"
            ariaLabel="Nabídka na míru"
            fields={CUSTOM_FIELDS}
            submitLabel="Najít nemovitost na míru"
            fine={
              <>
                Údaje použiji jen k odpovědi na vaši poptávku a na webu se neukládají. Více v{' '}
                <a href={privacy}>zásadách ochrany osobních údajů</a>.
              </>
            }
          />
        </div>
      </section>

      <CtaBand
        id="nemovitosti-cta"
        title="Probereme to"
        accent="po telefonu"
        text="Za dvacet minut budete vědět, jestli je vaše představa reálná a kolik by koupě přibližně stála."
        primary={{ href: path('konzultace', locale), label: 'Domluvit konzultaci' }}
      />
      <MobileCtaBar />
    </main>
  );
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
