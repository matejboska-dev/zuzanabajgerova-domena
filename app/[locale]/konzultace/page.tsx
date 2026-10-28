import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import FaqSection from '@/components/home/FaqSection';
import ContactFormCard from '@/components/forms/ContactFormCard';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import SecHead from '@/components/page/SecHead';
import StepCards from '@/components/page/StepCards';
import SubHero from '@/components/page/SubHero';
import { KONZULTACE_FAQ } from '@/lib/content/faq';
import { waLink } from '@/lib/contact';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { agentNode, breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const TITLE = 'Nezávazná konzultace o koupi v Abruzzu';
const DESC =
  'Napište mi a domluvíme si hovor zdarma. Projdeme, co hledáte, jaký máte rozpočet a co všechno koupě nemovitosti v Itálii obnáší. Ozvu se vám osobně.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'konzultace', locale, title: TITLE, description: DESC, });
}

const AGENDA = [
  'Co hledáte: druhý domov, investici, nebo trvalé bydlení',
  'Jaký máte rozpočet a co je za něj reálné',
  'Lokalita: u moře, nebo v kopcích',
  'Jak koupě v Itálii probíhá a co všechno za vás vyřídím',
  'Jaké budou vaše další kroky',
];

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const here = path('konzultace', locale);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ path: here, name: TITLE, description: DESC }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Kontakt', href: path('kontakt', locale) },
            { name: 'Domluvení hovoru', href: here },
          ]),
          faqNode(KONZULTACE_FAQ),
        )}
      />

      <SubHero
        id="konzultace-h1"
        badge="Konzultace · Zdarma"
        title="Nezávazná konzultace"
        accent="o koupi v Abruzzu"
        lead="Napište mi, s čím vám mohu pomoci. Ozvu se vám osobně a společně se domluvíme na hovoru. Projdeme vaši představu, rozpočet i postup koupě. Zdarma a nezávazně."
        bg={{ src: '/images/abruzzo-zivot-komunita.webp', width: 1600, height: 1069 }}
        bgPosition="center 45%"
        portrait={{ src: '/hero/portret-4k.webp', alt: 'Bc. Zuzana Bajgerová' }}
        ctas={[
          { href: '#rezervace', label: 'Napsat zprávu' },
          { href: waLink(), label: 'Radši napíšu na WhatsApp', variant: 'glass', external: true },
        ]}
        chips={['Zdarma a nezávazně', 'Zhruba dvacet minut', 'Česky, telefonem nebo videem']}
      />

      <Crumbs
        items={[
          { name: 'Kontakt', href: path('kontakt', locale) },
          { name: 'Domluvení hovoru', href: here },
        ]}
      />

      <section className="sec" aria-labelledby="po-rezervaci">
        <div className="wrap">
          <SecHead id="po-rezervaci" badge="Jak to probíhá" title="Jak si domluvíme" accent="hovor" />
          <StepCards
            items={[
              { title: 'Napíšete mi', text: 'Necháte mi kontakt a pár řádků o tom, co hledáte nebo co byste chtěli probrat.' },
              { title: 'Ozvu se vám osobně', text: 'Odpovím vám e-mailem, telefonem nebo přes WhatsApp a společně domluvíme další postup.' },
              { title: 'Zavoláme si', text: 'Hovor trvá zhruba dvacet minut. Pak budete vědět, jestli je koupě v Itálii pro vás reálná a co by obnášela.' },
            ]}
          />
        </div>
      </section>

      <section className="sec sec--tight" id="rezervace" aria-labelledby="rezervace-h">
        <div className="wrap booking-split">
          <div className="booking-split__form">
            <SecHead id="rezervace-h" title="Domluvme si hovor" accent="zdarma" lead="Nechte mi kontakt a napište, co vás zajímá. Ozvu se vám osobně." left />
            <ContactFormCard source="konzultace" variant="light" />
          </div>

          <aside className="booking-split__side" aria-labelledby="agenda-h">
            <div className="agenda">
              <Image
                className="agenda__img"
                src="/images/zuzana-climax.webp"
                alt="Bc. Zuzana Bajgerová, realitní specialistka na Abruzzo"
                width={1024}
                height={1024}
              />
              <h2 id="agenda-h" className="agenda__h">
                Čemu se budeme věnovat
              </h2>
              <ul className="agenda__list">
                {AGENDA.map((a) => (
                  <li key={a}>
                    <span className="pricecol__icon pricecol__icon--check" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.5 8.5l3 3 6-6" />
                      </svg>
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <p className="agenda__quote">
                „Pro mě to není jen práce. Je to životní styl a vášeň pro krásu Itálie a spokojenost mých klientů.“
              </p>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection
        faq={KONZULTACE_FAQ}
        id="faq"
        heading={
          <>
            Ptáte se na hovor, <em>odpovídám</em>
          </>
        }
      />

      <CtaBand
        id="konzultace-cta"
        title="Radši rovnou"
        accent="napíšete?"
        text="Nejrychlejší odpověď máte na WhatsApp. Chat se otevře s předvyplněnou zprávou, stačí odeslat."
        primary={{ href: path('kontakt', locale), label: 'Všechny kontakty' }}
      />
      <MobileCtaBar />
    </main>
  );
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
