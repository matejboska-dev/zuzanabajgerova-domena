import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Marked from '@/components/Marked';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import FeaturedListings from '@/components/page/FeaturedListings';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { LOCALITIES, LOCALITY_SLUGS } from '@/lib/localities';
import { eur, localityStats } from '@/lib/localityStats';
import { absolute, path } from '@/lib/routes';
import { agentNode, breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 21600;
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Lokality v Abruzzu';
const LEAD =
  'Abruzzo není jedno místo. Pobřeží u Pescary, rybářské trabocchi na jihu, podhůří Gran Sassa a vnitrozemí se liší cenou, dostupností i tím, pro koho se hodí.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'lokality', locale, title: TITLE, description: LEAD, onlyCs: true, image: '/media/lok-pescara-colle.webp' });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('lokality', DEFAULT_LOCALE);
  const rows = await Promise.all(LOCALITY_SLUGS.map(async (slug) => ({ slug, loc: LOCALITIES[slug], st: await localityStats(slug) })));

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ type: 'CollectionPage', path: here, name: TITLE, description: LEAD }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Lokality', href: here },
          ]),
          {
            '@type': 'ItemList',
            itemListElement: rows.map((r, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absolute(path('lokalita', DEFAULT_LOCALE, r.slug)),
              name: r.loc.title,
            })),
          },
        )}
      />

      <SubHero
        id="lokality-h1"
        badge="Lokality · Abruzzo"
        title="Kde v Abruzzu"
        accent="hledat"
        lead={LEAD}
        bg={{ src: '/media/lok-pescara-colle.webp', width: 1600, height: 1000 }}
        bgPosition="center 60%"
        ctas={[
          { href: '#oblasti', label: 'Projít oblasti' },
          { href: path('konzultace', DEFAULT_LOCALE), label: 'Poradit se, kterou vybrat', variant: 'glass' },
        ]}
        chips={['4 oblasti', 'Pobřeží i hory', 'Čísla z aktuální nabídky']}
      />

      <Crumbs items={[{ name: 'Lokality', href: here }]} />

      <section className="sec" id="oblasti" aria-labelledby="lok-oblasti">
        <div className="wrap">
          <SecHead id="lok-oblasti" badge="Čtyři oblasti" title="Každá oblast" accent="je jiná" lead="Vyberte si podle toho, co je pro vás důležité: moře, letiště, klid nebo cena." />
          <ul className="lok-grid">
            {rows.map(({ slug, loc, st }) => (
              <li key={slug} className="lok-card">
                <Link href={path('lokalita', DEFAULT_LOCALE, slug)} className="lok-card__link">
                  <figure className="lok-card__img media-zoom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={loc.image.webp} alt={loc.image.alt} width={loc.image.width} height={loc.image.height} loading="lazy" />
                    {st.count > 0 && <figcaption className="media-chip media-chip--gold">{st.count} nabídek</figcaption>}
                  </figure>
                  <div className="lok-card__body">
                    <h3 className="lok-card__t">{loc.title}</h3>
                    <p className="lok-card__d">{loc.lead}</p>
                    <span className="lok-card__more">Více o oblasti</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--soft" id="srovnani" aria-labelledby="lok-srovnani">
        <div className="wrap">
          <SecHead
            id="lok-srovnani"
            badge="Srovnání"
            title="Oblasti v číslech"
            accent="z aktuální nabídky"
            lead="Čísla jsou spočítaná z nabídek na tomto webu, a proto se s nabídkou mění."
          />
          <div className="lok-table" role="region" aria-label="Srovnání oblastí" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Oblast</th>
                  <th scope="col">Nabídek</th>
                  <th scope="col">Cena od</th>
                  <th scope="col">Střední cena</th>
                  <th scope="col">Střední cena za m²</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ slug, loc, st }) => (
                  <tr key={slug}>
                    <th scope="row">
                      <Link href={path('lokalita', DEFAULT_LOCALE, slug)}>{loc.title}</Link>
                    </th>
                    <td>{st.count}</td>
                    <td>{eur(st.minPrice)}</td>
                    <td>{eur(st.medianPrice)}</td>
                    <td>{st.medianPerM2 ? eur(st.medianPerM2) : 'málo nabídek'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lok-note">
            <Marked text="[DOPLNIT: pro každou oblast vzdálenost k letišti a k moři a sezónnost]" />
          </p>
        </div>
      </section>

      <FeaturedListings id="lok-nabidky" title="Nabídky napříč" accent="oblastmi" />

      <CtaBand
        id="lokality-cta"
        title="Nevíte,"
        accent="kterou vybrat?"
        text="Zavolejme si. Za dvacet minut vám řeknu, která oblast odpovídá vašemu rozpočtu a tomu, jak chcete nemovitost využívat."
        primary={{ href: path('konzultace', DEFAULT_LOCALE), label: 'Vybrat termín hovoru' }}
      />
      <MobileCtaBar />
    </main>
  );
}
