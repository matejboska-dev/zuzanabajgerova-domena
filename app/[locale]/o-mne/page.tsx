import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClickVideo from '@/components/page/ClickVideo';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import CheckList from '@/components/page/CheckList';
import FeatureRow from '@/components/page/FeatureRow';
import JsonLd from '@/components/page/JsonLd';
import Marked, { Doplnit } from '@/components/Marked';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import ReviewQuotes from '@/components/page/ReviewQuotes';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import { waLink } from '@/lib/contact';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { ABOUT, PROOF } from '@/lib/home';
import { path } from '@/lib/routes';
import { agentNode, breadcrumbNode, graph, personNode, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'O mně, realitní specialistka na Abruzzo';
const DESC =
  'Bc. Zuzana Bajgerová, realitní specialistka na Abruzzo. Žiji v Itálii, 20 let funguji v Abruzzu, mám TOP 10 RE/MAX ČR, Platinum a Hall of Fame. Provedu vás koupí v češtině.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'oMne', locale, title: TITLE, description: DESC, onlyCs: true, image: '/og/default.jpg' });
}

const VALUES = [
  { t: 'Celý proces v češtině', d: 'Jazyk a strach z italské byrokracie jsou nejčastější důvod, proč Češi koupi vzdají. U mě oba padají.' },
  { t: 'Cena je konečná', d: 'Cena, kterou vidíte na internetu, je konečná. Zahrnuje daň z převodu, odměnu notáře i naši provizi.' },
  { t: 'Každou nemovitost prověřuji osobně', d: 'Žiji v Abruzzu, takže každou nemovitost projdu osobně a celý proces nákupu probíhá pod mým dohledem.' },
  { t: 'Pracuji jen s ověřenými partnery', d: 'Jen s prověřenými italskými realitními kancelářemi a přímými prodejci, které jsem si za roky v Abruzzu pečlivě vybrala.' },
  { t: 'Zůstávám i po podpisu', d: 'Daně, rekonstrukce, vybavení, správa. Vztah nekončí u notáře, ale trvá roky.' },
];

// fotky z materialu klientky (Google Drive, public/media) a z puvodniho webu
const GALLERY: { src: string; alt: string; w: number; h: number; cls?: string }[] = [
  { src: '/media/omne-sunset.webp', alt: 'Bc. Zuzana Bajgerová na pláži při západu slunce', w: 1000, h: 1250, cls: 'gallery__tall' },
  { src: '/media/lok-pescara-colle.webp', alt: 'Výhled z terasy v Montesilvano Colle na město a moře', w: 1600, h: 1000, cls: 'gallery__wide' },
  { src: '/media/kom-notar.webp', alt: 'Noví majitelé s předanými klíči v notářské kanceláři', w: 720, h: 1000, cls: 'gallery__tall' },
  { src: '/media/kom-scanno.webp', alt: 'Výlet s klientkami na vyhlídku nad jezerem Scanno', w: 800, h: 1000, cls: 'gallery__tall' },
  { src: '/media/why-pocasi.webp', alt: 'Olivový háj a moře z terasy nemovitosti při prohlídce', w: 1200, h: 800, cls: 'gallery__wide' },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('oMne', DEFAULT_LOCALE);
  const konzultace = path('konzultace', DEFAULT_LOCALE);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          personNode(),
          webPageNode({ type: 'AboutPage', path: here, name: TITLE, description: DESC, image: '/images/zuzana-climax.png' }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'O mně', href: here },
          ]),
        )}
      />

      <SubHero
        id="o-mne-h1"
        badge="O mně · Bc. Zuzana Bajgerová"
        title="Jsem Zuzana."
        accent="Provedu vás koupí v Itálii."
        lead="Žiji v Abruzzu, kde funguji už 20 let. Mám tam vlastní ověřenou síť realitních kanceláří, notářů, právníků, geodetů a projektantů a provedu vás celou koupí v češtině."
        bg={{ src: '/images/abruzzo-zivot-komunita.webp', width: 1600, height: 1069 }}
        bgPosition="center 50%"
        photo={{ src: '/images/zuzana-climax.webp', alt: 'Bc. Zuzana Bajgerová, realitní specialistka na Abruzzo', width: 1024, height: 1024 }}
        ctas={[
          { href: konzultace, label: 'Domluvit nezávaznou konzultaci' },
          { href: waLink(), label: 'Napsat na WhatsApp', variant: 'glass', external: true },
        ]}
        chips={['TOP 10 RE/MAX ČR, 6. místo 2025', 'Platinum a Hall of Fame', '5,0 z 15 recenzí']}
      />

      <Crumbs items={[{ name: 'O mně', href: here }]} />

      <FeatureRow
        id="kdo-jsem"
        badge="Kdo jsem"
        title="Nejsem makléřka na dálku."
        accent="Jsem tady."
        lead="Realitní specialistka na nemovitosti v Itálii, region Abruzzo. Kupujícím z Česka a Slovenska pomáhám s celým nákupem od prvního hovoru po klíče."
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img className="feature-img feature-img--tall" src="/images/zuzana-abruzzo-more.webp" alt="Bc. Zuzana Bajgerová na terase u moře v Abruzzu" width={1086} height={1448} loading="lazy" />
        }
      >
        <blockquote className="pquote">
          <p>„Pro mě to není jen práce. Je to životní styl a vášeň pro krásu Itálie a spokojenost mých klientů.“</p>
          <footer>Bc. Zuzana Bajgerová</footer>
        </blockquote>
      </FeatureRow>

      <section className="sec sec--tight" id="pribeh" aria-labelledby="pribeh-h">
        <div className="wrap wrap--narrow2">
          <SecHead id="pribeh-h" badge="Můj příběh" title="Proč Itálie" accent="a jak to začalo" />
          <div className="story">
            <p>V Abruzzu funguji 20 let.</p>
            <p>
              <Doplnit>[DOPLNIT: příběh od klientky, proč Itálie a jak to začalo]</Doplnit>
            </p>
          </div>
        </div>
      </section>

      <section className="proof-pill-wrap" aria-label="Čísla a ocenění" id="cisla">
        <div className="proof-pill">
          <div className="proof-pill__row">
            {PROOF.map((p, idx) => (
              <div className="proof-pill__col" key={p.value}>
                {idx > 0 && <div className="proof-pill__sep" aria-hidden="true" />}
                <div className="proof-pill__stat">
                  <span className="proof-pill__val">{p.value}</span>
                  <span className="proof-pill__lbl">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="oceneni" aria-labelledby="oceneni-h">
        <div className="wrap awards">
          <figure className="awards__stage media-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/omne-vyhlaseni.webp" alt="Bc. Zuzana Bajgerová na prvním místě při vyhlášení výsledků v síti RE/MAX" width={835} height={700} loading="lazy" />
            <figcaption className="media-chip media-chip--gold">1. místo</figcaption>
          </figure>
          <div className="awards__text">
            <SecHead id="oceneni-h" badge="Ocenění" title="Výsledky," accent="které mluví za mě" left />
            <ul className="about__awards">
              {ABOUT.awards.map((a) => (
                <li key={a}>
                  <Marked text={a} />
                </li>
              ))}
            </ul>
            <figure className="awards__cert">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/omne-certifikat.webp" alt="Certifikát RE/MAX Česká republika: nejúspěšnější makléř měsíce, 1. místo, červenec 2025" width={720} height={560} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section className="sec" id="hodnoty" aria-labelledby="hodnoty-h">
        <div className="wrap">
          <SecHead id="hodnoty-h" badge="Jak pracuji" title="Hodnoty" accent="a pravidla" lead="Pět pravidel, kterých se držím u každého klienta." />
          <ol className="values">
            {VALUES.map((v, i) => (
              <li className="value" key={v.t}>
                <span className="value__r" aria-hidden="true">
                  {['I', 'II', 'III', 'IV', 'V'][i]}
                </span>
                <div>
                  <h3 className="value__t">{v.t}</h3>
                  <p className="value__d">{v.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FeatureRow
        id="sit"
        flip
        badge="Moje síť v Itálii"
        title="Lidé, na které"
        accent="se můžu spolehnout"
        lead="Mám vlastní ověřenou síť v regionu. Za roky v Abruzzu jsem si své partnery pečlivě vybrala, takže se mnou máte jistotu, že nenarazíte na podvodníky."
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img className="feature-img" src="/images/sluzby/koupit.webp" alt="Klienti při jednání o koupi nemovitosti u stolu" width={1600} height={900} loading="lazy" />
        }
      >
        <CheckList
          items={[
            'Realitní kanceláře a přímí prodejci, které jsem prověřila',
            'Renomovaný italský notář',
            'Právníci a geodeti, kteří kontrolují dokumentaci',
            'Projektanti a naše paní architektka',
            'Ověření řemeslníci pro rekonstrukce',
            'Moje asistentky na místě',
          ]}
        />
      </FeatureRow>

      <section className="sec" id="fotky" aria-labelledby="fotky-h">
        <div className="wrap">
          <SecHead id="fotky-h" badge="Život a práce v Abruzzu" title="Takhle to u mě" accent="vypadá" lead="Moře, kopce, jednání u notáře a klienti, kteří se stali přáteli." />
          <div className="gallery">
            {GALLERY.map((g) => (
              <figure className={`gallery__item ${g.cls ?? ''}`} key={g.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} width={g.w} height={g.h} loading="lazy" />
              </figure>
            ))}
            <figure className="gallery__item gallery__video">
              <ClickVideo src="/media/zuzana-convention.mp4" poster="/media/zuzana-convention.webp" label="Bc. Zuzana Bajgerová na RE/MAX Convention 2026" ratio="9 / 16" />
            </figure>
          </div>
        </div>
      </section>

      <section className="sec" id="reference" aria-labelledby="reference-h">
        <div className="wrap">
          <SecHead id="reference-h" badge="Reference" title="Co říkají" accent="moji klienti" />
          <ReviewQuotes names={['Tomáš Čepek', 'Vladimír Penc', 'Jakub Štádler']} href={path('reference', DEFAULT_LOCALE)} />
        </div>
      </section>

      <CtaBand
        id="o-mne-cta"
        title="Pojďme se poznat"
        accent="u nezávazného hovoru"
        text="Řekněte mi, co hledáte. Za dvacet minut budete vědět, jestli je koupě v Itálii pro vás reálná."
        primary={{ href: konzultace, label: 'Rezervovat hovor zdarma' }}
      />
      <MobileCtaBar />
    </main>
  );
}
