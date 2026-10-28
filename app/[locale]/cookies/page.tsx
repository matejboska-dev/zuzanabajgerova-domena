import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LegalPage, { LegalSec } from '@/components/page/LegalPage';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { pageMetadata } from '@/lib/seo';

// Vychozi bod: kontrola kodu (zadne document.cookie, localStorage, sessionStorage, zadna analytika)
// a mereni v prohlizeci na vsech hlavnich strankach (po nacteni prazdne cookies i uloziste).
// Kdyz se nasadi GA4 nebo jine mereni, tuhle stranku a cookie listu je treba upravit PRED spustenim mereni.
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const TITLE = 'Cookies';
const LEAD =
  'Stručně: web nenastavuje žádné cookies a nic vás nesleduje. Níže je přehled toho, s čím se můžete setkat.';
const DESC = 'Jaké cookies a úložiště prohlížeče web používá, jak je to s měřením návštěvnosti a třetími stranami.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'cookies', locale, title: TITLE, description: DESC, });
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const here = path('cookies', locale);
  const privacy = path('ochranaUdaju', locale);

  return (
    <LegalPage
      here={here}
      title={TITLE}
      lead={LEAD}
      description={DESC}
      updated="Poslední aktualizace: 26. 10. 2026"
      toc={[
        { id: 'co-jsou', label: 'Co jsou cookies' },
        { id: 'nezbytne', label: 'Nezbytné cookies' },
        { id: 'analyticke', label: 'Analytické cookies' },
        { id: 'souhlas', label: 'Jak souhlas změnit' },
        { id: 'platnost', label: 'Doba platnosti' },
        { id: 'treti-strany', label: 'Třetí strany' },
      ]}
    >
      <LegalSec id="co-jsou" n={1} title="Co jsou cookies">
        <p>
          Cookies jsou malé textové soubory, které si prohlížeč ukládá při návštěvě webu. Podobně fungují i další
          úložiště prohlížeče, například localStorage.
        </p>
      </LegalSec>

      <LegalSec id="nezbytne" n={2} title="Nezbytné cookies">
        <p>
          Web nenastavuje žádné vlastní cookies. Do úložiště prohlížeče (sessionStorage) ukládá jedinou technickou
          značku, že jste už viděli úvodní animaci hlavní stránky, aby se vám při dalším otevření nepřehrávala znovu.
          Značka neobsahuje žádné osobní údaje a prohlížeč ji smaže, jakmile zavřete okno nebo kartu.
        </p>
        <p>
          Formuláře proto fungují bez cookies. Ochrana před spamem (skryté pole a minimální doba vyplnění) cookies
          nepoužívá.
        </p>
      </LegalSec>

      <LegalSec id="analyticke" n={3} title="Analytické cookies">
        <p>
          Web v tuto chvíli neměří návštěvnost a nepoužívá Google Analytics 4 ani jiný analytický či reklamní nástroj.
          Ve stránkách jsou připravené události pro měření, například odeslání formuláře, ale nikam se neodesílají,
          dokud měřicí nástroj není nasazen.
        </p>
        <p>Pokud měření návštěvnosti v budoucnu zavedu, spustí se až po vašem souhlasu a tuto stránku předem upravím.</p>
      </LegalSec>

      <LegalSec id="souhlas" n={4} title="Jak souhlas změnit">
        <p>
          Protože web nepoužívá cookies, které by vyžadovaly souhlas, nemáte co nastavovat. Cookies třetích stran, na
          které můžete při prohlížení narazit (viz část Třetí strany), smažete v nastavení svého prohlížeče, obvykle v
          sekci Soukromí a zabezpečení.
        </p>
      </LegalSec>

      <LegalSec id="platnost" n={5} title="Doba platnosti">
        <p>
          Vlastní cookies web nenastavuje. Technická značka úvodní animace platí jen do zavření okna nebo karty. U cookies třetích stran určuje dobu
          platnosti jejich provozovatel.
        </p>
      </LegalSec>

      <LegalSec id="treti-strany" n={6} title="Třetí strany na webu">
        <p>
          Při prohlížení se váš prohlížeč na některých místech spojí se servery třetích stran. Nejde o cookies webu, ale
          třetí strana při tom zjistí technické údaje, zejména IP adresu.
        </p>
        <ul>
          <li>
            <strong>Mapa kanceláře (stránka Kontakt):</strong> načte se až po kliknutí na tlačítko. Teprve pak se
            prohlížeč spojí s Googlem, který může nastavit vlastní cookies podle svých podmínek.
          </li>
          <li>
            <strong>Fotografie nabídek:</strong> načítají se ze serverů RE/MAX (mlsf.remax-czech.cz).
          </li>
          <li>
            <strong>Písma:</strong> načítají se z vlastní domény webu, ne od Googlu.
          </li>
        </ul>
        <p>
          Podrobnosti najdete v <Link href={privacy}>zásadách ochrany osobních údajů</Link>.
        </p>
      </LegalSec>
    </LegalPage>
  );
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
