import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LegalPage, { LegalRow, LegalSec } from '@/components/page/LegalPage';
import Marked from '@/components/Marked';
import { BUSINESS, EMAIL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { pageMetadata } from '@/lib/seo';

// Text vychazi z kontroly kodu (app/api/lead/route.ts, lib/forms.ts) a z mereni v prohlizeci:
// zadne cookies ani localStorage, cizi servery jen RE/MAX CDN (fotky nabidek) a Google (az po kliknuti
// na mapu). Kdyz se neco z toho zmeni (analytika, hosting, fotky na vlastni domene), upravit i tady.
// Existuje jen cesky. Pravni text se nepreklada bez pravnika.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Ochrana osobních údajů';
const LEAD = 'Jak nakládám s údaji z formulářů, kdo k nim má přístup a jak dlouho je uchovávám.';
const DESC =
  'Jaké osobní údaje sbírám přes formuláře na webu, k čemu je používám, komu je předávám a jaká máte práva.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'ochranaUdaju', locale, title: TITLE, description: DESC, onlyCs: true });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();

  const here = path('ochranaUdaju', DEFAULT_LOCALE);
  const cookies = path('cookies', DEFAULT_LOCALE);

  return (
    <LegalPage
      here={here}
      title={TITLE}
      lead={LEAD}
      description={DESC}
      updated="Pracovní verze k revizi: 14. 10. 2026"
      toc={[
        { id: 'spravce', label: 'Správce a kontakt' },
        { id: 'udaje', label: 'Jaké údaje sbírám' },
        { id: 'zaklad', label: 'Právní základ' },
        { id: 'uchovani', label: 'Doba uchování' },
        { id: 'predani', label: 'Komu údaje předávám' },
        { id: 'prava', label: 'Vaše práva' },
      ]}
    >
      <LegalSec id="spravce" n={1} title="Správce údajů a kontakt">
        <p>
          Provozovatelkou tohoto webu a správkyní osobních údajů je <strong>{BUSINESS.name}</strong>,
          podnikající fyzická osoba, IČO {BUSINESS.ico}, se sídlem {BUSINESS.address}.
        </p>
        <p>
          Ve věcech osobních údajů se na mě můžete obrátit e-mailem <a href={`mailto:${EMAIL}`}>{EMAIL}</a> nebo
          telefonicky na čísle <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
        </p>
        <p>Tato stránka popisuje jen zpracování údajů přes tento web.</p>
      </LegalSec>

      <LegalSec id="udaje" n={2} title="Jaké údaje sbírám a proč">
        <p>Sbírám jen to, co mi sami napíšete, a několik technických údajů, bez kterých se formulář neobejde.</p>

        <LegalRow
          title="Formuláře na webu"
          rows={[
            [
              'Údaje',
              'Jméno, e-mail, telefon nebo WhatsApp a to, co do formuláře sami doplníte: účel koupě, rozpočet, oblast a typ nemovitosti, zprávu, preferovaný den a část dne pro hovor a způsob spojení. U poptávky z detailu nabídky i název a odkaz nemovitosti. V dotazníku navíc typ nemovitosti, lokalitu, vzdálenost od moře, způsob financování, termín koupě, zájem o rekonstrukci a správu, zkušenost s Abruzzem, odkud o mně víte, a vlastní představu.',
            ],
            ['Účel', 'Odpovědět na vaši poptávku, domluvit hovor a vybrat vám vhodné nabídky. U hlídače nabídek vám posílat nabídky podle vašeho zadání.'],
            ['Pozor', 'Do formulářů prosím nepište rodná čísla, čísla dokladů ani platební údaje. Nepotřebuji je.'],
          ]}
        />

        <LegalRow
          title="Technické údaje odeslané s formulářem"
          rows={[
            [
              'Údaje',
              'Adresa stránky, ze které jste formulář odeslali, odkud jste na web přišli, parametry odkazu (například značky reklamní kampaně) a čas odeslání.',
            ],
            ['Účel', 'Vědět, z které stránky poptávka přišla.'],
          ]}
        />

        <LegalRow
          title="IP adresa"
          rows={[
            ['Údaje', 'IP adresu vašeho zařízení drží web krátce v paměti běžícího serveru.'],
            [
              'Účel',
              'Omezit spam: z jedné adresy projde nejvýše 5 odeslání formuláře za 10 minut. IP adresa se neukládá do poptávky ani do žádné databáze a zaniká, když se server restartuje. Jako technický záznam ji mohou uchovávat také poskytovatelé hostingu, viz část Komu údaje předávám.',
            ],
          ]}
        />

        <LegalRow
          title="Zprávy mimo formuláře"
          rows={[
            [
              'Údaje',
              'Když mi napíšete nebo zavoláte, zpracovávám údaje, které mi sami sdělíte: jméno, telefonní číslo a obsah zprávy.',
            ],
            [
              'Účel',
              'Odpovědět na vaši poptávku. U WhatsAppu zprávy zároveň zpracovává provozovatel služby podle vlastních podmínek.',
            ],
          ]}
        />

        <p>
          Web nemá uživatelské účty ani newsletter a odeslané poptávky se na něm neukládají. Po odeslání formuláře se
          poptávka jen doručí mně. Hlídač nabídek není newsletter: nabídky posílám ručně a jen podle vašeho zadání, a
          jakmile mi napíšete, přestanu. Web neprovádí profilování ani automatizované rozhodování. O cookies a úložišti
          prohlížeče píšu na stránce <Link href={cookies}>Cookies</Link>.
        </p>
      </LegalSec>

      <LegalSec id="zaklad" n={3} title="Právní základ zpracování">
        <ul>
          <li>
            <strong>Odpověď na vaši poptávku a domluva hovoru:</strong> zpracování je nezbytné pro přijetí opatření
            před uzavřením případné smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) nařízení GDPR).
          </li>
          <li>
            <strong>Ochrana formulářů před spamem a zneužitím:</strong> oprávněný zájem správce (čl. 6 odst. 1 písm. f)
            nařízení GDPR).
          </li>
        </ul>
        <p>
          Souhlas pro odpověď na poptávku nepotřebuji. Kdyby web později nabízel odběr novinek nebo měření návštěvnosti,
          požádám o souhlas zvlášť.
        </p>
        <p>
          <Marked text="[OVĚŘIT: právní základy potvrdí právník]" />
        </p>
      </LegalSec>

      <LegalSec id="uchovani" n={4} title="Doba uchování">
        <p>
          Odeslaný formulář se na webu neukládá, takže na webu není co mazat. Poptávka mi přijde k vyřízení a uchovávám
          ji{' '}
          <Marked text="[DOPLNIT: doba uchování poptávek, tedy jak dlouho po vyřízení se mažou]" />.
        </p>
        <p>
          IP adresa v paměti serveru slouží jen k omezení spamu a zaniká s restartem serveru.{' '}
          <Marked text="[OVĚŘIT: jak dlouho uchovává technické záznamy zvolený hosting]" />
        </p>
      </LegalSec>

      <LegalSec id="predani" n={5} title="Komu údaje předávám">
        <p>Údaje poskytuji jen těm, kdo se podílejí na provozu webu a na doručení poptávky.</p>
        <ul>
          <li>
            <strong>Doručení poptávky e-mailem:</strong> poptávky z formulářů doručuje služba Resend (resend.com).{' '}
            <Marked text="[OVĚŘIT: konečné nastavení doručení (Resend, nebo jiný nástroj), sídlo poskytovatele a případné předání údajů mimo EU]" />
          </li>
          <li>
            <strong>Hosting webu:</strong> web běží u{' '}
            <Marked text="[DOPLNIT: provozovatel hostingu]" />
            , testovací verze běží na službě Netlify. Formulář prochází servery hostingu a ten může uchovávat technické
            záznamy včetně IP adresy.
          </li>
          <li>
            <strong>Další nástroj pro evidenci poptávek:</strong>{' '}
            <Marked text="[DOPLNIT: pokud se poptávky budou posílat také do tabulky, CRM nebo automatizačního nástroje, uvést ho zde, jinak bod smazat]" />
          </li>
          <li>
            <strong>RE/MAX:</strong>{' '}
            <Marked text="[OVĚŘIT: zda se údaje z poptávek předávají RE/MAX Černá perla nebo do systému RE/MAX a v jakém postavení]" />
          </li>
        </ul>

        <p>
          <strong>Třetí strany při prohlížení webu</strong> (týká se i těch, kdo žádný formulář neodešlou):
        </p>
        <ul>
          <li>
            Fotografie nabídek nemovitostí se načítají přímo ze serverů RE/MAX (mlsf.remax-czech.cz). Při jejich
            zobrazení proto váš prohlížeč pošle RE/MAX technické údaje, zejména IP adresu a údaje o zařízení.{' '}
            <Marked text="[OVĚŘIT: platí, dokud se fotky nehostují na vlastní doméně]" />
          </li>
          <li>
            Mapa kanceláře na stránce Kontakt se načte až po vašem kliknutí na tlačítko. Teprve pak se váš prohlížeč
            spojí s Googlem, který může zpracovat údaje o vašem zařízení a nastavit vlastní cookies podle svých
            podmínek. Do té doby se s Googlem nespojuje.
          </li>
          <li>Odkazy na WhatsApp a Google Mapy se otevřou v příslušné službě až po vašem kliknutí.</li>
          <li>Písma webu se načítají z vlastní domény, ne ze serverů Googlu.</li>
        </ul>
      </LegalSec>

      <LegalSec id="prava" n={6} title="Vaše práva">
        <p>Podle nařízení Evropského parlamentu a Rady (EU) 2016/679 (GDPR) máte právo:</p>
        <ul>
          <li>na přístup ke svým údajům (čl. 15),</li>
          <li>na opravu nepřesných údajů (čl. 16),</li>
          <li>na výmaz (čl. 17),</li>
          <li>na omezení zpracování (čl. 18),</li>
          <li>na přenositelnost údajů (čl. 20),</li>
          <li>vznést námitku proti zpracování (čl. 21),</li>
          <li>odvolat souhlas, pokud jste nějaký udělili.</li>
        </ul>
        <p>
          Práva uplatníte e-mailem na <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Odpovím bez zbytečného odkladu,
          nejpozději do jednoho měsíce.
        </p>
        <p>
          Pokud se domníváte, že s vašimi údaji nakládám v rozporu s právem, můžete podat stížnost u Úřadu pro ochranu
          osobních údajů.
        </p>
      </LegalSec>
    </LegalPage>
  );
}
