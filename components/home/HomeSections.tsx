import Link from 'next/link';
import type { Property } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { path, SITE_URL } from '@/lib/routes';
import { AGENT_ID } from '@/lib/schema';
import {
  HERO,
  PROOF,
  FEARS,
  PILLARS,
  PROCESS,
  AFTER,
  FAQ,
  GUIDES,
  QUICK_PICKS,
  csNum,
  csPlural,
  capFirst,
} from '@/lib/home';
import LandscapeLine from '@/components/LandscapeLine';
import Marked from '@/components/Marked';
import ContactFormCard from '@/components/forms/ContactFormCard';
import { PHONE_TEL, waLink } from '@/lib/contact';
import Slider from '@/components/Slider';
import HeroSection from './HeroSection';
import ServicesCards from './ServicesCards';
import PillarsVideoCard from './PillarsVideoCard';
import PillarIcon from './PillarIcon';
import PriceOverview from './PriceOverview';
import ProcessSection from './ProcessSection';
import GuidesCards from './GuidesCards';
import TestimonialsCarousel from './TestimonialsCarousel';
import FaqSection from './FaqSection';
import WhyAbruzzo from './WhyAbruzzo';
import CommunitySection from './CommunitySection';
import RenoSection from './RenoSection';
import VideoAnswers from './VideoAnswers';
import AboutSection from './AboutSection';
import FearsAccordion from './FearsAccordion';

const WA_PREFILLED = waLink();
const TEL = PHONE_TEL;

const PILLAR_SUMMARIES = [
  'Jsem na místě a znám lidi, se kterými při koupi spolupracuji.',
  'Prohlídky, dokumenty i přepisy energií řešíme společně.',
  'Celou koupí vás provedu srozumitelně v češtině.',
  'Pomohu vám také s rekonstrukcí, správou a povinnostmi po koupi.',
  'Spolupracuji s místními realitkami a dalšími prověřenými odborníky.',
  'Při jednání hájím vaše zájmy a usiluji o dobré podmínky.',
];

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
    lead: 'Výběr nemovitostí z mé nabídky v Abruzzu. Dostupnost a aktuální cenu vám potvrdím před prohlídkou.',
    cta: 'Všechny nabídky nemovitostí',
    updated: 'Údaje k',
  },
  en: {
    badge: 'Current Portfolio · Abruzzo, Italy',
    titleLine: 'Current Properties',
    titleAccent: 'in Abruzzo, Italy',
    lead: 'A selection of properties in Abruzzo. I will confirm availability and the current price before your viewing.',
    cta: 'View all property listings',
    updated: 'Data as of',
  },
  it: {
    badge: 'Portfolio attuale · Abruzzo, Italia',
    titleLine: 'Immobili disponibili',
    titleAccent: 'in Abruzzo, Italia',
    lead: 'Una selezione di immobili in Abruzzo. Confermerò disponibilità e prezzo aggiornato prima della visita.',
    cta: 'Tutti gli immobili disponibili',
    updated: 'Dati al',
  },
};

const VISIBLE_FEARS = FEARS;

// Na homepage musí odpověď odpovídat zdejší cenové sekci: inzerovaná cena už
// zahrnuje náklady koupě. Sdílený obsah podstránek tím neměníme.
const HOME_FAQ = FAQ.map((item) => {
  if (item.q === 'Kolik zaplatím navíc nad cenu nemovitosti?') {
    return {
      q: 'Co zahrnuje cena uvedená v inzerátu?',
      a: 'U nabídek na tomto webu je v uvedené ceně započítaná nemovitost, daň z převodu, notář i naše provize. Zvlášť počítejte s případnou rekonstrukcí, vybavením a následnými ročními poplatky.',
    };
  }
  if (item.q === 'Můžu nemovitost pronajímat a vydělávat na ní?') {
    return {
      q: 'Můžu nemovitost pronajímat?',
      a: 'Ano. Pomohu s přípravou apartmánu pro krátkodobý nebo sezónní pronájem, úklidem a komunikací s hosty. Konkrétní možnosti a očekávané náklady spolu probereme pro vybranou nemovitost.',
    };
  }
  return item;
});

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
    // Počet odpovídá všem zobrazeným otázkám.
    badge: `${VISIBLE_FEARS.length} ${csPlural(VISIBLE_FEARS.length, 'klíčová otázka', 'klíčové otázky', 'klíčových otázek')} · Bezpečná koupě`,
    titleLine: `Znám ${csNum(VISIBLE_FEARS.length)} ${csPlural(VISIBLE_FEARS.length, 'otázku', 'otázky', 'otázek')}, které vám`,
    titleAccent: 'teď běží hlavou',
    lead: 'Odpovím na ně hned. Dokud na ně neodpovím, žádná nemovitost vás nezajímá.',
    cta: 'Jak koupit nemovitost v Itálii',
    topBadge: 'Osobní garance',
    mediaImgAlt: 'Bc. Zuzana Bajgerová – osobní dohled a garance bezpečné koupě',
    items: VISIBLE_FEARS,
  },
  en: {
    badge: '4 Key Questions · Safe Purchase',
    titleLine: 'Four questions on your mind',
    titleAccent: 'right now',
    lead: 'Let me answer them right away. Until they are resolved, no property matters yet.',
    cta: 'How to buy property in Italy',
    topBadge: 'Personal guarantee',
    mediaImgAlt: 'Bc. Zuzana Bajgerová – personal oversight and safe purchase guarantee',
    items: [
      {
        q: '“I don’t understand the language or Italian law.”',
        a: 'I guide you through the entire process in your language. I negotiate with Italian authorities and send you clear, understandable summaries.',
      },
      {
        q: '“I don’t know what the real extra costs will be.”',
        a: 'The price you see online is final. It includes the property price, the transfer taxes, the notary fee and our commission, plus the first year of basic service with my assistants, who also live locally.',
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
    mediaImgAlt: 'Bc. Zuzana Bajgerová – supervisione personale e garanzia di acquisto sicuro',
    items: [
      {
        q: '“Non conosco la lingua o il diritto immobiliare locale.”',
        a: 'Guido ogni fase del processo con totale trasparenza. Gestisco personalmente ogni contatto con le controparti italiane.',
      },
      {
        q: '“Temo costi accessori nascosti e imprevisti.”',
        a: 'Il prezzo che vedete online è definitivo. Comprende il prezzo dell’immobile, le imposte di trasferimento, l’onorario del notaio e la nostra provvigione, oltre al primo anno di assistenza di base con le mie assistenti, che vivono anch’esse sul posto.',
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
    oMne: path('oMne', locale),
  };

  const listingsCopy = LISTINGS_COPY[locale] ?? LISTINGS_COPY.cs;
  const fearsCopy = FEARS_COPY[locale] ?? FEARS_COPY.cs;

  // schema.org — bez nej se web neobjevi v bohatych vysledcich ani v AI odpovedich
  const agentLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': AGENT_ID, // stejny uzel jako na podstrankach (lib/schema.ts), Google ho spoji
    url: SITE_URL,
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
    mainEntity: HOME_FAQ.map((f) => ({
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
      <ServicesCards locale={locale} />

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
              <source srcSet="/images/zuzana-portret-garance.webp" type="image/webp" />
              <img
                src="/images/zuzana-portret-garance.png"
                alt={fearsCopy.mediaImgAlt}
                className="fears-media__img"
                width={576}
                height={1024}
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
        <FearsAccordion items={fearsCopy.items} />

        <div className="fears-sec__cta">
          <Link href={href.jakKoupit} className="btn btn--saffron fears-sec__btn">
            <span>{fearsCopy.cta}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="fears-sec__btn-arrow"
              aria-hidden="true"
            >
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </ZigRow>

      <LandscapeLine />

      {/* 04 — NABÍDKOVÁ CENA ---------------------------------------------- */}
      <PriceOverview locale={locale} guideHref={href.jakKoupit} />

      {/* 05 — VYBER NEMOVITOSTI -------------------------------------------- */}
      <section className="listings" aria-labelledby="sec-05">
        <div className="wrap">
          <div className="listings__head">
            <div className="listings__text">

              <h2 id="sec-05" className="listings__title">
                {listingsCopy.titleLine} <br className="hidden sm:inline" />
                <em>{listingsCopy.titleAccent}</em>
              </h2>

              <p className="listings__lead">{listingsCopy.lead}</p>

              <div className="listings__bar">
                <div className="chips">
                  {QUICK_PICKS.map((q, idx) => (
                    <Link
                      key={q.label}
                      href={q.q ? `${href.nemovitosti}?${q.q}#filtr` : `${href.nemovitosti}#filtr`}
                      className={`chip ${idx === 0 ? 'is-active' : ''}`}
                    >
                      {q.label}
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
            <Link key="all-listings" href={href.nemovitosti} className="btn btn--saffron listings__btn">
              <span>{listingsCopy.cta}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="listings__btn-arrow"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          }
        />
      </section>

      {/* 06 — PROC JA ------------------------------------------------------ */}
      <section className="reasons-section" aria-labelledby="sec-06">
        <div className="wrap">
          <div className="reasons-section__head">
            <h2 id="sec-06" className="home-h2">
              {capFirst(`${csNum(PILLARS.length)} ${csPlural(PILLARS.length, 'věc', 'věci', 'věcí')}`)}, které{' '}
              <em>jinde nedostanete</em>
            </h2>
            <p className="home-lead">Žiji v Abruzzu a osobně vás provedu výběrem, koupí i péčí o nemovitost po podpisu.</p>
          </div>

          <div className="reasons-section__layout">
            <div className="reasons-section__media"><PillarsVideoCard /></div>
            <ol className="reasons-grid">
              {PILLARS.map((p, index) => (
                <li className="reason-card" key={p.roman}>
                  <div className="reason-card__top">
                    <span className="reason-card__icon"><PillarIcon index={index} /></span>
                    <span className="reason-card__number">{p.roman}</span>
                  </div>
                  <h3 className="reason-card__title">{p.title}</h3>
                  <p className="reason-card__description">{PILLAR_SUMMARIES[index]}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="reasons-section__cta">
            <Link href={href.konzultace} className="btn btn--saffron">
              <span>Domluvit nezávaznou konzultaci</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
            <Link href={href.sluzby} className="btn btn--ghost"><span>Více o mých službách</span></Link>
          </div>
        </div>
      </section>

      <LandscapeLine accent />

      {/* 07 — JAK PROBÍHÁ SPOLUPRÁCE (9 KROKŮ OD A DO Z) ----------------------- */}
      <ProcessSection locale={locale} href={href} />

      {/* 08 — PROC PRAVE ABRUZZO (nahradila "Kde v Abruzzu hledat") ---------------- */}
      <WhyAbruzzo />

      <LandscapeLine />

      {/* 09 — REFERENCE (horizontální karusel karet) --------------------------- */}
      <TestimonialsCarousel locale={locale} />

      {/* 09A — KOMUNITA (hned pod referencemi) --------------------------------- */}
      <CommunitySection />

      {/* 10 — CO DELAM PO KOUPI ------------------------------------------- */}
      <section className="aftercare-summary" aria-labelledby="sec-10">
        <div className="wrap">
          <h2 id="sec-10" className="home-h2">Klíči to <em>nekončí</em></h2>
          <p className="home-lead">První rok základního asistenčního servisu máte v naší provizi. A když potřebujete víc, náš tým zůstává na místě.</p>
          <div className="aftercare-summary__links">
            {AFTER.map((a, i) => {
              const serviceId = a.serviceId ?? (['rekonstrukce', 'sprava', 'pronajem'] as const)[i];
              return (
                <Link
                  key={a.title}
                  href={path(serviceId, locale)}
                  className="aftercare-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt=""
                    className="aftercare-card__bg"
                    loading="lazy"
                    decoding="async"
                    width="960"
                    height="1200"
                  />
                  <div className="aftercare-card__overlay" aria-hidden="true" />
                  <span className="aftercare-card__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="aftercare-card__content">
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10A — REKONSTRUKCE NA KLIC (za sekci "Klici to nekonci", ktera ji zminuje) */}
      <RenoSection href={href.konzultace} />

      <LandscapeLine />

      {/* 10B — PTATE SE, ODPOVIDAM (video odpovedi pred FAQ) -------------------- */}
      <VideoAnswers />

      {/* 11 — FAQ -------------------------------------------------------------- */}
      <FaqSection faq={HOME_FAQ} ctaHref={href.jakKoupit} ctaLabel="Všechny časté dotazy" />

      {/* 12 — PRŮVODCI A ČLÁNKY — 3 clean 3D karty --------------------------- */}
      <GuidesCards locale={locale} />

      <LandscapeLine accent />

      {/* 12A — O MNE (pred kontaktem) ------------------------------------------ */}
      <AboutSection href={href.oMne} />

      <LandscapeLine />

      {/* 13+14 — KONTAKT (sloucene: hlidac nabidek "bar" odstranen, zaverecne CTA
          je uvodni sloupec teto sekce). dvousloupcovy layout: text + kontakty vlevo,
          formular na tmave karte vpravo. */}
      <section className="band contact-sec" aria-labelledby="sec-13">
        <div className="wrap contact">
          <div className="contact__intro">
            <div>
              <h2 id="sec-13" className="home-h2">
                Zavolejme si
              </h2>
              <p className="home-lead">
                Napište mi, co hledáte, jaký máte rozpočet a kdy byste chtěli kupovat.
                Společně probereme možnosti v Abruzzu. Úvodní konzultace je zdarma a nezávazná.
              </p>
              <Link href={href.konzultace} className="link-more">
                Nebo navrhněte termín hovoru →
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
                  708 00 Ostrava-Poruba · celoročně v Abruzzu
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
                <a href={WA_PREFILLED}>WhatsApp, nejrychlejší odpověď</a>
              </li>
            </ul>

            <aside className="contact__note" aria-label="Jak mě nejlépe zastihnete">
              <p>
                Nejrychleji mě zastihnete přes WhatsApp. Pokud máte vážný zájem a nedovoláte se mi,
                zavolejte klidně znovu. Kvůli vysokému zájmu se mi občas stane, že mi číslo unikne,
                když zrovna telefonuji.
              </p>
            </aside>
          </div>

          {/* formular posila poptavky pres /api/lead (lib/forms.ts), po odeslani presmeruje na /dekujeme */}
          <ContactFormCard source="homepage" />
        </div>
      </section>

      {/* 15 — PATICKA je v layoutu (components/SiteFooter.tsx) */}
    </main>
  );
}
