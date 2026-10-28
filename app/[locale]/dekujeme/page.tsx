import { localizeTree, translate } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/page/JsonLd';
import StepCards from '@/components/page/StepCards';
import ThanksLead from '@/components/page/ThanksLead';
import { PHONE_DISPLAY, PHONE_TEL, waLink } from '@/lib/contact';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { breadcrumbNode, graph, webPageNode } from '@/lib/schema';

// Dekovaci stranka: noindex, nofollow, mimo sitemap (lib/routes.ts NOINDEX, robots.ts).
// Sem prijde navstevnik po odeslani formulare. Dobre misto pro mereni konverze.
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const baseMetadata = {
  title: 'Děkuji za zprávu | Bc. Zuzana Bajgerová',
  description: 'Vaše zpráva dorazila. Ozvu se vám osobně.',
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; return { ...baseMetadata, title: translate(baseMetadata.title, locale), description: translate(baseMetadata.description, locale) }; }

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const here = path('dekujeme', locale);

  return (
    <main className="subpage thanks">
      <JsonLd
        data={graph(
          webPageNode({ path: here, name: 'Děkuji za zprávu', description: 'Vaše zpráva dorazila.' }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'Děkuji za zprávu', href: here },
          ]),
        )}
      />

      <section className="sec thanks__hero" aria-labelledby="dekujeme-h1">
        <div className="wrap wrap--narrow thanks__inner">
          <span className="thanks__ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <p className="page__role">Hotovo</p>
          <h1 id="dekujeme-h1" className="home-h2">
            Děkuji, vaše zpráva <em>dorazila</em>
          </h1>
          <p className="home-lead thanks__lead">
            <ThanksLead /> Pokud spěcháte, napište mi rovnou na WhatsApp.
          </p>
          <div className="thanks__cta">
            <a className="btn btn--saffron" href={waLink()} target="_blank" rel="noopener noreferrer">
              Napsat na WhatsApp
            </a>
            <a className="btn btn--ghost" href={PHONE_TEL}>
              Zavolat {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="sec sec--tight" aria-labelledby="dalsi-kroky">
        <div className="wrap">
          <div className="sec__head">
            <h2 id="dalsi-kroky" className="home-h2">
              Co se stane <em>dál</em>
            </h2>
          </div>
          <StepCards
            items={[
              { title: 'Přečtu si vaši zprávu', text: 'Projdu, co hledáte, jaký máte rozpočet a kdy chcete kupovat.' },
              { title: 'Odpovím vám osobně', text: 'Telefonem, na WhatsApp nebo e-mailem, podle toho, co vám vyhovuje.' },
              { title: 'Probereme, co je reálné', text: 'Zdarma a bez závazků. Řeknu vám, co by koupě v Itálii obnášela.' },
            ]}
          />
        </div>
      </section>

      <section className="sec sec--tight" aria-labelledby="mezitim">
        <div className="wrap">
          <div className="sec__head">
            <h2 id="mezitim" className="home-h2">
              Než se ozvu, <em>podívejte se</em>
            </h2>
          </div>
          <ul className="thanks__links">
            <li>
              <Link href={path('nemovitosti', locale)}>
                <b>Aktuální nabídky</b>
                <span>Byty a domy v Abruzzu, plní se každý den.</span>
              </Link>
            </li>
            <li>
              <Link href={path('jakKoupit', locale)}>
                <b>Jak koupit nemovitost v Itálii</b>
                <span>Celý proces krok za krokem.</span>
              </Link>
            </li>
            <li>
              <Link href={path('sluzby', locale)}>
                <b>Co všechno za vás vyřídím</b>
                <span>Servis od A do Z i po koupi.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
