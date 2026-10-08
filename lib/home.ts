// obsah domovske stranky. drzeny zvlast, aby se copy dal upravovat bez zasahu do
// rozvrzeni (blueprint PROJEKT-BAJGEROVA.md sekce 5, layout B — stridavy zig-zag).
// texty jsou navrh ke schvaleni klientkou, ne finalni zneni. fakta o klientce
// (oceneni, cisla, hodnoceni) pochazi z PROJEKT-BAJGEROVA.md sekce 1, nevymyslet.

// ceska cislovka + tvar podstatneho jmena podle poctu (1 / 2 az 4 / 5 a vice).
// pocty v nadpisech se pocitaji z dat, aby nadpis vzdy sedel (napr. "Šest věcí", "šest otázek").
const CS_NUM = ['nula', 'jedna', 'dvě', 'tři', 'čtyři', 'pět', 'šest', 'sedm', 'osm', 'devět', 'deset'];
export const csNum = (n: number): string => CS_NUM[n] ?? String(n);
export const csPlural = (n: number, one: string, few: string, many: string): string =>
  n === 1 ? one : n >= 2 && n <= 4 ? few : many;
export const capFirst = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

export const HERO = {
  eyebrow: 'Realitní specialistka na nemovitosti v Itálii · Abruzzo',
  h1: 'Kupte dům v Itálii bez rizika a bez jazykové bariéry',
  lead:
    'Žiji v Abruzzu a provedu vás celým procesem, od výběru přes notáře až po klíče. ' +
    'Vy neřešíte nic v italštině.',
  ctaPrimary: 'Prohlédnout nabídku',
  ctaSecondary: 'Chci nezávaznou konzultaci',
};

// sekce 02 — jen cisla, zadne vety (blueprint). zdroj: PROJEKT-BAJGEROVA.md 1.
export const PROOF: { value: string; label: string }[] = [
  { value: 'TOP 10', label: 'RE/MAX ČR, 6. místo 2025' },
  { value: 'Platinum', label: 'ocenění RE/MAX' },
  { value: 'Hall of Fame', label: 'ocenění RE/MAX' },
  { value: '5,0 / 5', label: 'z 15 recenzí' },
  { value: '20 let', label: 'v Abruzzu' },
];

// sekce 03 — ctyri obavy kupujiciho (PROJEKT-BAJGEROVA.md 2). formulace v uvozovkach
// je zamerna, navstevnik ma poznat vlastni myslenku.
export const FEARS: { q: string; a: string; placeholder?: boolean }[] = [
  {
    q: '„Nerozumím jazyku ani italskému právu.“',
    a: 'Celý proces vedu v češtině. S italskou stranou jednám já a vám posílám shrnutí, kterému rozumíte.',
  },
  {
    q: '„Nevím, jaké jsou skutečné náklady navíc.“',
    a: 'Cena, kterou vidíte na internetu, je konečná. Zahrnuje cenu nemovitosti, daň z převodu, odměnu notáře i naši provizi a k tomu první rok základního servisu s mými asistentkami, které rovněž žijí na místě.',
  },
  {
    q: '„Bojím se, že mě někdo podvede na dálku.“',
    a: 'Žiji v Abruzzu, konkrétně v Montesilvanu. Každou nemovitost osobně prověřuji a celý proces nákupu probíhá pod mým dohledem. Ve spolupráci s renomovaným italským notářem důkladně kontrolujeme právní stav nemovitosti a veškerou dokumentaci. Mým cílem je, abyste přesně věděli, co kupujete, a nic vás nepříjemně nepřekvapilo.',
  },
  {
    q: '„Nevím, co bude po koupi.“',
    a: 'Registrace k daním, rekonstrukce, vybavení, správa i pronájem. Vztah nekončí u notáře.',
  },
  // dalsi dve otazky posle klientka. po doplneni smazat priznak placeholder.
  { q: '[DOPLNIT: otázka a odpověď od klientky]', a: '', placeholder: true },
  { q: '[DOPLNIT: otázka a odpověď od klientky]', a: '', placeholder: true },
];

// sekce 04 — co je a co neni v cene. pravy sloupec je dulezitejsi nez levy.
export const PRICE_IN: string[] = [
  'Vyhledání nemovitosti a organizace prohlídek',
  'Vyjednání ceny s prodávajícím',
  'Komunikace s italskou realitkou, notářem, právníkem a technikem',
  'Codice fiscale, plné moci, překlady',
  'Přepisy energií a registrace k daním',
  'Doprovod až k předání klíčů',
  'První rok základního post-servisu s mými asistentkami',
];
export const PRICE_OUT: string[] = [
  'Případná rekonstrukce a vybavení bytu',
  'Roční poplatky IMU a TARI',
];

// sekce 06 — ctyri pilire odliseni (PROJEKT-BAJGEROVA.md 2). rimske cislice dle identity.
export const PILLARS: { roman: string; title: string; text: string }[] = [
  {
    roman: 'I',
    title: 'Žiji přímo v Abruzzu',
    text: 'Nejsem makléřka na dálku. Mám vlastní ověřenou síť realitních kanceláří, notářů, právníků, geodetů a projektantů.',
  },
  {
    roman: 'II',
    title: 'Servis od A do Z',
    text: 'Vyhledání, prohlídky, vyjednávání, administrativa, plné moci, překlady i přepisy energií. Vy neděláte nic.',
  },
  {
    roman: 'III',
    title: 'Celý proces v češtině',
    text: 'Jazyk a strach z italské byrokracie jsou nejčastější důvod, proč Češi koupi v Itálii vzdají. U mě oba padají.',
  },
  {
    roman: 'IV',
    title: 'Zůstávám i po podpisu',
    text: 'Daně, rekonstrukce, vybavení, správa. Vztah nekončí u notáře, ale trvá roky.',
  },
  {
    roman: 'V',
    title: 'Spolupracuji výhradně s ověřenými partnery',
    text: 'Pracuji jen s prověřenými italskými realitními kancelářemi a přímými prodejci. Za roky v Abruzzu jsem si je pečlivě vybrala, takže se mnou máte jistotu, že nenarazíte na podvodníky.',
  },
  {
    roman: 'VI',
    title: 'Vyjednám nejlepší podmínky',
    text: 'Vyjednávání je moje nejsilnější stránka a vždy usiluji o nejlepší cenu na trhu. Dokážu přesvědčit i mrtvého.',
  },
];

// sekce 07 — proces v peti krocich. italske terminy s ceskym vysvetlenim.
export const PROCESS: { n: string; title: string; text: string }[] = [
  { n: '01', title: 'Nezávazný hovor', text: 'Řekneme si, co hledáte, jaký máte rozpočet a co je reálné.' },
  {
    n: '02',
    title: 'Výběr a prohlídky',
    text: 'Nejdřív videem, ještě než přiletíte. Osobní prohlídky pak naskládám do jednoho dne.',
  },
  { n: '03', title: 'Nabídka a cena', text: 'Podáme nabídku (proposta) a já vyjednám cenu s prodávajícím.' },
  {
    n: '04',
    title: 'Předsmlouva',
    text: 'Compromesso, kontrola dokumentů a vyřízení daňového čísla (codice fiscale).',
  },
  {
    n: '05',
    title: 'Notář a klíče',
    text: 'Notářský zápis (rogito). Na podpis nemusíte letět, dá se vyřídit na plnou moc.',
  },
];

// sekce 10 — co dela po koupi. obchodne nejcennejsi sekce, dela z prodeje vztah.
export const AFTER: { title: string; text: string }[] = [
  {
    title: 'Rekonstrukce a vybavení',
    text: 'Seženu řemeslníky, ohlídám rozpočet i termíny a posílám fotky z průběhu.',
  },
  {
    title: 'Správa nemovitosti',
    text: 'Kontroly, úklid, platby, komunikace se sousedy i se správou domu.',
  },
  { title: 'Pronájem', text: 'Krátkodobý i sezónní. Dům vám vydělává, i když v něm zrovna nejste.' },
];

// sekce 11 — nejcastejsi otazky. odpovedi jsou v HTML i zavrene (kvuli Googlu)
// a maji strukturovana data (FAQPage) — viz HomeSections.
// zdroj: realne dotazy z FB skupin, kontaktu a konzulaci s kupujicimi.
export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Musím umět italsky?',
    a: 'Ne. Celý proces vedu v češtině. S italskými realitkami, notářem i úřady jednám za vás a posílám vám srozumitelná shrnutí.',
  },
  {
    q: 'Kolik zaplatím navíc nad cenu nemovitosti?',
    a: 'Zpravidla 10 až 15 % kupní ceny: daň z převodu, odměna notáře a poplatky.',
  },
  {
    q: 'Musím do Itálie letět na podpis smlouvy?',
    a: 'Nemusíte. Předsmlouvu i notářský zápis lze vyřídit na plnou moc. Do Itálie stačí přiletět na prohlídky, které naskládám do jednoho dne.',
  },
  {
    q: 'Co je codice fiscale a jak ho získám?',
    a: 'Je to italské daňové číslo, bez kterého nelze nemovitost koupit. Vyřídím ho za vás, obvykle během několika dní.',
  },
  {
    q: 'Jak je to se správou nemovitosti, když tam nebydlím?',
    a: 'Nabízím kompletní správu: kontroly apartmánu, úklid, komunikaci se sousedy i správou domu, platby energií a daní. Dům je pod dohledem, i když jste v ČR.',
  },
  {
    q: 'Zvládnete i rekonstrukci na dálku?',
    a: 'Ano. Seženu místní řemeslníky, ohlídám rozpočet i termíny a posílám průběžné fotky z prací. Nemusíte tam být osobně.',
  },
  {
    q: 'Co jsou IMU a TARI a kolik činí?',
    a: 'IMU je roční daň z vlastnictví nemovitosti, TARI je poplatek za odpady. Výše závisí na lokalitě a velikosti, běžně se pohybuje od 500 do 2 000 € ročně. Přesný výpočet udělám před koupí.',
  },
  {
    q: 'Můžu nemovitost pronajímat a vydělávat na ní?',
    a: 'Ano. Zařídím krátkodobý i sezónní pronájem: od přípravy apartmánu přes úklid až po komunikaci s hosty. Dům vám vydělává, i když v něm zrovna nejste.',
  },
];

// sekce 12 — tri nejsilnejsi texty, rucne vybrane (ne nejnovejsi).
// href null = cilova stranka zatim neexistuje (tyden 3-4), odkaz vede na rozcestnik.
export type GuideItem = {
  kicker: string;
  title: string;
  route: 'jakKoupit' | 'clanky';
  /** kotva na cilove strance (bez #) */
  hash?: string;
  image: { src: string; alt: string; width: number; height: number };
};

export const GUIDES: GuideItem[] = [
  {
    kicker: 'Průvodce',
    title: 'Jak koupit nemovitost v Itálii, krok za krokem',
    route: 'jakKoupit',
    image: {
      src: '/media/jak-notar.webp',
      alt: 'Podpis dokumentů při koupi nemovitosti v Itálii',
      width: 576,
      height: 1000,
    },
  },
  {
    kicker: 'Náklady',
    title: 'Kolik doopravdy stojí koupě domu v Itálii',
    route: 'jakKoupit',
    hash: 'naklady',
    image: {
      src: '/media/lok-pescara-colle.webp',
      alt: 'Výhled z terasy nemovitosti na Montesilvano a moře',
      width: 1600,
      height: 1000,
    },
  },
  {
    kicker: 'Mýty',
    title: 'Domy za 1 euro: jak to je doopravdy',
    route: 'jakKoupit',
    hash: 'domy-za-1-euro',
    image: {
      src: '/images/localities/gran-sasso-a-vnitrozemi.webp',
      alt: 'Kamenná pevnost Rocca Calascio ve vnitrozemí Abruzza',
      width: 1200,
      height: 900,
    },
  },
];

// sekce 05 — rychle vybery nad sliderem. vedou na filtr vypisu /nemovitosti (parametry v URL,
// viz components/listings/ListingFilter.tsx). vybery odpovidaji tomu, co v datech skutecne je.
export const QUICK_PICKS: { label: string; q: string }[] = [
  { label: 'Vše', q: '' },
  { label: 'Pobřeží', q: 'oblast=pobrezi' },
  { label: 'Byty', q: 'typ=byt' },
  { label: 'Domy a vily', q: 'typ=dum' },
  { label: 'Do 150 000 €', q: 'cena=150000' },
];

// Sekce 4 služby — 2x2 minimalistické karty s výraznou fotografií a jasným textem
export type ServiceCardItem = {
  title: string;
  lead: string;
  image: string;
  anchor: string;
};

export const SERVICES_CARDS: ServiceCardItem[] = [
  {
    title: 'Chci koupit',
    lead: 'Provedu vás celým nákupem, prověřím smlouvy a pohlídám každý krok.',
    image: '/media/kom-notar.webp', // noví majitelé u notáře (materiál klientky)
    anchor: '#servis',
  },
  {
    title: 'Chci rekonstrukci',
    lead: 'Zajistím spolehlivé místní řemeslníky, architekta i dohled nad rozpočtem.',
    image: '/media/reno-real-1.webp', // hotová rekonstrukce (materiál klientky)
    anchor: '#rekonstrukce',
  },
  {
    title: 'Chci správu',
    // OVĚŘIT: IMU (přepis hovoru tu nebyl jednoznačný)
    lead: 'Postaráme se o energie, IMU a pravidelnou kontrolu nemovitosti s mými asistentkami, zatímco jste v Česku.',
    image: '/services/sprava.webp',
    anchor: '#sprava',
  },
  {
    title: 'Chci pronajímat',
    lead: 'Připravíme apartmán pro turisty a zajistíme provoz, úklid i stabilní výnos.',
    image: '/media/reno-real-3.webp', // garsonka pro krátkodobé pronájmy (materiál klientky)
    anchor: '#investice',
  },
];


// sekce 08 — "Proč právě Abruzzo" (nahradila "Kde v Abruzzu hledat").
// fakta jsou od klientky, nic nepridavat. kazda karta ma zastupny box na fotku.
/** fotka na karte. bez src = zastupny box s popiskem, co tam patri */
export type MediaSlot = { label: string; src?: string; alt?: string };

export type WhyCard = {
  title: string;
  text: string;
  /** 1 nebo 2 fotky na kartu. snimky jsou z materialu klientky (Google Drive, public/media) */
  photos: MediaSlot[];
};

export const WHY_ABRUZZO: WhyCard[] = [
  {
    title: 'Hory a moře zároveň',
    text: 'Ráno na sjezdovce, odpoledne na pláži. Tahle kombinace je v Evropě vzácná.',
    photos: [
      { label: 'Hory', src: '/media/why-scanno.webp', alt: 'Jezero Scanno obklopené horami ve vnitrozemí Abruzza' },
      { label: 'Moře', src: '/media/why-more.webp', alt: 'Pláž v Montesilvanu s kamennými vlnolamy' },
    ],
  },
  {
    title: 'Letiště na dosah',
    text: 'Z Krakova do Pescary se létá celoročně. Z Prahy v sezóně přímo za 1 hodinu 20 minut, v zimě s přestupem.',
    photos: [
      { label: 'Letiště Pescara', src: '/media/why-letiste.webp', alt: 'Pohled z letadla na pobřeží a přístav u Pescary' },
    ],
  },
  {
    title: 'Všechno do 15 km od letiště',
    text: 'Na letiště se dostanete trolejbusem za 1,50 až 2 eura. Taxi nepotřebujete.',
    photos: [{ label: 'Trolejbus nebo cesta z letiště k moři' }],
  },
  {
    title: 'Autem z Česka',
    text: 'Do Abruzza se dá dojet i autem. Z Česka je to zhruba 1300 km.',
    photos: [{ label: 'Silnice do Abruzza nebo auto u moře' }],
  },
  {
    title: 'Nejstabilnější počasí',
    text: 'Abruzzo leží ve středu Itálie, a proto je tu počasí nejstabilnější.',
    photos: [
      { label: 'Moře za slunečného dne', src: '/media/why-pocasi.webp', alt: 'Olivový háj a moře z terasy nemovitosti při prohlídce' },
    ],
  },
  {
    title: 'Příroda a místa',
    text: 'Costa dei Trabocchi, národní parky Gran Sasso a Majella. UNESCO: [OVĚŘIT: co přesně patří do UNESCO]. [DOPLNIT: další zajímavá místa od klientky]',
    photos: [{ label: 'Costa dei Trabocchi' }, { label: 'Národní park Gran Sasso nebo Majella' }],
  },
];

// sekce 09 — reference: videa a profily s recenzemi.
// recenze nevymyslet. dokud neni url, tlacitko ukaze znacku [DOPLNIT: odkaz na profil].
export const REVIEW_PROFILES = [
  {
    id: 'google',
    title: 'Recenze z Googlu',
    placeholder: 'Sem napojit recenze z Google profilu',
    cta: 'Všechny recenze na Googlu',
    url: '', // [DOPLNIT: odkaz na profil]
  },
  {
    id: 'firmy',
    title: 'Recenze z Firmy.cz',
    placeholder: 'Sem napojit recenze z Firmy.cz',
    cta: 'Všechny recenze na Firmy.cz',
    url: '', // [DOPLNIT: odkaz na profil]
  },
];

// sekce 09A — komunita. kazda polozka = jeden zastupny box (foto), prvni je video.
// az prijdou materialy, nahradi se box za <img>/<video>.
export type CommunityItem = {
  kind: 'foto' | 'video' | 'loop';
  label: string;
  /** fotka nebo poster videa. bez src = zastupny box */
  src?: string;
  video?: string;
  alt?: string;
};

export const COMMUNITY_MEDIA: CommunityItem[] = [
  {
    kind: 'loop',
    label: 'Velikonoční pondělí s našimi klienty',
    src: '/media/komunita-velikonoce.webp',
    video: '/media/komunita-velikonoce.mp4',
    alt: 'Video z Velikonočního pondělí s klienty v restauraci u moře',
  },
  { kind: 'foto', label: 'Společný oběd s klienty', src: '/media/kom-obed.webp', alt: 'Klienti u společného oběda v restauraci u moře' },
  { kind: 'foto', label: 'Gratulace novým majitelům u notáře', src: '/media/kom-notar.webp', alt: 'Noví majitelé s předanými klíči v notářské kanceláři' },
  {
    kind: 'loop',
    label: 'Tanec na Velikonoční pondělí',
    src: '/media/loop-velikonoce.webp',
    video: '/media/loop-velikonoce.mp4',
    alt: 'Klienti tančí na terase restaurace u moře',
  },
  {
    kind: 'loop',
    label: 'Klientka šťastná, že má nemovitost',
    src: '/media/loop-klientka-more.webp',
    video: '/media/loop-klientka-more.mp4',
    alt: 'Klientka s rozpaženýma rukama v moři',
  },
  { kind: 'foto', label: 'Výlet s klienty k jezeru Scanno', src: '/media/kom-scanno.webp', alt: 'Výlet s klientkami na vyhlídku nad jezerem Scanno' },
  { kind: 'foto', label: 'Oslava léta, Ferragosto', src: '/media/kom-ferragosto.webp', alt: 'Letní večírek na pláži v santovských čepicích' },
  { kind: 'foto', label: 'Oslava narozenin klientky', src: '/media/kom-oslava.webp', alt: 'Narozeninový dort s prskavkami na oslavě klientky' },
  { kind: 'foto', label: 'Lyžování v Apeninách' },
];

// sekce 10A — rekonstrukce na klic: tri pary pred a po + misto na Reels
export type RenoPair = {
  title: string;
  before?: { src: string; alt: string };
  after?: { src: string; alt: string };
};

export const RENO_PAIRS: RenoPair[] = [
  {
    title: 'Byt klienta z Ostravy',
    before: { src: '/media/reno-ostrava-pred.webp', alt: 'Původní kuchyň bytu před rekonstrukcí' },
    after: { src: '/media/reno-ostrava-po.webp', alt: 'Nová kuchyň s jídelním stolem po rekonstrukci' },
  },
  // dalsi pary pred a po doda klientka (stejny uhel pohledu na obou fotkach)
  { title: 'Další rekonstrukce' },
];

/** hotove realizace (snimky z videi klientky ze slozky Rekonstrukce) */
export const RENO_DONE: { src: string; alt: string; label: string }[] = [
  { src: '/media/reno-real-1.webp', alt: 'Obývací pokoj s rohovou sedačkou a světelným pásem pod stropem', label: 'Obývací pokoj' },
  { src: '/media/reno-real-2.webp', alt: 'Kuchyň s jídelním stolem v podkrovním bytě', label: 'Kuchyň a jídelna' },
  { src: '/media/reno-real-3.webp', alt: 'Ložnice v garsonce zrekonstruované pro krátkodobé pronájmy', label: 'Garsonka pro pronájem' },
  { src: '/media/reno-real-4.webp', alt: 'Ložnice s čalouněným čelem postele v podkroví', label: 'Ložnice' },
];

// sekce 10B — "Ptáte se, odpovídám". PRIDANI VIDEA = jedna polozka s src (a pripadne poster).
// bez src se vykresli zastupny box s pracovnim nazvem tematu.
export const VIDEO_ODPOVEDI: { title: string; src?: string; poster?: string }[] = [
  { title: 'Proč kupovat na investici' },
  { title: 'Kolik vynáší pronájem garsonky' },
  { title: 'Proč právě Abruzzo', src: '/media/proc-abruzzo.mp4', poster: '/media/proc-abruzzo.webp' },
];

// sekce 12A — "O mně". text a seznam oceneni dodá klientka.
export const ABOUT = {
  text: '[DOPLNIT: text od klientky o jejím přístupu k realitám a o tom, proč Itálie]',
  photo: { src: '/media/about-zuzana.webp', alt: 'Bc. Zuzana Bajgerová na terase u moře v Abruzzu', width: 1000, height: 1250 },
  awards: [
    'Nejúspěšnější makléř měsíce realitní sítě RE/MAX ČR, 1. místo (červenec 2025)',
    '6. místo v Top 10 RE/MAX ČR (2025)',
    '[DOPLNIT: kompletní seznam ocenění]',
  ],
};
