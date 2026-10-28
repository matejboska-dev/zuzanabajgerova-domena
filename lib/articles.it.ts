import type { ArticleText } from './articles';

const NOTE = 'Importi indicativi, aggiornati a ottobre 2026. Aliquote e procedure cambiano: prima di firmare confermale sempre con il notaio e con un commercialista.';

export const ARTICLES_IT: Record<string, ArticleText> = {
  'kolik-stoji-koupe-domu-v-italii': {
    slug: 'quanto-costa-davvero-comprare-casa-in-italia',
    title: 'Quanto costa davvero comprare casa in Italia',
    description: 'Il prezzo di acquisto non è la cifra finale. Imposte, notaio, provvigione e costi annuali per l’acquisto di una casa in Italia, con un esempio di calcolo per una casa da 120.000 €.',
    category: 'Costi',
    imageAlt: 'Visita di una casa in Abruzzo prima dell’acquisto',
    summary: 'Al prezzo dell’annuncio aggiungi indicativamente dall’8 al 15%: imposta di registro, notaio, provvigione dell’agenzia e piccole spese. La voce più pesante di solito è l’imposta, che per una seconda casa è il 9% del valore catastale, non del prezzo.',
    sections: [
      { id: 'costi-extra', h: 'Cosa si paga oltre al prezzo di acquisto', blocks: [
        { t: 'p', text: 'Il prezzo dell’annuncio è il prezzo dell’immobile. I costi del trasferimento si pagano a parte e la maggior parte viene calcolata dal notaio solo alla preparazione del contratto. Per questo conviene tenere una riserva fin dall’inizio della ricerca.' },
        { t: 'table', head: ['Voce', 'Importo indicativo', 'Nota'], rows: [
          ['Imposta di registro', '9% del valore catastale, minimo 1.000 €', 'Per la seconda casa o l’immobile di vacanza. L’aliquota del 2% vale solo per la prima casa.'],
          ['Imposte ipotecaria e catastale', '2 × 50 €', 'Importi fissi per l’acquisto da un privato.'],
          ['Notaio', 'alcune migliaia di euro', 'Dipende dal prezzo e dalla complessità. Il notaio indica l’importo in anticipo.'],
          ['Provvigione dell’agenzia', 'in genere circa il 3% + IVA', 'In Italia di solito pagano entrambe le parti. Fai confermare l’importo per iscritto.'],
          ['Perizia tecnica (geometra)', 'centinaia di euro', 'Verifica la conformità della casa al catasto e ai documenti edilizi. Sempre consigliata.'],
          ['Traduzioni, procura, interprete', 'secondo necessità', 'Se non firmi di persona o non parli italiano.'],
        ], note: NOTE },
      ] },
      { id: 'imposta-di-registro', h: 'Perché l’imposta si calcola sul valore catastale', blocks: [
        { t: 'p', text: 'Nell’acquisto da un privato l’imposta di registro si calcola sul valore catastale, di solito molto più basso del prezzo reale. Per questo l’imposta effettiva risulta spesso inferiore a quanto suggerisce la percentuale. Il notaio trova il valore catastale in catasto e lo riporta nel prospetto dei costi.' },
        { t: 'p', text: 'L’aliquota del 2% per la prima casa è vincolata a condizioni, soprattutto alla residenza nel comune in cui si trova l’immobile. La maggior parte degli acquirenti stranieri compra una casa vacanze e paga quindi il 9%. Se ti trasferisci stabilmente in Italia, verifica in anticipo con il notaio il diritto all’aliquota agevolata.' },
        { t: 'callout', title: 'Comprare da un costruttore è diverso', text: 'Per una casa nuova acquistata da un’impresa si paga l’IVA al posto dell’imposta di registro: 4%, 10% o 22% in base al tipo di immobile. Anche le imposte fisse sono diverse rispetto all’acquisto da un privato.' },
      ] },
      { id: 'esempio', h: 'Esempio: casa vacanze da 120.000 €', blocks: [
        { t: 'p', text: 'Un esempio semplificato per una casa acquistata da un privato. Ipotizziamo un valore catastale di 40.000 €, un notaio da 2.500 € e una provvigione del 3% sul prezzo più IVA al 22%. I numeri reali cambiano per ogni immobile.' },
        { t: 'table', head: ['Voce', 'Importo'], rows: [
          ['Imposta di registro, 9% di 40.000 €', '3.600 €'],
          ['Imposte ipotecaria e catastale', '100 €'],
          ['Notaio (ipotesi)', '2.500 €'],
          ['Provvigione 3% di 120.000 € + IVA 22%', '4.392 €'],
          ['Geometra e piccole spese (ipotesi)', '700 €'],
          ['Totale costi', 'circa 11.300 €'],
        ], note: 'Sono circa il 9,4% del prezzo. Il risultato è puramente illustrativo, non è un’offerta né una consulenza fiscale.' },
      ] },
      { id: 'costi-annuali', h: 'Costi annuali dopo l’acquisto', blocks: [
        { t: 'p', text: 'Dopo l’acquisto iniziano le normali spese di gestione. Conviene metterle in conto nel budget:' },
        { t: 'ul', items: [
          'IMU, l’imposta municipale sugli immobili. Si paga sulla seconda casa, non sull’abitazione principale. Si calcola sul valore catastale, quindi sono in genere alcune centinaia di euro l’anno.',
          'TARI, la tassa sui rifiuti.',
          'Energia, acqua, internet e assicurazione della casa.',
          'Spese condominiali se acquisti un appartamento o una casa in un edificio comune.',
          'Manutenzione e riparazioni. Le case più vecchie in Abruzzo spesso richiedono interventi su tetto, riscaldamento o impianti.',
        ] },
        { t: 'p', text: 'Se prevedi di affittare, considera anche le imposte sul reddito da locazione e i costi di gestione. Fai verificare l’impostazione fiscale da un commercialista.' },
      ] },
      { id: 'evitare-sorprese', h: 'Come evitare brutte sorprese', blocks: [
        { t: 'ul', items: [
          'Prima di fare un’offerta chiedi un prospetto dettagliato di tutti i costi.',
          'Chiedi se il prezzo dell’annuncio include la provvigione oppure no.',
          'Fai verificare la conformità catastale della casa (geometra) prima di versare la caparra.',
          'Prevedi a parte il budget per ristrutturazione e arredamento.',
          'Prova il calcolatore indicativo nella pagina Informazioni pratiche.',
        ] },
      ] },
    ],
    faq: [
      { q: 'Che percentuale del prezzo rappresentano i costi aggiuntivi in Italia?', a: 'Indicativamente dall’8 al 15% del prezzo. La parte maggiore è l’imposta di registro (9% del valore catastale per una casa vacanze), poi notaio e provvigione.' },
      { q: 'Uno straniero paga più di un italiano per comprare casa?', a: 'Non per la cittadinanza. Conta se si tratta di prima casa (aliquota 2%) o seconda casa (9%). La maggior parte degli stranieri compra una seconda casa.' },
      { q: 'Chi paga il notaio?', a: 'Di solito l’acquirente. Il notaio garantisce la sicurezza del trasferimento e indica tutte le spese prima della firma.' },
      { q: 'Quando si paga la provvigione all’agenzia?', a: 'Di solito alla firma del preliminare o del contratto definitivo, secondo gli accordi. Fai sempre confermare per iscritto le condizioni della provvigione.' },
    ],
    cta: { title: 'Calcoliamolo', accent: 'sul tuo immobile', text: 'Mandami il link di una casa che ti interessa e ti mostro quali costi si aggiungono al prezzo.', label: 'Apri il calcolatore dei costi' },
  },
  'domy-za-1-euro-jak-to-je-doopravdy': {
    slug: 'case-a-1-euro-come-stanno-davvero-le-cose',
    title: 'Case a 1 euro: come stanno davvero le cose',
    description: 'Le case a 1 euro in Italia non sono gratis. Cosa richiedono i comuni, quanto costa la ristrutturazione, i rischi e quando conviene un normale immobile economico.',
    category: 'Acquisto',
    imageAlt: 'Giardino accanto a una casa in pietra in Abruzzo',
    summary: 'In Italia una casa a 1 euro si può davvero comprare, ma per quel prezzo non ricevi una casa finita. Il comune ti obbliga a ristrutturare entro una scadenza, a versare una cauzione e a pagare notaio e imposte. L’investimento totale di solito si conta in decine di migliaia di euro.',
    sections: [
      { id: 'cose', h: 'Cos’è il programma delle case a 1 euro', blocks: [
        { t: 'p', text: 'Diversi comuni italiani, per lo più piccoli borghi in via di spopolamento, offrono case abbandonate a 1 € simbolico. L’obiettivo del comune non è vendere un immobile, ma riportare nel paese nuovi abitanti e case ristrutturate. Le condizioni le stabilisce ogni comune: non esiste un programma nazionale.' },
      ] },
      { id: 'condizioni', h: 'Cosa richiedono di solito i comuni', blocks: [
        { t: 'ul', items: [
          'Presentare un progetto di ristrutturazione e ottenere il titolo edilizio.',
          'Terminare i lavori entro una scadenza, spesso da 1 a 3 anni.',
          'Versare una cauzione (garanzia bancaria o assicurativa), spesso nell’ordine di alcune migliaia di euro. Viene restituita a lavori ultimati.',
          'Pagare notaio, imposte e spese di trasferimento.',
          'In alcuni comuni, impegnarsi a non vendere la casa per uno o due anni.',
        ] },
        { t: 'p', text: 'Le condizioni cambiano. Verifica sempre le regole attuali direttamente con il comune prima di rispondere a un’offerta.' },
      ] },
      { id: 'costi-reali', h: 'Quanto costa davvero', blocks: [
        { t: 'table', head: ['Voce', 'Importo indicativo'], rows: [
          ['Prezzo di acquisto', '1 €'],
          ['Notaio, imposte e spese', 'alcune migliaia di euro'],
          ['Progetto e tecnico', 'migliaia di euro'],
          ['Cauzione (restituita a lavori ultimati)', 'spesso da 2.000 a 5.000 €'],
          ['Ristrutturazione', 'decine di migliaia di euro, di solito di più per le case nei centri storici in pietra'],
        ], note: NOTE },
        { t: 'p', text: 'Queste case restano spesso inutilizzate per decenni: tetto, struttura, impianti e infissi richiedono frequentemente un rifacimento completo. La ristrutturazione costa perciò di solito più dell’acquisto di una casa più piccola in buono stato.' },
      ] },
      { id: 'rischi', h: 'I rischi a cui non si pensa', blocks: [
        { t: 'ul', items: [
          'Posizione. I borghi sono spesso isolati, con pochi servizi, collegamenti più scarsi e poco interesse da parte di futuri acquirenti o inquilini.',
          'Proprietà. Una casa vecchia può avere più comproprietari o un’eredità non definita.',
          'Scadenze. Un ritardo nei lavori può costare la cauzione.',
          'Gestione a distanza. Cantiere, artigiani e uffici si seguono da lontano e in italiano.',
          'Disponibilità. Le offerte cambiano in fretta e molti borghi hanno già chiuso il programma.',
        ] },
      ] },
      { id: 'per-chi', h: 'Per chi ha senso e cosa considerare in alternativa', blocks: [
        { t: 'p', text: 'La casa a 1 euro ha senso per chi vuole un progetto di ristrutturazione, ha tempo e budget e ama il borgo in sé. Come strada economica verso un appartamento vacanze sul mare o come investimento, per lo più non è adatta.' },
        { t: 'p', text: 'Se l’obiettivo è abitare o affittare, spesso conviene comprare un piccolo appartamento o una casa in buono stato vicino alla costa e ai servizi, oppure un immobile che richiede solo una ristrutturazione leggera. Trovi opzioni concrete in Abruzzo negli annunci degli immobili e nella panoramica delle località.' },
      ] },
    ],
    faq: [
      { q: 'La casa a 1 euro costa davvero 1 euro?', a: 'Il prezzo di acquisto è 1 €, ma si aggiungono notaio, imposte, progetto, cauzione e soprattutto la ristrutturazione. L’investimento totale si conta in decine di migliaia di euro.' },
      { q: 'Uno straniero può comprare una casa a 1 euro?', a: 'Di solito sì; le condizioni le stabilisce il comune. In genere servono il codice fiscale italiano e l’impegno a ristrutturare entro una scadenza.' },
      { q: 'Ci sono case a 1 euro in Abruzzo?', a: 'I programmi sono frammentati in tutta Italia e cambiano rapidamente. Verifica sempre le offerte attuali direttamente con il comune interessato.' },
      { q: 'Una casa a 1 euro conviene come investimento?', a: 'Di solito no. Una posizione isolata e gli alti costi di ristrutturazione spesso significano un rendimento inferiore rispetto a un immobile in una zona più accessibile.' },
    ],
    cta: { title: 'Cerchi un immobile', accent: 'più economico da ristrutturare?', text: 'Scrivimi budget e progetto. Ti mostro le opzioni realistiche in Abruzzo, compreso quanto costerebbe la ristrutturazione.', label: 'Prenota una consulenza' },
  },
  'codice-fiscale-pro-cechy-a-slovaky': {
    slug: 'codice-fiscale-come-ottenerlo-per-comprare-casa',
    title: 'Codice fiscale: come ottenerlo e perché serve per comprare',
    metaTitle: 'Codice fiscale per stranieri: come ottenerlo',
    description: 'Il codice fiscale è indispensabile per comprare casa o attivare le utenze. Dove e come ottenerlo da cittadino ceco o slovacco, cosa portare e quanto costa.',
    category: 'Acquisto',
    imageAlt: 'Veduta di Pescara e delle colline circostanti in Abruzzo',
    summary: 'Il codice fiscale è un codice italiano di 16 caratteri. Senza non puoi firmare un contratto di acquisto, attivare le utenze o aprire un conto. I cittadini cechi e slovacchi lo ottengono gratuitamente presso l’Agenzia delle Entrate in Italia o tramite una rappresentanza diplomatica italiana.',
    sections: [
      { id: 'a-cosa-serve', h: 'A cosa serve il codice fiscale', blocks: [
        { t: 'p', text: 'Il codice fiscale è il numero che identifica una persona fisica per le autorità italiane. Serve per comprare un immobile, intestare le utenze, aprire un conto, stipulare un’assicurazione o pagare le imposte sui redditi da affitto. Il notaio lo richiede già in fase di preparazione del contratto.' },
      ] },
      { id: 'come-ottenerlo', h: 'Come ottenerlo', blocks: [
        { t: 'ul', items: [
          'In Italia, presso un ufficio dell’Agenzia delle Entrate. Di solito lo ricevi sul posto, spesso lo stesso giorno.',
          'Tramite una rappresentanza diplomatica italiana. I cittadini cechi e slovacchi possono rivolgersi all’ambasciata d’Italia a Praga o a Bratislava; verifica la procedura e i tempi aggiornati.',
          'Tramite un delegato. Può fare richiesta anche una persona da te autorizzata. Verifica la forma richiesta per la procura.',
        ] },
        { t: 'p', text: 'La richiesta si presenta sul modulo per le persone fisiche fornito dall’ufficio. Il codice viene rilasciato gratuitamente.' },
      ] },
      { id: 'cosa-preparare', h: 'Cosa preparare', blocks: [
        { t: 'ul', items: [
          'Carta d’identità o passaporto in corso di validità.',
          'Il modulo di richiesta compilato.',
          'I dati su luogo e data di nascita e sulla residenza.',
          'In caso di delega, la procura e il documento del delegato.',
        ] },
        { t: 'callout', title: 'Procuralo prima delle visite', text: 'Il codice fiscale serve al più tardi per il preliminare. Ottenerlo non richiede molto, ma lascia un po’ di tempo per non doverlo cercare all’ultimo momento.' },
      ] },
      { id: 'verifica', h: 'Come verificare che il codice sia corretto', blocks: [
        { t: 'p', text: 'Il codice ha 16 caratteri, lettere e cifre, e deriva da nome, data e luogo di nascita. Controlla che nome, cognome e data di nascita coincidano con il documento, per evitare ritardi dal notaio.' },
      ] },
    ],
    faq: [
      { q: 'Mi serve il codice fiscale per comprare un immobile in Italia?', a: 'Sì. Il notaio lo richiede per il trasferimento, le imposte e la registrazione. Senza non si può comprare un immobile.' },
      { q: 'Quanto costa il codice fiscale?', a: 'Il rilascio è gratuito.' },
      { q: 'Devo recarmi di persona in Italia?', a: 'Non necessariamente. Puoi fare richiesta tramite una rappresentanza diplomatica italiana o delegare un rappresentante. Verifica in anticipo procedura e documenti necessari.' },
      { q: 'Il codice fiscale è come un numero di identificazione fiscale?', a: 'È il numero di identificazione fiscale di una persona fisica in Italia. Per autorità e banche italiane funziona in modo simile a un numero fiscale personale.' },
    ],
    cta: { title: 'Non vuoi occuparti', accent: 'delle pratiche da solo?', text: 'Codice fiscale, notaio e documenti: li gestisco regolarmente con i clienti. Fissiamo una prima telefonata senza impegno.', label: 'Fissa una telefonata' },
  },
};
