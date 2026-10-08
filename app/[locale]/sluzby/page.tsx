import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FaqSection from '@/components/home/FaqSection';
import CheckList from '@/components/page/CheckList';
import ClickVideo from '@/components/page/ClickVideo';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import FeatureRow from '@/components/page/FeatureRow';
import FeaturedListings from '@/components/page/FeaturedListings';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import PriceColumns from '@/components/page/PriceColumns';
import ReviewQuotes from '@/components/page/ReviewQuotes';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import { SLUZBY_FAQ } from '@/lib/content/faq';
import { RENO_DONE } from '@/lib/home';
import { waLink } from '@/lib/contact';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path, absolute } from '@/lib/routes';
import { AGENT_ID, agentNode, breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Služby: koupě, rekonstrukce, správa a pronájem v Itálii';
const DESC =
  'Servis od A do Z při koupi nemovitosti v Abruzzu: vyhledání, prohlídky, vyjednání ceny, administrativa. Po koupi rekonstrukce, správa i pronájem. Cena je konečná.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'sluzby', locale, title: TITLE, description: DESC, onlyCs: true });
}

const PHASES = [
  {
    n: 'I',
    t: 'Před koupí',
    items: [
      'Nezávazná konzultace zdarma',
      'Hledání v celé nabídce regionu, včetně neveřejných nabídek',
      'Videoprohlídky ještě před příletem',
      'Osobní prohlídky naskládané do jednoho dne',
    ],
  },
  {
    n: 'II',
    t: 'Při koupi',
    items: [
      'Vyjednání ceny a podmínek s prodávajícím',
      'Prověření dokumentů s notářem, geodety a právníky',
      'Codice fiscale, plné moci a překlady',
      'Předsmlouva a notářský zápis, osobně nebo na plnou moc',
    ],
  },
  {
    n: 'III',
    t: 'Po koupi',
    items: [
      'Přepis elektřiny, plynu a vody, internet a pojištění',
      'Naše asistentky na místě hlídají klíče a dělají kontroly',
      'První rok základního servisu v rámci naší provize',
      'Rekonstrukce, vybavení, správa i pronájem, když chcete',
    ],
  },
];

const VS: { you: string; me: string }[] = [
  { you: 'Řeknete mi, co hledáte a jaký máte rozpočet', me: 'Najdu a prověřím nemovitosti, i ty, které nejsou na webu' },
  { you: 'Vyberete si dům', me: 'Zorganizuji prohlídky, osobně s tlumočením nebo živě přes video' },
  { you: 'Rozhodnete o nabídce', me: 'Vyjednám cenu a podmínky s prodávajícím' },
  { you: 'Podepíšete, osobně nebo na plnou moc', me: 'Zajistím codice fiscale, plné moci, překlady a kontrolu dokumentů' },
  { you: 'Převezmete klíče', me: 'Vyřídím přepisy energií, internet, pojištění a registrace k daním' },
  { you: 'Užíváte si dům', me: 'Postarám se o rekonstrukci, správu i pronájem, když budete chtít' },
];

const SERVICES = [
  { name: 'Servis při koupi nemovitosti od A do Z', desc: 'Vyhledání nemovitosti, prohlídky, vyjednání ceny, kontrola dokumentů, codice fiscale, plné moci, překlady a doprovod až k předání klíčů.', anchor: '#servis' },
  { name: 'Rekonstrukce a vybavení nemovitosti v Itálii', desc: 'Rekonstrukce na klíč s architektkou a týmem ověřených řemeslníků, dohled nad rozpočtem a termíny, vybavení bytu.', anchor: '#rekonstrukce' },
  { name: 'Správa nemovitosti v Itálii', desc: 'Pravidelné kontroly, úklid, komunikace se sousedy a správou domu, platby energií a daní.', anchor: '#sprava' },
  { name: 'Pronájem a investice do nemovitosti v Itálii', desc: 'Příprava apartmánu pro turisty, provoz, úklid a komunikace s hosty při krátkodobém i sezónním pronájmu.', anchor: '#investice' },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('sluzby', DEFAULT_LOCALE);
  const konzultace = path('konzultace', DEFAULT_LOCALE);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ type: 'CollectionPage', path: here, name: TITLE, description: DESC, image: '/images/zuzana-notar.webp' }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Služby', href: here },
          ]),
          ...SERVICES.map((s) => ({
            '@type': 'Service',
            '@id': `${absolute(here)}${s.anchor}`,
            name: s.name,
            description: s.desc,
            serviceType: s.name,
            provider: { '@id': AGENT_ID },
            areaServed: { '@type': 'AdministrativeArea', name: 'Abruzzo, Itálie' },
            audience: { '@type': 'Audience', audienceType: 'Čeští a slovenští kupující nemovitostí v Itálii' },
            url: `${absolute(here)}${s.anchor}`,
          })),
          faqNode(SLUZBY_FAQ),
        )}
      />

      <SubHero
        id="sluzby-h1"
        badge="Služby · Servis od A do Z"
        title="Vy si vyberete dům."
        accent="Zbytek udělám já."
        lead="Vyhledání, prohlídky, vyjednávání ceny, kompletní administrativa, plné moci, překlady, přepisy energií a registrace k daním. Po koupi rekonstrukce, vybavení, správa i pronájem."
        bg={{ src: '/images/property-apartment-francavilla.jpg', width: 1600, height: 936 }}
        bgPosition="center 40%"
        photo={{ src: '/images/zuzana-notar.webp', alt: 'Bc. Zuzana Bajgerová při podpisu u notáře', width: 576, height: 1024 }}
        ctas={[
          { href: konzultace, label: 'Domluvit nezávaznou konzultaci' },
          { href: waLink(), label: 'Napsat na WhatsApp', variant: 'glass', external: true },
        ]}
        chips={['Žiji přímo v Abruzzu', 'Celý proces v češtině', 'Cena je konečná']}
      />

      <Crumbs items={[{ name: 'Služby', href: here }]} />

      <nav className="toc wrap" aria-label="Rychlá navigace po službách">
        <a href="#servis">Servis od A do Z</a>
        <a href="#cena">Co je v ceně</a>
        <a href="#rekonstrukce">Rekonstrukce</a>
        <a href="#sprava">Správa</a>
        <a href="#investice">Pronájem a investice</a>
        <a href="#faq">Časté dotazy</a>
      </nav>

      <section className="sec" id="casova-osa" aria-labelledby="casova-osa-h">
        <div className="wrap">
          <SecHead
            id="casova-osa-h"
            badge="Od prvního hovoru po klíče"
            title="Jsem s vámi"
            accent="před, při i po koupi"
            lead="Koupě v cizí zemi není jedna schůzka. Proto vás provedu každou fází a nic nenechám náhodě."
          />
          <div className="phases">
            {PHASES.map((p) => (
              <article className="phase" key={p.t}>
                <span className="phase__n" aria-hidden="true">
                  {p.n}
                </span>
                <h3 className="phase__t">{p.t}</h3>
                <CheckList items={p.items} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="servis" aria-labelledby="servis-h">
        <div className="wrap wrap--narrow2">
          <SecHead id="servis-h" badge="Servis při koupi od A do Z" title="Co dělám já" accent="a co děláte vy" lead="Vy rozhodujete. Všechno ostatní vyřídím já, v češtině a bez stresu." />
          <div className="vs" role="table" aria-label="Rozdělení práce při koupi">
            <div className="vs__head" role="row">
              <span role="columnheader">Děláte vy</span>
              <span role="columnheader">Dělám já</span>
            </div>
            {VS.map((r) => (
              <div className="vs__row" role="row" key={r.you}>
                <span className="vs__you" role="cell">
                  {r.you}
                </span>
                <span className="vs__me" role="cell">
                  {r.me}
                </span>
              </div>
            ))}
          </div>
          <p className="vs__foot">Vy neděláte nic v italštině.</p>
        </div>
      </section>

      <section className="sec" id="cena" aria-labelledby="cena-h">
        <div className="wrap">
          <SecHead
            id="cena-h"
            badge="Transparentní podmínky"
            title="Cena, kterou vidíte na internetu,"
            accent="je konečná"
            lead="Cena je konečná a zahrnuje cenu apartmánu, daň z převodu nemovitosti, odměnu notáře a naši provizi."
          />
          <PriceColumns />
          <p className="sec__after">
            Jak to celé vychází dohromady, spočítáte v{' '}
            <Link href={`${path('jakKoupit', DEFAULT_LOCALE)}#kalkulacka`}>kalkulačce celkového rozpočtu</Link>.
          </p>
        </div>
      </section>

      <FeatureRow
        id="rekonstrukce"
        badge="Rekonstrukce a vybavení"
        title="Rekonstrukce"
        accent="na klíč"
        lead="S naší paní architektkou a vlastním týmem ověřených řemeslníků vám byt zrekonstruujeme na klíč. Ohlídám rozpočet i termíny a během prací vám posílám fotky."
        media={
          <ClickVideo src="/media/reno-na-klic.mp4" poster="/media/reno-na-klic.webp" label="Rekonstrukce na klíč v Montesilvanu pro české klienty" ratio="9 / 16" />
        }
      >
        <CheckList
          items={[
            'Návrh a projekt s naší paní architektkou',
            'Ověření řemeslníci z regionu',
            'Dohled nad rozpočtem a termíny',
            'Fotky z průběhu prací',
            'Vybavení bytu na klíč',
            'Možnost osobně vidět už hotové realizace',
          ]}
        />
        <div className="feature-strip">
          {RENO_DONE.slice(0, 3).map((r) => (
            <figure className="media-tile" key={r.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.src} alt={r.alt} loading="lazy" />
            </figure>
          ))}
        </div>
        <div className="feature-cta">
          <Link href={konzultace} className="btn btn--saffron">
            Domluvit konzultaci
          </Link>
        </div>
      </FeatureRow>

      <FeatureRow
        id="sprava"
        flip
        badge="Správa nemovitosti"
        title="Správa, když tam"
        accent="nebydlíte"
        lead="Dům je pod dohledem, i když jste v Česku. O všechno se postarám já a moje asistentky na místě."
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img className="feature-img" src="/images/sluzby/sprava.webp" alt="Upravená zahrada u kamenného domu v Itálii" width={1600} height={1067} loading="lazy" />
        }
      >
        <CheckList
          items={[
            'Pravidelné kontroly nemovitosti na místě',
            'Úklid',
            'Drobné opravy a komunikace s řemeslníky',
            'Komunikace se sousedy, se správou domu a účast na schůzích',
            'Platby energií, daní a poplatků',
          ]}
        />
      </FeatureRow>

      <FeatureRow
        id="investice"
        badge="Pronájem a investice"
        title="Dům, který vám"
        accent="vydělává"
        lead="Krátkodobý i sezónní pronájem. Připravíme apartmán pro turisty a zajistíme provoz, úklid i stabilní výnos."
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img className="feature-img feature-img--tall" src="/media/reno-real-3.webp" alt="Garsonka zrekonstruovaná pro krátkodobé pronájmy" width={800} height={1000} loading="lazy" />
        }
      >
        <CheckList
          items={[
            'Příprava apartmánu pro turisty',
            'Úklid mezi hosty',
            'Komunikace s hosty, check-in a check-out',
            'Provoz, o který se nemusíte starat',
          ]}
        />
        <div className="feature-cta">
          <Link href={konzultace} className="btn btn--saffron">
            Probrat investici do nemovitosti
          </Link>
        </div>
      </FeatureRow>

      <section className="sec" aria-labelledby="ref-h">
        <div className="wrap">
          <SecHead id="ref-h" badge="Reference" title="Věřte lidem," accent="kteří to už mají za sebou" />
          <ReviewQuotes names={['Lenka R', 'Petra Chelíková', 'René Cichý']} href={path('reference', DEFAULT_LOCALE)} />
        </div>
      </section>

      <FeaturedListings id="nabidky-h" title="Co teď nabízím" accent="v Abruzzu" />

      <FaqSection
        faq={SLUZBY_FAQ}
        id="faq"
        heading={
          <>
            Časté dotazy <em>ke službám</em>
          </>
        }
      />

      <CtaBand
        id="sluzby-cta"
        title="Pojďme si říct,"
        accent="co potřebujete"
        text="Konzultace je zdarma a k ničemu vás nezavazuje. Za dvacet minut budete vědět, co všechno bych za vás vyřídila."
        primary={{ href: konzultace, label: 'Rezervovat hovor' }}
      />
      <MobileCtaBar />
    </main>
  );
}
