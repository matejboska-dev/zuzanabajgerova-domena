import { localizeTree } from '@/lib/localize.server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LegalPage, { LegalSec } from '@/components/page/LegalPage';
import { BUSINESS, EMAIL, OFFICE, PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { pageMetadata } from '@/lib/seo';

// Podminky uziti webu. Web nic neprodava ani neuzavira smlouvy online, proto jde jen o pravidla
// pouziti obsahu a odpovednost za informace (nabidky prebirane z RE/MAX, kalkulacka, pruvodce).
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const TITLE = 'Podmínky užití webu';
const LEAD = 'Pravidla pro používání tohoto webu, jeho obsahu a informací o nabízených nemovitostech.';
const DESC =
  'Podmínky užití webu Bc. Zuzany Bajgerové: provozovatel, povaha informací o nemovitostech, autorská práva a odpovědnost.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'podminky', locale, title: TITLE, description: DESC, });
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const here = path('podminky', locale);
  const privacy = path('ochranaUdaju', locale);
  const cookies = path('cookies', locale);

  return (
    <LegalPage
      here={here}
      title={TITLE}
      lead={LEAD}
      description={DESC}
      updated="Účinné od 26. 10. 2026"
      toc={[
        { id: 'provozovatel', label: 'Provozovatel' },
        { id: 'ucel', label: 'Účel webu' },
        { id: 'nabidky', label: 'Informace o nemovitostech' },
        { id: 'prava', label: 'Autorská práva' },
        { id: 'pouzivani', label: 'Používání webu' },
        { id: 'odpovednost', label: 'Odpovědnost' },
        { id: 'zaver', label: 'Závěrečná ustanovení' },
      ]}
    >
      <LegalSec id="provozovatel" n={1} title="Provozovatel webu">
        <p>
          Web provozuje <strong>{BUSINESS.name}</strong>, podnikající fyzická osoba, IČO {BUSINESS.ico}, se sídlem{' '}
          {BUSINESS.address}. Realitní činnost vykonávám ve spolupráci s kanceláří {OFFICE.name}.
        </p>
        <p>
          Kontakt: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
        </p>
      </LegalSec>

      <LegalSec id="ucel" n={2} title="Účel webu">
        <p>
          Web slouží k představení mých služeb při koupi, rekonstrukci, správě a pronájmu nemovitostí v Itálii a k
          navázání kontaktu. Přes web se neuzavírají žádné smlouvy a nic se na něm neprodává ani neplatí.
        </p>
        <p>
          Používáním webu vyjadřujete souhlas s těmito podmínkami. Jak zpracovávám osobní údaje, popisují{' '}
          <Link href={privacy}>zásady ochrany osobních údajů</Link> a stránka <Link href={cookies}>Cookies</Link>.
        </p>
      </LegalSec>

      <LegalSec id="nabidky" n={3} title="Informace o nemovitostech">
        <ul>
          <li>
            Nabídky nemovitostí se na web automaticky přebírají ze systému RE/MAX. Mezi aktualizacemi se nabídka může
            změnit, být rezervována nebo prodána. Aktuální stav vám vždy potvrdím osobně.
          </li>
          <li>
            Zveřejněná nabídka není návrhem na uzavření smlouvy. Jde o výzvu, abyste se mi ozvali a domluvili si
            podrobnosti nebo prohlídku.
          </li>
          <li>
            Ceny v korunách jsou orientační přepočet z eur podle denního kurzu ČNB. Rozhodující je cena v eurech
            uvedená prodávajícím.
          </li>
          <li>
            Kalkulačka nákladů, průvodce koupí a další informační texty mají orientační povahu a nenahrazují právní,
            daňové ani notářské poradenství pro váš konkrétní případ.
          </li>
          <li>Fotografie a vizualizace mohou zachycovat nemovitost v jiném stavu nebo ročním období.</li>
        </ul>
      </LegalSec>

      <LegalSec id="prava" n={4} title="Autorská práva">
        <p>
          Texty, fotografie, videa, grafika a vzhled webu jsou chráněny autorským právem. Patří provozovatelce, jejím
          klientům, kteří se svolením poskytli videoreference, nebo dalším autorům, například síti RE/MAX u fotografií
          nabídek.
        </p>
        <p>
          Obsah si můžete prohlížet a sdílet odkazem. Kopírovat, upravovat nebo dále šířit ho bez mého písemného
          souhlasu nelze. Výjimkou jsou krátké citace s uvedením zdroje podle autorského zákona.
        </p>
      </LegalSec>

      <LegalSec id="pouzivani" n={5} title="Používání webu">
        <ul>
          <li>Do formulářů prosím uvádějte pravdivé údaje a jen ty, které se vás týkají.</li>
          <li>
            Je zakázáno web zneužívat, zejména odesílat hromadné nebo automatizované zprávy, obcházet jeho ochranu nebo
            hromadně stahovat jeho obsah.
          </li>
          <li>
            Odkazy na weby třetích stran (například RE/MAX, Google Mapy, WhatsApp nebo Instagram) vedou na služby, za
            jejichž obsah a podmínky neodpovídám.
          </li>
        </ul>
      </LegalSec>

      <LegalSec id="odpovednost" n={6} title="Odpovědnost">
        <p>
          Informace na webu připravuji pečlivě a průběžně je aktualizuji. Nemohu však zaručit, že budou vždy úplné a
          aktuální. Za škodu vzniklou rozhodnutím učiněným výhradně na základě informací z webu, bez osobní konzultace,
          neodpovídám v rozsahu, v jakém to právní předpisy dovolují.
        </p>
        <p>
          Web může být občas nedostupný kvůli údržbě nebo výpadku poskytovatelů. Za takovou nedostupnost neodpovídám.
        </p>
      </LegalSec>

      <LegalSec id="zaver" n={7} title="Závěrečná ustanovení">
        <p>
          Tyto podmínky se řídí právním řádem České republiky. Podmínky mohu přiměřeně měnit. Nové znění platí od
          zveřejnění na této stránce.
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
