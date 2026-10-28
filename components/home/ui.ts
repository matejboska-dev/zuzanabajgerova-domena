import type { Locale } from '@/lib/i18n';

// Texty rozhrani domovske stranky, ktere nejsou v datech lib/home.ts.
export type HomeUI = {
  proofAria: string; offmarketAria: string;
  reasonsTitle: string; reasonsAccent: string; reasonsLead: string; pillarSummaries: string[];
  consult: string; moreServices: string;
  aftercareTitle: string; aftercareAccent: string; aftercareLead: string;
  faqTitle: string; faqAccent: string; faqCta: string;
  guidesTitle: string;
  contactTitle: string; contactLead: string; contactForm: string; contactPlace: string; contactWa: string; contactNoteAria: string; contactNote: string;
  fears: { badge: string; titleLine: string; titleAccent: string; lead: string };
  about: { title: string; accent: string; awards: string; more: string };
  why: { title: string; accent: string; lead: string; baseAlt: string; baseCaption: string };
  community: { title: string; accent: string; lead: string; less: string; more: (n: number) => string; instagram: string; closeGallery: string; prev: string; next: string };
  reno: {
    badge: string; title: string; accent: string; lead: string; hint: string; videoLabel: string; videoCap: string; factsAria: string;
    turnkey: string; fromPlan: string; rooms: string; before: string; whatWeDid: string; whatText: string; result: string; resultText: string;
    beforeText: string; reelTag: string; consult: string; situation: string; threeSpaces: string; clientFlat: string; after: string;
  };
  reels: { title: string; accent: string; lead: string; region: string; prev: string; next: string; more: string; awardAlt: string; carousel: string; follow: string };
  testimonials: { title: string; accent: string; lead: string; all: string; prev: string; next: string; originalNote: string };
  pillarVideo: string; pause: string; play: string; playSound: string; unmute: string; mute: string;
};

export const HOME_UI: Record<Locale, HomeUI> = {
  cs: {
    proofAria: 'Ocenění a zkušenost', offmarketAria: 'Nabídky nemovitostí na míru',
    reasonsTitle: '', reasonsAccent: 'jinde nedostanete', reasonsLead: 'Žiji v Abruzzu a osobně vás provedu výběrem, koupí i péčí o nemovitost po podpisu.',
    pillarSummaries: [
      'Jsem na místě a znám lidi, se kterými při koupi spolupracuji.',
      'Prohlídky, dokumenty i přepisy energií řešíme společně.',
      'Celou koupí vás provedu srozumitelně v češtině.',
      'Pomohu vám také s rekonstrukcí, správou a povinnostmi po koupi.',
      'Spolupracuji s místními realitkami a dalšími prověřenými odborníky.',
      'Při jednání hájím vaše zájmy a usiluji o dobré podmínky.',
    ],
    consult: 'Domluvit nezávaznou konzultaci', moreServices: 'Více o mých službách',
    aftercareTitle: 'Klíči to', aftercareAccent: 'nekončí', aftercareLead: 'První rok základního asistenčního servisu máte v naší provizi. A když potřebujete víc, náš tým zůstává na místě.',
    faqTitle: 'Otázky, které dostávám', faqAccent: 'nejčastěji', faqCta: 'Všechny časté dotazy',
    guidesTitle: 'Než se rozhodnete, přečtěte si tohle',
    contactTitle: 'Zavolejme si', contactLead: 'Napište mi, co hledáte, jaký máte rozpočet a kdy byste chtěli kupovat. Společně probereme možnosti v Abruzzu. Úvodní konzultace je zdarma a nezávazná.',
    contactForm: 'Nebo mi napište přes formulář →', contactPlace: '708 00 Ostrava-Poruba · celoročně v Abruzzu', contactWa: 'WhatsApp, nejrychlejší odpověď', contactNoteAria: 'Jak mě nejlépe zastihnete',
    contactNote: 'Nejrychleji mě zastihnete přes WhatsApp. Pokud máte vážný zájem a nedovoláte se mi, zavolejte klidně znovu. Kvůli vysokému zájmu se mi občas stane, že mi číslo unikne, když zrovna telefonuji.',
    fears: { badge: '', titleLine: '', titleAccent: '', lead: '' },
    about: { title: 'O', accent: 'mně', awards: 'Ocenění', more: 'Více o mně' },
    why: { title: 'Moře. Hory.', accent: 'Abruzzo.', lead: 'Místo, které znám z každodenního života. Vybereme lokalitu podle toho, jak tady chcete žít.', baseAlt: 'Výhled z Montesilvana na pobřeží Abruzza', baseCaption: 'Montesilvano · tady žiji' },
    community: { title: 'Staňte se součástí', accent: 'naší komunity', lead: 'Nekupujete si jen nemovitost v Itálii. Kupujete si kus nového života. Společné večeře, Velikonoce na pláži a přátelé, za kterými se rádi vracíte.', less: 'Zobrazit méně momentů', more: (n) => `Dalších ${n} momentů z našeho života`, instagram: 'Další momenty z Abruzza na Instagramu @bc.zuzana_remax', closeGallery: 'Zavřít galerii', prev: 'Předchozí snímek', next: 'Další snímek' },
    reno: { badge: 'Případová studie · Ostrava', title: 'Od klíčů', accent: 'po hotový byt', lead: 'Skutečná proměna bytu klienta z Ostravy. Fotografie a video ukazují původní stav i dokončený interiér.', hint: 'Posuňte dělítko a porovnejte kuchyň před a po', videoLabel: 'Celá proměna bytu klienta z Ostravy', videoCap: 'Celá proměna ve videu', factsAria: 'Rozsah rekonstrukce', turnkey: 'Na klíč', fromPlan: 'Od plánu po předání', rooms: 'Kuchyň · koupelna · obývací pokoj', before: 'Před', whatWeDid: 'Co jsme udělali', whatText: 'Byt prošel rekonstrukcí na klíč: nová kuchyň, koupelna i obývací pokoj. Celou proměnu ukazuje video.', result: 'Výsledek', resultText: 'Dokončený a vybavený interiér si můžete projít ve videu. Rozsah každé další rekonstrukce domlouváme individuálně.', beforeText: 'Původní podobu bytu zachycují fotografie před rekonstrukcí. Srovnání ukazuje různé pohledy na prostor.', reelTag: 'Rekonstrukce na klíč', consult: 'Domluvit nezávaznou konzultaci', situation: 'Situace', threeSpaces: '3 prostory', clientFlat: 'Byt klienta', after: 'Po' },
    reels: { title: 'Život v Abruzzu', accent: 'na Instagramu', lead: 'Apartmány v Itálii, život u moře i momenty z mé práce. Prohlédněte si výběr videí a další najdete na mém profilu.', region: 'Výběr videí z Instagramu Zuzany Bajgerové', prev: 'Předchozí video', next: 'Další video', more: 'Další videa na Instagramu', awardAlt: 'Zuzana Bajgerová při předávání ocenění RE/MAX na pódiu', carousel: 'karusel', follow: 'Sledovat na Instagramu' },
    testimonials: { title: 'Věřte lidem, kteří to', accent: 'už mají za sebou', lead: 'Přečtěte si skutečné zkušenosti klientů, kteří si splnili sen o bydlení v Itálii.', all: 'Všechny reference', prev: 'Předchozí', next: 'Další', originalNote: '' },
    pillarVideo: 'Video: Bc. Zuzana Bajgerová v Abruzzu', pause: 'Pozastavit video', play: 'Přehrát video', playSound: 'Přehrát video se zvukem', unmute: 'Zapnout zvuk', mute: 'Vypnout zvuk',
  },
  en: {
    proofAria: 'Awards and experience', offmarketAria: 'Tailor-made property search',
    reasonsTitle: '', reasonsAccent: 'you won’t get elsewhere', reasonsLead: 'I live in Abruzzo and will personally guide you through choosing, buying and caring for the property after signing.',
    pillarSummaries: [
      'I am on the ground and know the people I work with on every purchase.',
      'We handle viewings, documents and utility transfers together.',
      'I guide you through the whole purchase in plain language you understand.',
      'I also help with renovation, management and your duties after purchase.',
      'I work with local agents and other vetted professionals.',
      'In negotiations I defend your interests and aim for good terms.',
    ],
    consult: 'Book a free consultation', moreServices: 'More about my services',
    aftercareTitle: 'It doesn’t end', aftercareAccent: 'with the keys', aftercareLead: 'The first year of basic assistance is included in our commission. And when you need more, our team stays on the ground.',
    faqTitle: 'Questions I get', faqAccent: 'most often', faqCta: 'All frequently asked questions',
    guidesTitle: 'Before you decide, read this',
    contactTitle: 'Let’s talk', contactLead: 'Tell me what you are looking for, your budget and when you would like to buy. Together we will go through the options in Abruzzo. The first consultation is free and non-binding.',
    contactForm: 'Or write to me via the form →', contactPlace: '708 00 Ostrava-Poruba · all year round in Abruzzo', contactWa: 'WhatsApp, the fastest reply', contactNoteAria: 'How to reach me best',
    contactNote: 'The fastest way to reach me is WhatsApp. If you are seriously interested and cannot get through, please just call again. Because of high demand I sometimes miss a call while I am on another one.',
    fears: { badge: '6 key questions · Safe purchase', titleLine: 'I know six questions that are', titleAccent: 'on your mind right now', lead: 'Let me answer them right away. Until they are resolved, no property matters yet.' },
    about: { title: 'About', accent: 'me', awards: 'Awards', more: 'More about me' },
    why: { title: 'Sea. Mountains.', accent: 'Abruzzo.', lead: 'A place I know from everyday life. We will choose a location based on how you want to live here.', baseAlt: 'View from Montesilvano over the Abruzzo coast', baseCaption: 'Montesilvano · where I live' },
    community: { title: 'Become part of', accent: 'our community', lead: 'You are not just buying a property in Italy. You are buying a piece of a new life. Shared dinners, Easter on the beach and friends you are happy to come back to.', less: 'Show fewer moments', more: (n) => `${n} more moments from our life`, instagram: 'More moments from Abruzzo on Instagram @bc.zuzana_remax', closeGallery: 'Close gallery', prev: 'Previous photo', next: 'Next photo' },
    reno: { badge: 'Case study · Ostrava', title: 'From the keys', accent: 'to a finished flat', lead: 'A real transformation of a client’s flat in Ostrava. Photos and video show the original state and the finished interior.', hint: 'Drag the divider to compare the kitchen before and after', videoLabel: 'The whole transformation of a client’s flat in Ostrava', videoCap: 'The whole transformation in video', factsAria: 'Scope of the renovation', turnkey: 'Turnkey', fromPlan: 'From plan to handover', rooms: 'Kitchen · bathroom · living room', before: 'Before', whatWeDid: 'What we did', whatText: 'The flat went through a turnkey renovation: a new kitchen, bathroom and living room. The video shows the whole transformation.', result: 'Result', resultText: 'You can walk through the finished, furnished interior in the video. The scope of every further renovation is agreed individually.', beforeText: 'The photos show the original state of the flat before renovation. The comparison shows different views of the space.', reelTag: 'Turnkey renovation', consult: 'Book a free consultation', situation: 'Situation', threeSpaces: '3 spaces', clientFlat: 'A client’s flat', after: 'After' },
    reels: { title: 'Life in Abruzzo', accent: 'on Instagram', lead: 'Flats in Italy, life by the sea and moments from my work. Browse a selection of videos and find more on my profile.', region: 'Selected videos from Zuzana Bajgerová’s Instagram', prev: 'Previous video', next: 'Next video', more: 'More videos on Instagram', awardAlt: 'Zuzana Bajgerová receiving a RE/MAX award on stage', carousel: 'carousel', follow: 'Follow on Instagram' },
    testimonials: { title: 'Trust people who', accent: 'have been through it', lead: 'Read real experiences of clients who fulfilled their dream of living in Italy.', all: 'All testimonials', prev: 'Previous', next: 'Next', originalNote: 'Testimonials are shown in the original Czech.' },
    pillarVideo: 'Video: Bc. Zuzana Bajgerová in Abruzzo', pause: 'Pause video', play: 'Play video', playSound: 'Play video with sound', unmute: 'Turn sound on', mute: 'Turn sound off',
  },
  it: {
    proofAria: 'Riconoscimenti ed esperienza', offmarketAria: 'Ricerca di immobili su misura',
    reasonsTitle: '', reasonsAccent: 'che altrove non trovi', reasonsLead: 'Vivo in Abruzzo e ti accompagno personalmente nella scelta, nell’acquisto e nella cura dell’immobile dopo la firma.',
    pillarSummaries: [
      'Sono sul posto e conosco le persone con cui collaboro a ogni acquisto.',
      'Visite, documenti e volture delle utenze li gestiamo insieme.',
      'Ti guido in tutto l’acquisto in modo chiaro, nella tua lingua.',
      'Ti aiuto anche con ristrutturazione, gestione e obblighi dopo l’acquisto.',
      'Collaboro con agenzie locali e altri professionisti verificati.',
      'Nella trattativa difendo i tuoi interessi e punto a buone condizioni.',
    ],
    consult: 'Richiedi una consulenza gratuita', moreServices: 'Scopri i miei servizi',
    aftercareTitle: 'Non finisce', aftercareAccent: 'con le chiavi', aftercareLead: 'Il primo anno di assistenza di base è incluso nella nostra provvigione. E quando serve di più, il nostro team resta sul posto.',
    faqTitle: 'Le domande che ricevo', faqAccent: 'più spesso', faqCta: 'Tutte le domande frequenti',
    guidesTitle: 'Prima di decidere, leggi questo',
    contactTitle: 'Parliamone', contactLead: 'Scrivimi cosa cerchi, che budget hai e quando vorresti acquistare. Valuteremo insieme le possibilità in Abruzzo. La prima consulenza è gratuita e senza impegno.',
    contactForm: 'Oppure scrivimi tramite il modulo →', contactPlace: '708 00 Ostrava-Poruba · tutto l’anno in Abruzzo', contactWa: 'WhatsApp, la risposta più rapida', contactNoteAria: 'Come raggiungermi al meglio',
    contactNote: 'Il modo più rapido per raggiungermi è WhatsApp. Se sei seriamente interessato e non riesci a contattarmi, richiama pure. A causa dell’alta richiesta a volte perdo una chiamata mentre sono già al telefono.',
    fears: { badge: '6 dubbi chiave · Acquisto sicuro', titleLine: 'Conosco sei domande che hai', titleAccent: 'in testa in questo momento', lead: 'Rispondo subito. Finché non hai risposte, nessun immobile ti interessa davvero.' },
    about: { title: 'Chi', accent: 'sono', awards: 'Riconoscimenti', more: 'Scopri di più su di me' },
    why: { title: 'Mare. Montagna.', accent: 'Abruzzo.', lead: 'Un luogo che conosco dalla vita di ogni giorno. Sceglieremo la zona in base a come vuoi vivere qui.', baseAlt: 'Vista da Montesilvano sulla costa abruzzese', baseCaption: 'Montesilvano · dove vivo' },
    community: { title: 'Entra a far parte della', accent: 'nostra comunità', lead: 'Non compri solo un immobile in Italia. Compri un pezzo di una nuova vita. Cene insieme, Pasqua in spiaggia e amici da cui torni volentieri.', less: 'Mostra meno momenti', more: (n) => `Altri ${n} momenti della nostra vita`, instagram: 'Altri momenti dall’Abruzzo su Instagram @bc.zuzana_remax', closeGallery: 'Chiudi la galleria', prev: 'Foto precedente', next: 'Foto successiva' },
    reno: { badge: 'Caso studio · Ostrava', title: 'Dalle chiavi', accent: 'all’appartamento finito', lead: 'La vera trasformazione dell’appartamento di un cliente di Ostrava. Foto e video mostrano lo stato originale e gli interni finiti.', hint: 'Sposta il cursore per confrontare la cucina prima e dopo', videoLabel: 'L’intera trasformazione dell’appartamento di un cliente di Ostrava', videoCap: 'L’intera trasformazione in video', factsAria: 'Portata della ristrutturazione', turnkey: 'Chiavi in mano', fromPlan: 'Dal progetto alla consegna', rooms: 'Cucina · bagno · soggiorno', before: 'Prima', whatWeDid: 'Cosa abbiamo fatto', whatText: 'L’appartamento è stato ristrutturato chiavi in mano: nuova cucina, bagno e soggiorno. Il video mostra l’intera trasformazione.', result: 'Risultato', resultText: 'Puoi visitare nel video gli interni finiti e arredati. La portata di ogni ristrutturazione successiva si concorda caso per caso.', beforeText: 'Le foto mostrano lo stato originale dell’appartamento prima dei lavori. Il confronto offre diverse viste dello spazio.', reelTag: 'Ristrutturazione chiavi in mano', consult: 'Richiedi una consulenza gratuita', situation: 'Situazione', threeSpaces: '3 ambienti', clientFlat: 'Appartamento di un cliente', after: 'Dopo' },
    reels: { title: 'La vita in Abruzzo', accent: 'su Instagram', lead: 'Appartamenti in Italia, vita al mare e momenti del mio lavoro. Guarda una selezione di video e trovane altri sul mio profilo.', region: 'Selezione di video dall’Instagram di Zuzana Bajgerová', prev: 'Video precedente', next: 'Video successivo', more: 'Altri video su Instagram', awardAlt: 'Zuzana Bajgerová riceve un premio RE/MAX sul palco', carousel: 'carosello', follow: 'Segui su Instagram' },
    testimonials: { title: 'Fidati di chi', accent: 'ci è già passato', lead: 'Leggi le esperienze reali dei clienti che hanno realizzato il sogno di vivere in Italia.', all: 'Tutte le testimonianze', prev: 'Precedente', next: 'Successivo', originalNote: 'Le testimonianze sono mostrate nella lingua originale, il ceco.' },
    pillarVideo: 'Video: Bc. Zuzana Bajgerová in Abruzzo', pause: 'Metti in pausa il video', play: 'Riproduci il video', playSound: 'Riproduci il video con audio', unmute: 'Attiva l’audio', mute: 'Disattiva l’audio',
  },
};
