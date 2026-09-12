'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface ProcessStep {
  n: string;
  tag: string;
  title: string;
  text: string;
  highlight?: string;
  icon?: string;
}

interface ProcessCopy {
  badge: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  steps: ProcessStep[];
  climaxQuote: string;
  climaxText: string;
  authorName: string;
  authorRole: string;
  ctaConsultation: string;
  ctaGuide: string;
  whatsAppText: string;
}

const PROCESS_DATA: Record<Locale, ProcessCopy> = {
  cs: {
    badge: 'Jak probíhá spolupráce · Servis od A do Z',
    titleLead: 'Vy si přijedete splnit svůj italský sen.',
    titleAccent: 'O starosti kolem koupě se postaráme my.',
    lead:
      'Koupě nemovitosti v Itálii má být radost, ne starost s úřady a papírováním. V Abruzzu působím přes 20 let a se svým týmem pro vás zajistím kompletní servis od A do Z.',
    steps: [
      {
        n: '01',
        tag: '1. krok · Online / Telefon',
        title: 'Začneme nezávaznou konzultací zdarma',
        text: 'Nejprve si zavoláme nebo se spojíme online. Probereme vaši představu, rozpočet, preferovanou lokalitu u moře či v kopcích i účel nákupu — zda hledáte druhý domov, či investici.',
        highlight: 'První konzultace je zcela zdarma a 100% nezávazná.',
        icon: 'phone',
      },
      {
        n: '02',
        tag: 'Aktivní scouting celého trhu',
        title: 'Nehledám jen v nabídce, kterou vidíte na webu',
        text: 'Aktivně pro vás mapuji celý regionální trh. Za více než 20 let v Abruzzu spolupracuji výhradně s prověřenými místními kancelářemi a majiteli s vysokými standardy důvěry.',
        highlight: 'Přístup k neveřejným nabídkám a prověřeným partnerům.',
        icon: 'compass',
      },
      {
        n: '03',
        tag: 'Rezervační záloha 200 €',
        title: 'Rezervace termínu a individuální příprava',
        text: 'Po potvrzení termínu vašeho příjezdu sestavíme přesný harmonogram prohlídek. Záloha 200 € kryje intenzivní přípravu a plně se odečítá z naší konečné provize při koupi.',
        highlight: '100% odečitatelné z konečné provize · Žádný náklad navíc.',
        icon: 'calendar',
      },
      {
        n: '04',
        tag: 'Právní & technická garance',
        title: 'Nechci, abyste koupili „zajíce v pytli“',
        text: 'Vědět, co nekoupit, je často důležitější. Spolupracuji s notářem Tommasem Trifonem, geodety a právníky. Pokud existuje skrytá vada či právní břemeno, ihned vás varuji.',
        highlight: 'Osobní prověření s notářem & garance bezpečnosti.',
        icon: 'shield',
      },
      {
        n: '05',
        tag: 'Osobně v Itálii i na dálku',
        title: 'Prohlídky osobně i přes telefon',
        text: 'Při vašem příjezdu vás osobně provedu vybranými nemovitostmi s tlumočením do češtiny. Pokud nemůžete cestovat, zajistím živou interaktivní videoprohlídku přes telefon.',
        highlight: 'Osobní doprovod s tlumočením nebo živé videoprohlídky.',
        icon: 'video',
      },
      {
        n: '06',
        tag: 'Právní jistota & úřady',
        title: 'Od nabídky až k notáři jste v tom s námi',
        text: 'Vyjednávám pro vás nejlepší podmínky, zajistím daňové číslo (codice fiscale), prověřím kupní smlouvu (compromesso) a osobně vás zastoupím či doprovodím u finálního notářského zápisu (rogito).',
        highlight: 'Kompletní smluvní agenda, daňové číslo i podpis rogita.',
        icon: 'contract',
      },
      {
        n: '07',
        tag: 'Unikátní garance na trhu',
        title: 'První rok základního servisu v rámci naší provize',
        text: 'Předáním klíčů naše práce nekončí. Přepíšeme elektřinu, plyn i vodu, nastavíme internet, pojištění a naše 2 asistentky na místě zajistí bezpečnou úschovu klíčů i kontroly.',
        highlight: '1. rok asistence na místě kompletně v rámci naší provize.',
        icon: 'key',
      },
      {
        n: '08',
        tag: 'Rekonstrukce & správa',
        title: 'Rekonstrukce, pronájmy i péče o nemovitost',
        text: 'Plánujete úpravy? Zajišťujeme rekonstrukce na klíč s ověřenými italskými řemeslníky (ráda ukážu dokončené realizace), vybavení bytu, úklid i správu turistických pronájmů.',
        highlight: 'Možnost osobní prohlídky již hotových realizovaných bytů.',
        icon: 'tools',
      },
      {
        n: '09',
        tag: 'Česká komunita ~80 rodin',
        title: 'Nekupujete si jen nemovitost. Získáte nový život.',
        text: 'V našem okolí vlastní nemovitost přibližně 80 českých a slovenských rodin. Pořádáme společná setkání u moře, výlety do národních parků a v zimě lyžování v Apeninách.',
        highlight: 'Přátelská komunita ~80 rodin a nový život v Itálii.',
        icon: 'heart',
      },
    ],
    climaxQuote: '„Nekupujete si u nás jen nemovitost v Itálii. Kupujete si kus nového života.“',
    climaxText:
      'Chci, abyste přijeli do Abruzza, otevřeli dveře svého italského domova a místo řešení problémů přemýšleli nad tím, kam dnes půjdete na kávu, co si dáte k večeři a jestli strávíte odpoledne u moře. O zbytek se postaráme my.',
    authorName: 'Bc. Zuzana Bajgerová',
    authorRole: 'Realitní specialistka na nemovitosti v Itálii / Abruzzo · TOP 10 RE/MAX ČR · 20+ let na místě',
    ctaConsultation: 'Domluvit bezplatnou konzultaci',
    ctaGuide: 'Celý průvodce koupí',
    whatsAppText: 'Máte dotaz? Napište mi přímo na WhatsApp: +420 723 824 348',
  },
  en: {
    badge: 'How Collaboration Works · Full A to Z Service',
    titleLead: 'You come to fulfill your Italian dream.',
    titleAccent: 'We handle all the worries of purchasing.',
    lead:
      'Buying property in Italy should be pure joy, not stress with paperwork. With over 20 years in Abruzzo, my team and I provide complete, worry-free service from A to Z.',
    steps: [
      {
        n: '01',
        tag: 'Step 1 · Phone / Video call',
        title: 'Free initial consultation',
        text: 'We connect online to evaluate your budget, lifestyle preferences (coast vs. hills), and whether you seek a holiday retreat or an investment property.',
        highlight: 'Initial consultation is completely free and non-binding.',
        icon: 'phone',
      },
      {
        n: '02',
        tag: 'Full market scouting',
        title: 'Active search across the whole regional market',
        text: 'I search beyond the public listings. Over 20 years in Abruzzo, I partner exclusively with vetted local brokers and private sellers upholding top integrity.',
        highlight: 'Direct access to off-market properties and vetted partners.',
        icon: 'compass',
      },
      {
        n: '03',
        tag: '€200 reservation deposit',
        title: 'Date reservation & personalized schedule',
        text: 'Once your arrival dates are set, we design a customized viewing itinerary. The €200 fee covers dedicated preparation and is credited back upon purchase.',
        highlight: '100% credited toward final fee · Zero additional cost.',
        icon: 'calendar',
      },
      {
        n: '04',
        tag: 'Rigorous due diligence',
        title: 'No hidden pitfalls or unpleasant surprises',
        text: 'Knowing what not to buy is vital. Partnering with public notary Tommaso Trifone, surveyors, and lawyers, I instantly flag any legal or structural risks.',
        highlight: 'Direct notary verification & 100% legal security.',
        icon: 'shield',
      },
      {
        n: '05',
        tag: 'In person or live remote tour',
        title: 'Viewings in Abruzzo or via live video',
        text: 'When you arrive, I personally guide you through properties with full English translation. If you cannot travel, we conduct interactive live smartphone tours.',
        highlight: 'Personal accompaniment or live interactive video tours.',
        icon: 'video',
      },
      {
        n: '06',
        tag: 'Legal safety & notary',
        title: 'Full support through to the final notary deed',
        text: 'From price negotiations and preliminary contracts (compromesso) to tax codes (codice fiscale) and signing the final deed (rogito), we handle it all.',
        highlight: 'Complete contract assistance, tax code, and rogito deed.',
        icon: 'contract',
      },
      {
        n: '07',
        tag: 'Included in our fee',
        title: 'First year of local assistance included in our fee',
        text: 'We transfer electricity, water, and gas, set up broadband internet, home insurance, and provide 2 on-site assistants for keyholding and regular checks.',
        highlight: '1st year of local concierge assistance included in our fee.',
        icon: 'key',
      },
      {
        n: '08',
        tag: 'Renovation & rental management',
        title: 'Turnkey renovations and property management',
        text: 'Planning updates? We manage turnkey renovations with trusted local craftsmen, furnish interiors, and oversee short-term holiday rental management.',
        highlight: 'Option to inspect already completed renovated apartments.',
        icon: 'tools',
      },
      {
        n: '09',
        tag: 'Community of 80+ families',
        title: 'You are not just buying property — you gain a new life',
        text: 'Around 80 Czech and international families own homes in our area, sharing summer beach gatherings, mountain trips, and holiday celebrations.',
        highlight: 'Warm expat community & an inspiring new life in Abruzzo.',
        icon: 'heart',
      },
    ],
    climaxQuote: '“You are not just buying a property in Italy. You are acquiring a whole new way of life.”',
    climaxText:
      'I want you to arrive in Abruzzo, unlock your Italian home, and instead of solving problems, think about where to enjoy your morning espresso, what fresh seafood to have for dinner, and when to head down to the beach. We take care of everything else.',
    authorName: 'Bc. Zuzana Bajgerová',
    authorRole: 'Italian Property Specialist in Abruzzo · TOP 10 RE/MAX Czech Republic · 20+ years on-site',
    ctaConsultation: 'Book a free consultation',
    ctaGuide: 'Full buyer’s guide',
    whatsAppText: 'Have a question? Text me directly on WhatsApp: +420 723 824 348',
  },
  it: {
    badge: 'Come si svolge la collaborazione · Servizio completo da A a Z',
    titleLead: 'Voi venite per vivere il vostro sogno italiano.',
    titleAccent: 'Alle questioni pratiche pensiamo noi.',
    lead:
      'L’acquisto di un immobile in Italia deve essere un piacere, non una fonte di stress burocratico. Con oltre 20 anni in Abruzzo, io e il mio team vi garantiamo un servizio completo da A a Z.',
    steps: [
      {
        n: '01',
        tag: '1° passo · Online / Telefono',
        title: 'Prima consulenza gratuita e senza impegno',
        text: 'Ci confrontiamo telefonicamente o via video per definire budget, tipologia di immobile e località ideali in Abruzzo in base alle vostre esigenze personali o d’investimento.',
        highlight: 'Consulenza iniziale al 100% gratuita e senza vincoli.',
        icon: 'phone',
      },
      {
        n: '02',
        tag: 'Ricerca attiva su tutto il mercato',
        title: 'Ricerca oltre le offerte visibili sul sito',
        text: 'Collaboro con agenzie locali selezionate e proprietari fidati, assicurando che ogni immobile proposto sia rigorosamente verificato e sicuro.',
        highlight: 'Accesso a immobili riservati e partner locali selezionati.',
        icon: 'compass',
      },
      {
        n: '03',
        tag: 'Acconto prenotazione 200 €',
        title: 'Prenotazione date e programma personalizzato',
        text: 'Confermato il periodo del vostro arrivo, prepariamo il calendario dettagliato delle visite. L’acconto di 200 € viene dedotto interamente dalla provvigione finale.',
        highlight: 'Interamente dedotto dalla provvigione · Nessun costo extra.',
        icon: 'calendar',
      },
      {
        n: '04',
        tag: 'Garanzia legale e tecnica',
        title: 'Verifiche accurate per evitare ogni rischio',
        text: 'Collaboro con il notaio Tommaso Trifone, legali e geometri locali. Qualsiasi anomalia catastale o vincolo urbanistico viene evidenziato immediatamente.',
        highlight: 'Verifica notarile diretta e massima sicurezza legale.',
        icon: 'shield',
      },
      {
        n: '05',
        tag: 'Di persona o in videochiamata',
        title: 'Visite di persona o in diretta telefonica',
        text: 'Vi accompagno personalmente durante i sopralluoghi con interpretariato e supporto. Per chi non può viaggiare subito, effettuiamo video tour dal vivo.',
        highlight: 'Accompagnamento personale o video visite dal vivo.',
        icon: 'video',
      },
      {
        n: '06',
        tag: 'Tutela legale fino all’atto',
        title: 'Dalla proposta al rogito notarile',
        text: 'Dalla proposta e dal compromesso fino alla firma dell’atto pubblico (rogito), vi assisto e rappresento direttamente davanti al notaio senza intoppi.',
        highlight: 'Assistenza contrattuale, codice fiscale e rogito notarile.',
        icon: 'contract',
      },
      {
        n: '07',
        tag: 'Incluso nella provvigione',
        title: 'Primo anno di assistenza locale incluso',
        text: 'Gestiamo volture di luce, acqua e gas, attivazione internet, assicurazione casa e 2 assistenti in loco per custodia chiavi e verifiche periodiche.',
        highlight: '1° anno di assistenza pratica in loco compreso nella provvigione.',
        icon: 'key',
      },
      {
        n: '08',
        tag: 'Ristrutturazioni e gestione',
        title: 'Ristrutturazioni chiavi in mano e locazioni',
        text: 'Organizziamo ristrutturazioni con artigiani fidati (con visita ad alloggi già realizzati), arredo, gestione affitti turistici e pulizie professionali.',
        highlight: 'Possibilità di visionare appartamenti già ristrutturati.',
        icon: 'tools',
      },
      {
        n: '09',
        tag: 'Comunità attiva di residenti',
        title: 'Non acquistate solo una casa: iniziate una nuova vita',
        text: 'Circa 80 famiglie risiedono nella nostra zona. Una comunità unita che si ritrova al mare, condivide escursioni sui monti e vive l’autenticità d’Abruzzo.',
        highlight: 'Comunità calorosa di oltre 80 famiglie in Abruzzo.',
        icon: 'heart',
      },
    ],
    climaxQuote: '„Con noi non comprate solo una casa in Italia: acquistate un nuovo stile di vita.“',
    climaxText:
      'Desidero che arriviate in Abruzzo, apriate la porta della vostra casa italiana e, anziché pensare ai problemi pratici, decidiate solo dove prendere il caffè, cosa cenare e se andare al mare. A tutto il resto pensiamo noi.',
    authorName: 'Bc. Zuzana Bajgerová',
    authorRole: 'Specialista immobiliare in Abruzzo · TOP 10 RE/MAX Repubblica Ceca · Sul posto da 20+ anni',
    ctaConsultation: 'Prenota una consulenza gratuita',
    ctaGuide: 'Guida all’acquisto',
    whatsAppText: 'Hai una domanda? Scrivimi direttamente su WhatsApp: +420 723 824 348',
  },
};

export default function ProcessSection({
  locale,
  href,
}: {
  locale: Locale;
  href: { konzultace: string; jakKoupit: string; sluzby: string };
}) {
  const copy = PROCESS_DATA[locale] ?? PROCESS_DATA.cs;
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      list.querySelectorAll('.process-zigzag__item').forEach((item) => {
        item.classList.add('is-drawn');
      });
      return;
    }

    const items = list.querySelectorAll<HTMLElement>('.process-zigzag__item');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-drawn');
            io.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      }
    );

    items.forEach((item) => io.observe(item));

    return () => io.disconnect();
  }, []);

  return (
    <section id="sec-07" className="process-sec" aria-labelledby="process-title">
      {/* Shared Pure Gold Gradient for Connecting Lines */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <linearGradient id="zigzagGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9a441" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#e8c480" stopOpacity="1" />
            <stop offset="100%" stopColor="#d9a441" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="zigzagDashedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9a441" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#e8c480" stopOpacity="1" />
            <stop offset="100%" stopColor="#d9a441" stopOpacity="0.85" />
          </linearGradient>
        </defs>
      </svg>

      <div className="wrap">
        {/* Section Header */}
        <div className="process-head">
          <div className="listings__badge process-head__badge">
            <span className="listings__badge-dot" />
            <span>{copy.badge}</span>
          </div>

          <h2 id="process-title" className="process-head__title">
            <span className="process-head__title-lead">{copy.titleLead}</span>
            <em className="process-head__title-accent">{copy.titleAccent}</em>
          </h2>

          <p className="process-head__lead">{copy.lead}</p>
        </div>

        {/* Minimalist Zigzag Process Timeline */}
        <ol ref={listRef} className="process-zigzag" aria-label={copy.badge}>
          {copy.steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const stepNum = `${idx + 1}.`;
            const isLast = idx === copy.steps.length - 1;

            return (
              <li
                key={step.n}
                className={`process-zigzag__item ${
                  isLeft ? 'process-zigzag__item--left' : 'process-zigzag__item--right'
                }`}
              >
                <div className="process-card">
                  {/* Protruding Number Badge */}
                  <div className="process-card__badge" aria-hidden="true">
                    <span>{stepNum}</span>
                  </div>

                  {/* Card Content */}
                  <div className="process-card__body">
                    <span className="process-card__tag">{step.tag}</span>
                    <h3 className="process-card__title">{step.title}</h3>
                  </div>
                </div>

                {/* S-Curve Gold Connector (Desktop) */}
                {!isLast && (
                  <>
                    <div
                      className={`process-zigzag__connector ${
                        isLeft
                          ? 'process-zigzag__connector--to-right'
                          : 'process-zigzag__connector--to-left'
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 100 110" fill="none" preserveAspectRatio="none">
                        <defs>
                          <mask id={`zigzag-mask-${idx}`} maskUnits="userSpaceOnUse">
                            <path
                              d={
                                isLeft
                                  ? 'M 0 15 C 50 15, 50 95, 100 95'
                                  : 'M 100 15 C 50 15, 50 95, 0 95'
                              }
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="8"
                              strokeLinecap="round"
                              pathLength="140"
                              className="process-zigzag__mask-path"
                            />
                          </mask>
                        </defs>
                        <path
                          d={
                            isLeft
                              ? 'M 0 15 C 50 15, 50 95, 100 95'
                              : 'M 100 15 C 50 15, 50 95, 0 95'
                          }
                          stroke="url(#zigzagGoldGrad)"
                          strokeWidth="2.5"
                          strokeDasharray="6 6"
                          strokeLinecap="round"
                          mask={`url(#zigzag-mask-${idx})`}
                        />
                      </svg>
                    </div>

                    {/* Mobile subtle vertical connector */}
                    <div className="process-zigzag__mobile-connector" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>

        {/* Climax Visual Banner: Quote over big photo + authentic closing CTA */}
        <div className="process-climax">
          <picture className="process-climax__picture">
            <source srcSet="/images/abruzzo-zivot-komunita.webp" type="image/webp" />
            <img
              src="/hero/backgrounds/pexels-titouan-jullien-504247666-29142700.jpg"
              alt="Život v Abruzzu u moře a komunita"
              className="process-climax__img"
              width={1600}
              height={1069}
              loading="lazy"
            />
          </picture>

          <div className="process-climax__overlay" aria-hidden="true" />

          <div className="process-climax__content">
            <div className="process-climax__badge">
              <span className="process-climax__badge-icon">🇮🇹</span>
              <span>Život v Itálii</span>
            </div>

            <blockquote className="process-climax__quote">
              <p className="process-climax__quote-main">{copy.climaxQuote}</p>
              <p className="process-climax__quote-sub">{copy.climaxText}</p>
            </blockquote>

            <div className="process-climax__photo-wrap">
              <picture>
                <source srcSet="/images/zuzana-climax.webp" type="image/webp" />
                <img
                  src="/images/zuzana-climax.png"
                  alt={copy.authorName}
                  className="process-climax__photo"
                  width={400}
                  height={400}
                  loading="lazy"
                />
              </picture>
            </div>

            <div className="process-climax__actions">
              <Link href={href.konzultace} className="btn btn--saffron process-climax__btn">
                <span>{copy.ctaConsultation}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link href={href.jakKoupit} className="btn btn--glass process-climax__btn-ghost">
                <span>{copy.ctaGuide}</span>
              </Link>
            </div>

            <p className="process-climax__subtext">
              <a
                href="https://wa.me/420723824348"
                target="_blank"
                rel="noopener noreferrer"
                className="process-climax__wa"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width={16} height={16}>
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                </svg>
                <span>{copy.whatsAppText}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
