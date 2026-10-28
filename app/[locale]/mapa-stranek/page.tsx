import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/page/Crumbs';
import JsonLd from '@/components/page/JsonLd';
import { listProperties } from '@/lib/data.server';
import { listArticles } from '@/lib/articles';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { LOCALITIES, LOCALITY_SLUGS } from '@/lib/localities';
import { path, type RouteId } from '@/lib/routes';
import { breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 21600;
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const TITLE = 'Mapa stránek';
const DESC = 'Přehled všech stránek webu na jednom místě.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'mapaStranek', locale, title: TITLE, description: DESC, });
}

const L = (id: RouteId) => path(id, DEFAULT_LOCALE);

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const here = L('mapaStranek');
  const count = (await listProperties()).length;
  const guide = L('jakKoupit');
  const practical = L('koupePrakticky');

  const cols: { h: string; links: { href: string; label: string }[] }[] = [
    {
      h: 'Hlavní sekce',
      links: [
        { href: '/', label: 'Domů' },
        { href: L('nemovitosti'), label: `Nemovitosti (${count})` },
        { href: L('sluzby'), label: 'Služby' },
        { href: L('koupe'), label: 'Servis při koupi' },
        { href: L('rekonstrukce'), label: 'Rekonstrukce a vybavení' },
        { href: L('sprava'), label: 'Správa nemovitosti' },
        { href: L('pronajem'), label: 'Krátkodobý pronájem' },
        { href: L('oMne'), label: 'O mně' },
        { href: L('reference'), label: 'Reference' },
        { href: L('kontakt'), label: 'Kontakt' },
        { href: L('konzultace'), label: 'Rezervace hovoru' },
      ],
    },
    {
      h: 'Lokality',
      links: [
        { href: L('lokality'), label: 'Všechny lokality' },
        ...LOCALITY_SLUGS.map((s) => ({ href: path('lokalita', locale, s), label: LOCALITIES[s].title })),
      ],
    },
    {
      h: 'Jak koupit v Itálii',
      links: [
        { href: guide, label: 'Průvodce koupí krok za krokem' },
        { href: practical, label: 'Praktické informace ke koupi' },
        { href: `${practical}#naklady`, label: 'Náklady a daně' },
        { href: `${practical}#kalkulacka`, label: 'Kalkulačka nákladů' },
        { href: `${guide}#codice-fiscale`, label: 'Codice fiscale' },
        { href: `${practical}#domy-za-1-euro`, label: 'Domy za 1 euro' },
        { href: `${practical}#slovnicek`, label: 'Slovníček pojmů' },
        { href: L('clanky'), label: 'Blog' },
        ...listArticles(locale).map((a) => ({ href: path('clanek', locale, a.slug), label: a.title })),
      ],
    },
    {
      h: 'Povinné stránky',
      links: [
        { href: L('ochranaUdaju'), label: 'Ochrana osobních údajů' },
        { href: L('podminky'), label: 'Podmínky užití webu' },
        { href: L('cookies'), label: 'Cookies' },
      ],
    },
  ];

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          webPageNode({ path: here, name: TITLE, description: DESC }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: TITLE, href: here },
          ]),
        )}
      />
      <Crumbs items={[{ name: TITLE, href: here }]} />
      <header className="legal__head">
        <div className="wrap">

          <h1 className="page__title">{TITLE}</h1>
          <p className="page__lead">{DESC}</p>
        </div>
      </header>
      <section className="sec sec--tight" aria-label="Seznam stránek">
        <div className="wrap sm">
          {cols.map((c) => (
            <nav className="sm__col" key={c.h} aria-label={c.h}>
              <h2 className="sm__h">{c.h}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>
    </main>
  );
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
