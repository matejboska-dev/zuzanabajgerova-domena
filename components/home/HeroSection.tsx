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

// Pořadí snímků na pozadí úvodního hrdiny (Abruzzo):
// 1. Písečná pláž při západu slunce
// 2. Přístav a azurové moře
// 3. Jezero Lago di Barrea a historické horské městečko
// 4. Hrad Rocca Calascio · Gran Sasso
// 5. Panoramatický výhled na abruzzské hory a údolí
// Všechny jsou předem zmenšené .webp (max. 2560 px), první se přednačítá jako LCP.
type HeroBg = { src: string; title: string };

const HERO_BACKGROUNDS: HeroBg[] = [
  { src: '/hero/backgrounds/hero-bg-1-abruzzo-plaz-zapad.webp', title: 'Písečná pláž při západu slunce' },
  { src: '/hero/backgrounds/hero-bg-2-abruzzo-pristav-more.webp', title: 'Přístav a azurové moře' },
  { src: '/hero/backgrounds/hero-bg-3-abruzzo-jezero-barrea.webp', title: 'Lago di Barrea a horské městečko' },
  { src: '/hero/backgrounds/hero-bg-4-abruzzo-rocca-calascio.webp', title: 'Hrad Rocca Calascio · Gran Sasso' },
  { src: '/hero/backgrounds/hero-bg-5-abruzzo-panoramaticke-udoli.webp', title: 'Panoráma abruzzských hor a údolí' },
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
    lead: 'Žiji celoročně v Abruzzu a provedu vás celým procesem, od výběru přes notáře až po předání klíčů. Vy neřešíte nic v italštině.',
    ctaPrimary: 'Prohlédnout nabídku',
    ctaSecondary: 'Chci nezávaznou konzultaci',
    stats: [
      { val: 'TOP 10', lbl: 'RE/MAX ČR, 6. místo' },
      { val: '20 let', lbl: 'v Abruzzu · Hall of Fame' },
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
      { val: '20 years', lbl: 'living in Abruzzo' },
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
      { val: '20 anni', lbl: 'di vita in Abruzzo' },
      { val: '100 %', lbl: 'servizio completo sul posto' },
    ],
  },
};

export default function HeroSection({ locale, href }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const copy = LOCALIZED_COPY[locale] ?? LOCALIZED_COPY.cs;

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setCurrentIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

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
              onClick={() => { setCurrentIndex(idx); setPaused(true); }}
              aria-label={`Fotografie ${idx + 1}: ${bg.title}`}
              aria-pressed={idx === currentIndex}
            />
          ))}
        </div>

        {/* 4) Obsahová vrstva podle vzoru Bienes: text vlevo, statistiky vpravo */}
        <div className="hero-bienes__content">
          <div className="hero-bienes__left">
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

          <div className="hero-bienes__identity">
            <span className="hero-bienes__signature">Zuzana Bajgerová</span>
            <span>{{cs: 'Vaše realitní specialistka v Abruzzu', en: 'Your property specialist in Abruzzo', it: 'La vostra specialista immobiliare in Abruzzo'}[locale]}</span>
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
