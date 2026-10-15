import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface Pillar {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  imageAlt: string;
}

interface ProvisionPoint {
  title: string;
  desc: string;
}

interface PriceCopy {
  title: string;
  accent: string;
  lead: string;
  pillars: Pillar[];
  provisionTitle: string;
  provisionLead: string;
  provisionImage: string;
  provisionImageAlt: string;
  provisionCaption: string;
  provisionPoints: ProvisionPoint[];
  footnoteText: string;
  footnoteCta: string;
}

const COPY: Record<Locale, PriceCopy> = {
  cs: {
    title: 'Cena, kterou vidíte na internetu,',
    accent: 'je konečná',
    lead: 'V Itálii kupující na běžných portálech po podpisu často zaskočí 15–25 % skrytých doplatků na notáře, daně a provize. U nás je inzerovaná cena konečná — zahrnuje samotnou nemovitost, státní daň z převodu, notářský zápis i kompletní servis s mým týmem asistentek v Abruzzu.',
    pillars: [
      {
        num: '01',
        title: 'Nemovitost',
        subtitle: 'Kupní cena objektu',
        desc: 'Plná kupní cena dohodnutá přímo s italským vlastníkem bez spekulativních přirážek.',
        image: '/images/pricing/pillar-nemovitost.webp',
        imageAlt: 'Italský kamenný dům v Abruzzu s terasou a zahradou',
      },
      {
        num: '02',
        title: 'Daň z převodu',
        subtitle: 'Státní daň z katastru',
        desc: 'Zákonná daň státu (2 % pro trvalé bydlení / 9 % pro rekreační objekt) počítaná z katastrální hodnoty, nikoli z tržní ceny.',
        image: '/images/pricing/pillar-dan.webp',
        imageAlt: 'Oficiální italská katastrální mapa a architektonický plán nemovitosti',
      },
      {
        num: '03',
        title: 'Odměna notáře',
        subtitle: 'Právní garance rogito',
        desc: 'Kompletní prověření právního stavu, kontrola zástav a věcných břemen i oficiální sepsání a zápis kupní smlouvy u notáře.',
        image: '/images/pricing/pillar-notar.webp',
        imageAlt: 'Oficiální italský notářský zápis Atto Notarile s pečetí a podpisem',
      },
      {
        num: '04',
        title: 'Naše provize',
        subtitle: 'Kompletní zastoupení',
        desc: 'Zastoupení od prvního výběru po předání klíčů a bezplatná asistence asistentek v Abruzzu celý 1. rok.',
        image: '/images/pricing/pillar-provize.webp',
        imageAlt: 'Osobní předání klíčů od nového domova v Itálii',
      },
    ],
    provisionTitle: 'Co přesně získáte v naší provizi',
    provisionLead: 'Koupí nemovitosti náš vztah nekončí. Jako jediní na trhu máme v Abruzzu stálý tým asistentek, které mluví česky i italsky a žijí přímo na místě. Zatímco běžní zprostředkovatelé po notáři odjíždějí, my v Abruzzu žijeme a zůstáváme s vámi.',
    provisionImage: '/media/kom-klientka.webp',
    provisionImageAlt: 'Zuzana Bajgerová a asistentky v Abruzzu',
    provisionCaption: 'Osobní opora přímo v Abruzzu',
    provisionPoints: [
      {
        title: 'Právní a technická prověrka',
        desc: 'Nezávislá kontrola věcných břemen, katastrálních map, kolaudace a asistence při vyřízení daňového čísla (Codice Fiscale) i bankovních převodů.',
      },
      {
        title: 'Osobní vyjednávání & tlumočení u notáře',
        desc: 'Přímé jednání s italskými majiteli a realitkami o ceně a plnohodnotné tlumočení při slavnostním podpisu kupní smlouvy (rogito).',
      },
      {
        title: '1. rok bezplatné asistence na místě',
        desc: 'Přepisy energií (elektřina, plyn, voda), nahlášení poplatků za odpad (TARI), daň z nemovitosti (IMU) a kontakty na ověřené místní řemeslníky.',
      },
    ],
    footnoteText: 'Mimo nabídkovou cenu: Případná rekonstrukce na přání (rozpočet schvalujete předem) a běžné roční poplatky za provoz nemovitosti (IMU a TARI, obvykle pár set eur ročně).',
    footnoteCta: 'Více o nákladech koupě nemovitosti',
  },

  en: {
    title: 'The price you see online',
    accent: 'is the final price',
    lead: 'In Italy, buyers on standard portals frequently face 15–25% in unexpected extra costs at the notary for fees, transfer taxes, and broker commissions. With us, the advertised price is final—covering the property, statutory transfer tax, the notary deed, and our complete on-the-ground support in Abruzzo.',
    pillars: [
      {
        num: '01',
        title: 'The Property',
        subtitle: 'Purchase price',
        desc: 'Agreed purchase price directly with the Italian owner without speculative markups.',
        image: '/images/pricing/pillar-nemovitost.webp',
        imageAlt: 'Authentic stone villa in Abruzzo with garden and terrace',
      },
      {
        num: '02',
        title: 'Transfer Tax',
        subtitle: 'Statutory levy',
        desc: 'Statutory Italian tax (2% primary home / 9% holiday home) based on cadastral value, not market price.',
        image: '/images/pricing/pillar-dan.webp',
        imageAlt: 'Official Italian cadastral map and architectural floor plan',
      },
      {
        num: '03',
        title: 'Notary Deed',
        subtitle: 'Legal closing',
        desc: 'Comprehensive due diligence, title search, encumbrance verification, and the official deed of sale (rogito).',
        image: '/images/pricing/pillar-notar.webp',
        imageAlt: 'Official Italian notarial deed Atto Notarile with wax seal',
      },
      {
        num: '04',
        title: 'Our Agency Fee',
        subtitle: 'All-inclusive service',
        desc: 'Complete representation from first viewing to keys, plus complimentary 1st-year local support in Abruzzo.',
        image: '/images/pricing/pillar-provize.webp',
        imageAlt: 'Handover of house keys to your new home in Italy',
      },
    ],
    provisionTitle: 'What our fee actually covers',
    provisionLead: 'The relationship does not end at the notary. We are the only agency with a permanent bilingual support team residing directly in Abruzzo. While standard brokers leave after closing, we remain by your side.',
    provisionImage: '/media/kom-klientka.webp',
    provisionImageAlt: 'Zuzana Bajgerová and assistants in Abruzzo',
    provisionCaption: 'Dedicated local support in Abruzzo',
    provisionPoints: [
      {
        title: 'Legal & Technical Due Diligence',
        desc: 'Independent verification of encumbrances, land registry compliance, tax code issuance (Codice Fiscale), and secure bank transfers.',
      },
      {
        title: 'In-Person Negotiation & Notary Closing',
        desc: 'Direct price negotiations with Italian owners and certified interpretation at the official signing of the deed of sale (rogito).',
      },
      {
        title: '1st Year of Complimentary Local Support',
        desc: 'Utility transfers (water, electricity, gas), municipal tax registrations (IMU, TARI), and trusted vetted local contractors.',
      },
    ],
    footnoteText: 'Excluded from the listing price: Any optional renovation work (budget approved beforehand) and recurring annual municipal taxes (IMU and TARI, typically a few hundred euros per year).',
    footnoteCta: 'More details on property purchase costs',
  },

  it: {
    title: 'Il prezzo indicato online',
    accent: 'è il prezzo definitivo',
    lead: 'In Italia chi acquista tramite i consueti portali si ritrova spesso con un 15–25% di costi imprevisti tra notaio, imposte e provvigioni. Con noi il prezzo nell’annuncio è definitivo: include l’immobile, l’imposta di registro, il rogito notarile e l’assistenza completa del nostro team in Abruzzo.',
    pillars: [
      {
        num: '01',
        title: 'L’immobile',
        subtitle: 'Prezzo d’acquisto',
        desc: 'Prezzo concordato direttamente con il venditore senza ricarichi speculativi.',
        image: '/images/pricing/pillar-nemovitost.webp',
        imageAlt: 'Tipico immobile residenziale in pietra in Abruzzo con giardino',
      },
      {
        num: '02',
        title: 'Imposta di registro',
        subtitle: 'Tributi statali',
        desc: 'Imposta di registro calcolata sul valore catastale (2% prima casa / 9% seconda casa), non sul valore commerciale.',
        image: '/images/pricing/pillar-dan.webp',
        imageAlt: 'Mappa catastale ufficiale e planimetria architettonica',
      },
      {
        num: '03',
        title: 'Onorario del notaio',
        subtitle: 'Atto notarile & rogito',
        desc: 'Verifiche ipotecarie e catastali, conformità urbanistica, stipula del rogito e trascrizione nei registri.',
        image: '/images/pricing/pillar-notar.webp',
        imageAlt: 'Atto notarile ufficiale con sigillo e firma',
      },
      {
        num: '04',
        title: 'Nostra provvigione',
        subtitle: 'Assistenza completa',
        desc: '7 fasi di gestione da A a Z e il primo anno di assistenza di base gratuito con le mie collaboratrici in loco.',
        image: '/images/pricing/pillar-provize.webp',
        imageAlt: 'Consegna delle chiavi della nuova casa in Italia',
      },
    ],
    provisionTitle: 'Cosa comprende esattamente la nostra provvigione',
    provisionLead: 'Il rapporto non si chiude dal notaio. Siamo l’unica realtà con un team stabile di collaboratrici bilingui residenti a Montesilvano e Pescara. Mentre gli intermediari generici spariscono dopo il rogito, noi restiamo al vostro fianco.',
    provisionImage: '/media/kom-klientka.webp',
    provisionImageAlt: 'Zuzana Bajgerová con le collaboratrici in Abruzzo',
    provisionCaption: 'Presenza e assistenza diretta in Abruzzo',
    provisionPoints: [
      {
        title: 'Verifica legale e tecnica',
        desc: 'Controllo ipotecario e catastale preventivo, conformità urbanistica, codice fiscale e coordinamento bancario.',
      },
      {
        title: 'Trattativa e rogito notarile',
        desc: 'Trattativa diretta con i venditori per le migliori condizioni e presenza all’atto notarile per la consegna delle chiavi.',
      },
      {
        title: '1° anno di assistenza in loco inclusa',
        desc: 'Volture utenze (luce, acqua, gas), iscrizione TARI, gestione IMU e contatti con artigiani locali selezionati.',
      },
    ],
    footnoteText: 'Non compresi nel prezzo dell’annuncio: Eventuali interventi di ristrutturazione (preventivo concordato prima dell’inizio) e i tributi annuali ordinari (IMU e TARI, di norma poche centinaia di euro l’anno).',
    footnoteCta: 'Maggiori informazioni sui costi di acquisto',
  },
};

export default function PriceOverview({ locale, guideHref }: { locale: Locale; guideHref: string }) {
  const copy = COPY[locale] ?? COPY.cs;

  return (
    <section className="price-overview" aria-labelledby="sec-04">
      <div className="wrap">
        {/* Section Header */}
        <header className="price-overview__head">
          <h2 id="sec-04" className="home-h2">
            {copy.title} <em>{copy.accent}</em>
          </h2>
          <p className="price-overview__lead">{copy.lead}</p>
        </header>

        {/* 4 Pillars Grid */}
        <div className="price-overview__pillars">
          {copy.pillars.map((pillar) => (
            <article key={pillar.num} className="price-overview__pillar">
              <div className="price-overview__pillar-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  className="price-overview__pillar-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="price-overview__pillar-body">
                <span className="price-overview__pillar-num">{pillar.num} · {pillar.subtitle}</span>
                <h3 className="price-overview__pillar-title">{pillar.title}</h3>
                <p className="price-overview__pillar-desc">{pillar.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Provision Value Showcase Block */}
        <div className="price-overview__provision">
          <div className="price-overview__provision-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={copy.provisionImage}
              alt={copy.provisionImageAlt}
              className="price-overview__provision-img"
              loading="lazy"
              decoding="async"
            />
            <div className="price-overview__provision-caption">
              <span>{copy.provisionCaption}</span>
            </div>
          </div>

          <div className="price-overview__provision-info">
            <h3 className="price-overview__provision-title">{copy.provisionTitle}</h3>
            <p className="price-overview__provision-lead">{copy.provisionLead}</p>

            <ul className="price-overview__provision-list">
              {copy.provisionPoints.map((pt) => (
                <li key={pt.title} className="price-overview__provision-item">
                  <div className="price-overview__provision-check" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.5 3 3 6-6" />
                    </svg>
                  </div>
                  <div className="price-overview__provision-item-text">
                    <strong className="price-overview__provision-item-heading">{pt.title}</strong>
                    <p className="price-overview__provision-item-desc">{pt.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footnote & Guide Link */}
        <div className="price-overview__footnote">
          <p className="price-overview__footnote-text">{copy.footnoteText}</p>
          <Link href={`${guideHref}#naklady`} className="price-overview__link">
            <span>{copy.footnoteCta}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
