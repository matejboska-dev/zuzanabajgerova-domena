import { localizeTree, localized } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuideBudget from '@/components/guide/GuideBudget';
import JsonLd from '@/components/page/JsonLd';
import { CircleArrow } from '@/components/services/ServiceInteractions';
import { GLOSSARY, MISTAKES } from '@/lib/content/glossary';
import { GUIDE_SOURCES } from '@/lib/buying-guide';
import { eurCzkRate } from '@/lib/fx.server';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import '@/components/guide/guide.css';
import '@/components/guide/journey.css';
export const dynamicParams = false;
export function generateStaticParams() { return LOCALES.map(locale => ({ locale })); }
const TITLE = 'Koupě v Itálii: náklady, dokumenty a slovníček';
const DESC = 'Praktické informace k průvodci koupí: rozpočet, orientační kalkulačka, kontrolní seznam a italské pojmy v češtině.';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {}; return pageMetadata({ id: 'koupePrakticky', locale, title: TITLE, description: DESC, });
}
function SourceContent({ href, children }: { href: string; children: React.ReactNode }) { return <a className="guide-source" href={href} target="_blank" rel="noopener noreferrer">{children}<CircleArrow /></a>; }
async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const rate = await eurCzkRate();
  const here = path('koupePrakticky',locale);
  return <main className="buying-guide journey-resources">
    <JsonLd data={graph(webPageNode({path:here,name:TITLE,description:DESC}),breadcrumbNode([{name:'Domů',href:'/'},{name:'Jak koupit v Itálii',href:path('jakKoupit',locale)},{name:'Praktické informace',href:here}]))} />
    <header className="guide-shell journey-resource-head"><Link className="guide-text-link" href={path('jakKoupit',locale)}>Zpět na devět kroků spolupráce<CircleArrow /></Link><h1>Náklady, dokumenty.<em>A odpovědi do detailu.</em></h1><p>Praktická část průvodce. Vraťte se k ní při plánování rozpočtu nebo před konkrétní nabídkou.</p><nav aria-label="Praktické informace"><a href="#naklady">Rozpočet</a><a href="#chyby">Na co si dát pozor</a><a href="#slovnicek">Slovníček</a><a href="#domy-za-1-euro">Domy za 1 euro</a></nav></header>
    <section className="guide-section guide-budget-section" id="naklady"><div className="guide-shell"><div className="guide-heading"><h2>Rozpočet bez<em>nepříjemného překvapení.</em></h2><div><p>Konečnou cenu znáte už z inzerátu. U každé nabídky si potvrdíme, co cena zahrnuje. Rekonstrukci, vybavení a běžný provoz plánujeme zvlášť.</p><Source href={GUIDE_SOURCES.tax}>Daně při koupi: Agenzia delle Entrate</Source></div></div><div className="guide-costs"><p><b>Koupě</b>Cena domu, daně, notář a provize podle konkrétní nabídky.</p><p><b>Zabydlení</b>Opravy, vybavení a případná rekonstrukce podle stavu bytu.</p><p><b>Každý rok</b>Energie, společné náklady domu, pojištění a případné IMU a TARI.</p></div><div id="kalkulacka"><h3>Dejte své představě čísla.</h3><GuideBudget rate={rate} /></div></div></section>

    <section className="guide-section guide-shell guide-checklist" id="chyby"><div><h2>Dobrá otázka dnes.<em>Větší klid zítra.</em></h2><p>Sedm věcí, které je lepší řešit před koupí. Nechte si je vysvětlit na konkrétní nemovitosti.</p><Source href={GUIDE_SOURCES.checklist}>Kontrolní seznam od notářské komory</Source></div><div>{MISTAKES.map((m,i)=><details key={m.title}><summary><span>{String(i+1).padStart(2,'0')}</span>{m.title}<CircleArrow /></summary><p>{i===2?'Zvolte si svého notáře včas. U složitější situace s ním proberte potřebu dalšího právního nebo technického posouzení.':m.text}</p></details>)}</div></section>

    <section className="guide-section guide-shell guide-glossary" id="slovnicek"><div className="guide-heading"><h2>Italské pojmy.<em>Lidsky a česky.</em></h2><p>Slovníček k první orientaci. Přesný význam ve vaší smlouvě si vždy nechte vysvětlit.</p></div><dl>{GLOSSARY.map(g=><div key={g.term}><dt>{g.term}<span>{g.term === 'Caparra' ? 'smluvní jistota' : g.cz}</span></dt><dd>{g.term==='Codice fiscale'?'Italské identifikační číslo pro daňové a další úřední úkony.':g.term==='Caparra'?'Smluvní peněžní jistota. Její druh a následky porušení smlouvy je třeba odlišit od prosté zálohy na cenu.':g.term==='IMU'?'Místní daň z nemovitostí; povinnost a výše závisí na konkrétní situaci.':g.def}</dd></div>)}</dl></section>

    <section className="guide-shell guide-section" id="domy-za-1-euro"><h2>A co domy za jedno euro?</h2><p className="journey-resource-copy">Symbolická kupní cena není celkový rozpočet. Podmínky stanovuje konkrétní obec a obvykle zahrnují závazek oprav. Nejdříve je potřeba přečíst aktuální obecní výzvu a propočítat rekonstrukci.</p><Link className="guide-text-link" href={path('rekonstrukce',locale)}>Jak řeším rekonstrukci<CircleArrow /></Link></section>
    <aside className="guide-shell guide-sources"><p>Průvodce připravila Bc. Zuzana Bajgerová. Slouží k orientaci; konkrétní právní a daňové podmínky ověřte se svým notářem a daňovým poradcem.</p><Source href={GUIDE_SOURCES.notary}>Consiglio Nazionale del Notariato</Source></aside>
  </main>;
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}

const Source = localized(SourceContent);
