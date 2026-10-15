import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/page/Crumbs';
import FeaturedListings from '@/components/page/FeaturedListings';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import AreaMap from '@/components/localities/AreaMap';
import HeroCarousel from '@/components/localities/HeroCarousel';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { LOCALITIES, LOCALITY_SLUGS } from '@/lib/localities';
import { eur, localityStats } from '@/lib/localityStats';
import { absolute, path } from '@/lib/routes';
import { agentNode, breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import './localities.css';

export const revalidate = 21600;
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Lokality v Abruzzu';
const LEAD = 'Od pobřeží Jadranu po kamenné vesnice pod Gran Sassem. Poznejte čtyři tváře Abruzza a najděte místo pro svůj život v Itálii.';
const EDITORIAL: Record<string, { character: string; description: string; fit: string; places: string }> = {
  'pescara-a-pobrezi': {
    character: 'Moře na dosah. Město po celý rok.',
    description: 'Pláže, městské zázemí a letiště. Výchozí bod pro ty, kdo chtějí spojit pobyt u moře s každodenním pohodlím.',
    fit: 'Když chcete mít u moře také obchody, služby a městský život.',
    places: 'Pescara · Montesilvano · Francavilla al Mare',
  },
  'costa-dei-trabocchi': {
    character: 'Pomalejší rytmus jižního pobřeží.',
    description: 'Rybářské trabocchi, zátoky a cyklostezka podél moře. Pobřeží s jinou atmosférou než městská Pescara.',
    fit: 'Když vás lákají menší pobřežní místa, zátoky a výlety na kole.',
    places: 'Ortona · San Vito Chietino · Vasto',
  },
  'teramo-a-sever': {
    character: 'Mezi pláží a horským horizontem.',
    description: 'Severní pobřeží s letovisky od Silvi po Alba Adriatica. V zázemí kopce a národní park Gran Sasso.',
    fit: 'Když chcete pobyt u moře střídat s objevováním hor a vnitrozemí.',
    places: 'Silvi · Roseto degli Abruzzi · Alba Adriatica',
  },
  'gran-sasso-a-vnitrozemi': {
    character: 'Kamenné domy. Ticho. Hory.',
    description: 'Historické obce a horská krajina. Jiná podoba italského bydlení pro ty, jejichž hledání nekončí u pláže.',
    fit: 'Když jsou pro vás důležitější hory a charakter starých obcí než pláž.',
    places: 'Calascio · Navelli · okolí Gran Sassa',
  },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M5 12h14m-6-6 6 6-6 6'} /></svg>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'lokality', locale, title: TITLE, description: LEAD, onlyCs: true, image: '/hero/backgrounds/abruzzo-pescara-z-letadla.webp' });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('lokality', DEFAULT_LOCALE);
  const rows = await Promise.all(LOCALITY_SLUGS.map(async slug => ({ slug, loc: LOCALITIES[slug], st: await localityStats(slug) })));
  const areas = rows.map(({ slug, loc }) => ({ slug, title: loc.title, ...EDITORIAL[slug], href: path('lokalita', DEFAULT_LOCALE, slug) }));

  return (
    <main className="subpage atlas">
      <JsonLd data={graph(
        agentNode(),
        webPageNode({ type: 'CollectionPage', path: here, name: TITLE, description: LEAD }),
        breadcrumbNode([{ name: 'Domů', href: '/' }, { name: 'Lokality', href: here }]),
        { '@type': 'ItemList', itemListElement: rows.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: absolute(path('lokalita', DEFAULT_LOCALE, r.slug)), name: r.loc.title })) },
      )} />

      <section className="atlas-hero" aria-labelledby="lokality-h1">
        <div className="atlas-hero__copy">
          <h1 id="lokality-h1">Najděte své <em>místo v Abruzzu.</em></h1>
          <p>{LEAD}</p>
          <div className="atlas-hero__actions">
            <a href="#mapa" className="btn btn--cobalt">Poznat oblasti <Arrow /></a>
            <Link href={path('konzultace', DEFAULT_LOCALE)} className="atlas-link">Poradit se s výběrem <Arrow diagonal /></Link>
          </div>
          <div className="atlas-hero__foot"><span>Jeden region. Čtyři různé světy.</span><a href="#oblasti" aria-label="Přejít na čtyři oblasti"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 4v15m-6-6 6 6 6-6" /></svg></a></div>
        </div>
        <HeroCarousel />
      </section>

      <Crumbs items={[{ name: 'Lokality', href: here }]} />

      <section className="atlas-orientation" id="mapa" aria-labelledby="atlas-map-title">
        <div className="atlas-container">
          <div className="atlas-heading atlas-heading--map">
            <h2 id="atlas-map-title">Nejdřív místo.<br /><em>Potom nemovitost.</em></h2>
            <p>Pobřeží, město, nebo hory? Začněte tím, jak chcete v Itálii trávit čas. Každá část Abruzza nabízí jiný způsob života.</p>
          </div>
          <AreaMap areas={areas} />
        </div>
      </section>

      <section className="atlas-regions atlas-container" id="oblasti" aria-labelledby="lok-oblasti">
        <div className="atlas-heading">
          <h2 id="lok-oblasti">Čtyři oblasti.<br /><em>Která bude ta vaše?</em></h2>
          <p>Projděte si jejich charakter. V detailu každé oblasti najdete více informací a aktuální nemovitosti.</p>
        </div>
        {rows.map(({ slug, loc, st }, i) => {
          const edit = EDITORIAL[slug];
          return (
            <article className={`atlas-region${i % 2 ? ' atlas-region--reverse' : ''}`} key={slug} id={`oblast-${slug}`} aria-labelledby={`title-${slug}`}>
              <Link className="atlas-region__photo" href={path('lokalita', DEFAULT_LOCALE, slug)} aria-label={`Prozkoumat ${loc.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={loc.image.webp} alt={loc.image.alt} width={loc.image.width} height={loc.image.height} loading="lazy" />
                <span className="atlas-region__index" aria-hidden="true">0{i + 1}</span>
                <span className="atlas-region__photo-action" aria-hidden="true"><Arrow diagonal /></span>
              </Link>
              <div className="atlas-region__copy">
                <h3 id={`title-${slug}`}>{loc.title}</h3>
                <p className="atlas-region__character">{edit.character}</p>
                <p className="atlas-region__description">{edit.description}</p>
                <div className="atlas-region__fit"><h4>Mohla by být pro vás</h4><p>{edit.fit}</p></div>
                <p className="atlas-region__places">{edit.places}</p>
                <div className="atlas-region__bottom">
                  <Link className="atlas-link" href={path('lokalita', DEFAULT_LOCALE, slug)}>Prozkoumat oblast <Arrow diagonal /></Link>
                  {st.count > 0 && <span>{st.count} {st.count === 1 ? 'nabídka' : st.count < 5 ? 'nabídky' : 'nabídek'}{st.minPrice != null && <> · od {eur(st.minPrice)}</>}</span>}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="atlas-comparison" id="srovnani" aria-labelledby="lok-srovnani">
        <div className="atlas-container">
          <div className="atlas-heading"><h2 id="lok-srovnani">Různá místa.<br /><em>Různé možnosti.</em></h2><p>Pro první představu o rozpočtu. Čísla vycházejí z aktuálních nabídek na tomto webu a průběžně se s nimi mění.</p></div>
          <table className="atlas-table">
            <caption className="atlas-sr-only">Srovnání cen aktuálních nabídek ve čtyřech oblastech Abruzza</caption>
            <thead><tr><th scope="col">Oblast</th><th scope="col">Nabídek</th><th scope="col">Cena od</th><th scope="col">Střední cena</th><th scope="col">Střední cena / m²</th></tr></thead>
            <tbody>{rows.map(({ slug, loc, st }, i) => <tr key={slug}>
              <th scope="row"><Link href={path('lokalita', DEFAULT_LOCALE, slug)}><span>0{i + 1}</span>{loc.title}</Link></th>
              <td>{st.count}</td><td>{eur(st.minPrice)}</td><td>{eur(st.medianPrice)}</td><td>{st.medianPerM2 ? eur(st.medianPerM2) : 'Málo nabídek'}</td>
            </tr>)}</tbody>
          </table>
          <div className="atlas-comparison__mobile">{rows.map(({ slug, loc, st }, i) => <article key={slug}>
            <h3><Link href={path('lokalita', DEFAULT_LOCALE, slug)}><span>0{i + 1}</span>{loc.title}<Arrow diagonal /></Link></h3>
            <dl><div><dt>Nabídek</dt><dd>{st.count}</dd></div><div><dt>Cena od</dt><dd>{eur(st.minPrice)}</dd></div><div><dt>Střední cena</dt><dd>{eur(st.medianPrice)}</dd></div><div><dt>Střední cena / m²</dt><dd>{st.medianPerM2 ? eur(st.medianPerM2) : 'Málo nabídek'}</dd></div></dl>
          </article>)}</div>
          <p className="atlas-comparison__note">Střední cena je medián nabídkových cen, nikoli odhad hodnoty celé oblasti. Cenu za m² uvádíme při alespoň třech nabídkách se známou plochou. Cesta k moři, dostupnost letiště i charakter okolí záleží na konkrétní adrese.</p>
        </div>
      </section>

      <FeaturedListings id="lok-nabidky" title="Vaše místo už možná" accent="čeká v nabídce." />

      <section className="atlas-contact atlas-container" id="poptavka" aria-labelledby="lokality-cta">
        <figure className="atlas-contact__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/zuzana-abruzzo-more.webp" alt="Zuzana Bajgerová u moře v Abruzzu" width="600" height="800" loading="lazy" />
        </figure>
        <div className="atlas-contact__copy">
          <h2 id="lokality-cta">Najdeme místo,<br /><em>kde vám bude dobře.</em></h2>
          <p>Nemusíte mít vybranou oblast. Zavolejme si a proberme váš rozpočet i to, jak chcete nemovitost využívat. Společně zúžíme výběr.</p>
          <Link href={path('konzultace', DEFAULT_LOCALE)} className="btn btn--cobalt">Domluvit konzultaci <Arrow diagonal /></Link>
          <div className="atlas-contact__signature"><span>Zuzana Bajgerová</span><p>Vaše průvodkyně nemovitostmi v Abruzzu</p></div>
        </div>
      </section>
      <MobileCtaBar />
    </main>
  );
}
