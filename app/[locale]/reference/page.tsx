import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import ClickVideo from '@/components/page/ClickVideo';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import GoogleReviews from '@/components/page/GoogleReviews';
import FirmyReviewsSection from '@/components/page/FirmyReviewsSection';
import SecHead from '@/components/page/SecHead';
import BeforeAfter from '@/components/page/BeforeAfter';
import SubHero from '@/components/page/SubHero';
import ReferenceVideoCarousel from '@/components/page/ReferenceVideoCarousel';
import { DRIVE_REFERENCE_SLIDES } from '@/lib/reference-slides';
import { COMMUNITY_MEDIA, RENO_PAIRS } from '@/lib/home';
import { waLink } from '@/lib/contact';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { VIDEO_REFS } from '@/lib/reviews';
import { agentNode, breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

// Reference: videa klientu (Google Drive klientky), skutecne Google recenze (lib/reviews.ts),
// pripadova studie z jejich videi. Co chybi (pribeh, vysledek, screenshoty), je oznacene.
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const TITLE = 'Reference klientů';
const DESC =
  'Videoreference a recenze klientů, kteří koupili nemovitost v Abruzzu. Hodnocení 5,0 ze 14 recenzí na Googlu.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'reference', locale, title: TITLE, description: DESC, image: '/media/kom-obed.webp' });
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const here = path('reference', locale);
  const ostrava = RENO_PAIRS[0];
  const strip = COMMUNITY_MEDIA.filter((m) => m.src && !m.video).slice(0, 4);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ type: 'CollectionPage', path: here, name: TITLE, description: DESC, image: '/media/kom-obed.webp' }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'O mně', href: path('oMne', locale) },
            { name: 'Reference', href: here },
          ]),
        )}
      />

      <SubHero
        id="reference-h1"
        badge="Reference · 5,0 ze 14 recenzí na Googlu"
        title="Reference"
        accent="od klientů"
        lead="Skutečné příběhy lidí, kteří se mnou koupili nemovitost v Abruzzu. Na videu, slovy z Googlu a na fotkách z našich společných akcí."
        bg={{ src: '/media/hero-abruzzo-4k.webp', width: 4080, height: 2296 }}
        bgPosition="center 50%"
        photos={[
          { src: '/media/kom-obed.webp', alt: 'Klienti u společného oběda v restauraci u moře', width: 800, height: 1000 },
          { src: '/media/kom-scanno.webp', alt: 'Společný výlet klientů nad jezero Scanno v Abruzzu', width: 800, height: 1000 },
          { src: '/media/kom-oslava.webp', alt: 'Oslava s klienty v Abruzzu', width: 800, height: 1000 },
          { src: '/media/kom-velikonoce.webp', alt: 'Velikonoce s klienty v Abruzzu', width: 800, height: 1000 },
          { src: '/media/kom-notar.webp', alt: 'Klienti s klíči při setkání v notářské kanceláři', width: 720, height: 1000 },
        ]}
        ctas={[
          { href: path('konzultace', locale), label: 'Domluvit konzultaci' },
          { href: waLink(), label: 'Napsat na WhatsApp', variant: 'glass', external: true },
        ]}
        chips={['5,0 ze 14 recenzí na Googlu', `${DRIVE_REFERENCE_SLIDES.length} videoreferencí a momentů`, 'Komunita v Abruzzu']}
      />

      <Crumbs
        items={[
          { name: 'O mně', href: path('oMne', locale) },
          { name: 'Reference', href: here },
        ]}
      />

      <section className="sec" id="videa" aria-labelledby="ref-videa">
        <div className="wrap">
          <SecHead
            id="ref-videa"
            badge="Videoreference"
            title="Řeknou vám to"
            accent="sami"
            lead="Klienti vlastními slovy. Kliknutím na fotku nebo tlačítko spustíte video."
          />
        </div>
        <ReferenceVideoCarousel />
      </section>

      <section className="sec sec--soft" id="recenze" aria-labelledby="ref-recenze">
        <div className="wrap">
          <SecHead
            id="ref-recenze"
            badge="Google recenze"
            title="Co píšou"
            accent="na Googlu"
            lead="Všech 14 recenzí z mého profilu na Mapách Google, přepsaných beze změn. Originály si můžete ověřit přímo na Googlu."
          />
          <GoogleReviews />

        </div>
      </section>

      <FirmyReviewsSection />

      <section className="sec case2-sec" id="pripadova-studie" aria-labelledby="ref-case">
        <div className="wrap">
          <article className="case2">
            <header className="case2__head">
              <p className="case2__eyebrow">
                <span>01</span> Případová studie · Ostrava
              </p>
              <h2 id="ref-case" className="case2__h">
                Od klíčů <em>po hotový byt</em>
              </h2>
              <p className="case2__lead">
                Skutečná proměna bytu klienta z Ostravy. Fotografie a video ukazují původní stav i dokončený interiér.
              </p>
            </header>

            <div className="case2__stage">
              {ostrava.before && ostrava.after && (
                <div className="case2__slider">
                  <BeforeAfter before={ostrava.before} after={ostrava.after} />
                  <p className="case2__hint">Posuňte dělítko a porovnejte kuchyň před a po</p>
                </div>
              )}
              <div className="case2__video">
                <ClickVideo
                  src="/media/reno-ostrava.mp4"
                  poster="/media/reno-ostrava.webp"
                  label="Celá proměna bytu klienta z Ostravy"
                  ratio="9 / 16"
                />
                <p className="case2__vcap">Celá proměna ve videu</p>
              </div>
            </div>

            <ul className="case2__facts" aria-label="Rozsah rekonstrukce">
              <li>
                <strong>Na klíč</strong>
                <span>Od plánu po předání</span>
              </li>
              <li>
                <strong>3 prostory</strong>
                <span>Kuchyň · koupelna · obývací pokoj</span>
              </li>
              <li>
                <strong>Ostrava</strong>
                <span>Byt klienta</span>
              </li>
            </ul>

            <dl className="case2__dl">
              <div>
                <dt>Situace</dt>
                <dd>Původní podobu bytu zachycují fotografie před rekonstrukcí. Srovnání ukazuje různé pohledy na prostor.</dd>
              </div>
              <div>
                <dt>Co jsme udělali</dt>
                <dd>Byt prošel rekonstrukcí na klíč: nová kuchyň, koupelna i obývací pokoj. Celou proměnu ukazuje video.</dd>
              </div>
              <div>
                <dt>Výsledek</dt>
                <dd>Dokončený a vybavený interiér si můžete projít ve videu. Rozsah každé další rekonstrukce domlouváme individuálně.</dd>
              </div>
            </dl>

            <div className="case2__cta">
              <Link className="btn btn--saffron" href={path('rekonstrukce', locale)}>
                <span>Rekonstrukce na klíč</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="sec" aria-labelledby="ref-komunita">
        <div className="wrap">
          <SecHead
            id="ref-komunita"
            badge="Komunita"
            title="Vztah nekončí"
            accent="u notáře"
            lead="Scházíme se, slavíme a jezdíme na výlety. Tady je pár momentů z posledních měsíců."
          />
          <div className="ref__strip">
            {strip.map((m) => (
              <figure className="media-tile" key={m.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.alt ?? m.label} loading="lazy" />
                <figcaption className="media-chip">{m.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        id="reference-cta"
        title="Chcete být"
        accent="další"
        text="Začneme nezávaznou konzultací. Řekneme si, co hledáte a co je reálné."
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
