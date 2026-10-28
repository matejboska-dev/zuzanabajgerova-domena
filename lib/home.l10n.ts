// Preklady obsahu domovske stranky (EN, IT). Cesky text zustava v lib/home.ts jako zdroj;
// tady jsou jen texty, ktere se lisi. Pole se spojuji podle poradi, proto musi mit stejny pocet polozek.

import type { Locale } from './i18n';
import {
  ABOUT, AFTER, COMMUNITY_MEDIA, FAQ, FEARS, GUIDES, HERO, INSTAGRAM_REELS, PILLARS, PRICE_IN, PRICE_OUT,
  PROOF, QUICK_PICKS, RENO_DONE, RENO_PAIRS, SERVICES_CARDS, WHY_ABRUZZO,
} from './home';

type L = Exclude<Locale, 'cs'>;

const T = {
  HERO: {
    en: {
      eyebrow: 'Real estate specialist for Italian property · Abruzzo',
      h1: 'Buy a house in Italy without risk and without a language barrier',
      lead: 'I live in Abruzzo and guide you through the whole process, from choosing a property through the notary to the keys. You deal with nothing in Italian.',
      ctaPrimary: 'View properties',
      ctaSecondary: 'Book a free consultation',
    },
    it: {
      eyebrow: 'Specialista immobiliare in Italia · Abruzzo',
      h1: 'Acquista casa in Italia senza rischi e senza barriere linguistiche',
      lead: 'Vivo in Abruzzo e ti accompagno in tutto il processo, dalla scelta all’atto dal notaio fino alle chiavi. Non devi occuparti di nulla in italiano.',
      ctaPrimary: 'Vedi gli immobili',
      ctaSecondary: 'Richiedi una consulenza gratuita',
    },
  },
  PROOF: {
    en: [
      { label: 'RE/MAX Czech Republic, 6th place 2025' }, { label: 'RE/MAX award' }, { label: 'RE/MAX award' },
      { value: '5.0 / 5', label: 'from 15 reviews' }, { value: '20 years', label: 'of experience in Abruzzo' },
    ],
    it: [
      { label: 'RE/MAX Rep. Ceca, 6° posto 2025' }, { label: 'riconoscimento RE/MAX' }, { label: 'riconoscimento RE/MAX' },
      { value: '5,0 / 5', label: 'da 15 recensioni' }, { value: '20 anni', label: 'di esperienza in Abruzzo' },
    ],
  },
  FEARS: {
    en: [
      { q: '“I don’t understand the language or Italian law.”', a: 'I guide you through the entire process in your language. I deal with the Italian side and send you summaries you can understand.' },
      { q: '“I don’t know what the real extra costs will be.”', a: 'The price you see online is final. It includes the property price, transfer tax, the notary’s fee and our commission, plus the first year of basic service with my assistants, who also live locally.' },
      { q: '“I’m afraid of being cheated from a distance.”', a: 'I live in Abruzzo, in Montesilvano. I check every property in person and the whole purchase runs under my supervision. Together with a reputable Italian notary we thoroughly review the legal status of the property and all documentation. My goal is that you know exactly what you are buying and nothing unpleasant surprises you.' },
      { q: '“I don’t know what happens after the purchase.”', a: 'Tax registration, renovation, furnishing, management and rental. The relationship does not end at the notary.' },
      { q: '“I can’t travel to Italy for every viewing.”', a: 'You don’t have to. I first show you properties on video and then plan the in-person viewings into a single day, so you do not travel needlessly.' },
      { q: '“What if the flat needs renovation?”', a: 'I work with a local architect and vetted tradespeople. I arrange the work, supervise it and send you photos, even when you are in the Czech Republic.' },
    ],
    it: [
      { q: '“Non conosco la lingua né il diritto italiano.”', a: 'Seguo tutto il processo nella tua lingua. Mi occupo io dei rapporti con la controparte italiana e ti invio riepiloghi chiari.' },
      { q: '“Non so quali siano i costi aggiuntivi reali.”', a: 'Il prezzo che vedi online è definitivo. Comprende il prezzo dell’immobile, l’imposta di trasferimento, l’onorario del notaio e la nostra provvigione, oltre al primo anno di assistenza di base con le mie assistenti, che vivono anch’esse sul posto.' },
      { q: '“Ho paura di essere truffato a distanza.”', a: 'Vivo in Abruzzo, a Montesilvano. Verifico personalmente ogni immobile e l’intero acquisto si svolge sotto la mia supervisione. Insieme a un notaio italiano di fiducia controlliamo a fondo la situazione giuridica dell’immobile e tutta la documentazione. Il mio obiettivo è che tu sappia esattamente cosa acquisti e che nulla ti sorprenda.' },
      { q: '“Non so cosa succede dopo l’acquisto.”', a: 'Registrazione fiscale, ristrutturazione, arredo, gestione e affitto. Il rapporto non finisce dal notaio.' },
      { q: '“Non posso venire in Italia per ogni visita.”', a: 'Non serve. Ti mostro prima gli immobili in video e poi organizzo le visite di persona in un solo giorno, così non viaggi inutilmente.' },
      { q: '“E se l’appartamento ha bisogno di ristrutturazione?”', a: 'Collaboro con un’architetta locale e artigiani di fiducia. Organizzo i lavori, li controllo e ti invio le foto, anche quando sei in Repubblica Ceca.' },
    ],
  },
  PRICE_IN: {
    en: ['Property search and organising viewings', 'Negotiating the price with the seller', 'Communication with the Italian agent, notary, lawyer and surveyor', 'Codice fiscale, powers of attorney, translations', 'Utility transfers and tax registration', 'Support all the way to handing over the keys', 'First year of basic service with my assistants in Abruzzo'],
    it: ['Ricerca dell’immobile e organizzazione delle visite', 'Trattativa sul prezzo con il venditore', 'Comunicazione con agenzia italiana, notaio, avvocato e tecnico', 'Codice fiscale, procure, traduzioni', 'Volture delle utenze e registrazione fiscale', 'Assistenza fino alla consegna delle chiavi', 'Primo anno di assistenza di base con le mie assistenti in Abruzzo'],
  },
  PRICE_OUT: {
    en: ['Any renovation and furnishing of the flat', 'Annual IMU and TARI fees'],
    it: ['Eventuale ristrutturazione e arredo dell’appartamento', 'Imposte annuali IMU e TARI'],
  },
  PILLARS: {
    en: [
      { title: 'I live right in Abruzzo', text: 'I am not a remote agent. I have my own vetted network of agencies, notaries, lawyers, surveyors and designers.' },
      { title: 'A-to-Z service', text: 'Search, viewings, negotiation, paperwork, powers of attorney, translations and utility transfers. You do nothing.' },
      { title: 'The whole process in your language', text: 'Language and fear of Italian bureaucracy are the most common reasons buyers give up. With me both disappear.' },
      { title: 'I stay after signing', text: 'Taxes, renovation, furnishing, management. The relationship does not end at the notary, it lasts for years.' },
      { title: 'I work only with vetted partners', text: 'I work only with checked Italian agencies and direct sellers. Over the years in Abruzzo I have chosen them carefully, so with me you can be sure you will not run into fraudsters.' },
      { title: 'I negotiate the best terms', text: 'Negotiation is my strongest side and I always aim for the best price on the market. I could convince the dead.' },
    ],
    it: [
      { title: 'Vivo in Abruzzo', text: 'Non sono un’agente a distanza. Ho una rete verificata di agenzie, notai, avvocati, geometri e progettisti.' },
      { title: 'Servizio dalla A alla Z', text: 'Ricerca, visite, trattativa, pratiche, procure, traduzioni e volture delle utenze. Tu non devi fare nulla.' },
      { title: 'Tutto nella tua lingua', text: 'La lingua e la paura della burocrazia italiana sono il motivo più comune per cui si rinuncia all’acquisto. Con me spariscono entrambe.' },
      { title: 'Resto anche dopo la firma', text: 'Imposte, ristrutturazione, arredo, gestione. Il rapporto non finisce dal notaio, dura anni.' },
      { title: 'Lavoro solo con partner verificati', text: 'Lavoro solo con agenzie italiane controllate e venditori diretti. In anni di Abruzzo li ho scelti con cura, quindi con me hai la certezza di non incappare in truffatori.' },
      { title: 'Negozio le migliori condizioni', text: 'La trattativa è il mio punto di forza e punto sempre al miglior prezzo di mercato. Convincerei anche i morti.' },
    ],
  },
  AFTER: {
    en: [
      { title: 'Renovation and furnishing', text: 'With our team of tradespeople we arrange the work, I watch the budget and deadlines, and send photos of progress.' },
      { title: 'Property management', text: 'Inspections, cleaning, payments, communication with neighbours and the building administration.' },
      { title: 'Rental', text: 'I help with short-term and seasonal rental, from preparing the flat to looking after guests.' },
    ],
    it: [
      { title: 'Ristrutturazione e arredo', text: 'Con il nostro team di artigiani organizziamo i lavori, io controllo budget e tempi e ti invio le foto dell’avanzamento.' },
      { title: 'Gestione dell’immobile', text: 'Controlli, pulizie, pagamenti, rapporti con i vicini e con l’amministrazione del condominio.' },
      { title: 'Affitto', text: 'Ti aiuto con affitti brevi e stagionali, dalla preparazione dell’appartamento all’accoglienza degli ospiti.' },
    ],
  },
  FAQ: {
    en: [
      { q: 'Do I need to speak Italian?', a: 'No. I run the whole process in your language. I deal with Italian agents, the notary and the authorities for you and send you clear summaries.' },
      { q: 'How much do I pay on top of the property price?', a: 'For our listings the price is final: it includes the property, transfer tax, the notary and our commission with the first year of basic service. Renovation, furnishing and ongoing yearly costs are handled separately.' },
      { q: 'Do I have to fly to Italy to sign the contract?', a: 'No. Both the preliminary contract and the notarial deed can be signed by power of attorney. You only need to fly in for viewings, which I fit into a single day.' },
      { q: 'What is a codice fiscale and how do I get one?', a: 'It is the Italian tax number, without which you cannot buy property. I take care of it for you, usually within a few days.' },
      { q: 'What about property management if I do not live there?', a: 'I offer complete management: inspections of the flat, cleaning, communication with neighbours and the building administration, utility and tax payments. The property is looked after even when you are abroad.' },
      { q: 'Can you handle a renovation remotely?', a: 'Yes. With our architect and local team we arrange the work, I watch the budget and deadlines and send regular photos. You do not need to be there in person.' },
      { q: 'What are IMU and TARI, and how much are they?', a: 'IMU is the annual property tax, TARI is the waste fee. The amount depends on location and size and is commonly between €500 and €2,000 a year. I calculate the exact figure before you buy.' },
      { q: 'Can I rent the property out and earn from it?', a: 'Yes. I arrange short-term and seasonal rental, from preparing the flat through cleaning to communicating with guests. The result depends on the property, the season, occupancy and running costs.' },
    ],
    it: [
      { q: 'Devo parlare italiano?', a: 'No. Seguo tutto il processo nella tua lingua. Mi occupo io di agenti italiani, notaio e uffici e ti invio riepiloghi chiari.' },
      { q: 'Quanto pago in più rispetto al prezzo dell’immobile?', a: 'Per i nostri annunci il prezzo è definitivo: comprende l’immobile, l’imposta di trasferimento, il notaio e la nostra provvigione con il primo anno di assistenza di base. Ristrutturazione, arredo e costi annuali correnti si gestiscono a parte.' },
      { q: 'Devo volare in Italia per firmare il contratto?', a: 'No. Sia il preliminare sia l’atto notarile si possono firmare tramite procura. Basta venire per le visite, che organizzo in un solo giorno.' },
      { q: 'Cos’è il codice fiscale e come lo ottengo?', a: 'È il numero fiscale italiano, senza il quale non si può acquistare un immobile. Me ne occupo io, di solito in pochi giorni.' },
      { q: 'E la gestione dell’immobile se non vivo lì?', a: 'Offro una gestione completa: controlli dell’appartamento, pulizie, rapporti con i vicini e con l’amministrazione, pagamento di utenze e imposte. L’immobile è sorvegliato anche quando sei all’estero.' },
      { q: 'Potete seguire una ristrutturazione a distanza?', a: 'Sì. Con la nostra architetta e il team locale organizziamo i lavori, io controllo budget e tempi e ti invio foto regolari. Non devi essere presente.' },
      { q: 'Cosa sono IMU e TARI e quanto costano?', a: 'L’IMU è l’imposta annuale sulla proprietà, la TARI è la tassa sui rifiuti. L’importo dipende da zona e dimensioni e di solito va da 500 a 2.000 € l’anno. Il calcolo esatto lo faccio prima dell’acquisto.' },
      { q: 'Posso affittare l’immobile e guadagnarci?', a: 'Sì. Organizzo affitti brevi e stagionali, dalla preparazione dell’appartamento alle pulizie fino alla comunicazione con gli ospiti. Il risultato dipende da immobile, stagione, occupazione e costi di gestione.' },
    ],
  },
  HOME_FAQ_PRICE: {
    en: { q: 'What does the price in the listing include?', a: 'For listings on this website the stated price includes the property, transfer tax, the notary and our commission. Budget separately for any renovation, furnishing and the yearly fees that follow.' },
    it: { q: 'Cosa comprende il prezzo indicato nell’annuncio?', a: 'Per gli annunci di questo sito il prezzo indicato comprende l’immobile, l’imposta di trasferimento, il notaio e la nostra provvigione. Considera a parte eventuali ristrutturazioni, arredo e le spese annuali successive.' },
  },
  HOME_FAQ_RENT: {
    en: { q: 'Can I rent the property out?', a: 'Yes. I help prepare the flat for short-term or seasonal rental, cleaning and communication with guests. We will go through the options and expected costs for your chosen property.' },
    it: { q: 'Posso affittare l’immobile?', a: 'Sì. Ti aiuto a preparare l’appartamento per affitti brevi o stagionali, con pulizie e comunicazione con gli ospiti. Opzioni e costi previsti li valutiamo insieme per l’immobile scelto.' },
  },
  GUIDES: {
    en: [
      { kicker: 'Guide', title: 'How to buy property in Italy, step by step', alt: 'Signing documents when buying property in Italy' },
      { kicker: 'Costs', title: 'How much does it really cost to buy a house in Italy', alt: 'View from a property terrace over Montesilvano and the sea' },
      { kicker: 'Myths', title: 'Houses for 1 euro: the real story', alt: 'The stone fortress of Rocca Calascio in inland Abruzzo' },
    ],
    it: [
      { kicker: 'Guida', title: 'Come comprare casa in Italia, passo dopo passo', alt: 'Firma dei documenti per l’acquisto di un immobile in Italia' },
      { kicker: 'Costi', title: 'Quanto costa davvero comprare casa in Italia', alt: 'Vista dalla terrazza di un immobile su Montesilvano e il mare' },
      { kicker: 'Miti', title: 'Case a 1 euro: come stanno davvero le cose', alt: 'La fortezza di pietra di Rocca Calascio nell’entroterra abruzzese' },
    ],
  },
  QUICK_PICKS: {
    en: ['All', 'Coast', 'Apartments', 'Houses and villas', 'Under €100,000', 'Investment', 'Luxury'],
    it: ['Tutti', 'Costa', 'Appartamenti', 'Case e ville', 'Fino a 100.000 €', 'Investimento', 'Lusso'],
  },
  WHY: {
    en: [
      { title: 'Mountains and sea at once', text: 'Skiing in the morning, the beach in the afternoon. This combination is rare in Europe.', photoAlt: 'The Gran Sasso massif reflected in a lake in Abruzzo', caption: 'Gran Sasso · mountains and coast within reach', photos: [{ label: 'Mountains', alt: 'The Gran Sasso massif reflected in a lake in Abruzzo' }, { label: 'Sea', alt: 'Beach in Montesilvano with stone breakwaters' }] },
      { title: 'An airport nearby', text: 'Ryanair flies seasonally from Prague straight to Pescara, and from Krakow in winter too. The direct flight takes about 1 h 40–50 min. In winter you can also travel from Prague via Milan; check connections for your date.', photoAlt: 'Aerial view of Pescara international airport and the coast', caption: 'Pescara airport · direct flights from Prague and Krakow', photos: [{ label: 'Pescara airport', alt: 'Aerial view of Pescara international airport and the coast' }] },
      { title: '15 minutes to Montesilvano', text: 'From Pescara airport you are in Montesilvano by car in about 15 minutes. Time depends on traffic and your destination; you can also plan the trip by public transport.', photoAlt: 'Seafront promenade and beaches in Pescara and Montesilvano', caption: 'Pescara seafront · life minutes from the airport', photos: [{ label: 'From the airport', alt: 'Seafront promenade and beaches in Pescara and Montesilvano' }] },
      { title: 'By car from the Czech Republic', text: 'You can also drive to Abruzzo. Plan the distance and travel time according to your departure point and destination.', photoAlt: 'A road trip toward the Italian coast at sunset', caption: 'By car · a comfortable route from the Czech Republic', photos: [{ label: 'By car', alt: 'A road trip toward the Italian coast at sunset' }] },
      { title: 'Seaside climate', text: 'On the coast you enjoy a long, warm summer. When you want a change, the mountains of Abruzzo are within reach.', photoAlt: 'Panoramic view of the Abruzzo coast and turquoise sea', caption: 'Abruzzo coast · 300 sunny days a year', photos: [{ label: 'Sea on a sunny day', alt: 'Panoramic view of the Abruzzo coast and turquoise sea' }] },
      { title: 'Nature and places', text: 'From fishermen’s trabocchi on the Costa dei Trabocchi through Lake Scanno to the Gran Sasso and Majella mountains. Majella is a UNESCO geopark.', photoAlt: 'The emerald heart-shaped Lake Scanno in the Abruzzo mountains', caption: 'Lake Scanno · the emerald heart of Abruzzo', photos: [{ label: 'Lake Scanno', alt: 'The emerald heart-shaped Lake Scanno in the Abruzzo mountains' }] },
    ],
    it: [
      { title: 'Montagna e mare insieme', text: 'La mattina sulle piste, il pomeriggio in spiaggia. Una combinazione rara in Europa.', photoAlt: 'Il massiccio del Gran Sasso che si specchia in un lago in Abruzzo', caption: 'Gran Sasso · montagna e costa a portata di mano', photos: [{ label: 'Montagna', alt: 'Il massiccio del Gran Sasso che si specchia in un lago in Abruzzo' }, { label: 'Mare', alt: 'Spiaggia di Montesilvano con scogliere frangiflutti' }] },
      { title: 'Aeroporto vicino', text: 'Ryanair vola stagionalmente da Praga direttamente a Pescara, da Cracovia anche in inverno. Il volo diretto dura circa 1 h 40–50 min. In inverno da Praga si può viaggiare anche via Milano; verifica le coincidenze per la tua data.', photoAlt: 'Veduta aerea dell’aeroporto internazionale di Pescara e della costa', caption: 'Aeroporto di Pescara · voli diretti da Praga e Cracovia', photos: [{ label: 'Aeroporto di Pescara', alt: 'Veduta aerea dell’aeroporto internazionale di Pescara e della costa' }] },
      { title: '15 minuti da Montesilvano', text: 'Dall’aeroporto di Pescara sei a Montesilvano in auto in circa 15 minuti. Il tempo dipende da traffico e destinazione; puoi organizzare il viaggio anche con i mezzi pubblici.', photoAlt: 'Lungomare e spiagge di Pescara e Montesilvano', caption: 'Lungomare di Pescara · la vita a pochi minuti dall’aeroporto', photos: [{ label: 'Dall’aeroporto', alt: 'Lungomare e spiagge di Pescara e Montesilvano' }] },
      { title: 'In auto dalla Repubblica Ceca', text: 'In Abruzzo si può arrivare anche in auto. Pianifica distanza e tempi in base al punto di partenza e alla zona di destinazione.', photoAlt: 'Viaggio in auto verso la costa italiana al tramonto', caption: 'In auto · un percorso comodo dalla Repubblica Ceca', photos: [{ label: 'In auto', alt: 'Viaggio in auto verso la costa italiana al tramonto' }] },
      { title: 'Clima marittimo', text: 'Sulla costa ti aspetta una lunga estate calda. Quando vuoi cambiare aria, le montagne dell’Abruzzo sono a portata di mano.', photoAlt: 'Vista panoramica sulla costa abruzzese e sul mare turchese', caption: 'Costa abruzzese · 300 giorni di sole l’anno', photos: [{ label: 'Mare in una giornata di sole', alt: 'Vista panoramica sulla costa abruzzese e sul mare turchese' }] },
      { title: 'Natura e luoghi', text: 'Dai trabocchi della Costa dei Trabocchi al lago di Scanno fino al Gran Sasso e alla Majella. La Majella è un geoparco UNESCO.', photoAlt: 'Il lago di Scanno color smeraldo a forma di cuore tra i monti abruzzesi', caption: 'Lago di Scanno · il cuore smeraldo dell’Abruzzo', photos: [{ label: 'Lago di Scanno', alt: 'Il lago di Scanno color smeraldo a forma di cuore tra i monti abruzzesi' }] },
    ],
  },
  COMMUNITY: {
    en: [
      { label: 'Easter Monday with our clients', alt: 'Video from Easter Monday with clients at a seaside restaurant' },
      { label: 'Lunch together with clients', alt: 'Clients at a shared lunch in a seaside restaurant' },
      { label: 'Congratulating new owners at the notary', alt: 'New owners with their keys in a notary’s office' },
      { label: 'Dancing on Easter Monday', alt: 'Clients dancing on a seaside restaurant terrace' },
      { label: 'A client happy to own a property', alt: 'A client with outstretched arms in the sea' },
      { label: 'Trip with clients to Lake Scanno', alt: 'A trip with clients to a viewpoint above Lake Scanno' },
      { label: 'Summer celebration, Ferragosto', alt: 'A summer party on the beach in Santa hats' },
      { label: 'A client’s birthday party', alt: 'A birthday cake with sparklers at a client’s party' },
      { label: 'A moved client', alt: 'A moved client in her flat' },
    ],
    it: [
      { label: 'Lunedì dell’Angelo con i nostri clienti', alt: 'Video del Lunedì dell’Angelo con i clienti in un ristorante sul mare' },
      { label: 'Pranzo insieme ai clienti', alt: 'Clienti a un pranzo comune in un ristorante sul mare' },
      { label: 'Congratulazioni ai nuovi proprietari dal notaio', alt: 'Nuovi proprietari con le chiavi nello studio notarile' },
      { label: 'Balli il Lunedì dell’Angelo', alt: 'Clienti che ballano sulla terrazza di un ristorante sul mare' },
      { label: 'Una cliente felice di avere casa', alt: 'Una cliente con le braccia aperte nel mare' },
      { label: 'Gita con i clienti al lago di Scanno', alt: 'Gita con le clienti al belvedere sopra il lago di Scanno' },
      { label: 'Festa d’estate, Ferragosto', alt: 'Festa estiva sulla spiaggia con i cappelli di Babbo Natale' },
      { label: 'Festa di compleanno di una cliente', alt: 'Torta di compleanno con scintille alla festa di una cliente' },
      { label: 'Una cliente commossa', alt: 'Una cliente commossa nel suo appartamento' },
    ],
  },
  RENO_PAIRS: {
    en: [{ title: 'A client’s flat from Ostrava', before: 'The original kitchen before renovation', after: 'The new kitchen with a dining table after renovation' }],
    it: [{ title: 'L’appartamento di un cliente di Ostrava', before: 'La cucina originale prima della ristrutturazione', after: 'La nuova cucina con tavolo da pranzo dopo la ristrutturazione' }],
  },
  RENO_DONE: {
    en: [
      { alt: 'Living room with a corner sofa and a light strip under the ceiling', label: 'Living room' },
      { alt: 'Kitchen with a dining table in a loft flat', label: 'Kitchen and dining area' },
      { alt: 'Bedroom in a studio renovated for short-term rental', label: 'Studio for rental' },
      { alt: 'Bedroom with an upholstered headboard in a loft', label: 'Bedroom' },
    ],
    it: [
      { alt: 'Soggiorno con divano angolare e striscia luminosa sotto il soffitto', label: 'Soggiorno' },
      { alt: 'Cucina con tavolo da pranzo in un appartamento mansardato', label: 'Cucina e zona pranzo' },
      { alt: 'Camera da letto in un monolocale ristrutturato per affitti brevi', label: 'Monolocale per affitto' },
      { alt: 'Camera da letto con testiera imbottita in una mansarda', label: 'Camera da letto' },
    ],
  },
  REELS: {
    en: [
      { title: 'My beginnings', theme: 'My journey' },
      { title: 'A look inside a flat in Italy', theme: 'Properties' },
      { title: 'Behind the scenes at the RE/MAX Convention', theme: 'My work' },
      { title: 'Invest in yourself too', theme: 'Life by the sea' },
      { title: 'A studio with a sea view', theme: 'Properties' },
      { title: 'Turnkey renovation', theme: 'My work' },
      { title: 'Why Abruzzo', theme: 'Life in Abruzzo' },
      { title: 'RE/MAX award', theme: 'My work' },
    ],
    it: [
      { title: 'I miei inizi', theme: 'Il mio percorso' },
      { title: 'Uno sguardo in un appartamento in Italia', theme: 'Immobili' },
      { title: 'Dietro le quinte della RE/MAX Convention', theme: 'Il mio lavoro' },
      { title: 'Investi anche in te stessa', theme: 'Vita al mare' },
      { title: 'Monolocale con vista mare', theme: 'Immobili' },
      { title: 'Ristrutturazione chiavi in mano', theme: 'Il mio lavoro' },
      { title: 'Perché proprio l’Abruzzo', theme: 'Vita in Abruzzo' },
      { title: 'Premio RE/MAX', theme: 'Il mio lavoro' },
    ],
  },
  ABOUT: {
    en: {
      text: 'I have been working in Abruzzo for 20 years. Thanks to local contacts I look for properties for Czech clients beyond public listings and guide them personally through the purchase. I work with vetted Italian partners and, after the keys are handed over, I also help with renovation, management and rental.',
      alt: 'Bc. Zuzana Bajgerová on a terrace by the sea in Abruzzo',
      awards: [
        'Most successful agent of the month in the RE/MAX Czech Republic network, 1st place (July 2025)',
        '6th place in the RE/MAX Czech Republic Top 10 (2025)',
        'Platinum · RE/MAX',
        'Hall of Fame · RE/MAX',
      ],
    },
    it: {
      text: 'Lavoro in Abruzzo da 20 anni. Grazie ai contatti locali cerco per i clienti cechi immobili anche fuori dagli annunci pubblici e li accompagno personalmente nell’acquisto. Collaboro con partner italiani verificati e, dopo la consegna delle chiavi, aiuto anche con ristrutturazione, gestione e affitto.',
      alt: 'Bc. Zuzana Bajgerová su una terrazza sul mare in Abruzzo',
      awards: [
        'Agente del mese più performante della rete RE/MAX Repubblica Ceca, 1° posto (luglio 2025)',
        '6° posto nella Top 10 RE/MAX Repubblica Ceca (2025)',
        'Platinum · RE/MAX',
        'Hall of Fame · RE/MAX',
      ],
    },
  },
} as const;

type PartialItem = Record<string, unknown>;
function merge<B extends object>(base: B[], over: readonly PartialItem[] | undefined): B[] {
  if (!over) return base;
  return base.map((b, i) => ({ ...b, ...(over[i] ?? {}) }) as B);
}

export function homeData(locale: Locale) {
  if (locale === 'cs') {
    return { HERO, PROOF, FEARS, PRICE_IN, PRICE_OUT, PILLARS, AFTER, FAQ, GUIDES, QUICK_PICKS, SERVICES_CARDS, WHY_ABRUZZO, COMMUNITY_MEDIA, RENO_PAIRS, RENO_DONE, INSTAGRAM_REELS, ABOUT };
  }
  const l = locale as L;
  return {
    HERO: { ...HERO, ...T.HERO[l] },
    PROOF: merge(PROOF, T.PROOF[l]),
    FEARS: merge(FEARS, T.FEARS[l]),
    PRICE_IN: [...T.PRICE_IN[l]] as string[],
    PRICE_OUT: [...T.PRICE_OUT[l]] as string[],
    PILLARS: merge(PILLARS, T.PILLARS[l]),
    AFTER: merge(AFTER, T.AFTER[l]),
    FAQ: [...T.FAQ[l]] as { q: string; a: string }[],
    GUIDES: GUIDES.map((g, i) => ({ ...g, kicker: T.GUIDES[l][i].kicker, title: T.GUIDES[l][i].title, image: { ...g.image, alt: T.GUIDES[l][i].alt } })),
    QUICK_PICKS: QUICK_PICKS.map((q, i) => ({ ...q, label: T.QUICK_PICKS[l][i] })),
    SERVICES_CARDS,
    WHY_ABRUZZO: WHY_ABRUZZO.map((w, i) => {
      const t = T.WHY[l][i];
      return { ...w, title: t.title, text: t.text, photoAlt: t.photoAlt, caption: t.caption, photos: w.photos.map((p, j) => ({ ...p, label: t.photos[j].label, alt: t.photos[j].alt })) };
    }),
    COMMUNITY_MEDIA: merge(COMMUNITY_MEDIA, T.COMMUNITY[l]),
    RENO_PAIRS: RENO_PAIRS.map((r, i) => ({ title: T.RENO_PAIRS[l][i].title, before: { ...r.before, alt: T.RENO_PAIRS[l][i].before }, after: { ...r.after, alt: T.RENO_PAIRS[l][i].after } })),
    RENO_DONE: merge(RENO_DONE, T.RENO_DONE[l]),
    INSTAGRAM_REELS: merge(INSTAGRAM_REELS, T.REELS[l]),
    ABOUT: { ...ABOUT, text: T.ABOUT[l].text, photo: { ...ABOUT.photo, alt: T.ABOUT[l].alt }, awards: [...T.ABOUT[l].awards] },
  };
}

export const HOME_FAQ_OVERRIDES = { price: T.HOME_FAQ_PRICE, rent: T.HOME_FAQ_RENT };
