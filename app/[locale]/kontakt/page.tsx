import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FaqSection from '@/components/home/FaqSection';
import ContactFormCard from '@/components/forms/ContactFormCard';
import OfficeMap from '@/components/forms/OfficeMap';
import ChannelCards from '@/components/page/ChannelCards';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import SecHead from '@/components/page/SecHead';
import StepCards from '@/components/page/StepCards';
import SubHero from '@/components/page/SubHero';
import { KONTAKT_FAQ } from '@/lib/content/faq';
import { GOOGLE_PROFILE_EMBED, OFFICE, waLink } from '@/lib/contact';
import { GOOGLE_SUMMARY } from '@/lib/reviews';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { agentNode, breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const TITLE = 'Kontakt a nezávazná konzultace';
const DESC =
  'Napište mi nebo zavolejte. Ozvu se vám osobně, konzultace o koupi nemovitosti v Abruzzu je nezávazná a zdarma.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'kontakt', locale, title: TITLE, description: DESC, });
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const here = path('kontakt', locale);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ type: 'ContactPage', path: here, name: TITLE, description: DESC, image: '/images/zuzana-abruzzo-more.png' }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Kontakt', href: here },
          ]),
          faqNode(KONTAKT_FAQ),
        )}
      />

      <SubHero
        id="kontakt-h1"
        badge="Kontakt · Abruzzo a Ostrava"
        title="Řekněte mi, co hledáte."
        accent="Ozvu se vám osobně."
        lead="Konzultace je nezávazná a zdarma. Za dvacet minut budete vědět, jestli je koupě v Itálii pro vás reálná, kolik by přibližně stála a co všechno bych za vás vyřídila."
        bg={{ src: '/images/abruzzo-costa-trabocchi.jpg', width: 1400, height: 1866 }}
        bgPosition="center 62%"
        portrait={{ src: '/hero/portret-4k.webp', alt: 'Bc. Zuzana Bajgerová' }}
        ctas={[
          { href: waLink(), label: 'Napsat na WhatsApp', external: true },
          { href: '#napsat', label: 'Napsat zprávu', variant: 'glass' },
        ]}
        chips={['TOP 10 RE/MAX ČR, 6. místo 2025', '5,0 z 15 recenzí', 'Celý proces v češtině']}
      />

      <Crumbs items={[{ name: 'Kontakt', href: here }]} />

      <section className="sec" aria-labelledby="po-odeslani">
        <div className="wrap">
          <SecHead
            id="po-odeslani"
            badge="Jak to probíhá"
            title="Co se stane"
            accent="po odeslání"
            lead="Žádné čekání do neznáma. Víte přesně, co bude dál."
          />
          <StepCards
            items={[
              { title: 'Napíšete mi', text: 'Vyplníte krátký formulář, napíšete na WhatsApp nebo mi zavoláte. Stačí pár údajů, nic dalšího nepotřebuji.' },
              { title: 'Odpovím vám osobně', text: 'Odpovím vám osobně telefonem, na WhatsApp nebo e-mailem, podle toho, co vám vyhovuje.' },
              { title: 'Projdeme, co je reálné', text: 'Řekneme si, co hledáte, jaký máte rozpočet a kolik by koupě přibližně stála. K ničemu vás to nezavazuje.' },
            ]}
          />
        </div>
      </section>

      <section className="sec sec--tight" id="napsat" aria-labelledby="napsat-h">
        <div className="wrap contact-split">
          <div>
            <SecHead id="napsat-h" title="Napište mi" accent="pár řádků" lead="Čím víc o svých představách napíšete, tím konkrétněji vám odpovím." left />
            <ContactFormCard source="kontakt" extended variant="light" />
          </div>
          <div>
            <SecHead id="rychle-h" title="Nebo to vyřešme" accent="rychle" lead="Nejrychlejší cesta je WhatsApp. Telefon a e-mail fungují také." left />
            <ChannelCards />
          </div>
        </div>
      </section>

      <section className="sec" id="kde" aria-labelledby="kde-h">
        <div className="wrap">
          <SecHead id="kde-h" badge="Itálie i Ostrava" title="Kde mě" accent="zastihnete" lead="Domluvíme se přes telefon, WhatsApp nebo video. Na prohlídky se potkáme přímo v Abruzzu." />
          <div className="where">
            <div className="where__cards">
              <article className="where__card">
                <h3>Abruzzo, Itálie</h3>
                <p>Žiji v Abruzzu, konkrétně v Montesilvanu. Prohlídky nemovitostí a osobní schůzky domluvíme přímo na místě.</p>
              </article>
              <article className="where__card">
                <h3>Ostrava, Česko</h3>
                <p>
                  {OFFICE.name}
                  <br />
                  {OFFICE.street}
                  <br />
                  {OFFICE.zip} {OFFICE.city}
                </p>
              </article>
            </div>
            <OfficeMap />
          </div>
        </div>
      </section>

      <FaqSection
        faq={KONTAKT_FAQ}
        id="faq"
        heading={
          <>
            Než mi napíšete, <em>možná se ptáte</em>
          </>
        }
      />

      <CtaBand
        id="kontakt-cta"
        title="Pojďme si"
        accent="zavolat"
        text="Nic to nestojí a k ničemu vás to nezavazuje. Po hovoru budete vědět, jestli je koupě v Itálii pro vás reálná."
        primary={{ href: '#napsat', label: 'Napsat zprávu' }}
      />

      <section className="sec sec--tight gmap-sec" aria-labelledby="gmap-h">
        <div className="wrap gmap">
          <div className="gmap__text">
            <SecHead
              id="gmap-h"
              title="Najdete mě i na"
              accent="Mapách Google"
              lead={
                <>
                  Na mém profilu je {GOOGLE_SUMMARY.count} recenzí klientů s hodnocením {GOOGLE_SUMMARY.rating} z 5.{' '}
                  <a href={GOOGLE_SUMMARY.url} target="_blank" rel="noopener noreferrer">Zobrazit profil a recenze</a>
                </>
              }
              left
            />
          </div>
          <OfficeMap
            className="omap--small"
            src={GOOGLE_PROFILE_EMBED}
            title="Mapa Google: profil Bc. Zuzana Bajgerová"
            href={GOOGLE_SUMMARY.url}
            label="Bc. Zuzana Bajgerová na Mapách Google"
          />
        </div>
      </section>
      <MobileCtaBar />
    </main>
  );
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
