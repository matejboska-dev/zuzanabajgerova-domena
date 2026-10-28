import { localizeTree, localized } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/page/JsonLd';
import LeadForm from '@/components/forms/LeadForm';
import { CircleArrow } from '@/components/services/ServiceInteractions';
import { GUIDE_SOURCES } from '@/lib/buying-guide';
import { waLink } from '@/lib/contact';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { absolute, path } from '@/lib/routes';
import { AGENT_ID, PERSON_ID, agentNode, breadcrumbNode, faqNode, graph, personNode, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import '@/components/guide/guide.css';
import '@/components/guide/journey.css';

export const dynamicParams = false;
export const revalidate = 21600;
export function generateStaticParams() { return LOCALES.map(locale => ({ locale })); }
const TITLE = 'Jak koupit nemovitost v Itálii: 9 kroků se Zuzanou';
const DESC = 'Od první konzultace přes prohlídky a notáře až po péči o váš nový domov v Abruzzu. Devět kroků spolupráce se Zuzanou Bajgerovou.';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {}; return pageMetadata({ id: 'jakKoupit', locale, title: TITLE, description: DESC, image: '/media/about-zuzana.webp' });
}
const practical = path('koupePrakticky', 'cs');
const wa = waLink('Dobrý den, rád/a bych s vámi probral/a koupi nemovitosti v Abruzzu.');
const questions = [
  { q: 'Co platím před příjezdem do Itálie?', a: 'První konzultace je zdarma a nezávazná. Jakmile potvrdíme konkrétní termín příjezdu a začneme závazně připravovat individuální program prohlídek, hradíte rezervační zálohu 200 €. Pokud následně prostřednictvím našeho týmu nemovitost koupíte, celých 200 € odečteme z konečné provize.' },
  { q: 'Musím umět italsky nebo přijet na každé jednání?', a: 'Mluvím plynně italsky a komunikaci s prodávajícími, místními kancelářemi i odborníky řeším osobně. Začít můžeme živou videoprohlídkou. Možnost zastoupení u podpisu, formu plné moci a případné překlady předem řešíme s konkrétním notářem.' },
  { q: 'Jak dlouho koupě potrvá?', a: 'Záleží na připravenosti dokumentace, financování a dohodě s prodávajícím. Konkrétní harmonogram společně sestavíme po výběru nemovitosti.' },
  { q: 'Co zahrnuje cena a s jakými náklady dál počítat?', a: 'U každé nabídky si potvrdíme, co cena zahrnuje: kupní cenu, daně, notáře, provizi a případné další služby. Vybavení, rekonstrukci a běžný provoz plánujeme zvlášť. Podrobnější přehled a orientační kalkulačku najdete v praktické části průvodce.' },
  { q: 'Co přesně znamená první rok asistence v provizi?', a: 'Jde o základní asistenční servis na místě: pomoc s přepisem energií, zajištěním internetu, pojištěním domácnosti a základní komunikací s condominio. Úschovu klíčů a kontroly nemovitosti lze domluvit s našimi asistentkami. Rekonstrukci, vybavení, správu a pronájem řešíme jako navazující služby podle vašich potřeb a konkrétní dohody.' },
  { q: 'Pomůžete mi i mimo Abruzzo?', a: 'Specializuji se na Abruzzo, kde žiji, pracuji a místní prostředí znám více než 20 let. Pokud hledáte v jiné části Itálie, ráda vás propojím s kolegyní, která se danému regionu věnuje.' },
];
function ActionContent({ label = 'Domluvit bezplatnou konzultaci' }: { label?: string }) {
  return <Link className="guide-button" href={path('konzultace', 'cs')}>{label}<CircleArrow /></Link>;
}
function MoreContent({ title, children }: { title: string; children: React.ReactNode }) {
  return <details className="journey-more"><summary>{title}<CircleArrow /></summary><div>{children}</div></details>;
}
function StepContent({ number, title, children, labelOnly = false }: { number: string; title: string; children: React.ReactNode; labelOnly?: boolean }) {
  return <article className="journey-step" id={`krok-${Number(number)}`}><span className="journey-number" aria-label={`Krok ${Number(number)}`}>{number}</span><div>{labelOnly ? <p className="journey-step-label">{title}</p> : <h3>{title}</h3>}{children}</div></article>;
}
async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const here = path('jakKoupit', locale);
  return <main className="buying-guide buying-journey">
    <JsonLd data={graph(agentNode(), personNode(), webPageNode({path:here,name:TITLE,description:DESC,image:'/media/about-zuzana.webp'}), {
      '@type':'Article','@id':`${absolute(here)}#article`,headline:TITLE,description:DESC,inLanguage:'cs',mainEntityOfPage:{'@id':`${absolute(here)}#webpage`},author:{'@id':PERSON_ID},publisher:{'@id':AGENT_ID},image:absolute('/media/about-zuzana.webp'),
    },breadcrumbNode([{name:'Domů',href:'/'},{name:'Jak koupit v Itálii',href:here}]),faqNode(questions))} />

    <header className="journey-hero journey-wide">
      <div className="journey-hero-copy">
        <nav className="journey-crumbs" aria-label="Drobečková navigace"><Link href="/">Domů</Link><span aria-hidden="true">/</span><span>Jak koupit v Itálii</span></nav>
        <h1>Jak koupit<br />nemovitost <em>v Itálii.</em></h1>
        <p className="journey-hero-lead">Vy si přijedete splnit svůj italský sen. O starosti kolem koupě se postaráme my.</p>
        <p>Od prvního rozhovoru po vlastní klíče. A s týmem na místě i dlouho poté.</p>
        <div className="journey-hero-actions"><a className="guide-text-link" href="#pruvodce">Prohlédnout devět kroků<CircleArrow /></a><Action /></div>
      </div>
      <figure className="journey-hero-photo"><img src="/media/about-zuzana.webp" alt="Zuzana Bajgerová na terase u moře v Abruzzu" width="1000" height="1250" fetchPriority="high" /><figcaption>Zuzana Bajgerová <span>Vaše průvodkyně koupí v Abruzzu</span></figcaption></figure>
    </header>

    <nav className="journey-map guide-shell" aria-label="Tři etapy spolupráce" id="pruvodce">
      <a href="#pred-prijezdem"><span>01—03</span><strong>Před příjezdem</strong><small>Konzultace, výběr a příprava</small><CircleArrow /></a>
      <a href="#vyber-a-koupe"><span>04—06</span><strong>Výběr a koupě</strong><small>Prověření, prohlídky a notář</small><CircleArrow /></a>
      <a href="#po-koupi"><span>07—09</span><strong>Váš život v Abruzzu</strong><small>Asistence, péče a komunita</small><CircleArrow /></a>
    </nav>

    <section className="journey-prep guide-shell journey-section" id="pred-prijezdem" aria-labelledby="prep-title">
      <div className="journey-prep-visual"><h2 id="prep-title">Nejdřív poznám vás.<em>Potom hledám váš domov.</em></h2><figure><img src="/services/curated/home-olive-sea.webp" alt="Olivovníky a výhled na moře u domu v Abruzzu" width="1920" height="1324" loading="lazy" /><figcaption>U moře, v kopcích, na dovolenou i pro život.</figcaption></figure><p>V Abruzzu se pohybuji více než 20 let. Znám místní prostředí, mluvím plynně italsky a opírám se o tým lidí přímo na místě.</p></div>
      <div className="journey-prep-steps">
        <Step number="01" title="Nezávazně si zavoláme"><p>Probereme vaši představu, rozpočet i lokality. Hledáte apartmán u moře, dům pro vlastní život, nebo investici? Společně si ujasníme, co pro vás dává smysl.</p><b className="journey-fact">První konzultace zdarma a nezávazně.</b></Step>
        <Step number="02" title="Hledám i mimo nabídku webu"><p>Vhodné nemovitosti vyhledávám napříč místním trhem. Propojuji vás s ověřenými místními kancelářemi a lidmi, se kterými mám dobrou zkušenost.</p><More title="Jak vybírám místní partnery"><p>Nespolupracuji automaticky s každou realitní kanceláří. Za roky v Itálii jsem poznala různé způsoby práce a vybírám si partnery, kterým důvěřuji. Důležité je, abych za nemovitostí a lidmi, se kterými vás propojuji, mohla stát.</p></More></Step>
        <Step number="03" title="Připravíme váš příjezd"><p>Potvrdíme termín, předvybereme nemovitosti a sestavíme individuální program prohlídek. Komunikaci s majiteli a místními kancelářemi řešíme za vás.</p><div id="cesta"><More title="Jak naplánovat cestu do Abruzza"><p>Nejdříve vybereme vhodné nabídky, potom termín cesty. Aktuální spojení a dojezd posuzujte podle místa domu i sezóny, ne jen podle letiště na mapě.</p><Link href={path('lokality',locale)}>Poznat lokality Abruzza</Link></More></div></Step>
        <aside className="journey-deposit"><strong>200 €</strong><div><h3>Rezervační záloha na přípravu prohlídek</h3><p>Hradí se po potvrzení konkrétního termínu příjezdu, když začneme závazně připravovat váš program. Pokud prostřednictvím našeho týmu nemovitost koupíte, <b>celých 200 € odečteme z konečné provize.</b></p></div></aside>
      </div>
    </section>

    <section className="journey-viewings journey-wide" id="vyber-a-koupe" aria-labelledby="view-title">
      <figure className="journey-panorama"><img src="/media/prohlidka-vila-silvi.webp" alt="Interiér vily při prohlídce v Silvi s výhledem do krajiny" width="1920" height="1080" loading="lazy" /><figcaption>Prohlídka vily v Silvi</figcaption></figure>
      <div className="journey-viewings-body"><h2 id="view-title">Podíváme se blíž.<em>Na dům i na všechno kolem.</em></h2><div className="journey-pair">
        <Step number="04" title="Prověříme, co kupujete"><p>S ověřeným notářem Tommasem Trifonem a podle potřeby s právníky, geodety a projektanty řešíme právní, technické i administrativní otázky. Pokud se objeví problém nebo riziko, dozvíte se o něm.</p><More title="Co pro mě znamená prověření"><p>Moje práce není jen o hledání hezkých bytů. Někdy je důležitější vědět, kterou nemovitost nekoupit. Právě proto se soustředím na Abruzzo — oblast, kde žiji a pracuji. Prověřování a získávání podkladů probíhá průběžně během výběru i koupě.</p><Link href={`${practical}#chyby`}>Na co se ptát před koupí</Link></More></Step>
        <Step number="05" title="Prohlídky osobně i přes telefon"><p>Provedeme vás připravenými nemovitostmi, pomůžeme s italštinou a následně i s vyjednáváním. Pokud zatím nemůžete přijet, zajistíme živou videoprohlídku.</p><More title="Můžu začít výběrem na dálku?"><p>Ano. Máme klienty, kteří si přes živou videoprohlídku nemovitost vybrali a následně ji také koupili. Společně domluvíme postup podle vaší situace.</p></More></Step>
      </div></div>
    </section>

    <figure className="journey-quote guide-shell journey-section"><img src="/services/curated/zuzana-office.webp" alt="Portrét Zuzany Bajgerové" width="788" height="1400" loading="lazy" /><div><blockquote>„Nejsem tady jen proto, abych vám řekla, co koupit. Jsem tady také proto, abych vám řekla, <em>co raději nekupovat.</em>“</blockquote><p className="journey-quote-author">Zuzana Bajgerová</p></div></figure>

    <section className="journey-notary guide-shell journey-section" id="plna-moc" aria-labelledby="notary-title">
      <div><div id="kroky"><Step number="06" title="Od nabídky až ke klíčům" labelOnly><h2 id="notary-title">U notáře v tom<em>budete se mnou.</em></h2><p>Komunikuji s prodávajícími, kancelářemi i odborníky a provedu vás jednotlivými kroky koupě. Jednání a zastupování u notáře řeším osobně, pokud to konkrétní případ umožňuje.</p></Step></div>
      <div className="journey-contracts" aria-label="Od nabídky k předání">
        <More title="Nabídka · Proposta"><p>Písemná nabídka stanovuje cenu a podmínky. Po přijetí prodávajícím už může být závazná, proto nejasnosti řešíme před podpisem.</p></More>
        <More title="Předsmlouva · Compromesso"><p>Kupující a prodávající si potvrdí podmínky, platby a termín finálního prodeje. Ještě nejde o převod vlastnictví.</p></More>
        <More title="Podpis u notáře · Rogito"><p>Finální listina završuje převod. Podklady, způsob úhrady i případné zastoupení se předem domlouvají s notářem.</p></More>
        <p className="journey-handover">Potom přichází předání. A vaše vlastní klíče.</p>
      </div>
      <div id="codice-fiscale"><More title="Dokumenty a možnost podpisu na plnou moc"><p>Italské daňové číslo, codice fiscale, řešíme včas společně s dalšími podklady. Pokud nemůžete přijet na podpis, probereme zastoupení. Formu a rozsah plné moci, ověření a překlady musí předem přijmout konkrétní notář.</p><a href={GUIDE_SOURCES.foreigners} target="_blank" rel="noopener noreferrer">Informace italské notářské komory</a></More></div>
      </div><figure><img src="/media/jak-notar.webp" alt="Zuzana Bajgerová při podpisu dokumentů u notáře" width="576" height="1000" loading="lazy" /><figcaption>Osobně při jednání a podpisu.</figcaption></figure>
    </section>

    <section className="journey-after journey-wide" id="po-koupi" aria-labelledby="after-title">
      <div className="journey-after-title"><span className="journey-number" id="krok-7" aria-label="Krok 7">07</span><h2 id="after-title">Předáním klíčů<em>naše práce nekončí.</em></h2></div>
      <div className="journey-after-body"><div><p className="journey-year">První rok</p><p className="journey-after-promise">základního asistenčního servisu na místě máte v rámci naší provize.</p><p>První měsíce v nové zemi přinášejí spoustu drobností. Na jejich řešení tu máte nás.</p><ul><li>Pomoc s přepisem energií</li><li>Zajištění internetu</li><li>Pojištění domácnosti</li><li>Základní komunikace s condominio</li></ul><p className="journey-after-note">Na místě mám také dvě asistentky. Úschovu klíčů nebo kontrolu nemovitosti v době vaší nepřítomnosti lze domluvit. Rozsah dalších služeb řešíme individuálně.</p></div><figure><img src="/media/kom-notar.webp" alt="Zuzana s klienty a klíči v notářské kanceláři" width="720" height="1000" loading="lazy" /><figcaption>Klíče jsou začátek další spolupráce.</figcaption></figure></div>
    </section>

    <section className="journey-care guide-shell journey-section" aria-labelledby="care-title"><div className="journey-care-head"><Step number="08" title="Rekonstrukce, pronájem a péče" labelOnly><h2 id="care-title">Ať se můžete<em>rovnou zabydlet.</em></h2></Step><div><p>Umíme zajistit rekonstrukci na klíč, pomoci s vybavením a prostřednictvím místního týmu řešit krátkodobý i dlouhodobý pronájem a péči o nemovitost.</p><p>Konkrétní realizované byty vám ráda ukážu ještě před rozhodnutím. Nemusíte v cizí zemi začínat s hledáním řemeslníků a správy od nuly.</p></div></div><div className="journey-interiors"><figure><img src="/media/reno-real-2.webp" alt="Kuchyň a jídelna z dokončené rekonstrukce" width="800" height="1000" loading="lazy" /><figcaption>Kuchyň a jídelna z našich realizací</figcaption></figure><figure><img src="/media/reno-real-1.webp" alt="Obývací pokoj z dokončené rekonstrukce" width="800" height="1000" loading="lazy" /><figcaption>Obývací pokoj po dokončení</figcaption></figure></div><div className="journey-service-links"><Link href={path('rekonstrukce',locale)}>Rekonstrukce a vybavení<CircleArrow /></Link><Link href={path('sprava',locale)}>Péče o nemovitost<CircleArrow /></Link><Link href={path('pronajem',locale)}>Pronájem<CircleArrow /></Link></div></section>

    <section className="journey-community journey-wide" id="krok-9" aria-labelledby="community-title"><div className="journey-community-photos"><figure><img src="/media/kom-obed.webp" alt="Zuzana při společném obědě s klienty" width="800" height="1000" loading="lazy" /><figcaption>Společná setkání u moře</figcaption></figure><figure><img src="/media/kom-scanno.webp" alt="Společný výlet nad jezero Scanno v Abruzzu" width="800" height="1000" loading="lazy" /><figcaption>Výlety za dalšími místy Abruzza</figcaption></figure></div><div className="journey-community-copy"><span className="journey-number" aria-label="Krok 9">09</span><h2 id="community-title">Nekupujete si u nás jen nemovitost v Itálii.<em>Kupujete si kus nového života.</em></h2><div><p>V našem okolí žije nebo vlastní nemovitost přibližně 80 českých rodin. Vznikla tu komunita lidí, kteří se znají, pomáhají si a tráví spolu čas — u moře, na výletech i o svátcích.</p><p>Je jen na vás, nakolik chcete být její součástí. Dveře máte otevřené.</p><Link className="guide-text-link" href={`${path('oMne',locale)}#fotky`}>Další momenty z našeho života<CircleArrow /></Link></div></div></section>

    <section className="journey-faq guide-shell journey-section" id="faq"><div><h2>Ještě než<em>si zavoláme.</em></h2><p>Odpovědi na otázky, které možná právě řešíte.</p><Link className="guide-text-link" href={practical}>Náklady, kalkulačka a slovníček<CircleArrow /></Link></div><div>{questions.map(q=><More key={q.q} title={q.q}><p>{q.a}</p>{q.q.startsWith('Co zahrnuje')&&<Link href={`${practical}#naklady`}>Otevřít přehled nákladů a kalkulačku</Link>}</More>)}</div></section>

    <aside className="journey-practical guide-shell" aria-label="Praktická část průvodce"><p>Chcete jít do detailu?</p><div><Link id="naklady" href={`${practical}#naklady`}>Náklady a daně<CircleArrow /></Link><Link id="kalkulacka" href={`${practical}#kalkulacka`}>Kalkulačka rozpočtu<CircleArrow /></Link><Link id="slovnicek" href={`${practical}#slovnicek`}>Italské pojmy česky<CircleArrow /></Link><Link id="domy-za-1-euro" href={`${practical}#domy-za-1-euro`}>Domy za jedno euro<CircleArrow /></Link></div></aside>

    <section className="guide-contact journey-section" id="poptavka"><div className="guide-shell guide-contact__grid"><div><div className="journey-contact-person"><img src="/services/curated/zuzana-standing.webp" alt="Zuzana Bajgerová" width="1024" height="1024" loading="lazy" /><span>Zuzana Bajgerová<br /><small>Přímo v Abruzzu. Pro vás.</small></span></div><h2>Probereme,<em>co hledáte?</em></h2><p>První konzultace je zdarma a nezávazná. Nemusíte mít vybranou nemovitost. Stačí vaše představa.</p><div className="guide-actions"><Action /><a className="guide-text-link" href={wa} target="_blank" rel="noopener noreferrer">Napsat na WhatsApp<CircleArrow /></a></div></div><LeadForm source="sluzba" locale="cs" variant="dark" ariaLabel="Probrat koupi nemovitosti v Itálii" submitLabel="Odeslat mou představu" hidden={{sluzba:'koupe',zdroj:'pruvodce'}} whatsappText="Dobrý den, rád/a bych probral/a koupi nemovitosti v Itálii." fields={[{name:'jmeno',label:'Vaše jméno',type:'text',required:true,autoComplete:'name',half:true},{name:'email',label:'E-mail',type:'email',required:true,autoComplete:'email',half:true},{name:'telefon',label:'Telefon nebo WhatsApp',type:'tel',autoComplete:'tel'},{name:'zprava',label:'Co hledáte?',type:'textarea',required:true,rows:3,placeholder:'Místo, rozpočet, vlastní bydlení nebo dovolená…'}]} fine={<>Odesláním berete na vědomí <Link href={path('ochranaUdaju',locale)}>informace o zpracování osobních údajů</Link>.</>} /></div></section>
    <aside className="guide-shell guide-sources"><p>Průvodce připravila Bc. Zuzana Bajgerová. Konkrétní právní a daňové podmínky posuzujte se svým notářem a daňovým poradcem.</p><div><a className="guide-source" href={GUIDE_SOURCES.notary} target="_blank" rel="noopener noreferrer">Italská notářská komora<CircleArrow /></a><Link className="guide-source" href={practical}>Praktická část průvodce<CircleArrow /></Link></div></aside>
  </main>;
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}

const Action = localized(ActionContent);
const More = localized(MoreContent);
const Step = localized(StepContent);
