import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FaqSection from '@/components/home/FaqSection';
import CheckList from '@/components/page/CheckList';
import AutoLoop from '@/components/media/AutoLoop';
import Marked from '@/components/Marked';
import CostCalculator from '@/components/page/CostCalculator';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import FeatureRow from '@/components/page/FeatureRow';
import FeaturedListings from '@/components/page/FeaturedListings';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import PriceColumns from '@/components/page/PriceColumns';
import SecHead from '@/components/page/SecHead';
import StepCards from '@/components/page/StepCards';
import SubHero from '@/components/page/SubHero';
import { BUY_STEPS, GLOSSARY, MISTAKES } from '@/lib/content/glossary';
import { JAK_KOUPIT_FAQ } from '@/lib/content/faq';
import { eurCzkRate } from '@/lib/fx.server';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { absolute, path } from '@/lib/routes';
import { AGENT_ID, PERSON_ID, agentNode, breadcrumbNode, faqNode, graph, personNode, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export const revalidate = 21600; // kurz ČNB pro kalkulacku, 6 h
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Jak koupit nemovitost v Itálii krok za krokem';
const DESC =
  'Koupě nemovitosti v Itálii pro Čecha: codice fiscale, nabídka, předsmlouva, notářský zápis. Celý proces jde vyřídit na plnou moc. Cena je konečná, spočítejte si rozpočet.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'jakKoupit', locale, title: TITLE, description: DESC, onlyCs: true, image: '/og/default.jpg' });
}

const TRI = [
  {
    t: 'Nabídka (proposta)',
    what: 'Písemná nabídka kupujícího na konkrétní nemovitost za konkrétní cenu a podmínky.',
    happens: 'Nabídku podáme přes realitní kancelář prodávajícího. Já vyjednám cenu i podmínky a hlídám, aby bylo všechno napsané jasně.',
    me: 'Sepsání nabídky, komunikace s prodávajícím a jeho kanceláří, vyjednání ceny.',
  },
  {
    t: 'Předsmlouva (compromesso)',
    what: 'Předběžná kupní smlouva, ve které si obě strany potvrdí podmínky prodeje a termín podpisu u notáře. Obvykle se při ní skládá záloha.',
    happens: 'Před podpisem se prověří dokumenty: vlastnictví, katastr, soulad se stavebními plány a případná zatížení. Pokud existuje skrytá vada nebo právní břemeno, ihned vás varuji.',
    me: 'Kontrola s notářem, geodety a právníky, překlad smlouvy, codice fiscale a plná moc, pokud nechcete cestovat.',
  },
  {
    t: 'Notářský zápis (rogito)',
    what: 'Notářský zápis kupní smlouvy, kterým přechází vlastnictví nemovitosti na vás.',
    happens: 'Podpis se koná u notáře. Můžete přijet osobně, nebo ho vyřídit na plnou moc. Pak následuje předání klíčů.',
    me: 'Doprovodím vás, nebo vás u notáře zastoupím. Postarám se i o přepisy energií.',
  },
];

const TRAVEL = [
  { t: 'Letadlem', d: 'Z Krakova do Pescary se létá celoročně. Z Prahy v sezóně přímo za 1 hodinu 20 minut, v zimě s přestupem.' },
  { t: 'Z letiště k domu', d: 'Všechno je do 15 km od letiště. Dostanete se trolejbusem za 1,50 až 2 eura, taxi nepotřebujete.' },
  { t: 'Autem z Česka', d: 'Zhruba 1300 km.' },
];

const TOC: [string, string][] = [
  ['#rychla-odpoved', 'Rychlá odpověď'],
  ['#pruvodce', '8 kroků'],
  ['#kroky', 'Proposta, compromesso, rogito'],
  ['#codice-fiscale', 'Codice fiscale'],
  ['#naklady', 'Náklady'],
  ['#kalkulacka', 'Kalkulačka'],
  ['#plna-moc', 'Plná moc'],
  ['#cesta', 'Cesta do Abruzza'],
  ['#chyby', '7 chyb'],
  ['#slovnicek', 'Slovníček'],
  ['#faq', 'Časté dotazy'],
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('jakKoupit', DEFAULT_LOCALE);
  const konzultace = path('konzultace', DEFAULT_LOCALE);
  const rate = await eurCzkRate();

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          personNode(),
          webPageNode({ path: here, name: TITLE, description: DESC, image: '/images/abruzzo-costa-trabocchi.jpg' }),
          {
            '@type': 'Article',
            '@id': `${absolute(here)}#article`,
            headline: TITLE,
            description: DESC,
            inLanguage: 'cs',
            mainEntityOfPage: { '@id': `${absolute(here)}#webpage` },
            author: { '@id': PERSON_ID },
            publisher: { '@id': AGENT_ID },
            image: absolute('/images/abruzzo-costa-trabocchi.jpg'),
          },
          {
            '@type': 'HowTo',
            '@id': `${absolute(here)}#howto`,
            name: 'Jak koupit nemovitost v Itálii',
            description: DESC,
            step: BUY_STEPS.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.title,
              text: s.text,
              url: `${absolute(here)}#pruvodce`,
            })),
          },
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Jak koupit v Itálii', href: here },
          ]),
          faqNode(JAK_KOUPIT_FAQ),
        )}
      />

      <SubHero
        id="jak-koupit-h1"
        badge="Průvodce · Koupě nemovitosti v Itálii"
        title="Jak koupit nemovitost v Itálii:"
        accent="krok za krokem"
        lead="Koupě nemovitosti v Itálii pro českého kupujícího vyžaduje italské daňové číslo (codice fiscale), nabídku, předsmlouvu a notářský zápis. Celý proces lze vyřídit na plnou moc, bez opakovaných cest do Itálie."
        bg={{ src: '/images/abruzzo-costa-trabocchi.jpg', width: 1400, height: 1866 }}
        bgPosition="center 58%"
        photo={{ src: '/images/zuzana-climax.webp', alt: 'Bc. Zuzana Bajgerová, průvodkyně koupí v Abruzzu', width: 1024, height: 1024 }}
        ctas={[
          { href: konzultace, label: 'Rezervovat hovor zdarma' },
          { href: '#kalkulacka', label: 'Spočítat si rozpočet', variant: 'glass' },
        ]}
        chips={['8 kroků', 'Plná moc místo cest', 'Cena je konečná']}
      />

      <Crumbs items={[{ name: 'Jak koupit v Itálii', href: here }]} />

      <section className="sec sec--tight" id="rychla-odpoved" aria-labelledby="odpoved-h">
        <div className="wrap wrap--narrow2">
          <div className="answer">
            <p className="answer__tag">Rychlá odpověď</p>
            <h2 id="odpoved-h" className="answer__h">
              Co potřebuje český kupující, aby koupil nemovitost v Itálii?
            </h2>
            <ul className="answer__list">
              <li>
                <b>Italské daňové číslo (codice fiscale).</b> Bez něj nelze nemovitost koupit. Vyřídím ho za vás, obvykle během několika dní.
              </li>
              <li>
                <b>Tři hlavní kroky:</b> nabídka (proposta), předsmlouva (compromesso) a notářský zápis (rogito).
              </li>
              <li>
                <b>Do Itálie na podpis letět nemusíte.</b> Předsmlouvu i notářský zápis lze vyřídit na plnou moc. Stačí přiletět na prohlídky, které naskládám do jednoho dne.
              </li>
              <li>
                <b>Cena je konečná.</b> Cena, kterou vidíte na internetu, zahrnuje daň z převodu, notáře i naši provizi.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <nav className="toc wrap" aria-label="Obsah stránky">
        {TOC.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <section className="sec" id="pruvodce" aria-labelledby="pruvodce-h">
        <div className="wrap">
          <SecHead id="pruvodce-h" badge="Přehled" title="Proces koupě" accent="v 8 krocích" lead="Od prvního hovoru po klíče. U každého kroku víte, co se děje a co za vás vyřídím." />
          <StepCards items={BUY_STEPS} cols={4} />
        </div>
      </section>

      <section className="sec" id="kroky" aria-labelledby="kroky-h">
        <div className="wrap">
          <SecHead id="kroky-h" badge="Krok za krokem" title="Proposta, compromesso," accent="rogito" lead="Tři italské pojmy, které uslyšíte nejčastěji. Vysvětlím je česky a vyřídím je za vás." />
          <div className="tri">
            {TRI.map((x, i) => (
              <article className="tri__card" key={x.t}>
                <span className="tri__n" aria-hidden="true">
                  {['I', 'II', 'III'][i]}
                </span>
                <h3 className="tri__t">{x.t}</h3>
                <dl>
                  <dt>Co to je</dt>
                  <dd>{x.what}</dd>
                  <dt>Co se děje</dt>
                  <dd>{x.happens}</dd>
                  <dt>Co za vás vyřídím</dt>
                  <dd>{x.me}</dd>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--tight" id="codice-fiscale" aria-labelledby="cf-h">
        <div className="wrap wrap--narrow2">
          <div className="callout">
            <h2 id="cf-h" className="callout__h">
              Codice fiscale: italské daňové číslo
            </h2>
            <p>
              Je to italské daňové číslo, bez kterého nelze nemovitost koupit. Vyřídím ho za vás, obvykle
              během několika dní. Proto na něj myslíme hned na začátku.
            </p>
            <Link href={konzultace} className="btn btn--saffron">
              Chci vyřídit codice fiscale
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" id="naklady" aria-labelledby="naklady-h">
        <div className="wrap">
          <SecHead
            id="naklady-h"
            badge="Náklady a daně"
            title="Cena, kterou vidíte na internetu,"
            accent="je konečná"
            lead="Daň z převodu nemovitosti, odměna notáře i naše provize jsou v ceně apartmánu. V ceně není jen případná rekonstrukce a vybavení bytu a každoroční poplatky IMU a TARI."
          />
          <PriceColumns />
        </div>
      </section>

      <section className="sec sec--tight" id="kalkulacka" aria-labelledby="kalkulacka-h">
        <div className="wrap wrap--narrow2">
          <SecHead id="kalkulacka-h" badge="Kalkulačka" title="Spočítejte si" accent="celkový rozpočet" lead="Zadejte cenu z nabídky a případný rozpočet na rekonstrukci. Uvidíte, kolik koupě vyjde včetně provozu." />
          <CostCalculator rate={rate} consultHref={konzultace} />
        </div>
      </section>

      <FeatureRow
        id="plna-moc"
        badge="Plná moc"
        title="Na podpis nemusíte"
        accent="letět"
        lead="Předsmlouvu i notářský zápis lze vyřídit na plnou moc. Do Itálie stačí přiletět na prohlídky, které naskládám do jednoho dne."
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img className="feature-img feature-img--tall" src="/media/jak-notar.webp" alt="Podpis dokumentů při koupi nemovitosti" width={576} height={1000} loading="lazy" />
        }
      >
        <CheckList
          items={[
            'Plnou moc a překlady zajistím já',
            'Osobně vás u notáře zastoupím, nebo doprovodím',
            'Prohlídky můžete začít i živě přes video',
          ]}
        />
      </FeatureRow>

      <section className="sec sec--tight" id="domy-za-1-euro" aria-labelledby="euro-h">
        <div className="wrap">
        <div className="euro">
          <figure className="euro__img media-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/localities/gran-sasso-a-vnitrozemi.webp" alt="Kamenná pevnost Rocca Calascio ve vnitrozemí Abruzza" width={1200} height={900} loading="lazy" />
          </figure>
          <div className="euro__text">
            <SecHead id="euro-h" badge="Mýty" title="Domy za 1 euro:" accent="jak to je doopravdy" left />
            <p>
              Projekty domů za 1 euro vyhlašují jednotlivé italské obce, většinou menší obce ve vnitrozemí, které chtějí
              obnovit opuštěné domy. Za symbolické euro dům koupíte, ale zavazujete se ho v daném termínu opravit.
              Podmínky si určuje každá obec sama, takže výsledná cena zdaleka není jedno euro.
            </p>
            <p>
              <Marked text="[OVĚŘIT: znění odstavce a pohled klientky, zda takové domy v Abruzzu doporučuje a komu]" />
            </p>
            <Link className="btn btn--ghost" href={path('konzultace', DEFAULT_LOCALE)}>
              Probrat to na konzultaci
            </Link>
          </div>
        </div>
        </div>
      </section>

      <section className="sec" id="cesta" aria-labelledby="cesta-h">
        <div className="wrap">
          <SecHead id="cesta-h" badge="Cesta do Abruzza" title="Abruzzo je" accent="na dosah" lead="Letiště je blízko a všechno důležité je do 15 km od něj." />
          <div className="cesta">
            <div className="facts">
              {TRAVEL.map((x) => (
                <article className="fact" key={x.t}>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </article>
              ))}
            </div>
            <figure className="media-tile cesta__loop">
              <AutoLoop src="/media/loop-letadlo.mp4" poster="/media/loop-letadlo.webp" label="Přílet nad pobřeží u Pescary" />
              <figcaption className="media-chip">Přílet nad Pescaru</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sec" id="chyby" aria-labelledby="chyby-h">
        <div className="wrap">
          <SecHead id="chyby-h" badge="Čemu se vyhnout" title="7 chyb, které dělají" accent="čeští kupující" lead="Většinu z nich jde snadno předejít, když o nich víte předem." />
          <ol className="mist">
            {MISTAKES.map((m, i) => (
              <li className="mist__item" key={m.title}>
                <span className="mist__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" id="slovnicek" aria-labelledby="slovnicek-h">
        <div className="wrap">
          <SecHead id="slovnicek-h" badge="Slovníček" title="Italské pojmy" accent="česky" lead="Co uslyšíte od notáře, kanceláře i úřadů." />
          <dl className="gloss">
            {GLOSSARY.map((g) => (
              <div className="gloss__item" key={g.term}>
                <dt>
                  {g.term} <span>{g.cz}</span>
                </dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FaqSection
        faq={JAK_KOUPIT_FAQ}
        id="faq"
        heading={
          <>
            Časté dotazy ke <em>koupi v Itálii</em>
          </>
        }
      />

      <CtaBand
        id="jak-koupit-cta"
        title="Co z toho udělám"
        accent="za vás"
        text="Prověřím nemovitost, vyjednám cenu, zajistím dokumenty a doprovodím vás až k předání klíčů. Vy neřešíte nic v italštině."
        primary={{ href: konzultace, label: 'Rezervovat hovor zdarma' }}
        whatsAppText="Dobrý den, mám vážný zájem o koupi nemovitosti v Abruzzu (průvodce koupí na vašem webu). Prosím, ozvěte se mi co nejdříve."
      />

      <FeaturedListings id="nabidky-h" title="Podívejte se, co teď" accent="nabízím" />

      <section className="sec sec--tight" aria-labelledby="souvisi-h">
        <div className="wrap">
          <SecHead id="souvisi-h" title="Související" accent="stránky" />
          <ul className="thanks__links">
            <li>
              <Link href={path('sluzby', DEFAULT_LOCALE)}>
                <b>Služby</b>
                <span>Co všechno za vás vyřídím před, při i po koupi.</span>
              </Link>
            </li>
            <li>
              <Link href={path('oMne', DEFAULT_LOCALE)}>
                <b>O mně</b>
                <span>Kdo vás koupí provede a proč mi můžete věřit.</span>
              </Link>
            </li>
            <li>
              <Link href={path('nemovitosti', DEFAULT_LOCALE)}>
                <b>Nabídky nemovitostí</b>
                <span>Byty a domy v Abruzzu, plní se každý den.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <MobileCtaBar />
    </main>
  );
}
