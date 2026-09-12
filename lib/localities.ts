// Ctyri oblasti ze schvalene struktury webu (PROJEKT-BAJGEROVA.md 4.2).
// Texty a tvrda fakta (letiste, ceny za m2, sezonnost) dopini tyden 3-4.
// Nabidky se na lokalitni stranky parují pres locality.obec / locality.provincie z dat scraperu.

export type Locality = {
  title: string;
  lead: string;
  /** obce a provincie, ktere na tuhle stranku patri — pro filtr nabidek */
  matches: string[];
  image: {
    src: string;
    webp: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const LOCALITIES: Record<string, Locality> = {
  'pescara-a-pobrezi': {
    title: 'Pescara a pobřeží',
    lead:
      'Největší město Abruzza s letištěm, dlouhou pláží a celoroční vybaveností. ' +
      'Nejdražší část regionu a zároveň nejsnáze dostupná z Česka.',
    matches: ['Pescara', 'Montesilvano', 'Francavilla al Mare'],
    image: {
      src: '/images/localities/pescara-a-pobrezi.jpg',
      webp: '/images/localities/pescara-a-pobrezi.webp',
      alt: 'Pobřeží a přístav v Pescaře s mostem Ponte del Mare a pohořím v pozadí',
      width: 1200,
      height: 900,
    },
  },
  'costa-dei-trabocchi': {
    title: 'Costa dei Trabocchi',
    lead:
      'Jižní pobřeží provincie Chieti s rybářskými trabocchi, skalnatými zátokami ' +
      'a cyklostezkou po bývalé železnici. Klidnější a levnější než okolí Pescary.',
    matches: ['Chieti', 'Vasto', 'Marina di Vasto', 'Ortona', 'San Vito Chietino'],
    image: {
      src: '/images/localities/costa-dei-trabocchi.jpg',
      webp: '/images/localities/costa-dei-trabocchi.webp',
      alt: 'Tradiční rybářské trabocco na pobřeží Costa dei Trabocchi při západu slunce',
      width: 1200,
      height: 900,
    },
  },
  'teramo-a-sever': {
    title: 'Teramo a sever',
    lead:
      'Severní pobřeží od Silvi Marina po Alba Adriatica, v zádech národní park Gran Sasso. ' +
      'Spojení moře a hor na krátké vzdálenosti.',
    matches: ['Teramo', 'Silvi', 'Silvi Marina', 'Alba Adriatica', 'Roseto degli Abruzzi'],
    image: {
      src: '/images/localities/teramo-a-sever.jpg',
      webp: '/images/localities/teramo-a-sever.webp',
      alt: 'Panoramatický pohled z městečka Silvi na pobřeží provincie Teramo a Jaderské moře',
      width: 1200,
      height: 900,
    },
  },
  'gran-sasso-a-vnitrozemi': {
    title: 'Gran Sasso a vnitrozemí',
    lead:
      'Horské obce, kamenné domy v historických centrech a nejnižší ceny v regionu. ' +
      'Pro toho, kdo hledá autentickou Itálii, ne pláž.',
    matches: ["L'Aquila", 'Navelli', 'Calascio', 'Tollo'],
    image: {
      src: '/images/localities/gran-sasso-a-vnitrozemi.jpg',
      webp: '/images/localities/gran-sasso-a-vnitrozemi.webp',
      alt: 'Horská pevnost Rocca Calascio v národním parku Gran Sasso ve vnitrozemí Abruzza',
      width: 1200,
      height: 900,
    },
  },
};

export const LOCALITY_SLUGS = Object.keys(LOCALITIES);
