import Link from 'next/link';
import type { Property } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { LOCALITIES, LOCALITY_SLUGS } from '@/lib/localities';
import {
  HERO,
  PROOF,
  FEARS,
  PRICE_IN,
  PRICE_OUT,
  PILLARS,
  PROCESS,
  AFTER,
  FAQ,
  GUIDES,
  QUICK_PICKS,
} from '@/lib/home';
import LandscapeLine from '@/components/LandscapeLine';
import Slider from '@/components/Slider';
import HeroSection from './HeroSection';
import ServicesCards from './ServicesCards';
import PillarsVideoCard from './PillarsVideoCard';
import ProcessSection from './ProcessSection';
import GuidesCards from './GuidesCards';
import TestimonialsCarousel from './TestimonialsCarousel';
import FaqSection from './FaqSection';

const WA = 'https://wa.me/420723824348';
const TEL = 'tel:+420723824348';

// prvni veta z ledu lokality — na dlazdice v sekci 08
const firstSentence = (s: string) => s.split(/(?<=[.!?])\s/)[0];

/** stridava sekce (layout B): media a text, strany se u dalsi sekce prohodi.
 *  `n` uz se nikde nezobrazuje, slouzi jen jako kotva (id + aria-labelledby). */
function ZigRow({
  n,
  badge,
  title,
  lead,
  flip,
  className,
  media,
  children,
}: {
  n: string;
  badge?: React.ReactNode;
  title: React.ReactNode;
  lead?: string;
  flip?: boolean;
  className?: string;
  media: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`zig${flip ? ' zig--flip' : ''}${className ? ` ${className}` : ''}`}
      aria-labelledby={`sec-${n}`}
    >
      <div className="wrap zig__grid">
        <div className="zig__media">{media}</div>
        <div className="zig__text">
          {badge && (
            <div className="listings__badge">
              <span className="listings__badge-dot" />
              <span>{badge}</span>
            </div>
          )}
          <h2 id={`sec-${n}`} className="home-h2">
            {title}
          </h2>
          {lead && <p className="home-lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

const LISTINGS_COPY: Record<
  Locale,
  {
    badge: string;
    titleLine: string;
    titleAccent: string;
    lead: string;
    cta: string;
    updated: string;
  }
> = {
  cs: {
    badge: 'Aktuální nabídka · Abruzzo, Itálie',
    titleLine: 'Co teď nabízím',
    titleAccent: 'v italském Abruzzu',
    lead: 'Nabídky se aktualizují automaticky, každý den. Když nabídka zmizí, je prodaná. Ceny uvádím v eurech i v korunách.',
    cta: 'Všechny nabídky nemovitostí',
    updated: 'Aktualizováno',
  },
  en: {
    badge: 'Current Portfolio · Abruzzo, Italy',
    titleLine: 'Current Properties',
    titleAccent: 'in Abruzzo, Italy',
    lead: 'Listings are updated automatically every day. When a property is sold, it is removed immediately. Prices shown in EUR.',
    cta: 'View all property listings',
    updated: 'Updated',
  },
  it: {
    badge: 'Portfolio attuale · Abruzzo, Italia',
    titleLine: 'Immobili disponibili',
    titleAccent: 'in Abruzzo, Italia',
    lead: 'Le offerte si aggiornano automaticamente ogni giorno. Quando un immobile scompare, è venduto. Prezzi trasparenti.',
    cta: 'Tutti gli immobili disponibili',
    updated: 'Aggiornato',
  },
};

const FEARS_COPY: Record<
  Locale,
  {
    badge: string;
    titleLine: string;
    titleAccent: string;
    lead: string;
    cta: string;
    topBadge: string;
    mediaImgAlt: string;
    items: { q: string; a: string }[];
  }
> = {
  cs: {
    badge: '4 klíčové otázky · Bezpečná koupě',
    titleLine: 'Znám čtyři otázky, které Vám',
    titleAccent: 'teď běží hlavou',
    lead: 'Odpovím na ně hned. Dokud na ně neodpovím, žádná nemovitost Vás nezajímá.',
    cta: 'Jak koupit nemovitost v Itálii',
    topBadge: 'Osobní garance',
    mediaImgAlt: 'Bc. Zuzana Bajgerová v Abruzzu u moře',
    items: FEARS,
  },
  en: {
    badge: '4 Key Questions · Safe Purchase',
    titleLine: 'Four questions on your mind',
    titleAccent: 'right now',
    lead: 'Let me answer them right away. Until they are resolved, no property matters yet.',
    cta: 'How to buy property in Italy',
    topBadge: 'Personal guarantee',
    mediaImgAlt: 'Bc. Zuzana Bajgerová in Abruzzo by the sea',
    items: [
      {
        q: '“I don’t understand the language or Italian law.”',
        a: 'I guide you through the entire process in your language. I negotiate with Italian authorities and send you clear, understandable summaries.',
      },
      {
        q: '“I don’t know what the real extra costs will be.”',
        a: 'You get a breakdown calculated down to the euro before you sign anything. Count on 10% to 15% on top of the purchase price.',
      },
      {
        q: '“I worry about being scammed from afar.”',
        a: 'I live directly in Abruzzo. I inspect every property in person, and contracts are verified by my lawyer, not the seller’s.',
      },
      {
        q: '“I don’t know what happens after the purchase.”',
        a: 'Tax registration, utility transfers, renovation, furnishing, and property management. Our relationship doesn’t end at the notary.',
      },
    ],
  },
  it: {
    badge: '4 dubbi chiave · Acquisto sicuro',
    titleLine: 'Quattro dubbi fondamentali',
    titleAccent: 'prima dell’acquisto',
    lead: 'Rispondo subito. Solo dopo aver chiarito ogni aspetto ha senso valutare gli immobili.',
    cta: 'Come acquistare un immobile in Italia',
    topBadge: 'Garanzia diretta',
    mediaImgAlt: 'Bc. Zuzana Bajgerová in Abruzzo sul mare',
    items: [
      {
        q: '“Non conosco la lingua o il diritto immobiliare locale.”',
        a: 'Guido ogni fase del processo con totale trasparenza. Gestisco personalmente ogni contatto con le controparti italiane.',
      },
      {
        q: '“Temo costi accessori nascosti e imprevisti.”',
        a: 'Riceverete un quadro economico dettagliato al centesimo prima di firmare qualsiasi atto. Si calcola il 10-15% oltre al prezzo.',
      },
      {
        q: '“Temo sorprese acquistando a distanza.”',
        a: 'Vivo sul posto in Abruzzo. Verifico personalmente ogni immobile e i documenti sono controllati dal mio legale indipendente.',
      },
      {
        q: '“Cosa succede dopo la firma dal notaio?”',
        a: 'Volture utenze, imposte, eventuale ristrutturazione, arredo e gestione dell’immobile. Il servizio non si ferma all’atto.',
      },
    ],
  },
};

const PRICE_COPY: Record<
  Locale,
  {
    badge: string;
    titleLine: string;
    titleAccent: string;
    lead: string;
    colInTitle: string;
    colInPill: string;
    itemsIn: string[];
    colOutTitle: string;
    colOutPill: string;
    itemsOut: string[];
    cta: string;
    topBadge: string;
    mediaBadgeTitle: string;
    mediaBadgeSubtitle: string;
    mediaImgAlt: string;
  }
> = {
  cs: {
    badge: 'Transparentní podmínky · Žádné skryté poplatky',
    titleLine: 'Cena, kterou Vám řeknu,',
    titleAccent: 'je konečná',
    lead: 'Neúčtuji si víc podle toho, kolik práce nakonec bude. Tohle je v mé odměně vždycky zahrnuto.',
    colInTitle: 'V mé odměně je vždy',
    colInPill: 'Zahrnuto',
    itemsIn: PRICE_IN,
    colOutTitle: 'V ceně není, ale řeknu Vám to předem',
    colOutPill: 'Předem známo',
    itemsOut: PRICE_OUT,
    cta: 'Spočítat přesné náklady koupě',
    topBadge: 'Férové podmínky',
    mediaBadgeTitle: '100% transparentní odměna',
    mediaBadgeSubtitle: 'Žádné skryté provize ani vícenáklady',
    mediaImgAlt: 'Koupě nemovitosti v Itálii a transparentní předání klíčů s poradcem',
  },
  en: {
    badge: 'Transparent Terms · No Hidden Fees',
    titleLine: 'The price I quote you',
    titleAccent: 'is final',
    lead: 'I do not charge more depending on how much work is ultimately needed. This is always included in my fee.',
    colInTitle: 'Included in my fee',
    colInPill: 'Included',
    itemsIn: [
      'Property scouting and viewing organisation',
      'Price negotiation with the seller',
      'Communication with Italian agencies, notary, lawyer, and surveyor',
      'Codice fiscale, powers of attorney, translations',
      'Utility transfers and tax registrations',
      'Guidance through to key handover',
    ],
    colOutTitle: 'Not included, but stated upfront',
    colOutPill: 'Known upfront',
    itemsOut: [
      'Property transfer taxes (to the state)',
      'Notary fees',
      'Any renovation and furnishing',
      'Running costs, specifically IMU and TARI',
    ],
    cta: 'Calculate purchase costs',
    topBadge: 'Fair Terms',
    mediaBadgeTitle: '100% Transparent Fee',
    mediaBadgeSubtitle: 'No hidden commissions or surprise costs',
    mediaImgAlt: 'Property purchase in Italy with transparent guidance and key handover',
  },
  it: {
    badge: 'Condizioni chiare · Zero costi nascosti',
    titleLine: 'Il compenso concordato',
    titleAccent: 'è definitivo',
    lead: 'Nessun aumento in base al lavoro necessario. Tutto questo è sempre compreso nel mio compenso.',
    colInTitle: 'Compreso nel prezzo',
    colInPill: 'Incluso',
    itemsIn: [
      'Ricerca immobili e organizzazione visite',
      'Trattativa del prezzo con il venditore',
      'Contatti con agenzie locali, notaio, legale e geometra',
      'Codice fiscale, procure, traduzioni',
      'Volture utenze e pratiche tributarie',
      'Accompagnamento fino alla consegna chiavi',
    ],
    colOutTitle: 'Non incluso, ma comunicato in anticipo',
    colOutPill: 'Trasparenza',
    itemsOut: [
      'Imposte sull’acquisto dell’immobile',
      'Onorario del notaio',
      'Eventuale ristrutturazione e arredo',
      'Costi di gestione ordinaria (IMU e TARI)',
    ],
    cta: 'Calcola i costi di acquisto',
    topBadge: 'Trasparenza',
    mediaBadgeTitle: 'Compenso trasparente al 100%',
    mediaBadgeSubtitle: 'Nessuna spesa nascosta o sorpresa finale',
    mediaImgAlt: 'Acquisto immobiliare in Italia e consegna trasparente delle chiavi',
  },
};

export default function HomeSections({
  locale,
  featured,
  stamp,
}: {
  locale: Locale;
  featured: Property[];
  stamp: Date | null;
}) {
  const href = {
    nemovitosti: path('nemovitosti', locale),
    konzultace: path('konzultace', locale),
    jakKoupit: path('jakKoupit', locale),
    sluzby: path('sluzby', locale),
    clanky: path('clanky', locale),
  };

  const listingsCopy = LISTINGS_COPY[locale] ?? LISTINGS_COPY.cs;
  const fearsCopy = FEARS_COPY[locale] ?? FEARS_COPY.cs;
  const priceCopy = PRICE_COPY[locale] ?? PRICE_COPY.cs;

  // schema.org — bez nej se web neobjevi v bohatych vysledcich ani v AI odpovedich
  const agentLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Bc. Zuzana Bajgerová',
    description:
      'Realitní specialistka na nemovitosti v Itálii, region Abruzzo. Kompletní servis pro české a slovenské kupující, celý proces v češtině.',
    areaServed: 'Abruzzo, Itálie',
    knowsLanguage: ['cs', 'it', 'en'],
    telephone: '+420723824348',
    email: 'zuzana.bajgerova@re-max.cz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Slavíkova 6068/18',
      addressLocality: 'Ostrava-Poruba',
      postalCode: '708 00',
      addressCountry: 'CZ',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      reviewCount: '15',
    },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([agentLd, faqLd]) }}
      />

      {/* 01 — HERO (styl Bienes s crossfade pozadím a portrétem) ------------ */}
      <HeroSection locale={locale} href={href} />

      {/* 02 — PRUH DŮKAZŮ (plovoucí pill bar sladěný s hero sekcí) ------------ */}
      <section className="proof-pill-wrap" aria-label="Ocenění a zkušenost">
        <div className="proof-pill">
          <div className="proof-pill__row">
            {PROOF.map((p, idx) => (
              <div className="proof-pill__col" key={p.value}>
                {idx > 0 && <div className="proof-pill__sep" aria-hidden="true" />}
                <div className="proof-pill__stat">
                  <span className="proof-pill__val">{p.value}</span>
                  <span className="proof-pill__lbl">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02B — 4 SLUŽBY (2x2 karty s fotkami na pozadí) ----------------------- */}
      <ServicesCards hrefServices={href.sluzby} />

      {/* 03 — CEHO SE KUPUJICI BOJI --------------------------------------- */}
      <ZigRow
        n="03"
        className="fears-sec"
        badge={fearsCopy.badge}
        title={
          <>
            {fearsCopy.titleLine} <br className="hidden sm:inline" />
            <em>{fearsCopy.titleAccent}</em>
          </>
        }
        lead={fearsCopy.lead}
        media={
          <div className="fears-media__card">
            <picture>
              <source srcSet="/images/zuzana-abruzzo-more.webp" type="image/webp" />
              <img
                src="/images/zuzana-abruzzo-more.png"
                alt={fearsCopy.mediaImgAlt}
                className="fears-media__img"
                width={800}
                height={1067}
                loading="lazy"
              />
            </picture>
            <div className="fears-media__overlay" aria-hidden="true" />
            <div className="fears-media__top-badge">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{fearsCopy.topBadge}</span>
            </div>
          </div>
        }
      >
        <ul className="fears">
          {fearsCopy.items.map((f, i) => (
            <li className="fear" key={i}>
              <div className="fear__num-col">
                <span className="fear__num">0{i + 1}</span>
              </div>
              <div className="fear__content">
                <h3 className="fear__q">{f.q}</h3>
                <p className="fear__a">{f.a}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="fears-sec__cta">
          <Link href={href.jakKoupit} className="btn btn--saffron fears-sec__btn">
            <span>{fearsCopy.cta}</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="fears-sec__btn-arrow"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </ZigRow>

      <LandscapeLine />

      {/* 04 — CENA JE KONECNA ------------------------------------------------ */}
      <section className="price-sec" aria-labelledby="sec-04">
        <div className="wrap">
          <div className="price-sec__head">
            <div className="listings__badge">
              <span className="listings__badge-dot" />
              <span>{priceCopy.badge}</span>
            </div>
            <h2 id="sec-04" className="home-h2">
              {priceCopy.titleLine} <em>{priceCopy.titleAccent}</em>
            </h2>
            <p className="home-lead">{priceCopy.lead}</p>
          </div>

          <div className="price-sec__grid">
            <div className="price-sec__left">
              <div className="pricecols">
              <div className="pricecol pricecol--included">
                <div className="pricecol__head">
                  <h3 className="pricecol__h">{priceCopy.colInTitle}</h3>
                  <span className="pricecol__badge pricecol__badge--in">{priceCopy.colInPill}</span>
                </div>
                <ul className="pricecol__list">
                  {priceCopy.itemsIn.map((x) => (
                    <li key={x} className="pricecol__item">
                      <span className="pricecol__icon pricecol__icon--check" aria-hidden="true">
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3.5 8.5l3 3 6-6" />
                        </svg>
                      </span>
                      <span className="pricecol__text">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pricecol pricecol--excluded">
                <div className="pricecol__head">
                  <h3 className="pricecol__h">{priceCopy.colOutTitle}</h3>
                  <span className="pricecol__badge pricecol__badge--out">{priceCopy.colOutPill}</span>
                </div>
                <ul className="pricecol__list">
                  {priceCopy.itemsOut.map((x) => (
                    <li key={x} className="pricecol__item">
                      <span className="pricecol__icon pricecol__icon--info" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="currentColor">
                          <circle cx="8" cy="8" r="3" />
                        </svg>
                      </span>
                      <span className="pricecol__text">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="price-sec__cta">
              <Link href={href.jakKoupit} className="btn btn--saffron price-sec__btn">
                <span>{priceCopy.cta}</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="price-sec__btn-arrow"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="price-sec__right">
            <div className="price-sec__transparency">
              <span className="price-sec__transparency-label">{priceCopy.topBadge}</span>
              <h3 className="price-sec__transparency-title">{priceCopy.mediaBadgeTitle}</h3>
              <p className="price-sec__transparency-desc">
                {locale === 'cs'
                  ? 'Před začátkem spolupráce vždy přesně víte, co je v mé odměně a co už jsou vedlejší náklady. Žádná překvapení.'
                  : locale === 'it'
                    ? 'Prima di iniziare la collaborazione sapete sempre esattamente cosa è compenso e quali sono i costi aggiuntivi. Nessuna sorpresa.'
                    : 'Before we start working together, you always know exactly what is included in my fee and what are additional costs. No surprises.'}
              </p>
              <div className="price-sec__features">
                <div className="price-sec__feature">
                  <span className="price-sec__feature-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                  <div className="price-sec__feature-text">
                    <span className="price-sec__feature-title">
                      {locale === 'cs' ? 'Písemné shrnutí' : locale === 'it' ? 'Riepilogo scritto' : 'Written summary'}
                    </span>
                    <span className="price-sec__feature-desc">
                      {locale === 'cs'
                        ? 'Vše podstatné máte vždy černé na bílém.'
                        : locale === 'it'
                          ? 'Tutto ciò che conta è sempre per iscritto.'
                          : 'Everything important is always in writing.'}
                    </span>
                  </div>
                </div>
                <div className="price-sec__feature">
                  <span className="price-sec__feature-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <div className="price-sec__feature-text">
                    <span className="price-sec__feature-title">
                      {locale === 'cs' ? 'Otevřená komunikace' : locale === 'it' ? 'Comunicazione aperta' : 'Open communication'}
                    </span>
                    <span className="price-sec__feature-desc">
                      {locale === 'cs'
                        ? 'Na všechny otázky dostanete jasnou odpověď.'
                        : locale === 'it'
                          ? 'A tutte le domande riceverete una risposta chiara.'
                          : 'You will get a clear answer to all questions.'}
                    </span>
                  </div>
                </div>
                <div className="price-sec__feature">
                  <span className="price-sec__feature-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <div className="price-sec__feature-text">
                    <span className="price-sec__feature-title">
                      {locale === 'cs' ? 'Žádná překvapení' : locale === 'it' ? 'Nessuna sorpresa' : 'No surprises'}
                    </span>
                    <span className="price-sec__feature-desc">
                      {locale === 'cs'
                        ? 'Cenu znáte předem a už se nemění.'
                        : locale === 'it'
                          ? 'Il prezzo lo sapete in anticipo e non cambia.'
                          : 'You know the price in advance and it does not change.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="price-sec__bottom">
          <div className="price-sec__trust">
            <span className="price-sec__trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {locale === 'cs' ? 'Férový přístup' : locale === 'it' ? 'Approccio leale' : 'Fair approach'}
            </span>
            <span className="price-sec__trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {locale === 'cs' ? 'Místní zkušenosti' : locale === 'it' ? 'Esperienza locale' : 'Local experience'}
            </span>
            <span className="price-sec__trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {locale === 'cs' ? 'Osobní péče od začátku do konce' : locale === 'it' ? 'Cura personale dall\'inizio alla fine' : 'Personal care from start to finish'}
            </span>
          </div>
        </div>
      </div>
    </section>

      {/* 05 — VYBER NEMOVITOSTI -------------------------------------------- */}
      <section className="listings" aria-labelledby="sec-05">
        <div className="wrap">
          <div className="listings__head">
            <div className="listings__text">
              <div className="listings__badge">
                <span className="listings__badge-dot" />
                <span>{listingsCopy.badge}</span>
              </div>

              <h2 id="sec-05" className="listings__title">
                {listingsCopy.titleLine} <br className="hidden sm:inline" />
                <em>{listingsCopy.titleAccent}</em>
              </h2>

              <p className="listings__lead">{listingsCopy.lead}</p>

              <div className="listings__bar">
                <div className="chips">
                  {QUICK_PICKS.map((q, idx) => (
                    <Link
                      key={q}
                      href={href.nemovitosti}
                      className={`chip ${idx === 0 ? 'is-active' : ''}`}
                    >
                      {q}
                    </Link>
                  ))}
                </div>
                {stamp && (
                  <span className="stamp">
                    <span className="dot" />
                    {listingsCopy.updated}{' '}
                    {stamp.toLocaleDateString(
                      locale === 'cs' ? 'cs-CZ' : locale === 'it' ? 'it-IT' : 'en-US'
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Slider
          properties={featured}
          locale={locale}
          cta={
            <Link href={href.nemovitosti} className="btn btn--saffron listings__btn">
              <span>{listingsCopy.cta}</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="listings__btn-arrow"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          }
        />
      </section>

      {/* 06 — PROC JA: 4 PILIRE ------------------------------------------- */}
      <ZigRow
        n="06"
        className="zig--pillars"
        badge="Osobní záruka · Abruzzo, Itálie"
        title={
          <>
            Čtyři věci, které <em>jinde nedostanete</em>
          </>
        }
        lead="Žiji celoročně přímo v Abruzzu a stojím osobně za každým krokem Vaší koupě. Od prvního výběru přes prověření nemovitosti až po notáře a servis po podpisu."
        media={<PillarsVideoCard />}
      >
        <ol className="pillars">
          {PILLARS.map((p) => (
            <li className="pillar" key={p.roman}>
              <span className="pillar__r">{p.roman}</span>
              <div className="pillar__content">
                <p className="pillar__t">{p.title}</p>
                <p className="pillar__d">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="pillars__cta">
          <Link href={href.konzultace} className="btn btn--saffron">
            <span>Domluvit nezávaznou konzultaci</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <Link href={href.sluzby} className="btn btn--ghost">
            <span>Více o mých službách</span>
          </Link>
        </div>
      </ZigRow>

      <LandscapeLine accent />

      {/* 07 — JAK PROBÍHÁ SPOLUPRÁCE (9 KROKŮ OD A DO Z) ----------------------- */}
      <ProcessSection locale={locale} href={href} />

      {/* 08 — LOKALITY ABRUZZA ------------------------------------------------ */}
      <ZigRow
        className="zig--localities"
        n="08"
        title="Kde v Abruzzu hledat"
        lead="Abruzzo není jedno místo. Pobřeží, vnitrozemí a hory se liší cenou i tím, pro koho se hodí."
        media={
          <div className="loc-grid">
            {LOCALITY_SLUGS.map((s) => {
              const loc = LOCALITIES[s];
              return (
                <Link key={s} href={path('lokalita', locale, s)} className="loc-tile">
                  <picture>
                    <source srcSet={loc.image.webp} type="image/webp" />
                    <img
                      src={loc.image.src}
                      alt={loc.image.alt}
                      className="loc-tile__img"
                      width={loc.image.width}
                      height={loc.image.height}
                      loading="lazy"
                    />
                  </picture>
                  <span className="loc-tile__name">{loc.title}</span>
                </Link>
              );
            })}
          </div>
        }
      >
        <ul className="loc-list">
          {LOCALITY_SLUGS.map((s) => (
            <li key={s}>
              <Link href={path('lokalita', locale, s)}>
                <b>{LOCALITIES[s].title}</b> — {firstSentence(LOCALITIES[s].lead)}
              </Link>
            </li>
          ))}
        </ul>
      </ZigRow>

      <LandscapeLine />

      {/* 09 — REFERENCE (horizontální karusel karet) --------------------------- */}
      <TestimonialsCarousel locale={locale} />

      {/* 10 — CO DELAM PO KOUPI ------------------------------------------- */}
      <ZigRow
        n="10"
        title="Klíči to nekončí"
        lead="Většina mých klientů v Itálii nebydlí celoročně. Tohle je důvod, proč se ke mně vracejí."
        media={
          <div className="zig__video">
            <video
              src="/video/garsonka-prohlidka-web.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        }
      >
        <ul className="after">
          {AFTER.map((a) => (
            <li key={a.title}>
              <p className="after__t">{a.title}</p>
              <p className="after__d">{a.text}</p>
            </li>
          ))}
        </ul>
        <Link href={href.sluzby} className="btn btn--saffron">
          Služby po koupi
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </ZigRow>

      <LandscapeLine />

      {/* 11 — FAQ -------------------------------------------------------------- */}
      <FaqSection faq={FAQ} ctaHref={href.jakKoupit} ctaLabel="Všechny časté dotazy" />

      {/* 12 — PRŮVODCI A ČLÁNKY — 3 clean 3D karty --------------------------- */}
      <GuidesCards locale={locale} />

      <LandscapeLine accent />

      {/* 13+14 — KONTAKT (sloucene: hlidac nabidek "bar" odstranen, zaverecne CTA
          je uvodni sloupec teto sekce). dvousloupcovy layout: text + kontakty vlevo,
          formular na tmave karte vpravo. */}
      <section className="band contact-sec" aria-labelledby="sec-13">
        <div className="wrap contact">
          <div className="contact__intro">
            <div>
              <p className="eyebrow eyebrow--dot">Kontakt</p>
              <h2 id="sec-13" className="home-h2">
                Zavolejme si
              </h2>
              <p className="home-lead">
                Nic to nestojí a k ničemu Vás to nezavazuje. Za dvacet minut budete vědět,
                jestli je koupě v Itálii pro Vás reálná, kolik by přibližně stála a co všechno
                bych za Vás vyřídila.
              </p>
              <Link href={href.konzultace} className="link-more">
                Nebo si rovnou vyberte termín hovoru →
              </Link>
            </div>

            <ul className="contact__rows">
              <li>
                <span className="contact__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21s-7-6.7-7-11a7 7 0 0 1 14 0c0 4.3-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                </span>
                <span>
                  RE/MAX Černá perla, Slavíkova 6068/18
                  <br />
                  708 00 Ostrava-Poruba · v sezóně přímo v Abruzzu
                </span>
              </li>
              <li>
                <span className="contact__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 6h18v12H3z" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <a href="mailto:zuzana.bajgerova@re-max.cz">zuzana.bajgerova@re-max.cz</a>
              </li>
              <li>
                <span className="contact__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 4h5l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v5a2 2 0 0 1-2 2A17 17 0 0 1 2 6a2 2 0 0 1 2-2z" />
                  </svg>
                </span>
                <a href={TEL}>+420 723 824 348</a>
              </li>
              <li>
                <span className="contact__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 20l1.5-4A8 8 0 1 1 9 19z" />
                  </svg>
                </span>
                <a href={WA}>WhatsApp — nejrychlejší odpověď</a>
              </li>
            </ul>
          </div>

          {/* TODO: napojit na Resend + notifikaci na mobil se zdrojem (funkce 03). zatim bez akce. */}
          <form className="contact__form" aria-label="Kontaktní formulář">
            <label>
              <span>Jméno</span>
              <input type="text" name="name" placeholder="Vaše jméno" autoComplete="name" required />
            </label>
            <label>
              <span>E-mail</span>
              <input
                type="email"
                name="email"
                placeholder="vas@email.cz"
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span>Telefon</span>
              <input type="tel" name="phone" placeholder="+420 723 824 348" autoComplete="tel" />
            </label>
            <label>
              <span>Zpráva</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Co hledáte, jaký máte rozpočet a kdy chcete kupovat"
              />
            </label>
            <button type="submit" className="btn btn--saffron">
              Odeslat
            </button>
            <p className="contact__fine">Ozvu se do 24 hodin. Údaje nikam nepředávám.</p>
          </form>
        </div>
      </section>

      {/* 15 — PATICKA je v layoutu (components/SiteFooter.tsx) */}
    </main>
  );
}
