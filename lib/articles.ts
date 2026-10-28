import { DEFAULT_LOCALE, type Locale } from './i18n';
import { ARTICLES_EN } from './articles.en';
import { ARTICLES_IT } from './articles.it';

// Clanky blogu. Jedno misto pro obsah: stranka /clanky, detail /clanky/<slug>, sitemap i schema
// se skladaji odsud. Cisla a postupy jsou orientacni a pred publikaci je ma schvalit Zuzana.

export type ArticleBlock =
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][]; note?: string }
  | { t: 'callout'; title: string; text: string };

export type ArticleSection = { id: string; h: string; blocks: ArticleBlock[] };

export type Article = {
  slug: string;
  title: string;
  /** <title> a H1 jsou stejne; metaTitle jen kdyz ma byt kratsi */
  metaTitle?: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  readMinutes: number;
  image: { src: string; width: number; height: number; alt: string };
  /** odpoved na hlavni dotaz hned pod H1 (answer-first) */
  summary: string;
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
  /** slugy souvisejicich clanku */
  related: string[];
  /** interni odkaz na sluzbu/stranku v zaveru: routeId z routes.ts + text */
  cta: { title: string; accent: string; text: string; routeId: 'konzultace' | 'koupePrakticky' | 'nemovitosti'; label: string };
};

const DISCLAIMER =
  'Údaje jsou orientační, stav k říjnu 2026. Sazby a postupy se mění, proto je před podpisem vždy potvrďte s notářem a daňovým poradcem.';

export const ARTICLES: Article[] = [
  {
    slug: 'kolik-stoji-koupe-domu-v-italii',
    title: 'Kolik doopravdy stojí koupě domu v Itálii',
    description:
      'Kupní cena není konečná částka. Přehled daní, notáře, provize i ročních nákladů při koupi domu v Itálii, s příkladem výpočtu pro dům za 120 000 €.',
    category: 'Náklady',
    published: '2026-10-27',
    updated: '2026-10-27',
    readMinutes: 8,
    image: {
      src: '/media/prohlidka-vila-silvi.webp',
      width: 1920,
      height: 1080,
      alt: 'Prohlídka domu v Abruzzu před koupí',
    },
    summary:
      'K ceně z inzerátu si při koupi domu v Itálii připočtěte zhruba 8 až 15 %: registrační daň, notáře, provizi realitní kanceláře a drobné poplatky. Největší položkou bývá daň, která u rekreačního domu činí 9 % z katastrální hodnoty, ne z ceny.',
    sections: [
      {
        id: 'co-platite-navic',
        h: 'Co zaplatíte kromě kupní ceny',
        blocks: [
          {
            t: 'p',
            text: 'Cena v inzerátu je cena nemovitosti. Náklady spojené s převodem se platí zvlášť a většinu z nich vyčíslí notář až při přípravě smlouvy. Proto je dobré počítat s rezervou už při výběru.',
          },
          {
            t: 'table',
            head: ['Položka', 'Orientační výše', 'Poznámka'],
            rows: [
              ['Registrační daň (imposta di registro)', '9 % z katastrální hodnoty, minimum 1 000 €', 'U druhého domu a rekreační nemovitosti. Sazba 2 % platí jen pro hlavní bydlení (prima casa).'],
              ['Hypoteční a katastrální daň', '2 × 50 €', 'Pevné částky při koupi od soukromé osoby.'],
              ['Notář (notaio)', 'řádově tisíce eur', 'Záleží na ceně a složitosti. Notář částku vyčíslí předem.'],
              ['Provize realitní kanceláře', 'běžně kolem 3 % + DPH', 'V Itálii platí provizi obvykle obě strany. Výši si nechte potvrdit písemně.'],
              ['Technická prohlídka (geometra)', 'stovky eur', 'Ověří soulad stavu domu s katastrem a stavebními doklady. Doporučeno vždy.'],
              ['Překlady, plná moc, tlumočení', 'dle potřeby', 'Pokud nepodepisujete osobně nebo nemluvíte italsky.'],
            ],
            note: DISCLAIMER,
          },
        ],
      },
      {
        id: 'registracni-dan',
        h: 'Proč se daň počítá z katastrální hodnoty',
        blocks: [
          {
            t: 'p',
            text: 'Při koupi od soukromé osoby se registrační daň počítá z katastrální hodnoty (valore catastale), která bývá výrazně nižší než skutečná cena. Proto bývá reálná daň nižší, než by se z procent čekalo. Katastrální hodnotu najde notář v katastru a uvede ji v rozpisu nákladů.',
          },
          {
            t: 'p',
            text: 'Sazba 2 % pro hlavní bydlení je vázaná na podmínky, hlavně na trvalé bydliště v obci, kde nemovitost leží. Většina zahraničních kupujících kupuje rekreační dům, a proto platí 9 %. Pokud se do Itálie stěhujete natrvalo, ověřte nárok na nižší sazbu předem u notáře.',
          },
          {
            t: 'callout',
            title: 'Koupě od developera je jiná',
            text: 'U nového domu od stavební firmy se místo registrační daně platí DPH (IVA): 4 %, 10 % nebo 22 % podle typu nemovitosti. Pevné poplatky jsou jiné než u koupě od soukromé osoby.',
          },
        ],
      },
      {
        id: 'priklad',
        h: 'Příklad: rekreační dům za 120 000 €',
        blocks: [
          {
            t: 'p',
            text: 'Zjednodušený příklad pro dům koupený od soukromé osoby. Předpokládáme katastrální hodnotu 40 000 €, notáře za 2 500 € a provizi 3 % z ceny plus 22 % DPH. Skutečná čísla se u každé nemovitosti liší.',
          },
          {
            t: 'table',
            head: ['Položka', 'Částka'],
            rows: [
              ['Registrační daň, 9 % ze 40 000 €', '3 600 €'],
              ['Hypoteční a katastrální daň', '100 €'],
              ['Notář (předpoklad)', '2 500 €'],
              ['Provize 3 % ze 120 000 € + 22 % DPH', '4 392 €'],
              ['Geometra a drobné poplatky (předpoklad)', '700 €'],
              ['Náklady celkem', 'zhruba 11 300 €'],
            ],
            note: 'To je asi 9,4 % z ceny. Výsledek je ilustrativní, ne nabídka ani daňové poradenství.',
          },
        ],
      },
      {
        id: 'rocni-naklady',
        h: 'Roční náklady po koupi',
        blocks: [
          {
            t: 'p',
            text: 'Po koupi se platí běžný provoz. Při rozhodování o rozpočtu je dobré počítat i s nimi:',
          },
          {
            t: 'ul',
            items: [
              'IMU, místní daň z nemovitosti. U druhého domu se platí, u hlavního bydlení ne. Počítá se z katastrální hodnoty, takže bývá řádově stovky eur ročně.',
              'TARI, poplatek za odpad.',
              'Energie, voda, internet a pojištění domácnosti.',
              'Poplatky do condominio, pokud kupujete byt nebo dům ve společném objektu.',
              'Údržba a opravy. Starší domy v Abruzzu často potřebují investici do střechy, topení nebo rozvodů.',
            ],
          },
          {
            t: 'p',
            text: 'Pokud dům plánujete pronajímat, počítejte i s daní z příjmu z pronájmu a s poplatky za správu. Nastavení daní si nechte ověřit u daňového poradce.',
          },
        ],
      },
      {
        id: 'jak-snizit',
        h: 'Jak předejít nepříjemnému překvapení',
        blocks: [
          {
            t: 'ul',
            items: [
              'Před nabídkou si vyžádejte položkový rozpis všech nákladů.',
              'Zeptejte se, zda je cena v inzerátu včetně provize, nebo bez ní.',
              'Nechte ověřit katastrální soulad domu (geometra), než složíte zálohu.',
              'Počítejte s rekonstrukcí a vybavením zvlášť, ne v ceně převodu.',
              'Rozpočet si zkuste v orientační kalkulačce na stránce Praktické informace.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Kolik procent z ceny tvoří vedlejší náklady při koupi nemovitosti v Itálii?',
        a: 'Orientačně 8 až 15 % z ceny. Největší část tvoří registrační daň (u rekreačního domu 9 % z katastrální hodnoty), dále notář a provize.',
      },
      {
        q: 'Platí cizinec při koupi domu v Itálii víc než Ital?',
        a: 'Ne kvůli státní příslušnosti. Rozhoduje, zda jde o hlavní bydlení (sazba 2 %) nebo druhý dům (9 %). Většina zahraničních kupujících kupuje druhý dům.',
      },
      {
        q: 'Kdo platí notáře?',
        a: 'Zpravidla kupující. Notář odpovídá za bezpečnost převodu a před podpisem vyčíslí všechny poplatky.',
      },
      {
        q: 'Kdy se platí provize realitní kanceláři?',
        a: 'Obvykle při podpisu předsmlouvy nebo kupní smlouvy podle dohody. Podmínky provize si nechte vždy potvrdit písemně.',
      },
    ],
    related: ['domy-za-1-euro-jak-to-je-doopravdy', 'codice-fiscale-pro-cechy-a-slovaky'],
    cta: {
      title: 'Spočítejme to',
      accent: 'na vaší nemovitosti',
      text: 'Pošlete mi odkaz na dům, který vás zajímá, a ukážu vám, jaké náklady k ceně přibudou.',
      routeId: 'koupePrakticky',
      label: 'Otevřít kalkulačku nákladů',
    },
  },
  {
    slug: 'domy-za-1-euro-jak-to-je-doopravdy',
    title: 'Domy za 1 euro: jak to je doopravdy',
    description:
      'Domy za 1 euro v Itálii nejsou zadarmo. Co obce vyžadují, kolik stojí rekonstrukce, jaká jsou rizika a kdy dává smysl koupit běžnou levnou nemovitost.',
    category: 'Koupě',
    published: '2026-10-27',
    updated: '2026-10-27',
    readMinutes: 7,
    image: {
      src: '/media/lok-teramo-zahrada.webp',
      width: 1600,
      height: 1000,
      alt: 'Zahrada u kamenného domu v Abruzzu',
    },
    summary:
      'Dům za 1 euro v Itálii je opravdu možné koupit, ale za cenu 1 € se neprodává hotový dům. Obec vás zavazuje opravit ho v daném termínu, složit jistotu a zaplatit notáře i daně. Celková investice se obvykle počítá v desítkách tisíc eur.',
    sections: [
      {
        id: 'co-to-je',
        h: 'Co je to program domů za 1 euro',
        blocks: [
          {
            t: 'p',
            text: 'Několik italských obcí, většinou malé a vylidňující se vesnice, nabízí opuštěné domy za symbolické 1 €. Cíl obce není prodat nemovitost, ale přivést do vesnice nové obyvatele a rekonstruované domy. Podmínky určuje každá obec zvlášť, žádný celostátní program neexistuje.',
          },
        ],
      },
      {
        id: 'podminky',
        h: 'Co obce obvykle vyžadují',
        blocks: [
          {
            t: 'ul',
            items: [
              'Předložit projekt rekonstrukce a získat stavební povolení.',
              'Dokončit rekonstrukci v termínu, často do 1 až 3 let.',
              'Složit jistotu (bankovní nebo pojišťovací záruku), často v řádu tisíců eur. Vrací se po dokončení prací.',
              'Zaplatit notáře, daně a poplatky za převod.',
              'V některých obcích závazek, že dům nebudete rok či dva prodávat.',
            ],
          },
          {
            t: 'p',
            text: 'Konkrétní podmínky se mění. Aktuální pravidla vždy ověřte přímo u obce, než na cokoli reagujete.',
          },
        ],
      },
      {
        id: 'skutecne-naklady',
        h: 'Kolik to doopravdy stojí',
        blocks: [
          {
            t: 'table',
            head: ['Položka', 'Orientační výše'],
            rows: [
              ['Kupní cena', '1 €'],
              ['Notář, daně a poplatky', 'jednotky tisíc eur'],
              ['Projekt a technik', 'tisíce eur'],
              ['Jistota (vratná po dokončení)', 'často 2 000 až 5 000 €'],
              ['Rekonstrukce', 'desítky tisíc eur, zpravidla víc u domů v kamenném jádru'],
            ],
            note: DISCLAIMER,
          },
          {
            t: 'p',
            text: 'Domy bývají nevyužívané desítky let: střecha, statika, rozvody a okna často potřebují kompletní opravu. Cena rekonstrukce je proto zpravidla vyšší, než kolik stojí koupě menšího domu v použitelném stavu.',
          },
        ],
      },
      {
        id: 'rizika',
        h: 'Rizika, na která se nemyslí',
        blocks: [
          {
            t: 'ul',
            items: [
              'Poloha. Vesnice bývají odlehlé, bez služeb, s horším spojením a nízkým zájmem budoucích kupců nebo nájemců.',
              'Vlastnictví. Starý dům může mít více spoluvlastníků nebo nevyřešené dědictví.',
              'Termíny. Zpoždění stavby může stát jistotu.',
              'Dálková správa. Stavbu, řemeslníky a úřady řešíte z dálky a v italštině.',
              'Dostupnost. Nabídky se rychle mění a mnohé vesnice program už ukončily.',
            ],
          },
        ],
      },
      {
        id: 'pro-koho',
        h: 'Pro koho to má smysl a co jiného zvážit',
        blocks: [
          {
            t: 'p',
            text: 'Domy za 1 euro dávají smysl lidem, kteří chtějí projekt rekonstrukce, mají čas a rozpočet a vesnice je láká sama o sobě. Jako levná cesta k rekreačnímu bytu u moře nebo investici se většinou nehodí.',
          },
          {
            t: 'p',
            text: 'Pokud je cíl bydlet nebo pronajímat, často vychází líp koupit menší byt nebo dům v použitelném stavu v blízkosti pobřeží a služeb, případně nemovitost s menší rekonstrukcí. Konkrétní možnosti v Abruzzu najdete v nabídce nemovitostí a v přehledu lokalit.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Je dům za 1 euro opravdu za 1 euro?',
        a: 'Kupní cena je 1 €, ale k tomu přibývají notář, daně, projekt, jistota a hlavně rekonstrukce. Celková investice se počítá v desítkách tisíc eur.',
      },
      {
        q: 'Může domy za 1 euro koupit cizinec?',
        a: 'Obvykle ano, podmínky určuje obec. Většinou se vyžaduje italské daňové číslo (codice fiscale) a závazek rekonstrukce v termínu.',
      },
      {
        q: 'Jsou domy za 1 euro v Abruzzu?',
        a: 'Programy jsou v Itálii roztříštěné a rychle se mění. Aktuální nabídky vždy ověřte přímo u konkrétní obce.',
      },
      {
        q: 'Vyplatí se dům za 1 euro jako investice?',
        a: 'Zpravidla ne. Odlehlá poloha a vysoké náklady rekonstrukce často znamenají nižší výnos než u nemovitosti v dostupnější lokalitě.',
      },
    ],
    related: ['kolik-stoji-koupe-domu-v-italii', 'codice-fiscale-pro-cechy-a-slovaky'],
    cta: {
      title: 'Hledáte levnější',
      accent: 'nemovitost k rekonstrukci?',
      text: 'Napište mi rozpočet a záměr. Ukážu vám reálné možnosti v Abruzzu, včetně toho, kolik by stála oprava.',
      routeId: 'konzultace',
      label: 'Domluvit konzultaci',
    },
  },
  {
    slug: 'codice-fiscale-pro-cechy-a-slovaky',
    title: 'Codice fiscale: jak ho získat a proč ho při koupi potřebujete',
    metaTitle: 'Codice fiscale pro Čechy a Slováky: jak ho získat',
    description:
      'Codice fiscale je italské daňové číslo, bez kterého nekoupíte nemovitost ani nezřídíte energie. Kde a jak ho získat jako občan ČR nebo SR, co potřebujete a kolik stojí.',
    category: 'Koupě',
    published: '2026-10-27',
    updated: '2026-10-27',
    readMinutes: 5,
    image: {
      src: '/media/lok-pescara-colle.webp',
      width: 1600,
      height: 1000,
      alt: 'Pohled na Pescaru a okolní kopce v Abruzzu',
    },
    summary:
      'Codice fiscale je 16místné italské daňové číslo. Bez něj nepodepíšete kupní smlouvu, nezřídíte energie ani bankovní účet. Občané ČR a SR ho získají zdarma na finančním úřadu Agenzia delle Entrate v Itálii, případně přes italský zastupitelský úřad.',
    sections: [
      {
        id: 'co-to-je',
        h: 'K čemu codice fiscale slouží',
        blocks: [
          {
            t: 'p',
            text: 'Codice fiscale je identifikační číslo fyzické osoby pro italské úřady. Potřebujete ho při koupi nemovitosti, při převodu energií, otevření účtu, uzavření pojištění nebo zdanění příjmů z pronájmu. Notář ho vyžaduje už při přípravě smlouvy.',
          },
        ],
      },
      {
        id: 'jak-ziskat',
        h: 'Jak ho získat',
        blocks: [
          {
            t: 'ul',
            items: [
              'V Itálii na pobočce Agenzia delle Entrate. Obvykle ho dostanete na místě, často v ten samý den.',
              'Přes italský zastupitelský úřad. Pro občany ČR a SR se obracejte na Italské velvyslanectví v Praze nebo v Bratislavě; ověřte aktuální postup a lhůty.',
              'Přes zmocněnce. Požádat může i osoba, kterou k tomu zmocníte. Ověřte potřebnou formu plné moci.',
            ],
          },
          {
            t: 'p',
            text: 'Žádost se podává na formuláři pro fyzické osoby, který poskytne úřad. Kód vám vydají zdarma.',
          },
        ],
      },
      {
        id: 'co-pripravit',
        h: 'Co si připravit',
        blocks: [
          {
            t: 'ul',
            items: [
              'Platný občanský průkaz nebo cestovní pas.',
              'Vyplněný formulář žádosti.',
              'Údaje o místě a datu narození a o bydlišti.',
              'Při zastoupení plnou moc a doklad zmocněnce.',
            ],
          },
          {
            t: 'callout',
            title: 'Zařiďte ho před prohlídkami',
            text: 'Codice fiscale potřebujete nejpozději u předsmlouvy. Jeho vyřízení netrvá dlouho, ale nechte si čas, abyste ho nehledali na poslední chvíli.',
          },
        ],
      },
      {
        id: 'kontrola',
        h: 'Jak poznat, že je kód správně',
        blocks: [
          {
            t: 'p',
            text: 'Kód má 16 znaků, písmen a číslic, a vychází z jména, data narození a místa narození. Zkontrolujte, zda se shoduje jméno, příjmení i datum narození s dokladem, ať se předejde zdržení u notáře.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Potřebuji codice fiscale, abych koupil nemovitost v Itálii?',
        a: 'Ano. Notář ho potřebuje pro převod i pro daně a registraci. Bez něj nelze nemovitost koupit.',
      },
      {
        q: 'Kolik codice fiscale stojí?',
        a: 'Vydání je zdarma.',
      },
      {
        q: 'Musím do Itálie osobně?',
        a: 'Ne nutně. Můžete požádat přes italský zastupitelský úřad nebo zmocnit zástupce. Postup a potřebné doklady ověřte předem.',
      },
      {
        q: 'Je codice fiscale totéž co italské rodné číslo nebo DIČ?',
        a: 'Je to daňové identifikační číslo fyzické osoby v Itálii. Funguje podobně jako rodné číslo a DIČ pro italské úřady a banky.',
      },
    ],
    related: ['kolik-stoji-koupe-domu-v-italii', 'domy-za-1-euro-jak-to-je-doopravdy'],
    cta: {
      title: 'Nechcete řešit',
      accent: 'papíry sami?',
      text: 'Codice fiscale, notáře i dokumenty řeším s klienty běžně. Domluvme se na prvním nezávazném hovoru.',
      routeId: 'konzultace',
      label: 'Domluvit hovor',
    },
  },
];

/** preklad jednoho clanku (klic = cesky slug, ktery je zaroven id clanku) */
export type ArticleText = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  category: string;
  imageAlt: string;
  summary: string;
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
  cta: { title: string; accent: string; text: string; label: string };
};

const TRANSLATIONS: Record<Exclude<Locale, 'cs'>, Record<string, ArticleText>> = {
  en: ARTICLES_EN,
  it: ARTICLES_IT,
};

/** clanek v danem jazyce; `id` je cesky slug, `slug` je adresa v danem jazyce */
export type LocalizedArticle = Article & { id: string };

export function articleFor(locale: Locale, id: string): LocalizedArticle | undefined {
  const base = ARTICLES.find((a) => a.slug === id);
  if (!base) return undefined;
  if (locale === DEFAULT_LOCALE) return { ...base, id };
  const t = TRANSLATIONS[locale as 'en' | 'it'][id];
  if (!t) return undefined;
  return {
    ...base,
    ...t,
    id,
    image: { ...base.image, alt: t.imageAlt },
    cta: { ...base.cta, ...t.cta },
  };
}

export function listArticles(locale: Locale): LocalizedArticle[] {
  return ARTICLES.map((a) => articleFor(locale, a.slug)).filter((a): a is LocalizedArticle => Boolean(a));
}

export function articleBySlug(locale: Locale, slug: string): LocalizedArticle | undefined {
  return listArticles(locale).find((a) => a.slug === slug);
}

export function formatDate(iso: string, locale: Locale): string {
  const tag = { cs: 'cs-CZ', en: 'en-GB', it: 'it-IT' }[locale];
  return new Date(iso).toLocaleDateString(tag, { day: 'numeric', month: 'long', year: 'numeric' });
}
