import { SERVICE_IMAGES } from './service-images';

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
  { value: '20 let', label: 'zkušeností v Abruzzu' },
];

// sekce 03 — ctyri obavy kupujiciho (PROJEKT-BAJGEROVA.md 2). formulace v uvozovkach
// je zamerna, navstevnik ma poznat vlastni myslenku.
export const FEARS: { q: string; a: string }[] = [
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
  {
    q: '„Nemůžu jezdit do Itálie na každou prohlídku.“',
    a: 'Nemusíte. Nemovitosti vám nejdřív ukážu na videu a osobní prohlídky pak naplánuji na jeden den, abyste necestovali zbytečně.',
  },
  {
    q: '„Co když bude byt potřebovat rekonstrukci?“',
    a: 'Spolupracuji s místní architektkou a ověřenými řemeslníky. Domluvím práce, pohlídám jejich průběh a pošlu vám fotky, i když jste v Česku.',
  },
];

// Sekce 04 a průvodce koupí — servis v provizi a náklady mimo nabídkovou cenu.
export const PRICE_IN: string[] = [
  'Vyhledání nemovitosti a organizace prohlídek',
  'Vyjednání ceny s prodávajícím',
  'Komunikace s italskou realitkou, notářem, právníkem a technikem',
  'Codice fiscale, plné moci, překlady',
  'Přepisy energií a registrace k daním',
  'Doprovod až k předání klíčů',
  'První rok základního servisu s mými asistentkami v Abruzzu',
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
export type AftercareItem = {
  serviceId: 'rekonstrukce' | 'sprava' | 'pronajem';
  title: string;
  text: string;
  image: string;
};

export const AFTER: AftercareItem[] = [
  {
    serviceId: 'rekonstrukce',
    title: 'Rekonstrukce a vybavení',
    text: 'S naším týmem řemeslníků zajistíme práce, ohlídám rozpočet i termíny a posílám fotky z průběhu.',
    image: SERVICE_IMAGES.rekonstrukce.src,
  },
  {
    serviceId: 'sprava',
    title: 'Správa nemovitosti',
    text: 'Kontroly, úklid, platby, komunikace se sousedy i se správou domu.',
    image: SERVICE_IMAGES.sprava.src,
  },
  {
    serviceId: 'pronajem',
    title: 'Pronájem',
    text: 'Pomohu s krátkodobým i sezónním pronájmem, od přípravy apartmánu po péči o hosty.',
    image: SERVICE_IMAGES.pronajem.src,
  },
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
    a: 'U našich nabídek je cena konečná: zahrnuje nemovitost, daň z převodu, notáře i naši provizi s prvním rokem základního servisu. Rekonstrukce, vybavení a průběžné roční náklady se řeší zvlášť.',
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
    a: 'Ano. S naší paní architektkou a místním týmem zajistíme práce, ohlídám rozpočet i termíny a posílám průběžné fotky z prací. Nemusíte tam být osobně.',
  },
  {
    q: 'Co jsou IMU a TARI a kolik činí?',
    a: 'IMU je roční daň z vlastnictví nemovitosti, TARI je poplatek za odpady. Výše závisí na lokalitě a velikosti, běžně se pohybuje od 500 do 2 000 € ročně. Přesný výpočet udělám před koupí.',
  },
  {
    q: 'Můžu nemovitost pronajímat a vydělávat na ní?',
    a: 'Ano. Zařídím krátkodobý i sezónní pronájem: od přípravy apartmánu přes úklid až po komunikaci s hosty. Výsledek závisí na nemovitosti, sezóně, obsazenosti a provozních nákladech.',
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
  { label: 'Apartmány', q: 'typ=byt' },
  { label: 'Domy a vily', q: 'typ=dum' },
  { label: 'Do 100 000 €', q: 'cena=100000' },
  { label: 'Investiční', q: 'kategorie=investicni' },
  { label: 'Luxusní', q: 'kategorie=luxusni' },
];

// Sekce 4 služby — 2x2 minimalistické karty s výraznou fotografií a jasným textem
export type ServiceCardItem = {
  title: string;
  lead: string;
  image: string;
  anchor: string;
};

// Ilustrační AI fotografie pro karty služeb; nezobrazují konkrétní klientské zakázky.
export const SERVICES_CARDS: ServiceCardItem[] = [
  {
    title: 'Chci koupit',
    lead: 'Provedu vás celým nákupem, prověřím smlouvy a pohlídám každý krok.',
    image: SERVICE_IMAGES.koupe.src,
    anchor: '#servis',
  },
  {
    title: 'Chci rekonstrukci',
    lead: 'S naší architektkou a místním týmem zajistíme rekonstrukci na klíč i vybavení.',
    image: SERVICE_IMAGES.rekonstrukce.src,
    anchor: '#rekonstrukce',
  },
  {
    title: 'Chci správu',
    lead: 'Postaráme se o energie, IMU a pravidelnou kontrolu nemovitosti s mými asistentkami, zatímco jste v Česku.',
    image: SERVICE_IMAGES.sprava.src,
    anchor: '#sprava',
  },
  {
    title: 'Chci pronajímat',
    lead: 'Připravíme apartmán pro turisty a zajistíme provoz, úklid i péči o hosty.',
    image: SERVICE_IMAGES.pronajem.src,
    anchor: '#investice',
  },
];


// sekce 08 — "Proč právě Abruzzo" (nahradila "Kde v Abruzzu hledat").
// Texty jsou od klientky; dopravni karty pouzivaji ilustračně generovane snimky.
export type MediaSlot = { label: string; src: string; alt: string };

export type WhyCard = {
  title: string;
  text: string;
  photo: string;
  photoAlt: string;
  caption: string;
  /** 1 nebo 2 fotky na kartu; dopravní fotografie jsou ilustrační. */
  photos: MediaSlot[];
};

export const WHY_ABRUZZO: WhyCard[] = [
  {
    title: 'Hory a moře zároveň',
    text: 'Ráno na sjezdovce, odpoledne na pláži. Tahle kombinace je v Evropě vzácná.',
    photo: '/media/why-hory-a-more.webp',
    photoAlt: 'Horský masiv Gran Sasso zrcadlící se v jezeře v Abruzzu',
    caption: 'Gran Sasso · hory i pobřeží na dosah',
    photos: [
      { label: 'Hory', src: '/media/why-hory-a-more.webp', alt: 'Horský masiv Gran Sasso zrcadlící se v jezeře v Abruzzu' },
      { label: 'Moře', src: '/media/why-more.webp', alt: 'Pláž v Montesilvanu s kamennými vlnolamy' },
    ],
  },
  {
    title: 'Letiště na dosah',
    text: 'Z Prahy létá Ryanair přímo do Pescary sezónně, z Krakova i v zimě. Přímý let trvá přibližně 1 h 40–50 min. V zimě můžete z Prahy cestovat také přes Milán; návaznost letů si ověřte pro konkrétní termín.',
    photo: '/media/why-letiste-pescara.webp',
    photoAlt: 'Letecký pohled na mezinárodní letiště v Pescaře a pobřeží',
    caption: 'Letiště Pescara · přímé lety z Prahy i Krakova',
    photos: [
      { label: 'Letiště Pescara', src: '/media/why-letiste-pescara.webp', alt: 'Letecký pohled na mezinárodní letiště v Pescaře a pobřeží' },
    ],
  },
  {
    title: 'Za 15 minut v Montesilvanu',
    text: 'Z letiště Pescara jste autem přibližně za 15 minut v Montesilvanu. Doba záleží na provozu a cílové adrese; cestu můžete naplánovat i veřejnou dopravou.',
    photo: '/media/why-po-priletu-mesto.webp',
    photoAlt: 'Pobřežní promenáda a pláže v Pescaře a Montesilvanu',
    caption: 'Pobřeží v Pescaře · život pár minut od letiště',
    photos: [{ label: 'Doprava od letiště', src: '/media/why-po-priletu-mesto.webp', alt: 'Pobřežní promenáda a pláže v Pescaře a Montesilvanu' }],
  },
  {
    title: 'Autem z Česka',
    text: 'Do Abruzza se dá dojet i autem. Vzdálenost i dobu cesty si naplánujte podle místa odjezdu a cílové lokality.',
    photo: '/media/why-autem-z-ceska.webp',
    photoAlt: 'Cesta autem směrem k italskému pobřeží při západu slunce',
    caption: 'Cesta autem · pohodlná trasa z ČR',
    photos: [{ label: 'Cesta autem', src: '/media/why-autem-z-ceska.webp', alt: 'Cesta autem směrem k italskému pobřeží při západu slunce' }],
  },
  {
    title: 'Přímořské klima',
    text: 'U pobřeží si užijete dlouhé teplé léto. Když zatoužíte po změně, horské oblasti Abruzza jsou na dosah.',
    photo: '/media/why-primorske-klima.webp',
    photoAlt: 'Panoramatický výhled na pobřeží Abruzza a azurové moře',
    caption: 'Pobřeží Abruzza · 300 slunečných dní v roce',
    photos: [
      { label: 'Moře za slunečného dne', src: '/media/why-primorske-klima.webp', alt: 'Panoramatický výhled na pobřeží Abruzza a azurové moře' },
    ],
  },
  {
    title: 'Příroda a místa',
    text: 'Od rybářských domků na Costa dei Trabocchi přes jezero Scanno až po hory Gran Sasso a Majella. Majella je geoparkem UNESCO.',
    photo: '/media/why-priroda-scanno.webp',
    photoAlt: 'Smaragdové jezero Scanno ve tvaru srdce v horách Abruzza',
    caption: 'Jezero Scanno · smaragdové srdce Abruzza',
    photos: [
      { label: 'Jezero Scanno', src: '/media/why-priroda-scanno.webp', alt: 'Smaragdové jezero Scanno ve tvaru srdce v horách Abruzza' },
    ],
  },
];

// sekce 09A — komunita. Fotky a krátká videa z dodaných materiálů.
export type CommunityItem = {
  kind: 'foto' | 'video' | 'loop';
  label: string;
  /** fotka nebo poster videa */
  src: string;
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
  { kind: 'loop', label: 'Dojatá klientka', src: '/media/loop-dojata-klientka.webp', video: '/media/loop-dojata-klientka.mp4', alt: 'Dojatá klientka v bytě' },
];

// sekce 10A — skutecny par pred a po, hotove realizace a video klientky
export type RenoPair = {
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export const RENO_PAIRS: RenoPair[] = [
  {
    title: 'Byt klienta z Ostravy',
    before: { src: '/media/reno-ostrava-pred.webp', alt: 'Původní kuchyň bytu před rekonstrukcí' },
    after: { src: '/media/reno-ostrava-po.webp', alt: 'Nová kuchyň s jídelním stolem po rekonstrukci' },
  },
];

/** hotove realizace (snimky z videi klientky ze slozky Rekonstrukce) */
export const RENO_DONE: { src: string; alt: string; label: string }[] = [
  { src: '/media/reno-real-1.webp', alt: 'Obývací pokoj s rohovou sedačkou a světelným pásem pod stropem', label: 'Obývací pokoj' },
  { src: '/media/reno-real-2.webp', alt: 'Kuchyň s jídelním stolem v podkrovním bytě', label: 'Kuchyň a jídelna' },
  { src: '/media/reno-real-3.webp', alt: 'Ložnice v garsonce zrekonstruované pro krátkodobé pronájmy', label: 'Garsonka pro pronájem' },
  { src: '/media/reno-real-4.webp', alt: 'Ložnice s čalouněným čelem postele v podkroví', label: 'Ložnice' },
];

// sekce 10B — výběr ze skutečných videí dodaných z Instagramu klientky.
export const INSTAGRAM_REELS: { title: string; theme: string; src: string; poster: string; image?: boolean }[] = [
  {
    title: 'Moje začátky',
    theme: 'Z mé cesty',
    src: '/media/instagram-moje-zacatky.mp4',
    poster: '/media/instagram-moje-zacatky.webp',
  },
  {
    title: 'Nahlédněte do apartmánu v Itálii',
    theme: 'Nemovitosti',
    src: '/media/instagram-byt-v-italii.mp4',
    poster: '/media/instagram-byt-v-italii.webp',
  },
  {
    title: 'Zákulisí RE/MAX Convention',
    theme: 'Z mé práce',
    src: '/media/instagram-remax-convention.mp4',
    poster: '/media/instagram-remax-convention.webp',
  },
  {
    title: 'Investujte i do sebe',
    theme: 'Život u moře',
    src: '/media/instagram-investujte-do-sebe.mp4',
    poster: '/media/instagram-investujte-do-sebe.webp',
  },
  {
    title: 'Garsonka s výhledem na moře',
    theme: 'Nemovitosti',
    src: '/media/prohlidka-garsonka.mp4',
    poster: '/media/prohlidka-garsonka.webp',
  },
  {
    title: 'Rekonstrukce na klíč',
    theme: 'Z mé práce',
    src: '/media/reno-na-klic.mp4',
    poster: '/media/reno-na-klic.webp',
  },
  {
    title: 'Proč právě Abruzzo',
    theme: 'Život v Abruzzu',
    src: '/media/proc-abruzzo.mp4',
    poster: '/media/proc-abruzzo.webp',
  },
  {
    title: 'Ocenění RE/MAX',
    theme: 'Z mé práce',
    src: '/media/omne-vyhlaseni.webp',
    poster: '/media/omne-vyhlaseni.webp',
    image: true,
  },
];

// sekce 12A — "O mně". Jen doložené údaje z podkladů klientky a projektu.
export const ABOUT = {
  text: 'V Abruzzu funguji již 20 let. Díky místním kontaktům hledám pro české klienty nemovitosti i mimo veřejné nabídky a osobně je provázím koupí v češtině. Spolupracuji s ověřenými italskými partnery a po předání klíčů pomáhám také s rekonstrukcí, správou a pronájmem.',
  photo: { src: '/media/about-zuzana.webp', alt: 'Bc. Zuzana Bajgerová na terase u moře v Abruzzu', width: 1000, height: 1250 },
  awards: [
    'Nejúspěšnější makléř měsíce realitní sítě RE/MAX ČR, 1. místo (červenec 2025)',
    '6. místo v Top 10 RE/MAX ČR (2025)',
    'Platinum · RE/MAX',
    'Hall of Fame · RE/MAX',
  ],
};
