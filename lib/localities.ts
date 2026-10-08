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
    matches: ['Pescara', 'Montesilvano', 'Francavilla al Mare', "Città Sant'Angelo", 'Citta Sant Angelo'],
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
    matches: ['Chieti', 'Vasto', 'Marina di Vasto', 'Ortona', 'San Vito Chietino', 'Lido Riccio', 'Foro'],
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
    matches: ['Teramo', 'Silvi', 'Silvi Marina', 'Alba Adriatica', 'Roseto degli Abruzzi', 'Martinsicuro', 'Colonnella'],
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
    matches: ["L'Aquila", 'Navelli', 'Calascio', 'Tollo', 'Penne', 'Ari', 'Rapino', 'Pretoro', 'Tornareccio', 'Castel Frentano'],
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

const norm = (x: string | null | undefined) => (x ?? '').toLocaleLowerCase('cs').trim();

/**
 * Do ktere ze ctyr oblasti nabidka patri. Napred podle obce (presnejsi), pak podle provincie.
 * null = mimo Abruzzo (v datech je napr. i nabidka z Ceska).
 */
export function localityOf(p: { locality?: { obec?: string | null; provincie?: string | null } | null }): string | null {
  const obec = norm(p.locality?.obec);
  const prov = norm(p.locality?.provincie);
  if (obec) {
    for (const slug of LOCALITY_SLUGS) {
      if (slug === 'costa-dei-trabocchi' && obec === 'chieti') continue; // mesto Chieti je ve vnitrozemi
      if (LOCALITIES[slug].matches.some((m) => norm(m) === obec)) return slug;
    }
  }
  const byProvince: Record<string, string> = {
    pescara: 'pescara-a-pobrezi',
    teramo: 'teramo-a-sever',
    chieti: obec === 'chieti' ? 'gran-sasso-a-vnitrozemi' : 'costa-dei-trabocchi',
    "l'aquila": 'gran-sasso-a-vnitrozemi',
  };
  return byProvince[prov] ?? null;
}

/** pobrezni oblasti (rychly vyber Pobrezi) */
export const COASTAL = ['pescara-a-pobrezi', 'teramo-a-sever', 'costa-dei-trabocchi'];
