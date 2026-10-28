import Link from 'next/link';
import type { Property } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { path, SITE_URL } from '@/lib/routes';
import { AGENT_ID } from '@/lib/schema';
import {
  csNum,
  csPlural,
  capFirst,
} from '@/lib/home';
import { homeData, HOME_FAQ_OVERRIDES } from '@/lib/home.l10n';
import { HOME_UI } from './ui';
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
    updated: 'Aktualizuje se automaticky',
  },
  en: {
    badge: 'Current Portfolio · Abruzzo, Italy',
    titleLine: 'Current Properties',
    titleAccent: 'in Abruzzo, Italy',
    lead: 'A selection of properties in Abruzzo. I will confirm availability and the current price before your viewing.',
    cta: 'View all property listings',
    updated: 'Updated automatically',
  },
  it: {
    badge: 'Portfolio attuale · Abruzzo, Italia',
    titleLine: 'Immobili disponibili',
    titleAccent: 'in Abruzzo, Italia',
    lead: 'Una selezione di immobili in Abruzzo. Confermerò disponibilità e prezzo aggiornato prima della visita.',
    cta: 'Tutti gli immobili disponibili',
    updated: 'Aggiornato automaticamente',
  },
};

export default function HomeSections({
  locale,
  featured,
}: {
  locale: Locale;
  featured: Property[];
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
  const D = homeData(locale);
  const ui = HOME_UI[locale];
  const { PROOF, PILLARS, AFTER, QUICK_PICKS } = D;
  const VISIBLE_FEARS = D.FEARS;
  const fearsCopy =
    locale === 'cs'
      ? {
          // Počet odpovídá všem zobrazeným otázkám.
          badge: `${VISIBLE_FEARS.length} ${csPlural(VISIBLE_FEARS.length, 'klíčová otázka', 'klíčové otázky', 'klíčových otázek')} · Bezpečná koupě`,
          titleLine: `Znám ${csNum(VISIBLE_FEARS.length)} ${csPlural(VISIBLE_FEARS.length, 'otázku', 'otázky', 'otázek')}, které vám`,
          titleAccent: 'teď běží hlavou',
          lead: 'Odpovím na ně hned. Dokud na ně neodpovím, žádná nemovitost vás nezajímá.',
          cta: 'Jak koupit nemovitost v Itálii',
          topBadge: 'Osobní garance',
          mediaImgAlt: 'Bc. Zuzana Bajgerová – osobní dohled a garance bezpečné koupě',
        }
      : {
          ...ui.fears,
          cta: { en: 'How to buy property in Italy', it: 'Come acquistare un immobile in Italia' }[locale],
          topBadge: { en: 'Personal guarantee', it: 'Garanzia diretta' }[locale],
          mediaImgAlt: {
            en: 'Bc. Zuzana Bajgerová – personal oversight and a safe-purchase guarantee',
            it: 'Bc. Zuzana Bajgerová – supervisione personale e garanzia di acquisto sicuro',
          }[locale],
        };
  // Na homepage musí odpověď odpovídat zdejší cenové sekci: inzerovaná cena už
  // zahrnuje náklady koupě. Sdílený obsah podstránek tím neměníme.
  const HOME_FAQ = D.FAQ.map((item, i) => {
    if (i === 1) {
      return locale === 'cs'
        ? { q: 'Co zahrnuje cena uvedená v inzerátu?', a: 'U nabídek na tomto webu je v uvedené ceně započítaná nemovitost, daň z převodu, notář i naše provize. Zvlášť počítejte s případnou rekonstrukcí, vybavením a následnými ročními poplatky.' }
        : HOME_FAQ_OVERRIDES.price[locale];
    }
    if (i === 7) {
      return locale === 'cs'
        ? { q: 'Můžu nemovitost pronajímat?', a: 'Ano. Pomohu s přípravou apartmánu pro krátkodobý nebo sezónní pronájem, úklidem a komunikací s hosty. Konkrétní možnosti a očekávané náklady spolu probereme pro vybranou nemovitost.' }
        : HOME_FAQ_OVERRIDES.rent[locale];
    }
    return item;
  });

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
      <section className="proof-pill-wrap" aria-label={ui.proofAria}>
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
        <FearsAccordion items={VISIBLE_FEARS} />

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

            </div>
            <aside className="listings__offmarket" aria-label={ui.offmarketAria}>
              <p className="listings__offmarket-title">{locale === 'cs' ? 'Moje nabídka je mnohem širší, než vidíte na webu.' : locale === 'it' ? 'La mia offerta è molto più ampia di quella che trovi sul sito.' : 'My portfolio goes far beyond what you see online.'}</p>
              <p>{locale === 'cs' ? 'Díky spolupráci s místními realitními kolegy a přímým kontaktům mezi Italy mám přístup i k neveřejným nabídkám, které běžně v inzerci nenajdete.' : locale === 'it' ? 'Grazie alla collaborazione con agenti immobiliari locali e ai contatti diretti con gli italiani, ho accesso anche a immobili non pubblicizzati.' : 'Through local estate agents and direct contacts with Italians, I also have access to properties that are not publicly advertised.'}</p>
              <p>{locale === 'cs' ? 'Nemovitosti proto aktivně vyhledávám na míru vašim představám a požadavkům.' : locale === 'it' ? 'Cerco quindi attivamente immobili su misura per le tue esigenze e preferenze.' : 'I actively search for properties that match your preferences and requirements.'}</p>
            </aside>
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
                <span className="stamp">
                  <span className="dot" />
                  {listingsCopy.updated}
                </span>
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
        <div className="wrap listings__custom">
          <p>{locale === 'cs' ? 'Nenašli jste v nabídce to, co hledáte?' : locale === 'it' ? 'Non hai trovato quello che cerchi?' : 'Haven’t found what you are looking for?'}</p>
          <Link href={href.konzultace} className="btn btn--ghost">{locale === 'cs' ? 'Napište mi svou představu' : locale === 'it' ? 'Raccontami cosa cerchi' : 'Tell me what you are looking for'}</Link>
        </div>
      </section>

      {/* 06 — PROC JA ------------------------------------------------------ */}
      <section className="reasons-section" aria-labelledby="sec-06">
        <div className="wrap">
          <div className="reasons-section__head">
            <h2 id="sec-06" className="home-h2">
              {locale === 'cs' ? (
                <>{capFirst(`${csNum(PILLARS.length)} ${csPlural(PILLARS.length, 'věc', 'věci', 'věcí')}`)}, které{' '}</>
              ) : locale === 'en' ? (
                <>Six things{' '}</>
              ) : (
                <>Sei cose{' '}</>
              )}
              <em>{ui.reasonsAccent}</em>
            </h2>
            <p className="home-lead">{ui.reasonsLead}</p>
          </div>

          <div className="reasons-section__layout">
            <div className="reasons-section__media"><PillarsVideoCard locale={locale} /></div>
            <ol className="reasons-grid">
              {PILLARS.map((p, index) => (
                <li className="reason-card" key={p.roman}>
                  <div className="reason-card__top">
                    <span className="reason-card__icon"><PillarIcon index={index} /></span>
                    <span className="reason-card__number">{p.roman}</span>
                  </div>
                  <h3 className="reason-card__title">{p.title}</h3>
                  <p className="reason-card__description">{ui.pillarSummaries[index]}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="reasons-section__cta">
            <Link href={href.konzultace} className="btn btn--saffron">
              <span>{ui.consult}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
            <Link href={href.sluzby} className="btn btn--ghost"><span>{ui.moreServices}</span></Link>
          </div>
        </div>
      </section>

      <LandscapeLine accent />

      {/* 07 — JAK PROBÍHÁ SPOLUPRÁCE (9 KROKŮ OD A DO Z) ----------------------- */}
      <ProcessSection locale={locale} href={href} />

      {/* 08 — PROC PRAVE ABRUZZO (nahradila "Kde v Abruzzu hledat") ---------------- */}
      <WhyAbruzzo locale={locale} />

      <LandscapeLine />

      {/* 09 — REFERENCE (horizontální karusel karet) --------------------------- */}
      <TestimonialsCarousel locale={locale} />

      {/* 09A — KOMUNITA (hned pod referencemi) --------------------------------- */}
      <CommunitySection locale={locale} />

      {/* 10 — CO DELAM PO KOUPI ------------------------------------------- */}
      <section className="aftercare-summary" aria-labelledby="sec-10">
        <div className="wrap">
          <h2 id="sec-10" className="home-h2">{ui.aftercareTitle} <em>{ui.aftercareAccent}</em></h2>
          <p className="home-lead">{ui.aftercareLead}</p>
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
      <RenoSection href={href.konzultace} locale={locale} />

      <LandscapeLine />

      {/* 10B — PTATE SE, ODPOVIDAM (video odpovedi pred FAQ) -------------------- */}
      <VideoAnswers locale={locale} />

      {/* 11 — FAQ -------------------------------------------------------------- */}
      <FaqSection faq={HOME_FAQ} ctaHref={href.jakKoupit} ctaLabel={ui.faqCta} heading={<>{ui.faqTitle} <em>{ui.faqAccent}</em></>} />

      {/* 12 — PRŮVODCI A ČLÁNKY — 3 clean 3D karty --------------------------- */}
      <GuidesCards locale={locale} />

      <LandscapeLine accent />

      {/* 12A — O MNE (pred kontaktem) ------------------------------------------ */}
      <AboutSection href={href.oMne} locale={locale} />

      <LandscapeLine />

      {/* 13+14 — KONTAKT (sloucene: hlidac nabidek "bar" odstranen, zaverecne CTA
          je uvodni sloupec teto sekce). dvousloupcovy layout: text + kontakty vlevo,
          formular na tmave karte vpravo. */}
      <section className="band contact-sec" aria-labelledby="sec-13">
        <div className="wrap contact">
          <div className="contact__intro">
            <div>
              <h2 id="sec-13" className="home-h2">
                {ui.contactTitle}
              </h2>
              <p className="home-lead">{ui.contactLead}</p>
              <Link href={href.konzultace} className="link-more">
                {ui.contactForm}
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
                  {ui.contactPlace}
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
                <a href={WA_PREFILLED}>{ui.contactWa}</a>
              </li>
            </ul>

            <aside className="contact__note" aria-label={ui.contactNoteAria}>
              <p>{ui.contactNote}</p>
            </aside>
          </div>

          {/* formular posila poptavky pres /api/lead (lib/forms.ts), po odeslani presmeruje na /dekujeme */}
          <ContactFormCard source="homepage" locale={locale} />
        </div>
      </section>

      {/* 15 — PATICKA je v layoutu (components/SiteFooter.tsx) */}
    </main>
  );
}
