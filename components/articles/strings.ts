import type { Locale } from '@/lib/i18n';

// texty rozhrani blogu (clanky samotne jsou v lib/articles*.ts)
export const BLOG_UI: Record<
  Locale,
  {
    home: string; blog: string; blogTitle: string; lead: string; badge: string; heroTitle: string; heroAccent: string;
    latest: string; latestAccent: string; minRead: string; preparedBy: string; updated: string; toc: string; faq: string;
    faqHref: string; disclaimerA: string; guide: string; and: string; practical: string; readOn: string; crumbsAria: string;
    guideCta: string; topics: string; topicsPick: string; topicsAccent: string;
    pillarTitle: string; pillarDesc: string; pillarMore: string; pillarAlt: string;
    watchTitle: string; watchAccent: string; watchText: string; watchLabel: string;
  }
> = {
  cs: {
    home: 'Domů', blog: 'Blog', blogTitle: 'Blog o koupi nemovitosti v Itálii',
    lead: 'Odpovědi na otázky, které lidé řeší dřív, než osloví makléře. Koupě, náklady, lokality, život v Itálii a investice.',
    badge: 'Blog · Průvodci', heroTitle: 'Než se rozhodnete,', heroAccent: 'přečtěte si tohle',
    latest: 'Nejnovější', latestAccent: 'články', minRead: 'min čtení', preparedBy: 'Připravila', updated: 'aktualizováno',
    toc: 'Obsah článku', faq: 'Časté otázky', faqHref: 'casto-kladene-otazky',
    disclaimerA: 'Článek slouží k orientaci a nenahrazuje radu notáře ani daňového poradce. Další souvislosti najdete v',
    guide: 'průvodci koupí nemovitosti v Itálii', and: 'a v', practical: 'praktických informacích', readOn: 'Čtěte dál',
    crumbsAria: 'Obsah článku', guideCta: 'Průvodce koupí krok za krokem', topics: 'Témata', topicsPick: 'Vyberte si', topicsAccent: 'téma',
    pillarTitle: 'Jak koupit nemovitost v Itálii, krok za krokem',
    pillarDesc: '8 kroků, náklady s kalkulačkou, plná moc, 7 chyb a slovníček italských pojmů.',
    pillarMore: 'Číst průvodce', pillarAlt: 'Podpis dokumentů při koupi nemovitosti',
    watchTitle: 'Hlídejte si', watchAccent: 'nové nabídky',
    watchText: 'Napište mi, co hledáte, a jakmile budu mít nabídku podle vašeho zadání, pošlu vám ji e-mailem.',
    watchLabel: 'Nastavit hlídač nabídek',
  },
  en: {
    home: 'Home', blog: 'Blog', blogTitle: 'Blog: buying property in Italy',
    lead: 'Answers to the questions people ask before they contact an agent. Buying, costs, locations, life in Italy and investment.',
    badge: 'Blog · Guides', heroTitle: 'Before you decide,', heroAccent: 'read this',
    latest: 'Latest', latestAccent: 'articles', minRead: 'min read', preparedBy: 'By', updated: 'updated',
    toc: 'Table of contents', faq: 'Frequently asked questions', faqHref: 'faq',
    disclaimerA: 'This article is for orientation and does not replace advice from a notary or tax adviser. More context in the',
    guide: 'guide to buying property in Italy', and: 'and the', practical: 'practical information page', readOn: 'Keep reading',
    crumbsAria: 'Table of contents', guideCta: 'Step-by-step buying guide', topics: 'Topics', topicsPick: 'Choose a', topicsAccent: 'topic',
    pillarTitle: 'How to buy property in Italy, step by step',
    pillarDesc: '8 steps, costs with a calculator, power of attorney, 7 mistakes and a glossary of Italian terms.',
    pillarMore: 'Read the guide', pillarAlt: 'Signing documents when buying a property',
    watchTitle: 'Get alerts for', watchAccent: 'new listings',
    watchText: 'Tell me what you are looking for and as soon as I have a listing that matches, I will email it to you.',
    watchLabel: 'Set up listing alerts',
  },
  it: {
    home: 'Home', blog: 'Blog', blogTitle: 'Blog: comprare casa in Italia',
    lead: 'Risposte alle domande che ci si pone prima di contattare un agente. Acquisto, costi, località, vita in Italia e investimento.',
    badge: 'Blog · Guide', heroTitle: 'Prima di decidere,', heroAccent: 'leggi questo',
    latest: 'Ultimi', latestAccent: 'articoli', minRead: 'min di lettura', preparedBy: 'A cura di', updated: 'aggiornato',
    toc: 'Indice dell’articolo', faq: 'Domande frequenti', faqHref: 'faq',
    disclaimerA: 'L’articolo serve per orientarsi e non sostituisce il parere di un notaio o di un commercialista. Altri approfondimenti nella',
    guide: 'guida all’acquisto di un immobile in Italia', and: 'e nelle', practical: 'informazioni pratiche', readOn: 'Continua a leggere',
    crumbsAria: 'Indice dell’articolo', guideCta: 'Guida all’acquisto passo dopo passo', topics: 'Temi', topicsPick: 'Scegli un', topicsAccent: 'tema',
    pillarTitle: 'Come comprare casa in Italia, passo dopo passo',
    pillarDesc: '8 passaggi, costi con calcolatore, procura, 7 errori e un glossario dei termini italiani.',
    pillarMore: 'Leggi la guida', pillarAlt: 'Firma dei documenti per l’acquisto di un immobile',
    watchTitle: 'Ricevi avvisi sui', watchAccent: 'nuovi annunci',
    watchText: 'Scrivimi cosa cerchi e, appena avrò un annuncio in linea con la tua richiesta, te lo invierò via e-mail.',
    watchLabel: 'Attiva gli avvisi sugli annunci',
  },
};
