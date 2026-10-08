import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import FaqSection from '@/components/home/FaqSection';
import CallBooking from '@/components/forms/CallBooking';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import SecHead from '@/components/page/SecHead';
import StepCards from '@/components/page/StepCards';
import SubHero from '@/components/page/SubHero';
import { KONZULTACE_FAQ } from '@/lib/content/faq';
import { waLink } from '@/lib/contact';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { agentNode, breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Nezávazná konzultace o koupi v Abruzzu';
const DESC =
  'Rezervujte si hovor zdarma. Projdeme, co hledáte, jaký máte rozpočet a co všechno koupě nemovitosti v Itálii obnáší. Termín potvrdím do 24 hodin.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'konzultace', locale, title: TITLE, description: DESC, onlyCs: true });
}

const AGENDA = [
  'Co hledáte: druhý domov, investici, nebo trvalé bydlení',
  'Jaký máte rozpočet a co je za něj reálné',
  'Lokalita: u moře, nebo v kopcích',
  'Jak koupě v Itálii probíhá a co všechno za vás vyřídím',
  'Jaké budou vaše další kroky',
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('konzultace', DEFAULT_LOCALE);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ path: here, name: TITLE, description: DESC }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Kontakt', href: path('kontakt', DEFAULT_LOCALE) },
            { name: 'Rezervace hovoru', href: here },
          ]),
          faqNode(KONZULTACE_FAQ),
        )}
      />

      <SubHero
        id="konzultace-h1"
        badge="Rezervace hovoru · Zdarma"
        title="Nezávazná konzultace"
        accent="o koupi v Abruzzu"
        lead="Vyberte si termín, který vám vyhovuje. Projdeme, co hledáte, jaký máte rozpočet a co všechno koupě v Itálii obnáší. Nic neplatíte a k ničemu se nezavazujete."
        bg={{ src: '/images/abruzzo-zivot-komunita.webp', width: 1600, height: 1069 }}
        bgPosition="center 45%"
        portrait={{ src: '/hero/portret-4k.png', alt: 'Bc. Zuzana Bajgerová' }}
        ctas={[
          { href: '#rezervace', label: 'Vybrat termín hovoru' },
          { href: waLink(), label: 'Radši napíšu na WhatsApp', variant: 'glass', external: true },
        ]}
        chips={['Zdarma a nezávazně', 'Zhruba dvacet minut', 'Česky, telefonem nebo videem']}
      />

      <Crumbs
        items={[
          { name: 'Kontakt', href: path('kontakt', DEFAULT_LOCALE) },
          { name: 'Rezervace hovoru', href: here },
        ]}
      />

      <section className="sec" aria-labelledby="po-rezervaci">
        <div className="wrap">
          <SecHead id="po-rezervaci" badge="Jak to probíhá" title="Co se stane" accent="po rezervaci" />
          <StepCards
            items={[
              { title: 'Vyberete termín', text: 'Navrhnete den a část dne, kdy se vám hovor hodí, a vyplníte pár údajů o tom, co hledáte.' },
              { title: 'Potvrdím do 24 hodin', text: 'Navržený termín vám potvrdím přes WhatsApp, telefon nebo e-mail. Když čas nevyjde, domluvíme jiný.' },
              { title: 'Zavoláme si', text: 'Hovor trvá zhruba dvacet minut. Pak budete vědět, jestli je koupě v Itálii pro vás reálná a co by obnášela.' },
            ]}
          />
        </div>
      </section>

      <section className="sec sec--tight" id="rezervace" aria-labelledby="rezervace-h">
        <div className="wrap booking-split">
          <div className="booking-split__form">
            <SecHead id="rezervace-h" title="Rezervujte si hovor" accent="zdarma" lead="Čtyři krátké kroky, nic víc nepotřebuji." left />
            <CallBooking />
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
        primary={{ href: path('kontakt', DEFAULT_LOCALE), label: 'Všechny kontakty' }}
      />
      <MobileCtaBar />
    </main>
  );
}
