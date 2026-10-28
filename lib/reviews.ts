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

export interface FirmyReview {
  id: string;
  author: string;
  initials: string;
  bankIdVerified?: boolean;
  role?: string;
  rating: number;
  date: string;
  text: string;
  reply?: string;
  photos?: string[];
  likes?: number;
}

export const FIRMY_SUMMARY = {
  rating: '5,0',
  label: 'Fantastické',
  count: 15,
  date: '10. 7. 2026',
  url: 'https://www.firmy.cz/detail/13787177-reality-bc-zuzana-bajgerova-havirov-podlesi.html',
  summaryText:
    'Z recenzí vyplývá, že spolupráce s touto realitní makléřkou je vysoce profesionální a efektivní. Klienti oceňují její znalost místního trhu, komplexní servis a osobní přístup.',
};

export const FIRMY_REVIEWS: FirmyReview[] = [
  {
    id: 'firmy-1',
    author: 'Luděk Vlk',
    initials: 'LV',
    bankIdVerified: true,
    rating: 5,
    date: '24. června 2026',
    text: 'Za mě můžu Zuzanu jen doporučit. Při koupi nemovitosti v Silvi Marina nám pomohla úplně se vším od začátku až do konce. Nejdříve s námi prošla jednotlivé lokality, vysvětlila výhody i nevýhody oblastí a pomohla vybrat náš apartmán.\n\nVelmi oceňuji, že Zuzana v Itálii skutečně žije X let a zná místní prostředí, úřady i způsob, jak tam věci fungují. Díky tomu jsme měli po celou dobu pocit, že se máme na koho obrátit a že vše probíhá správně.\n\nPlus je, že nám zařídila veškeré náležitosti spojené s převodem nemovitosti, pomohla s přepisem energií, plynu, elektřiny, vyřízením condominia a další administrativou, která by pro člověka bez znalosti italštiny byla velmi složitá.\n\nDalší výhoda co se mi líbí je, že je u Zuzany možnost sehnání řemeslníků, správce, či budoucí pronájem a běžné věci jako daňové přiznání, různé pochůzky po úřadech když budou potřeba. Zatím jsme sice ještě nevyužili, ale jsem rád že na to nebudeme sami.\n\nPokud někdo uvažuje o koupi nemovitosti v Itálii, tak doporučuji kontaktovat Zuzanu. Jsme moc rádi, že jsme si pro tento krok vybrali právě ji. 👍🏻',
    reply: 'Moc děkuji za milá slova 🙂',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_qC_A/kQMlcCt5zmC5zFHKShHBdyKf/5f21.mpo?fl=res,600,600,3',
      'https://d34-a.sdn.cz/d_34/c_img_qC_A/kQMlcCt5zmEA35RKVVHBd2FD/10ea.jpeg?fl=res,600,600,3',
      'https://d34-a.sdn.cz/d_34/c_img_qC_A/nO2CysqjGrDPliFQgRHBd2Fk/c9fe.jpeg?fl=res,600,600,3',
    ],
    likes: 1,
  },
  {
    id: 'firmy-2',
    author: 'Libor Masopust',
    initials: 'LM',
    bankIdVerified: false,
    rating: 5,
    date: '12. března 2026',
    text: 'Rád bych doporučil skutečného profesionála na nemovitosti v Itálii, konkrétně v regionu Abruzzo. S paní Zuzanou Bajgerovou jsem již koupil několik nemovitostí a vždy vše proběhlo naprosto profesionálně.\n\nVelkou výhodou je, že Zuzana působí přímo v Itálii a zajišťuje kompletní servis…',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_p9_A/kcHp2YdDtBwNESEKYGCbYCh/3792.jpeg?fl=res,600,600,3',
    ],
    likes: 1,
  },
  {
    id: 'firmy-3',
    author: 'Tsutsekovanenka 2',
    initials: 'T2',
    bankIdVerified: false,
    role: 'Kolegyně z realitního oboru',
    rating: 5,
    date: '25. června 2026',
    text: 'Se Zuzanou spolupracuji už delší dobu a jako kolegyně z oboru mohu říct, že je jednou z nejprofesionálnějších realitních makléřek, které znám.\n\nVelkou výhodou je, že přímo žije v Abruzzu, dokonale zná místní trh a má kolem sebe vybudovaný spolehlivý tým lidí. Dokáže klientům zajistit…',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_qC_A/nO2CysqjGrCe62NP3QHB0Hqi/632d.jpeg?fl=res,600,600,3',
    ],
    likes: 1,
  },
  {
    id: 'firmy-4',
    author: 'Tomáš Cepek',
    initials: 'TC',
    bankIdVerified: true,
    rating: 5,
    date: '9. října 2025',
    text: 'Spolupráce s touto makléřkou byla naprosto výjimečná. Její znalost italského trhu, spolehlivost a osobní přístup zaručují jistotu i v zahraničním prostředí. Celý proces koupě nemovitosti proběhl hladce, s maximální péčí a důrazem na detail. Velice doporučuji.',
    likes: 1,
  },
  {
    id: 'firmy-5',
    author: 'Skachova Marketa',
    initials: 'SM',
    bankIdVerified: false,
    rating: 5,
    date: '3. července 2026',
    text: 'Se Zuzanou Bajgerovou jsme spolupracovali při koupi nemovitosti v Itálii. Oceňuji především její znalost místního prostředí a skutečnost, že žije přímo v Itálii, takže dokáže poradit i s praktickými záležitostmi, které s koupí nemovitosti souvisejí. Velkou výhodou je také její tým…',
    reply: 'Moc děkuji Market 🌹',
    likes: 0,
  },
  {
    id: 'firmy-6',
    author: 'Petra Chelíková',
    initials: 'PC',
    bankIdVerified: false,
    rating: 5,
    date: '4. listopadu 2025',
    text: 'Paní Zuzka nám pomohla splnit si sen. 💯 Máme nádherné bydlení u moře. Milujeme to tam ❤️ Zuzka je velká profesionálka a špička ve svém oboru 💯 Moc děkujeme ❤️ a doporučujeme….',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_of_A/kPSgqAbxVYCL2HIBInEzmQo9/23d4.mpo?fl=rot,270,0%7Cres,600,600,3',
      'https://d34-a.sdn.cz/d_34/c_img_of_A/kPSgqAbxVYDxpu4BHkEzmTF1/3d33.mpo?fl=rot,270,0%7Cres,600,600,3',
    ],
    likes: 1,
  },
  {
    id: 'firmy-7',
    author: 'René Cichy',
    initials: 'RC',
    bankIdVerified: false,
    rating: 5,
    date: '2. listopadu 2025',
    text: '„Velké díky za skvělou spolupráci při koupi apartmánu v Itálii 🇮🇹✨ Vše probíhalo hladce, profesionálně a s úsměvem. Sen se stal skutečností!“',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_of_A/nO1Ur3YPjBBN9bPB0OEynQJk/ec11.jpeg?fl=res,600,600,3',
    ],
    likes: 1,
  },
  {
    id: 'firmy-8',
    author: 'Michaela Koktová',
    initials: 'MK',
    bankIdVerified: false,
    rating: 5,
    date: '15. září 2025',
    text: 'Koupit nemovitost v Itálii není jen tak. S nákupem mi pomohla Zuzana Bajgerová. Zajistila nejen prohlídky, ale i veškerou dokumentaci, překlady, notáře. Podpisem kupní smlouvy ale servis nekončí. Zařídila přepis energií, internet, máme vlastního Fantozziho (účetního), který zařizuje…',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_od_A/nPXN5fAIwLBcsvaBgHEWhoj3/ab6e.jpeg?fl=res,600,600,3',
      'https://d34-a.sdn.cz/d_34/c_img_od_A/nPXN5fAIwLCD5MPBfEEWhokM/6385.jpeg?fl=res,600,600,3',
    ],
    likes: 2,
  },
  {
    id: 'firmy-9',
    author: 'Lenka Romanová',
    initials: 'LR',
    bankIdVerified: false,
    rating: 5,
    date: '16. září 2025',
    text: 'Měla jsem to obrovské štěstí poznat se se skvělou realitní makléřkou Zuzanou, která mi pomohla splnit můj velký sen – pořídit si byt u moře v Montesilvanu v Itálii. Od prvního kontaktu byla neuvěřitelně profesionální, milá a ochotná. Dokonale pochopila, co hledám, našla mi přesně to, co jsem si vysnila…',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_od_A/nPXN5fAIwLDn4JsBqfEW3z1f/3048.jpeg?fl=res,600,600,3',
    ],
    likes: 1,
  },
  {
    id: 'firmy-10',
    author: 'Dominik Novák',
    initials: 'DN',
    bankIdVerified: false,
    rating: 5,
    date: '12. září 2025',
    text: 'Pokud zvažujete koupi bytu v regionu Abruzzo, tak Zuzana je ta, kterou hledáte. Komunikace s ní je naprosto nadstandardní, se vším pomůže a poradí, a nic není problém. Na termín naší návštěvy připravila prohlídku několika bytů, v dohodnuté cenové relaci. Ke každému bytu nám vše vysvětlila…',
    photos: [
      'https://d34-a.sdn.cz/d_34/c_img_od_A/kOy0N9usHcDoCA1iNEUjQVZ/a229.jpeg?fl=res,600,600,3',
    ],
    likes: 1,
  },
  {
    id: 'firmy-11',
    author: 'Lucie Pejčochová',
    initials: 'LP',
    bankIdVerified: false,
    rating: 5,
    date: '28. října 2025',
    text: 'Paní Zuzana Bajgerová je nejlepší agent.\nKupovali jsme byt v Italii ted na podzim a profesionalita, lidskost a pomoc při nákupu nemovitosti byla obrovská. Paní Zuzana nás trpělivě provázela celou dobu a to už od prvního telefonátu. Celkový prodej a následný postprodej je neuvěřitelný…',
    likes: 1,
  },
  {
    id: 'firmy-12',
    author: 'Vladimír Penc',
    initials: 'VP',
    bankIdVerified: false,
    rating: 5,
    date: '28. října 2025',
    text: 'V červnu tohoto roku jsem na základě inzerátu a následné komunikace s paní Zuzanou Bajgerovou navštívil Montesilváno s úmyslem koupit nemovitost. Celý proces ze strany paní Zuzany proběhl naprosto profesionálně, věcně, efektivně a komplexně ve všech fázích. I následný servis při sjednávání…',
    likes: 1,
  },
  {
    id: 'firmy-13',
    author: 'Dětské středisko Chabry',
    initials: 'DSC',
    bankIdVerified: false,
    rating: 5,
    date: '17. září 2025',
    text: 'Zuzana Bajgerová ve 3 krátkých větách? Úžasná. Skvělá. Báječná!',
    likes: 1,
  },
  {
    id: 'firmy-14',
    author: 'Jaroslav Fiala',
    initials: 'JF',
    bankIdVerified: false,
    rating: 4.5,
    date: '3. listopadu 2025',
    text: 'V krátkosti popíšu, jak s pomoci paní Zuzany Bajgerové nákup nemovitosti v Itálii probíhal. Každý si po přečtení udělá závěr sám.\n16.4. jsem oslovil paní Zuzanu s požadavkem na velikost, cenu a místo apartmánu (bytu) v Itálii.\n18.4. mi paní Zuzana poslala odkaz asi na deset apartmánů…',
    likes: 1,
  },
  {
    id: 'firmy-15',
    author: 'Alessandro Sfamurri',
    initials: 'AS',
    bankIdVerified: false,
    rating: 5,
    date: '5. září 2025',
    text: 'Zuzana je ve svete realit naprosty profesional ,vstricna, lidska, zajisti kompletni servis od A do Z velice doporucuji tuto maklerku pro region Abruzzo',
    likes: 1,
  },
];

// Vsech 14 recenzi z profilu Google (Mapy Google), v poradi "nejrelevantnejsi", stav k 26. 10. 2026.
// Texty jsou prepsane beze zmen (jen doplnene mezery za teckami). Pridani nove = jedna polozka.
export const GOOGLE_SUMMARY = {
  rating: '5,0',
  count: 14,
  url: 'https://www.google.com/maps/place/Bc.+Zuzana+Bajgerov%C3%A1/data=!4m8!3m7!1s0x881fff37c36dc9c9:0x9286a87c8ddb0f53!8m2!3d43.2727092!4d12.7429781!9m1!1b1!16s%2Fg%2F11m5tw4h75',
};

export interface GoogleReview {
  author: string;
  text: string;
  /** recenze psana v jinem jazyce, text je preklad Googlu */
  translatedFrom?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'Lucie Pejčochová',
    text: 'Se službami pani Zuzany Bajgerové jsme byli spokojeni od A do Z. Ocenili jsme nejen její velkou profesionalitu a vstřícnost během koupě samotné, ale také celý proces “postprodeje”. Celý proces s energiemi i dalšími administrativními kroky mohl být v Itálii bez jazykové výbavy “italskou vesnicí”, ale paní Zuzana a její skvělý tým nás nikdy nenechali na holičkách. Vše se zařídilo s lehkostí a úsměvem!',
  },
  {
    author: 'viktor',
    text: 'Zuzanka říká věci na rovinu a nic neskrývá, což velmi oceňuji. Vždy vše srozumitelně vysvětlí a doporučí nejlepší další postup. Její přístup je profesionální a zároveň lidský – působí klidně, rozvážně a s trpělivostí. I když má hodně práce, dokáže si najít čas a věnovat se naplno. Je znát, že má bohaté zkušenosti a ví přesně, co dělá. Díky tomu působí velmi důvěryhodně a člověk má pocit jistoty, že je v dobrých rukou. Určitě doporučuji všem, kdo hledají spolehlivou a ochotnou pomoc.',
  },
  {
    author: 'Zita Drabkova',
    text: 'Děkuji za to, že jsem měla příležitost spolupracovat s profesionálkou v oblasti realit, kterou je Zuzana Bajgerová. Zuzana mi byla nápomocna nejen při pořízení bytu v Montesilvánu, ale sama utváří také lidsky velmi přátelské prostředí v nádherné oblasti Itálie, kam nyní přijíždíme s radostí. Děkuji za šťastné okamžiky, které díky Zuzaně mohu v Montesilvanu prožívat :-).',
  },
  {
    author: 'Polechtana Vana',
    text: 'Vstřícná a rychla spolupráce. Se skvělým přístupem paní Bajgerové a jejích asistentek byl celý proces nákupu nemovitosti v oblasti Abruzzo veden velmi profesionálně. Roman Kniha s rodinou.',
  },
  {
    author: 'Tomas Cepek',
    text: 'Spolupráce s touto makléřkou byla naprosto výjimečná. Její znalost italského trhu, spolehlivost a osobní přístup zaručují jistotu i v zahraničním prostředí. Celý proces koupě nemovitosti proběhl hladce, s maximální péčí a důrazem na detail. Velice doporučuji.',
  },
  {
    author: 'Rene Cichy',
    text: 'Přání koupit si hezký apartmán u moře v Itálii, nám pomohla vyřešit paní Zuzana Bajgerová. Vybrala nám možnosti, udělali jsme prohlídku, my si vybrali a vše ostatní už paní Zuzka zařídila. Vše proběhlo hladce a my máme krásný apartmánek přímo u moře v Montesilvánu. Děkujeme 🇨🇿🇮🇹',
  },
  {
    author: 'Petra Chelikova',
    text: 'Paní Zuzka nám pomohla splnit si sen. 💯 Máme nádherné bydleni u moře. Milujeme to tam ❤️ Moc děkujeme za velmi profesionální a lidský přístup. Zuzka je opravdu jednička ve svém oboru 💯',
  },
  {
    author: 'Lenka R',
    text: 'Měla jsem to obrovské štěstí poznat se se skvělou realitní makléřkou Zuzanou, která mi pomohla splnit můj sen – pořídit si byt u moře v Itálii. Od prvního kontaktu byla neuvěřitelně profesionální, milá a ochotná. Dokonale pochopila, co hledám, a našla mi přesně to, co jsem si vysnila. Zuzana se postarala opravdu o všechno — od výběru a prohlídek, přes samotný nákup a notáře, až po kompletní servis po podpisu smlouvy. Díky její péči jsem se celým procesem cítila provázená a v naprostém klidu.',
  },
  {
    author: 'Petr',
    text: 'Paní Zuzanu jsem objevil čirou náhodou na internetu. Zavolal jsem a během pár minut jsme se dohodli že se přijedu podívat do Montesilvano. Ačkoliv mi připravila prohlídku spousty nemovitostí, hned do druhé jsem se zamiloval. Vypadal sice hrozně a staře ale paní Zuzana slíbila totální rekonstrukci a vybavení na klíč. Svěřil jsem se tedy do rukou osudu a Zuzany. V lednu jsem řekl ano a za 6 měsíců jsem přijel do zbrusu nového apartmánu se 180 stupňovým výhledem na moře kde stačilo abych si přivezl jen kartáček na zuby. Vše ostatní bylo zde, krásné nové a voňavé. Teď zde žiju třetí měsíc a nelitoval jsem ani na okamžik. Skvělí, stále se usmívající lidé, nepřeplněno, ceny nižší než v ČR. Vlastně hledám důvod proč se vůbec vracet do Čech.',
  },
  {
    author: 'Jaroslav Fiala',
    text: 'Trošku netradiční recenze. Popíšu v krátkosti jak s pomoci paní Zuzany Bajgerové nákup nemovitosti v Itálii probíhal. Každý si po přečtení udělá závěr sám.\n16.4. jsem oslovil paní Zuzanu s požadavkem na velikost, cenu a místo apartmánu (bytu) v Itálii. 18.4. mi paní Zuzana poslala odkaz asi na deset apartmánů. 19.4. jsem odeslal cca 5 které jsem vybral a chtěl bych je vidět. 6.6. jsem odletěl do Pescary a prohlédl vybrané apartmány. 11.7. jsem potvrdil výběr jednoho z prohlédnutých bytů. Proběhly platby a plná moc. 29.7. se u místního notáře podepsala smlouva - paní Zuzana v mém zastoupení. 19.9. jsem přijel do bytu a dohodnul s paní Zuzanou a jejími kolegyněmi různé úpravy, opravy, malování, nákupy nábytku, odvoz odpadu, platby různých daní a poplatků, přehlášení vody a plynu, zálohy condominia atd. 2.11. jsem dostal video, kde jsou vidět všechny zásadní úpravy a byt je připraven podle našich představ. Myslím že víc není třeba dodávat, zbýva jen poděkovat za profesionální práci.',
  },
  {
    author: 'alfredo spinosi',
    text: 'Velice doporucuji tuhle maklerku na region abruzzo, spolehliva, rozumi opravdu realitam, kdo hleda experta na nakup nemovitisti v italii',
  },
  {
    author: 'Vladimír Penc',
    text: 'V červnu tohoto roku jsem na základě inzerátu a následné komunikace s paní Zuzanou Bajgerovou navštívil Montesilváno s úmyslem koupit nemovitost. Celý proces ze strany paní Zuzany proběhl naprosto profesionálně, věcně, efektivně ve všech fázích.\nVladimír',
  },
  {
    author: 'Jakub Štádler',
    text: 'Zuzana Bajgerová ve 3 krátkých větách. Úžasná. Skvělá. Báječná.',
  },
  {
    author: 'Rosanna Silenzi',
    text: "I highly recommend my colleague Zuzana to anyone from Czechoslovakia looking to buy a property in Abruzzo, Italy. She's very helpful and works hard to find the most beautiful properties close to the sea. After the notary deed, she takes care of the necessary paperwork for utilities and everything else needed to assist buyers. Well done, Zuzana!",
    translatedFrom: 'italštiny',
  },
];
