import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClickVideo from '@/components/page/ClickVideo';
import JsonLd from '@/components/page/JsonLd';
import ReviewQuotes from '@/components/page/ReviewQuotes';
import GuideMotion from '@/components/guide/GuideMotion';
import { CircleArrow } from '@/components/services/ServiceInteractions';
import { waLink } from '@/lib/contact';
import { SERVICE_IMAGES } from '@/lib/service-images';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { ABOUT } from '@/lib/home';
import { path } from '@/lib/routes';
import { agentNode, breadcrumbNode, graph, personNode, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import '@/components/guide/guide.css';
import '@/components/guide/about.css';

export const dynamicParams = false;
export function generateStaticParams() { return LOCALES.map(locale => ({ locale })); }
const TITLE = 'O mně, Zuzana Bajgerová v Abruzzu';
const DESC = 'Poznejte Zuzanu Bajgerovou. Dvacet let života v Abruzzu, místní partneři a osobní doprovod českých klientů od výběru nemovitosti po předání klíčů.';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) return {}; return pageMetadata({id:'oMne',locale,title:TITLE,description:DESC,image:'/services/curated/zuzana-office.webp'});
}
const values = [
  ['Domluvíme se česky','Přeložím vám nejen slova, ale i souvislosti. Chci, abyste rozuměli tomu, co se právě řeší a o čem rozhodujete.'],
  ['Na místě mám své lidi','Spolupracuji s místními realitními partnery, notářem, techniky a řemeslníky. Pomohu koordinovat jejich práci kolem vaší nemovitosti.'],
  ['Podmínky znáte dopředu','U konkrétní nabídky probereme cenu, rozsah služeb a další náklady. Důležité dohody patří na papír.'],
  ['Předáním klíčů to nekončí','Podle potřeby navážeme energiemi, rekonstrukcí, správou nebo pronájmem. I když jste zrovna v Česku.'],
];
const services = [
  {id:'koupe',title:'Najít svůj domov',image:SERVICE_IMAGES.koupe.src,alt:SERVICE_IMAGES.koupe.alt.cs},
  {id:'rekonstrukce',title:'Dát mu vlastní podobu',image:SERVICE_IMAGES.rekonstrukce.src,alt:SERVICE_IMAGES.rekonstrukce.alt.cs},
  {id:'sprava',title:'Mít o něj postaráno',image:SERVICE_IMAGES.sprava.src,alt:SERVICE_IMAGES.sprava.alt.cs},
  {id:'pronajem',title:'Přivítat v něm hosty',image:SERVICE_IMAGES.pronajem.src,alt:SERVICE_IMAGES.pronajem.alt.cs},
] as const;
async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const here=path('oMne',locale);
  return <GuideMotion><main className="about-editorial">
    <JsonLd data={graph(agentNode(),personNode(),webPageNode({type:'AboutPage',path:here,name:TITLE,description:DESC,image:'/services/curated/zuzana-office.webp'}),breadcrumbNode([{name:'Domů',href:'/'},{name:'O mně',href:here}]))} />
    <section className="about-hero guide-shell">
      <div className="about-hero__copy"><nav className="guide-crumbs" aria-label="Drobečková navigace"><Link href="/">Domů</Link><span>/</span><span>O mně</span></nav><h1>Jsem Zuzana.<em>V Abruzzu<br />jsem doma.</em></h1><p>Pomáhám vám najít domov v kraji, kde sama žiji. S českou domluvou, místními kontakty a osobním doprovodem od první prohlídky po vlastní klíče.</p><div className="guide-actions"><Link className="guide-button" href={path('kontakt',locale)}>Pojďme se poznat<CircleArrow /></Link><a className="guide-text-link" href="#pribeh">Můj příběh<CircleArrow /></a></div><span className="guide-signature">Zuzana Bajgerová</span></div>
      <figure className="about-hero__portrait"><img src="/services/curated/zuzana-office.webp" alt="Bc. Zuzana Bajgerová v bílém saku" width="788" height="1400" fetchPriority="high" /><figcaption>Bc. Zuzana Bajgerová<span>Realitní specialistka · Abruzzo, Itálie</span></figcaption></figure>
    </section>
    <section className="guide-section guide-shell about-story" id="pribeh"><figure className="guide-photo"><img src="/media/omne-sunset.webp" alt="Zuzana u moře při západu slunce" width="1000" height="1250" loading="lazy" /></figure><div><h2>Moře je krásné.<em>Domov dělají lidé.</em></h2><p>V Abruzzu funguji už dvacet let. Žiji v Montesilvanu a znám tu běžný život, nejen místa z prázdninových fotografií.</p><p>Právě tuhle zkušenost předávám svým klientům. Když vybíráme byt nebo dům, zajímá mě, jak v něm chcete žít. Jestli přijíždět na pár týdnů, trávit tu zimu, nebo se usadit natrvalo.</p><p>Propojím vás s lidmi, které budete při koupi potřebovat. A zůstávám vám nablízku i potom, co si převezmete klíče.</p><Link className="guide-text-link" href={path('jakKoupit',locale)}>Jak vás provedu koupí<CircleArrow /></Link></div></section>
    <section className="about-principles guide-section" id="hodnoty"><div className="guide-shell"><div className="guide-heading"><h2>Osobní přístup.<em>Konkrétní práce.</em></h2><p>Za hezkým výhledem je spousta drobných rozhodnutí a domluv. Mojí prací je propojit je do procesu, ve kterém se vyznáte.</p></div><div className="about-principles__grid"><div>{values.map(([title,text])=><article key={title}><CircleArrow /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><figure className="guide-photo"><img src="/services/curated/architect-handover.webp" alt="Společné setkání při předání zrekonstruovaného interiéru" width="900" height="1600" loading="lazy" /><figcaption>Na místě, s lidmi, kteří se na vašem domově podílejí.</figcaption></figure></div></div></section>
    <section className="guide-section guide-shell about-awards" id="oceneni"><div><h2>Za výsledky<em>stojí důvěra.</em></h2><p>Ocenění z realitní sítě RE/MAX jsou pro mě uznáním práce. Pro vás je důležitější, jak se spolu domluvíme a co pro vás dokážu zařídit.</p><ul>{ABOUT.awards.map(a=><li key={a}><CircleArrow />{a}</li>)}</ul><a className="guide-text-link" href="/media/omne-certifikat.webp" target="_blank" rel="noopener noreferrer">Prohlédnout certifikát z července 2025<CircleArrow /></a></div><div className="about-awards__media"><figure><img src="/media/omne-vyhlaseni.webp" alt="Zuzana Bajgerová při vyhlášení v síti RE/MAX" width="835" height="700" loading="lazy" /></figure><figure><img src="/media/omne-certifikat.webp" alt="Certifikát RE/MAX: nejúspěšnější makléř měsíce, první místo, červenec 2025" width="720" height="560" loading="lazy" /></figure></div></section>
    <section className="guide-section about-films" id="videa"><div className="guide-shell about-films__grid"><div><h2>Poznejte mě<em>i bez schůzky.</em></h2><p>Jak o své práci mluvím a kam mě přivedla. Krátká videa z mého vlastního archivu.</p><a className="guide-button" href={waLink('Dobrý den, rád/a bych se s vámi seznámil/a a probral/a koupi v Abruzzu.')} target="_blank" rel="noopener noreferrer">Napsat mi osobně<CircleArrow /></a></div><figure><ClickVideo src="/media/instagram-moje-zacatky.mp4" poster="/media/instagram-moje-zacatky.webp" label="Zuzana o svých začátcích" ratio="9 / 16" /><figcaption>Moje začátky</figcaption></figure><figure><ClickVideo src="/media/instagram-remax-convention.mp4" poster="/media/instagram-remax-convention.webp" label="Zuzana na RE/MAX Convention 2026" ratio="9 / 16" /><figcaption>RE/MAX Convention 2026</figcaption></figure></div></section>
    <section className="guide-section guide-shell about-life" id="fotky"><div className="guide-heading"><h2>Klíče jsou začátek.<em>Pak přichází život.</em></h2><p>Jednání u notáře, společný výlet i neformální setkání. Skutečné momenty s klienty a lidmi kolem mě.</p></div><div className="about-life__gallery"><figure><img src="/media/kom-notar.webp" alt="Klienti s klíči při setkání v notářské kanceláři" width="720" height="1000" loading="lazy" /><figcaption>Radost z vlastních klíčů</figcaption></figure><figure data-photo-drift><img src="/media/kom-scanno.webp" alt="Společný výlet nad jezero Scanno" width="800" height="1000" loading="lazy" /><figcaption>Objevujeme Abruzzo</figcaption></figure><figure><img src="/media/kom-obed.webp" alt="Zuzana při společném setkání s klienty" width="1000" height="1000" loading="lazy" /><figcaption>Setkání i mimo prohlídky</figcaption></figure></div></section>
    <section className="guide-section guide-shell about-services" id="sluzby"><div className="guide-heading"><h2>Od první představy<em>k životu po vašem.</em></h2><p>Vyberte, co teď potřebujete. Na jednotlivé služby můžeme navázat i později.</p></div><div className="about-services__grid">{services.map(s=><Link key={s.id} href={path(s.id,locale)}><img src={s.image} alt={s.alt} width="800" height="1000" loading="lazy" /><span>{s.title}<CircleArrow /></span></Link>)}</div></section>
    <section className="guide-section guide-shell about-reviews" id="reference"><div className="guide-heading"><h2>Jak spolupráci vnímají<em>moji klienti.</em></h2><Link className="guide-text-link" href={path('reference',locale)}>Další zkušenosti klientů<CircleArrow /></Link></div><ReviewQuotes names={['Tomáš Čepek','Vladimír Penc','Jakub Štádler']} href={path('reference',locale)} /></section>
    <section className="guide-section about-close"><div className="guide-shell"><h2>Pojďme začít<em>vaší představou.</em></h2><p>Nemusíte mít vybraný dům. Stačí vědět, co byste chtěli v Itálii zažít a jak si tam představujete svůj život.</p><div className="guide-actions"><Link className="guide-button" href={path('kontakt',locale)}>Domluvit první rozhovor<CircleArrow /></Link><a className="guide-text-link" href={waLink()} target="_blank" rel="noopener noreferrer">Napsat na WhatsApp<CircleArrow /></a></div></div></section>
  </main></GuideMotion>;
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
