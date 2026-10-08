import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Marked from '@/components/Marked';
import Zastupny from '@/components/Zastupny';
import PropertyCard from '@/components/PropertyCard';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import ClickVideo from '@/components/page/ClickVideo';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import ReviewQuotes from '@/components/page/ReviewQuotes';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import { LOC_MEDIA } from '@/lib/content/localities-media';
import { FAQ } from '@/lib/home';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { LOCALITIES, LOCALITY_SLUGS } from '@/lib/localities';
import { eur, localityStats } from '@/lib/localityStats';
import { path } from '@/lib/routes';
import { agentNode, breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 21600;
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALITY_SLUGS.map((slug) => ({ locale: DEFAULT_LOCALE, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = LOCALITIES[slug];
  if (locale !== DEFAULT_LOCALE || !loc) return {};
  return pageMetadata({ id: 'lokalita', locale, slug, title: `${loc.title}: nemovitosti a život`, description: loc.lead, onlyCs: true, image: loc.image.webp });
}

const IMU = FAQ.find((f) => f.q.startsWith('Co jsou IMU'))?.a ?? '';

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const loc = LOCALITIES[slug];
  if (locale !== DEFAULT_LOCALE || !loc) notFound();

  const here = path('lokalita', DEFAULT_LOCALE, slug);
  const st = await localityStats(slug);
  const media = LOC_MEDIA[slug] ?? { photos: [], quotes: [] };
  const others = LOCALITY_SLUGS.filter((s) => s !== slug);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ path: here, name: loc.title, description: loc.lead, image: loc.image.webp }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Lokality', href: path('lokality', DEFAULT_LOCALE) },
            { name: loc.title, href: here },
          ]),
          { '@type': 'Place', name: loc.title, containedInPlace: { '@type': 'AdministrativeArea', name: 'Abruzzo' } },
        )}
      />

      <SubHero
        id="lokalita-h1"
        badge="Lokalita · Abruzzo"
        title={loc.title}
        lead={loc.lead}
        bg={{ src: loc.image.webp, width: loc.image.width, height: loc.image.height }}
        ctas={[
          { href: '#nabidky', label: st.count ? `Nabídky v oblasti (${st.count})` : 'Nabídky v oblasti' },
          { href: path('konzultace', DEFAULT_LOCALE), label: 'Poradit se', variant: 'glass' },
        ]}
        chips={[
          st.count ? `${st.count} nabídek` : 'Nabídky na dotaz',
          st.minPrice ? `Od ${eur(st.minPrice)}` : 'Cena na dotaz',
          'Cena je konečná',
        ]}
      />

      <Crumbs
        items={[
          { name: 'Lokality', href: path('lokality', DEFAULT_LOCALE) },
          { name: loc.title, href: here },
        ]}
      />

      <section className="sec sec--tight" aria-labelledby="lok-fakta">
        <div className="wrap">
          <SecHead id="lok-fakta" badge="Rychlá fakta" title="Oblast" accent="v kostce" />
          <div className="lok-facts">
            <div className="lok-fact">
              <span className="lok-fact__k">Nabídek teď</span>
              <span className="lok-fact__v">{st.count}</span>
            </div>
            <div className="lok-fact">
              <span className="lok-fact__k">Střední cena</span>
              <span className="lok-fact__v">{eur(st.medianPrice)}</span>
            </div>
            <div className="lok-fact">
              <span className="lok-fact__k">Střední cena za m²</span>
              <span className="lok-fact__v">{st.medianPerM2 ? eur(st.medianPerM2) : 'málo nabídek'}</span>
            </div>
            <div className="lok-fact lok-fact--todo">
              <span className="lok-fact__k">Letiště, moře, sezónnost</span>
              <span className="lok-fact__v lok-fact__v--sm">
                <Marked text="[DOPLNIT: vzdálenost k letišti a k moři, sezónnost]" />
              </span>
            </div>
          </div>
          <p className="lok-note">Čísla jsou spočítaná z aktuální nabídky na tomto webu.</p>
        </div>
      </section>

      <section className="sec" aria-labelledby="lok-pro-koho">
        <div className="wrap lok-who">
          <div className="lok-who__col">
            <h2 id="lok-pro-koho" className="lok-who__h">Pro koho se hodí</h2>
            <p>
              <Marked text="[DOPLNIT: pro koho se oblast hodí, podle zkušenosti klientky]" />
            </p>
          </div>
          <div className="lok-who__col lok-who__col--no">
            <h2 className="lok-who__h">Pro koho ne</h2>
            <p>
              <Marked text="[DOPLNIT: pro koho se oblast nehodí]" />
            </p>
          </div>
        </div>
      </section>

      <section className="sec" id="nabidky" aria-labelledby="lok-nabidky">
        <div className="wrap">
          <SecHead id="lok-nabidky" badge="Aktuální nabídka" title="Nabídky" accent={`v oblasti ${loc.title}`} />
          {st.items.length > 0 ? (
            <div className="listing-grid">
              {st.items.slice(0, 9).map((p, i) => (
                <PropertyCard key={p.id} p={p} locale={DEFAULT_LOCALE} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="flt__empty">
              <p>V téhle oblasti teď nemám nabídku na webu. Ozvěte se, vyberu vám i z neveřejných nabídek.</p>
              <Link className="btn btn--saffron" href={`${path('nemovitosti', DEFAULT_LOCALE)}#na-miru`}>Najít nemovitost na míru</Link>
            </div>
          )}
          {st.items.length > 0 && (
            <p className="lok-more">
              <Link className="btn btn--ghost" href={`${path('nemovitosti', DEFAULT_LOCALE)}?oblast=${slug}#filtr`}>
                Všechny nabídky v oblasti
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="sec sec--soft" aria-labelledby="lok-galerie">
        <div className="wrap">
          <SecHead id="lok-galerie" badge="Fotky a video" title="Jak to tu" accent="vypadá" />
          <div className="lok-gallery">
            {media.video && (
              <figure className="lok-gallery__video">
                <ClickVideo src={media.video.src} poster={media.video.poster} label={media.video.label} ratio={media.video.ratio} />
              </figure>
            )}
            {media.photos.map((m) => (
              <figure className="media-tile lok-gallery__tile" key={m.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.alt} loading="lazy" />
                <figcaption className="media-chip">{m.label}</figcaption>
              </figure>
            ))}
            {media.photos.length < 2 && (
              <Zastupny
                label={`Fotky a video z oblasti ${loc.title}`}
                ratio="4 / 3"
                spec="3 až 6 fotek (4:5 nebo 3:2) a krátké video"
                className="zastupny--compact lok-gallery__ph"
              />
            )}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="lok-zivot">
        <div className="wrap lok-life">
          <div>
            <SecHead id="lok-zivot" badge="Život tady" title="Doprava, obchody," accent="zdravotnictví" left />
            <p className="lok-life__p">
              <Marked text="[DOPLNIT: doprava, vybavenost a zdravotnictví v oblasti]" />
            </p>
          </div>
          <div className="lok-life__box">
            <h3 className="lok-life__h">Provozní náklady (IMU a TARI)</h3>
            <p>{IMU}</p>
            <Link href={`${path('jakKoupit', DEFAULT_LOCALE)}#kalkulacka`}>Spočítat celkový rozpočet</Link>
          </div>
        </div>
      </section>

      <section className="sec sec--tight" aria-labelledby="lok-ref">
        <div className="wrap">
          <SecHead id="lok-ref" badge="Reference" title="Klienti," accent="kteří tu koupili" />
          {media.quotes.length > 0 ? (
            <ReviewQuotes names={media.quotes} href={path('reference', DEFAULT_LOCALE)} />
          ) : (
            <p className="lok-note">
              <Marked text="[DOPLNIT: reference klienta, který v oblasti koupil]" />
            </p>
          )}
        </div>
      </section>

      <section className="sec sec--tight" aria-labelledby="lok-sousede">
        <div className="wrap">
          <SecHead id="lok-sousede" badge="Další oblasti" title="Sousední" accent="lokality" />
          <ul className="lok-next">
            {others.map((s) => (
              <li key={s}>
                <Link href={path('lokalita', DEFAULT_LOCALE, s)} className="lok-next__a media-zoom">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOCALITIES[s].image.webp} alt={LOCALITIES[s].image.alt} loading="lazy" />
                  <span className="lok-next__t">{LOCALITIES[s].title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        id="lokalita-cta"
        title="Nevíte,"
        accent="kterou vybrat?"
        text="Zavolejme si. Řeknu vám, jestli je pro vás tahle oblast to pravé, a co dalšího zvážit."
        primary={{ href: path('konzultace', DEFAULT_LOCALE), label: 'Vybrat termín hovoru' }}
      />
      <MobileCtaBar />
    </main>
  );
}
