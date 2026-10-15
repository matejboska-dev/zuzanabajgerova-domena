import type { Locale } from './i18n';

type PurchaseLayout = {
  presence: string; presenceAccent: string; presenceText: string[]; presenceNote: string;
  support: string; supportAccent: string; supportLead: string;
  sea: string; notary: string; landscape: string; coast: string; photo: string;
  introCta: string; searchCta: string; priceCta: string; budgetCta: string; proofCta: string;
  facts: { title: string; text: string }[];
  proofLead: string; proofPoints: string[];
  community: string; communityAccent: string; communityText: string; communityCaption: string; communityCta: string;
  faqLead: string; faqCta: string; next: string; nextAccent: string; contactNote: string;
};

export const PURCHASE_LAYOUT: Record<Locale, PurchaseLayout> = {
  cs: {
    presence: 'V Abruzzu žiji.', presenceAccent: 'Za vás jednám osobně.',
    presenceText: ['Už 20 let je mým domovem Abruzzo. Žiji v Montesilvanu, znám místní prostředí a spolupracuji s ověřenými italskými realitními partnery, notářem i technickými odborníky.', 'Vyjednávání je moje silná stránka. Za vás řeším cenu, podmínky i komunikaci s italskou stranou. Vy se můžete rozhodovat podle toho, co je důležité pro vás.'],
    presenceNote: 'Nákup nekončí podpisem. Na místě máte mě i mé asistentky, které vám pomohou s navazujícím základním servisem.',
    support: 'Víc než prohlídka.', supportAccent: 'Doprovod celou koupí.', supportLead: 'Od hledání vhodného bytu přes jednání s prodávajícím až po praktické věci po převzetí klíčů. Víte, na koho se obrátit.',
    sea: 'Prostor pro váš život u moře', notary: 'Osobní doprovod u notáře', landscape: 'Montesilvano. Místo, kde jsem doma.', coast: 'Pobřeží Pescary a Montesilvana', photo: 'Zuzana Bajgerová na terase u moře',
    introCta: 'Probrat moji představu', searchCta: 'Napsat, co hledám', priceCta: 'Probrat cenu koupě', budgetCta: 'Probrat celý rozpočet', proofCta: 'Chci probrat vlastní koupi',
    facts: [{ title: 'V češtině', text: 'Rozumíte jednotlivým krokům. Komunikaci s italskou stranou vedu já.' }, { title: 'Konečná cena', text: 'Cena zveřejněné nabídky zahrnuje převodní daň, notáře i naši provizi.' }, { title: 'I po koupi', text: 'První rok základního servisu s místními asistentkami je součástí provize.' }],
    proofLead: 'O koupi se nejlépe mluví s někým, kdo ji už prožil.', proofPoints: ['Poslechněte si osobní zkušenost Petry Chelíkové.', 'Potom mi napište, jakou nemovitost hledáte vy.', 'Probereme vaši představu, rozpočet a možnosti dalšího postupu.'],
    community: 'Vlastní klíče.', communityAccent: 'A lidé, na které se obrátíte.', communityText: 'S klienty se potkáváme i po koupi. U společného oběda, na pláži nebo při dalších plánech s jejich bytem. Nový domov v Itálii nemusí znamenat, že na všechno zůstanete sami.', communityCaption: 'Společné chvíle s našimi klienty v Abruzzu', communityCta: 'Probrat život v Abruzzu',
    faqLead: 'Máte jinou otázku? Napište mi ji rovnou. Nejlépe vám poradím, když připojíte i svou představu o nemovitosti.', faqCta: 'Zeptat se na WhatsAppu', next: 'Co může přijít', nextAccent: 'po předání klíčů.', contactNote: 'Stačí typ nemovitosti, přibližný rozpočet a kdy byste chtěli kupovat. Nemusíte mít vybranou konkrétní nabídku.',
  },
  en: {
    presence: 'Abruzzo is my home.', presenceAccent: 'I act for you in person.',
    presenceText: ['I have lived in Abruzzo for 20 years. My home is Montesilvano, where I work with trusted Italian property partners, a notary and local technical professionals.', 'Negotiation is one of my strengths. I handle the price, terms and communication with the Italian parties, so you can decide based on what matters to you.'],
    presenceNote: 'Signing is not the end of our work together. My local assistants and I can help with the agreed basic support after your purchase.',
    support: 'More than a viewing.', supportAccent: 'Support through the purchase.', supportLead: 'From finding a suitable apartment and dealing with the seller to the practical steps after you receive the keys. You know whom to contact.',
    sea: 'Room for your life by the sea', notary: 'Personal support at the notary', landscape: 'Montesilvano. The place I call home.', coast: 'The coast of Pescara and Montesilvano', photo: 'Zuzana Bajgerová on a seaside terrace',
    introCta: 'Discuss my plans', searchCta: 'Describe my ideal home', priceCta: 'Discuss the purchase price', budgetCta: 'Discuss my full budget', proofCta: 'Discuss my own purchase',
    facts: [{ title: 'Clear communication', text: 'Understand each step. I coordinate communication with the Italian parties.' }, { title: 'A final price', text: 'The advertised property price includes transfer tax, the notary and our commission.' }, { title: 'After the keys', text: 'Our commission includes the first year of basic support with local assistants.' }],
    proofLead: 'Hear from someone who has already made the move.', proofPoints: ['Listen to Petra Chelíková’s personal experience, in Czech.', 'Then tell me what kind of property you are looking for.', 'We will discuss your plans, budget and possible next steps.'],
    community: 'Your own keys.', communityAccent: 'People you can turn to.', communityText: 'We stay in touch with clients after the purchase: over lunch, at the beach or while discussing their next plans for the property. A new home in Italy does not have to mean figuring everything out alone.', communityCaption: 'Time together with our clients in Abruzzo', communityCta: 'Discuss life in Abruzzo',
    faqLead: 'Have another question? Send it directly. A few details about your property plans will help me give you a useful answer.', faqCta: 'Ask on WhatsApp', next: 'What comes', nextAccent: 'after the keys.', contactNote: 'Tell me the property type, your approximate budget and preferred timing. You do not need to have chosen a listing.',
  },
  it: {
    presence: 'Vivo in Abruzzo.', presenceAccent: 'Ti affianco di persona.',
    presenceText: ['L’Abruzzo è la mia casa da 20 anni. Vivo a Montesilvano e collaboro con partner immobiliari italiani di fiducia, un notaio e professionisti tecnici del territorio.', 'La trattativa è uno dei miei punti di forza. Mi occupo del prezzo, delle condizioni e dei contatti con le parti coinvolte, per aiutarti a decidere in base alle tue priorità.'],
    presenceNote: 'La collaborazione non termina con la firma. Io e le mie assistenti sul posto ti aiutiamo con l’assistenza di base concordata dopo l’acquisto.',
    support: 'Oltre la visita.', supportAccent: 'Al tuo fianco fino alle chiavi.', supportLead: 'Dalla ricerca dell’appartamento al confronto con il venditore, fino agli aspetti pratici dopo la consegna. Sai sempre a chi rivolgerti.',
    sea: 'Spazio per la tua vita al mare', notary: 'Assistenza personale dal notaio', landscape: 'Montesilvano. Il luogo in cui vivo.', coast: 'La costa di Pescara e Montesilvano', photo: 'Zuzana Bajgerová su una terrazza sul mare',
    introCta: 'Parliamo del mio progetto', searchCta: 'Descrivo la casa che cerco', priceCta: 'Parliamo del prezzo', budgetCta: 'Parliamo del budget completo', proofCta: 'Parliamo del mio acquisto',
    facts: [{ title: 'Passaggi chiari', text: 'Ti accompagno nelle varie fasi e coordino i contatti con le parti coinvolte.' }, { title: 'Prezzo finale', text: 'Il prezzo pubblicato comprende l’imposta sul trasferimento, il notaio e la nostra provvigione.' }, { title: 'Dopo l’acquisto', text: 'La provvigione include il primo anno di assistenza di base con le assistenti locali.' }],
    proofLead: 'Ascolta chi ha già vissuto questa esperienza.', proofPoints: ['Petra Chelíková racconta la sua esperienza personale, in ceco.', 'Poi raccontami che tipo di immobile cerchi tu.', 'Parleremo del progetto, del budget e dei prossimi passi possibili.'],
    community: 'Le chiavi di casa.', communityAccent: 'E persone su cui contare.', communityText: 'Continuiamo a incontrare i clienti anche dopo l’acquisto: a pranzo, in spiaggia o per parlare dei prossimi progetti per la casa. Una nuova vita in Italia non significa dover affrontare tutto da soli.', communityCaption: 'Momenti insieme ai nostri clienti in Abruzzo', communityCta: 'Parliamo della vita in Abruzzo',
    faqLead: 'Hai un’altra domanda? Scrivimi direttamente. Qualche dettaglio sull’immobile che cerchi mi aiuterà a darti una risposta utile.', faqCta: 'Chiedi su WhatsApp', next: 'Come continuare', nextAccent: 'dopo le chiavi.', contactNote: 'Indicami il tipo di immobile, il budget orientativo e quando vorresti acquistare. Non serve aver già scelto un annuncio.',
  },
};
