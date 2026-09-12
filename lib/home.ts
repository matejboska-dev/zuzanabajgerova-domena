// obsah domovske stranky. drzeny zvlast, aby se copy dal upravovat bez zasahu do
// rozvrzeni (blueprint PROJEKT-BAJGEROVA.md sekce 5, layout B — stridavy zig-zag).
// texty jsou navrh ke schvaleni klientkou, ne finalni zneni. fakta o klientce
// (oceneni, cisla, hodnoceni) pochazi z PROJEKT-BAJGEROVA.md sekce 1, nevymyslet.

export const HERO = {
  eyebrow: 'Realitní specialistka na nemovitosti v Itálii · Abruzzo',
  h1: 'Kupte dům v Itálii bez rizika a bez jazykové bariéry',
  lead:
    'Žiji v Abruzzu a provedu Vás celým procesem, od výběru přes notáře až po klíče. ' +
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
  { value: '20+ let', label: 'v realitách' },
];

// sekce 03 — ctyri obavy kupujiciho (PROJEKT-BAJGEROVA.md 2). formulace v uvozovkach
// je zamerna, navstevnik ma poznat vlastni myslenku.
export const FEARS: { q: string; a: string }[] = [
  {
    q: '„Nerozumím jazyku ani italskému právu.“',
    a: 'Celý proces vedu v češtině. S italskou stranou jednám já a Vám posílám shrnutí, kterému rozumíte.',
  },
  {
    q: '„Nevím, jaké jsou skutečné náklady navíc.“',
    a: 'Rozpis na euro přesně dostanete dřív, než cokoli podepíšete. Počítejte s 10 až 15 % nad kupní cenu.',
  },
  {
    q: '„Bojím se, že mě někdo podvede na dálku.“',
    a: 'Žiji v Abruzzu. Každou nemovitost si projdu osobně a dokumenty kontroluje můj právník, ne prodávající.',
  },
  {
    q: '„Nevím, co bude po koupi.“',
    a: 'Registrace k daním, rekonstrukce, vybavení, správa i pronájem. Vztah nekončí u notáře.',
  },
];

// sekce 04 — co je a co neni v cene. pravy sloupec je dulezitejsi nez levy.
export const PRICE_IN: string[] = [
  'Vyhledání nemovitosti a organizace prohlídek',
  'Vyjednání ceny s prodávajícím',
  'Komunikace s italskou realitkou, notářem, právníkem a technikem',
  'Codice fiscale, plné moci, překlady',
  'Přepisy energií a registrace k daním',
  'Doprovod až k předání klíčů',
];
export const PRICE_OUT: string[] = [
  'Daň z převodu nemovitosti',
  'Odměna notáře',
  'Případná rekonstrukce a vybavení',
  'Provozní náklady, tedy IMU a TARI',
];

// sekce 06 — ctyri pilire odliseni (PROJEKT-BAJGEROVA.md 2). rimske cislice dle identity.
export const PILLARS: { roman: string; title: string; text: string }[] = [
  {
    roman: 'I',
    title: 'Žiji přímo v Abruzzu',
    text: 'Nejsem makléřka na dálku. Mám vlastní ověřenou síť realitních kanceláří, notářů, právníků a techniků přímo v regionu.',
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
  { title: 'Pronájem', text: 'Krátkodobý i sezónní. Dům Vám vydělává, i když v něm zrovna nejste.' },
];

// sekce 11 — nejcastejsi otazky. odpovedi jsou v HTML i zavrene (kvuli Googlu)
// a maji strukturovana data (FAQPage) — viz HomeSections.
// zdroj: realne dotazy z FB skupin, kontaktu a konzulaci s kupujicimi.
export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Musím umět italsky?',
    a: 'Ne. Celý proces vedu v češtině. S italskými realitkami, notářem i úřady jednám za Vás a posílám Vám srozumitelná shrnutí.',
  },
  {
    q: 'Kolik zaplatím navíc nad cenu nemovitosti?',
    a: 'Zpravidla 10 až 15 % kupní ceny: daň z převodu, odměna notáře a poplatky. Přesný rozpis dostanete předem, ještě než cokoli podepíšete.',
  },
  {
    q: 'Musím do Itálie letět na podpis smlouvy?',
    a: 'Nemusíte. Předsmlouvu i notářský zápis lze vyřídit na plnou moc. Do Itálie stačí přiletět na prohlídky, které naskládám do jednoho dne.',
  },
  {
    q: 'Co je codice fiscale a jak ho získám?',
    a: 'Je to italské daňové číslo, bez kterého nelze nemovitost koupit. Vyřídím ho za Vás, obvykle během několika dní.',
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
    a: 'IMU je roční daň z vlastnictví nemovitosti, TARI je poplatek za odpady. Výše závisí na lokalitě a velikosti — běžně se pohybuje od 500 do 2 000 € ročně. Přesný výpočet udělám před koupí.',
  },
  {
    q: 'Můžu nemovitost pronajímat a vydělávat na ní?',
    a: 'Ano. Zařídím krátkodobý i sezónní pronájem — od přípravy apartmánu přes úklid až po komunikaci s hosty. Dům Vám vydělává, i když v něm zrovna nejste.',
  },
];

// sekce 12 — tri nejsilnejsi texty, rucne vybrane (ne nejnovejsi).
// href null = cilova stranka zatim neexistuje (tyden 3-4), odkaz vede na rozcestnik.
export type GuideItem = {
  kicker: string;
  title: string;
  route: 'jakKoupit' | 'clanky';
  image: { src: string; alt: string; width: number; height: number };
};

export const GUIDES: GuideItem[] = [
  {
    kicker: 'Průvodce',
    title: 'Jak koupit nemovitost v Itálii, krok za krokem',
    route: 'jakKoupit',
    image: {
      src: 'https://images.unsplash.com/photo-1782070308261-15cb7a4720ee?auto=format&fit=crop&w=1200&q=85',
      alt: 'Toskánská kamenná usedlost na zvlněných kopcích mezi cypřiši — koupě nemovitosti v Itálii krok za krokem',
      width: 1200,
      height: 800,
    },
  },
  {
    kicker: 'Náklady',
    title: 'Kolik doopravdy stojí koupě domu v Itálii',
    route: 'clanky',
    image: {
      src: 'https://images.unsplash.com/photo-1771003602095-d0b13844049d?auto=format&fit=crop&w=1200&q=85',
      alt: 'Rezidenční italská vila s bazénem a terasou mezi vinicemi — přehled skutečných nákladů na koupi domu v Itálii',
      width: 1200,
      height: 800,
    },
  },
  {
    kicker: 'Mýty',
    title: 'Domy za 1 euro: jak to je doopravdy',
    route: 'clanky',
    image: {
      src: 'https://images.unsplash.com/photo-1757062835742-8d73adf467a4?auto=format&fit=crop&w=1200&q=85',
      alt: 'Historické kamenné domy v uličce sicilského městečka — realita projektů domů za 1 euro v Itálii',
      width: 1200,
      height: 800,
    },
  },
];

// sekce 05 — rychle vybery nad sliderem. vedou na /nemovitosti (filtr na vypisu
// zatim neni implementovany — TODO tyden 3-4).
export const QUICK_PICKS: string[] = [
  'Vše',
  'U moře',
  'Do 150 000 €',
  'K rekonstrukci',
  'Novostavby',
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
    lead: 'Provedu Vás celým nákupem, prověřím smlouvy a pohlídám každý krok.',
    image: '/services/koupit.jpg',
    anchor: '#servis',
  },
  {
    title: 'Chci rekonstrukci',
    lead: 'Zajistím spolehlivé místní řemeslníky, architekta i dohled nad rozpočtem.',
    image: '/services/rekonstrukce.jpg',
    anchor: '#rekonstrukce',
  },
  {
    title: 'Chci správu',
    lead: 'Postarám se o energie, místní daně i pravidelnou kontrolu, když jste v ČR.',
    image: '/services/sprava.jpg',
    anchor: '#sprava',
  },
  {
    title: 'Chci pronajímat',
    lead: 'Připravím apartmán pro turisty a zajistím provoz, úklid i stabilní výnos.',
    image: '/services/pronajem.jpg',
    anchor: '#investice',
  },
];

