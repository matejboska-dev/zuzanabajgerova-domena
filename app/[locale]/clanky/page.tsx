import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import JsonLd from '@/components/page/JsonLd';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

// Rozcestnik clanku. Dokud nevyjde prvni clanek, stranka NENI v indexu ani v sitemap
// (lib/routes.ts NOINDEX): prazdny rozcestnik by Googlu nic nedal. Temata doda klientka.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Články a průvodci';
const LEAD =
  'Odpovědi na otázky, které lidé řeší dřív, než osloví makléře. Koupě, náklady, lokality, život v Itálii a investice.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return {
    ...pageMetadata({ id: 'clanky', locale, title: TITLE, description: LEAD, onlyCs: true }),
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('clanky', DEFAULT_LOCALE);
  const guide = path('jakKoupit', DEFAULT_LOCALE);

  const cats = [
    { t: 'Koupě', d: 'Postup od první konzultace po klíče.', href: `${guide}#pruvodce`, img: '/media/kom-notar.webp' },
    { t: 'Náklady', d: 'Co všechno zaplatíte a jak spočítat rozpočet.', href: `${path('koupePrakticky', DEFAULT_LOCALE)}#naklady`, img: '/media/lok-pescara-colle.webp' },
    { t: 'Lokality', d: 'Čtyři oblasti Abruzza a pro koho se hodí.', href: path('lokality', DEFAULT_LOCALE), img: '/media/why-more.webp' },
    { t: 'Investice', d: 'Pronájem, rekonstrukce a provoz na dálku.', href: path('pronajem', DEFAULT_LOCALE), img: '/media/reno-real-3.webp' },
    { t: 'Život v Itálii', d: 'Jak se v Abruzzu žije a slaví.', href: `${path('oMne', DEFAULT_LOCALE)}#fotky`, img: '/media/kom-ferragosto.webp' },
  ];

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          webPageNode({ type: 'CollectionPage', path: here, name: TITLE, description: LEAD }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: TITLE, href: here },
          ]),
        )}
      />

      <SubHero
        id="clanky-h1"
        badge="Články · Průvodci"
        title="Než se rozhodnete,"
        accent="přečtěte si tohle"
        lead={LEAD}
        bg={{ src: '/media/why-pocasi.webp', width: 1200, height: 800 }}
        ctas={[{ href: guide, label: 'Průvodce koupí krok za krokem' }]}
      />

      <Crumbs items={[{ name: TITLE, href: here }]} />

      <section className="sec" aria-labelledby="clanky-pilir">
        <div className="wrap">
          <Link href={guide} className="pillar media-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/jak-notar.webp" alt="Podpis dokumentů při koupi nemovitosti" loading="lazy" />
            <span className="pillar__body">

              <span id="clanky-pilir" className="pillar__t">Jak koupit nemovitost v Itálii, krok za krokem</span>
              <span className="pillar__d">8 kroků, náklady s kalkulačkou, plná moc, 7 chyb a slovníček italských pojmů.</span>
              <span className="pillar__more">Číst průvodce</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="sec sec--tight" aria-labelledby="clanky-kat">
        <div className="wrap">
          <SecHead id="clanky-kat" badge="Témata" title="Vyberte si" accent="téma" />
          <ul className="cats">
            {cats.map((c) => (
              <li key={c.t}>
                <Link href={c.href} className="cat media-zoom">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" loading="lazy" />
                  <span className="cat__body">
                    <span className="cat__t">{c.t}</span>
                    <span className="cat__d">{c.d}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        id="clanky-cta"
        title="Hlídejte si"
        accent="nové nabídky"
        text="Napište mi, co hledáte, a jakmile budu mít nabídku podle vašeho zadání, pošlu vám ji e-mailem."
        primary={{ href: `${path('nemovitosti', DEFAULT_LOCALE)}#hlidac`, label: 'Nastavit hlídač nabídek' }}
      />
    </main>
  );
}
