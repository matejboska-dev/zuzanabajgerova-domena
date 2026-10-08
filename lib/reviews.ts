// recenze z Googlu (stejna data pro karusel na hlavni strance i pro podstranky).
// NEVYMYSLET, NEUPRAVOVAT citace klientu. pridani = jedna polozka.

export interface Testimonial {
  name: string;
  role?: string;
  text: string;
  avatar?: string;
  isVideo?: boolean;
  videoSrc?: string;
  poster?: string;
}

/** videoreference klientu (slozka 2_Reference_Recenze od klientky). prijmeni zkracene. */
export const VIDEO_REFS: { name: string; note: string; src: string; poster: string }[] = [
  { name: 'Petra Chelíková', note: 'Bydlení u moře', src: '/media/ref-petra.mp4', poster: '/media/ref-petra.webp' },
  { name: 'Lucie B.', note: 'Koupě v Abruzzu', src: '/media/ref-lucie.mp4', poster: '/media/ref-lucie.webp' },
  { name: 'Dominika D.', note: 'Koupě v Abruzzu', src: '/media/ref-dominika.mp4', poster: '/media/ref-dominika.webp' },
  { name: 'Irma K.', note: 'Koupě a rekonstrukce', src: '/media/ref-irma.mp4', poster: '/media/ref-irma.webp' },
  { name: 'Zuzana P.', note: 'Při prohlídce', src: '/media/ref-zuzana-povsikova.mp4', poster: '/media/ref-zuzana-povsikova.webp' },
];

// videoreference: dalsi video = jedna polozka s isVideo + videoSrc.
// polozka isVideo BEZ videoSrc se vykresli jako zastupny box.
export const TESTIMONIALS: Testimonial[] = [
  ...VIDEO_REFS.slice(0, 3).map((v) => ({
    name: v.name,
    role: 'Videoreference',
    text: '',
    isVideo: true,
    videoSrc: v.src,
    poster: v.poster,
  })),
  {
    name: 'Lenka R',
    role: 'Google recenze',
    text: '„Dokonale pochopila, co hledám, a našla mi přesně to, co jsem si vysnila. Zuzana se postarala opravdu o všechno — od výběru a prohlídek, přes samotný nákup a notáře, až po kompletní servis po podpisu smlouvy. Díky její péči jsem se celým procesem cítila provázená a v naprostém klidu."',
  },
  {
    name: 'Alfredo Spinosi',
    role: 'Google recenze',
    text: '„Velice doporučuji tuhle makléřku na region Abruzzo, spolehlivá, rozumí opravdu realitám. Kdo hledá experta na nákup nemovitosti v Itálii."',
  },
  {
    name: 'Petra Chelíková',
    role: 'Google recenze',
    text: '„Paní Zuzka nám pomohla splnit si sen. Máme nádherné bydlení u moře. Milujeme to tam. Moc děkujeme za velmi profesionální a lidský přístup. Zuzka je opravdu jednička ve svém oboru."',
  },
  {
    name: 'René Cichý',
    role: 'Google recenze',
    text: '„Přání koupit si hezký apartmán u moře v Itálii nám pomohla vyřešit paní Zuzana Bajgerová. Vybrala nám možnosti, udělali jsme prohlídku, my si vybrali a vše ostatní už paní Zuzka zařídila. Vše proběhlo hladce a my máme krásný apartmánek přímo u moře v Montesilvánu."',
  },
  {
    name: 'Tomáš Čepek',
    role: 'Google recenze',
    text: '„Spolupráce s touto makléřkou byla naprosto výjimečná. Její znalost italského trhu, spolehlivost a osobní přístup zaručují jistotu i v zahraničním prostředí. Celý proces koupě nemovitosti proběhl hladce, s maximální péčí a důrazem na detail."',
  },
  {
    name: 'Vladimír Penc',
    role: 'Google recenze',
    text: '„V červnu tohoto roku jsem na základě inzerátu a následné komunikace s paní Zuzanou Bajgerovou navštívil Montesilváno s úmyslem koupit nemovitost. Celý proces ze strany paní Zuzany proběhl naprosto profesionálně, věcně, efektivně ve všech fázích."',
  },
  {
    name: 'Jakub Štádler',
    role: 'Google recenze',
    text: '„Zuzana Bajgerová ve tří krátkých větách: Úžasná. Skvělá. Báječná."',
  },
];
