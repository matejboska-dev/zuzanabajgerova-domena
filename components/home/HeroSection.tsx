'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface HeroSectionProps {
  locale: Locale;
  href: {
    nemovitosti: string;
    konzultace: string;
  };
}

// .webp: predem zmensene a prekomprimovane z puvodnich pexels JPG (5-6k px, 1.2-3.4 MB)
// na max. sirku 2560 px, quality 76 -> ~500-630 KB/kus. Puvodni .jpg zustavaji v repu
// jako zdroj, ale uz se z teto sekce nenacitaji.
const HERO_BACKGROUNDS = [
  {
    src: '/hero/backgrounds/pexels-rinoadamo-35052274.webp',
    title: 'Rocca Calascio · Gran Sasso',
  },
  {
    src: '/hero/backgrounds/pexels-baran-robin-76507255-28377904.webp',
    title: 'Pobřeží a vily v Itálii',
  },
  {
    src: '/hero/backgrounds/pexels-aul-haque-391107949-14743851.webp',
    title: 'Historické městečko v Abruzzu',
  },
  {
    src: '/hero/backgrounds/pexels-c1superstar-33386371.webp',
    title: 'Hory a příroda Abruzza',
  },
  {
    src: '/hero/backgrounds/pexels-lefrancois-38709749.webp',
    title: 'Italská architektura a slunce',
  },
  {
    src: '/hero/backgrounds/pexels-titouan-jullien-504247666-29142700.webp',
    title: 'Tyrkysové moře Costa dei Trabocchi',
  },
];

const LOCALIZED_COPY: Record<
  Locale,
  {
    badge: string;
    h1Line1: string;
    h1Accent: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { val: string; lbl: string }[];
  }
> = {
  cs: {
    badge: 'Bc. Zuzana Bajgerová · Realitní specialistka · Abruzzo, Itálie',
    h1Line1: 'Kupte dům v\u00A0Itálii',
    h1Accent: 'bez rizika a\u00A0v\u00A0češtině',
    lead: 'Žiji celoročně v Abruzzu a provedu Vás celým procesem, od výběru přes notáře až po předání klíčů. Vy neřešíte nic v italštině.',
    ctaPrimary: 'Prohlédnout nabídku',
    ctaSecondary: 'Chci nezávaznou konzultaci',
    stats: [
      { val: 'TOP 10', lbl: 'RE/MAX ČR, 6. místo' },
      { val: '20+ let', lbl: 'v realitách · Hall of Fame' },
      { val: '100 %', lbl: 'servis v češtině na místě' },
    ],
  },
  en: {
    badge: 'Bc. Zuzana Bajgerová · Real Estate Specialist · Abruzzo, Italy',
    h1Line1: 'Buy a home in Italy',
    h1Accent: 'safely and stress-free',
    lead: 'Living year-round in Abruzzo and guiding you through the whole process, from first viewing to the notary and keys. Zero language barrier.',
    ctaPrimary: 'View properties',
    ctaSecondary: 'Free consultation',
    stats: [
      { val: 'TOP 10', lbl: 'RE/MAX Czech Republic' },
      { val: '20+ yrs', lbl: 'real estate experience' },
      { val: '100 %', lbl: 'complete local support' },
    ],
  },
  it: {
    badge: 'Bc. Zuzana Bajgerová · Specialista immobiliare · Abruzzo, Italia',
    h1Line1: 'La vostra casa in Italia',
    h1Accent: 'in totale sicurezza',
    lead: 'Vivo in Abruzzo tutto l’anno e vi guido nell’acquisto sicuro di immobili, dalla prima visita al notaio fino alla consegna delle chiavi.',
    ctaPrimary: 'Vedi immobili',
    ctaSecondary: 'Consulenza gratuita',
    stats: [
      { val: 'TOP 10', lbl: 'RE/MAX Rep. Ceca' },
      { val: '20+ anni', lbl: 'di esperienza' },
      { val: '100 %', lbl: 'servizio completo sul posto' },
    ],
  },
};

export default function HeroSection({ locale, href }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const copy = LOCALIZED_COPY[locale] ?? LOCALIZED_COPY.cs;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-bienes" aria-label="Úvodní představení">
      {/* Prioritne nacte prvni snimek pozadi (LCP) drive, nez na nej prijde rada
          v poradi vlozeni do DOM — React 19 tento <link> automaticky vytahne do <head>. */}
      <link rel="preload" as="image" href={HERO_BACKGROUNDS[0].src} fetchPriority="high" />

      {/* 1) Plynule se měnící snímky na pozadí — sahají přes celé hero (horní
          textovou zónu i "poličku" s portrétem pod ní na mobilu), ne jen přes
          horní zónu, ať karta působí jako jeden souvislý celek. Prvni snimek
          nacte hned (je to LCP prvek), zbytek lazy — stejne je 5-30 s
          neviditelny, nez se na nej otoci karusel. */}
      <div className="hero-bienes__bg-wrap" aria-hidden="true">
        {HERO_BACKGROUNDS.map((bg, idx) => (
          <img
            key={bg.src}
            src={bg.src}
            alt=""
            className={`hero-bienes__bg-slide ${idx === currentIndex ? 'is-active' : ''}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchPriority={idx === 0 ? 'high' : 'low'}
            decoding="async"
          />
        ))}
      </div>

      {/* 2) Jemné gradientové překrytí pro špičkový kontrast — stejně přes celé hero */}
      <div className="hero-bienes__overlay" aria-hidden="true" />

      {/* Textový obsah (a přepínač fotek) drží vlastní "horní" box jen kvůli
          min-height/zarovnání ke spodku — fotokarusel a gradient nad ním
          už na něj vázané nejsou (viz výše), fungují přes celé hero. */}
      <div className="hero-bienes__top">
        {/* 3) Indikátory fotografií */}
        <div className="hero-bienes__indicators" aria-label="Přepínač fotografií">
          {HERO_BACKGROUNDS.map((bg, idx) => (
            <button
              key={bg.src}
              type="button"
              className={`hero-bienes__indicator ${idx === currentIndex ? 'is-active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Fotografie ${idx + 1}: ${bg.title}`}
            />
          ))}
        </div>

        {/* 4) Obsahová vrstva podle vzoru Bienes: text vlevo, statistiky vpravo */}
        <div className="hero-bienes__content">
          <div className="hero-bienes__left">
            <div className="hero-bienes__badge">
              <span className="hero-bienes__dot" />
              <span>{copy.badge}</span>
            </div>

            <h1 className="hero-bienes__h1">
              {copy.h1Line1} <br />
              <em>{copy.h1Accent}</em>
            </h1>

            <p className="hero-bienes__lead">{copy.lead}</p>

            <div className="hero-bienes__cta">
              <Link href={href.nemovitosti} className="btn btn--saffron">
                {copy.ctaPrimary}
              </Link>
              <Link href={href.konzultace} className="btn btn--glass">
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="hero-bienes__stats">
            {copy.stats.map((item, idx) => (
              <div key={item.val} className="hero-bienes__stat-col">
                {idx > 0 && <div className="hero-bienes__stat-sep" aria-hidden="true" />}
                <div className="hero-bienes__stat">
                  <span className="hero-bienes__stat-val">{item.val}</span>
                  <span className="hero-bienes__stat-lbl">{item.lbl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5) Popředí: precizně vyříznutý portrét Bc. Zuzany Bajgerové. Na desktopu/
          tabletu se stále překrývá s horní zónou (position:absolute, viz CSS);
          na úzkém mobilu (≤640px) přechází do normálního toku jako vlastní
          "polička" pod textem a CTA, fotka dole uprostřed. */}
      <div className="hero-bienes__portrait-wrap" aria-hidden="true">
        <img
          src="/hero/portret-4k.webp"
          alt="Bc. Zuzana Bajgerová"
          className="hero-bienes__portrait"
          width={1254}
          height={1254}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}
