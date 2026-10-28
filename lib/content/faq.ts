// FAQ pro podstranky. Texty z hlavni strany (lib/home.ts FAQ) se berou odtamtud, aby byl jeden zdroj.
// Nove odpovedi vychazeji jen z faktu klientky. Zadna procenta ani nepravdive sliby.

import { FAQ } from '@/lib/home';

type Item = { q: string; a: string };

const fromHome = (q: string): Item => {
  const hit = FAQ.find((f) => f.q === q);
  if (!hit) throw new Error(`FAQ na hlavni strane nema otazku: ${q}`);
  return hit;
};

const PRICE_ANSWER =
  'Cena, kterou vidíte na internetu, je konečná. Zahrnuje cenu nemovitosti, daň z převodu, odměnu notáře i naši provizi a k tomu první rok základního servisu s mými asistentkami, které rovněž žijí na místě. V ceně není jen případná rekonstrukce a vybavení bytu a každoroční poplatky IMU a TARI.';

const SCAM_ANSWER =
  'Žiji v Abruzzu, konkrétně v Montesilvanu. Každou nemovitost osobně prověřuji a celý proces nákupu probíhá pod mým dohledem. Ve spolupráci s renomovaným italským notářem důkladně kontrolujeme právní stav nemovitosti a veškerou dokumentaci. Mým cílem je, abyste přesně věděli, co kupujete, a nic vás nepříjemně nepřekvapilo.';

const NO_FLY = fromHome('Musím do Itálie letět na podpis smlouvy?');
const NO_ITALIAN = fromHome('Musím umět italsky?');

export const KONTAKT_FAQ: Item[] = [
  { q: 'Platí se konzultace?', a: 'Ne. První konzultace je zcela zdarma a k ničemu vás nezavazuje.' },
  {
    q: 'Musím kvůli konzultaci někam jet nebo letět?',
    a: 'Ne. Nejprve si zavoláme nebo se spojíme online. Do Itálie stačí přiletět až na prohlídky, které naskládám do jednoho dne. Nemusíte letět ani na podpis, ten lze vyřídit na plnou moc.',
  },
  {
    q: 'Jak rychle se mi ozvete?',
    a: 'Ozvu se vám osobně. Nejrychleji mě zastihnete přes WhatsApp.',
  },
  { ...NO_ITALIAN, q: 'V jakém jazyce spolupráce probíhá?' },
  {
    q: 'Co když se vám nedovolám?',
    a: 'Pokud máte vážný zájem a nedovoláte se mi, zavolejte klidně znovu nebo mi napište na WhatsApp. Kvůli vysokému zájmu občas zrovna telefonuji.',
  },
  {
    q: 'Co mám před hovorem připravit?',
    a: 'Nic. Stačí zhruba vědět, jestli hledáte rekreaci, investici nebo trvalé bydlení, a mít představu o rozpočtu.',
  },
];

export const KONZULTACE_FAQ: Item[] = [
  { q: 'Platí se konzultace?', a: 'Ne. První konzultace je zcela zdarma a 100% nezávazná. Nic neplatíte a k ničemu se nezavazujete.' },
  {
    q: 'Jak dlouho hovor trvá?',
    a: 'Zhruba dvacet minut. Za tu dobu budete vědět, jestli je koupě v Itálii pro vás reálná, kolik by přibližně stála a co všechno bych za vás vyřídila.',
  },
  {
    q: 'Musím mít jasno, co chci koupit?',
    a: 'Ne. Právě proto je tu hovor. Řekneme si, co hledáte, jaký máte rozpočet a co je reálné.',
  },
  {
    q: 'Musím kvůli hovoru někam letět?',
    a: 'Ne. Nejprve si zavoláme nebo se spojíme online. Do Itálie stačí přiletět až na prohlídky, které naskládám do jednoho dne.',
  },
  {
    q: 'Jak si domluvíme čas hovoru?',
    a: 'Napište mi přes formulář, e-mailem nebo na WhatsApp. Ozvu se vám osobně a společně najdeme čas, který nám bude vyhovovat.',
  },
];

export const SLUZBY_FAQ: Item[] = [
  {
    q: 'Co všechno zahrnuje servis od A do Z?',
    a: 'Vyhledání nemovitosti a organizaci prohlídek, vyjednání ceny, kontrolu dokumentů, codice fiscale, plné moci, překlady, přepisy energií a registrace k daním. Doprovodím vás až k předání klíčů. Po koupi pomáhám s rekonstrukcí, vybavením, správou i pronájmem.',
  },
  { q: 'Co je v ceně a co v ní není?', a: PRICE_ANSWER },
  NO_ITALIAN,
  fromHome('Zvládnete i rekonstrukci na dálku?'),
  fromHome('Jak je to se správou nemovitosti, když tam nebydlím?'),
  fromHome('Můžu nemovitost pronajímat a vydělávat na ní?'),
];

export const JAK_KOUPIT_FAQ: Item[] = [
  NO_ITALIAN,
  { q: 'Kolik zaplatím navíc nad cenu nemovitosti?', a: PRICE_ANSWER },
  NO_FLY,
  fromHome('Co je codice fiscale a jak ho získám?'),
  { q: 'Jak poznám, že mě v Itálii nikdo nepodvede?', a: SCAM_ANSWER },
  fromHome('Co jsou IMU a TARI a kolik činí?'),
  {
    q: 'Jak se do Abruzza dostanu?',
    a: 'Letecky se dostanete do Pescary, kde je letiště blízko pobřeží. Přímé linky a časy se mění podle sezóny, proto si před cestou ověřte konkrétní spoj. Při cestě autem záleží na vašem výchozím místě a cíli. S plánováním návštěvy vám pomůžu.',
  },
  {
    q: 'Co se děje po koupi?',
    a: 'Registrace k daním, přepisy energií, rekonstrukce, vybavení, správa i pronájem. Vztah nekončí u notáře.',
  },
];
