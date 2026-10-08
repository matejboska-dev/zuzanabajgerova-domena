// slovnicek pojmu pro stranku "Jak koupit v Italii". Obecne definice, zadna cisla.
export const GLOSSARY: { term: string; cz: string; def: string }[] = [
  { term: 'Proposta d’acquisto', cz: 'nabídka na koupi', def: 'Písemná nabídka kupujícího na konkrétní nemovitost za konkrétní cenu a podmínky.' },
  { term: 'Compromesso', cz: 'předsmlouva', def: 'Předběžná kupní smlouva, ve které si obě strany potvrdí podmínky prodeje a termín podpisu u notáře.' },
  { term: 'Caparra', cz: 'záloha', def: 'Záloha, která se obvykle skládá při podpisu předsmlouvy.' },
  { term: 'Rogito', cz: 'notářský zápis', def: 'Notářský zápis kupní smlouvy, kterým přechází vlastnictví nemovitosti na kupujícího.' },
  { term: 'Notaio', cz: 'notář', def: 'Právník, který převod nemovitosti sepisuje, ověřuje a dohlíží na jeho právní stránku.' },
  { term: 'Codice fiscale', cz: 'italské daňové číslo', def: 'Bez něj nelze nemovitost v Itálii koupit. Vyřídím ho za vás, obvykle během několika dní.' },
  { term: 'Procura', cz: 'plná moc', def: 'Díky ní může za vás podepsat zmocněnec, takže na podpis nemusíte do Itálie.' },
  { term: 'Catasto', cz: 'katastr nemovitostí', def: 'Evidence nemovitostí a jejich parametrů. Podle ní se ověřuje, že skutečnost odpovídá dokumentům.' },
  { term: 'Geometra', cz: 'geodet a technik', def: 'Technik, který ověřuje stav nemovitosti vůči katastru a stavebním plánům.' },
  { term: 'IMU', cz: 'daň z nemovitosti', def: 'Roční daň z vlastnictví nemovitosti.' },
  { term: 'TARI', cz: 'poplatek za odpady', def: 'Roční poplatek za svoz odpadu.' },
  { term: 'APE', cz: 'energetický štítek', def: 'Dokument o energetické náročnosti nemovitosti.' },
  { term: 'Condominio', cz: 'společenství vlastníků', def: 'Společenství vlastníků v domě, které spravuje společné části budovy.' },
];

// 8 kroku koupe, shodne s procesem na hlavni strane (ProcessSection)
export const BUY_STEPS: { title: string; text: string }[] = [
  { title: 'Nezávazná konzultace', text: 'Řekneme si, co hledáte, jaký máte rozpočet a co je reálné. První konzultace je zdarma a nezávazná.' },
  { title: 'Výběr nemovitostí', text: 'Hledám v celé nabídce regionu včetně neveřejných nabídek ověřených kanceláří. Prohlídky začínáme videem, ještě než přiletíte.' },
  { title: 'Rezervace a příprava', text: 'Po potvrzení termínu příjezdu sestavím harmonogram prohlídek. Rezervační záloha 200 € se plně odečítá z naší konečné provize.' },
  { title: 'Prohlídky', text: 'Osobně s tlumočením do češtiny, nebo živě přes video. Osobní prohlídky naskládám do jednoho dne.' },
  { title: 'Nabídka a vyjednání', text: 'Podáme nabídku (proposta) a já vyjednám cenu a podmínky s prodávajícím.' },
  { title: 'Prověření a předsmlouva', text: 'Kontrola dokumentů s notářem, geodety a právníky, vyřízení codice fiscale a předsmlouva (compromesso).' },
  { title: 'Notář a klíče', text: 'Notářský zápis (rogito), osobně nebo na plnou moc. Pak předání klíčů.' },
  { title: 'Servis po koupi', text: 'Přepisy energií, internet, pojištění, kontroly přes naše asistentky, a když chcete, rekonstrukce, správa i pronájem.' },
];

export const MISTAKES: { title: string; text: string }[] = [
  { title: 'Kupují jen podle fotek', text: 'Fotky ukážou to nejlepší. Nechte si nemovitost ukázat živě přes video nebo osobně a ptejte se na stav domu, okolí i sousedy.' },
  { title: 'Neprověří právní stav', text: 'Skryté vady a právní břemena se v inzerátu nepíšou. Vlastnictví, katastr i soulad se stavebními plány je třeba ověřit dřív, než cokoli podepíšete.' },
  { title: 'Spoléhají na právníka prodávajícího', text: 'Dokumenty má kontrolovat váš notář a právník, ne ten, kterého si vybral prodávající.' },
  { title: 'Nepočítají s provozem', text: 'Kromě ceny nemovitosti jsou tu každoroční IMU a TARI a případná rekonstrukce a vybavení. Počítejte s nimi předem.' },
  { title: 'Podcení rekonstrukci na dálku', text: 'Bez dohledu na místě se rozpočet i termíny snadno rozjedou. Potřebujete někoho, kdo je na místě a hlídá je za vás.' },
  { title: 'Pronájem řeší až po koupi', text: 'Pokud chcete nemovitost pronajímat, rozhodněte o tom předem. Ovlivní to výběr lokality, vybavení i provoz.' },
  { title: 'Podepíšou smlouvu, které nerozumí', text: 'Smlouvy jsou italsky. Nechte si je přeložit a vysvětlit dřív, než je podepíšete.' },
];
