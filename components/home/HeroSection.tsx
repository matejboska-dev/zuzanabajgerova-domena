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
// Každý snímek má dvě předem zmenšené .webp verze ze zdrojového .jpg: <název>-1920 na šířku
// pro desktop a <název>-mobile jako výřez 9:16 pro mobil. První se přednačítá jako LCP.
type HeroBg = { name: string; title: string };

const HERO_DIR = '/hero/backgrounds/';
const HERO_BACKGROUNDS: HeroBg[] = [
  { name: 'hero-bg-1-abruzzo-plaz-zapad', title: 'Písečná pláž při západu slunce' },
  { name: 'hero-bg-2-abruzzo-pristav-more', title: 'Přístav a azurové moře' },
  { name: 'hero-bg-3-abruzzo-jezero-barrea', title: 'Lago di Barrea a horské městečko' },
  { name: 'hero-bg-4-abruzzo-rocca-calascio', title: 'Hrad Rocca Calascio · Gran Sasso' },
  { name: 'hero-bg-5-abruzzo-panoramaticke-udoli', title: 'Panoráma abruzzských hor a údolí' },
];
const MOBILE_MEDIA = '(max-width: 640px)';
const desktopSrc = (bg: HeroBg) => `${HERO_DIR}${bg.name}-1920.webp`;
const mobileSrc = (bg: HeroBg) => `${HERO_DIR}${bg.name}-mobile.webp`;

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
    lead: 'V Abruzzu funguji již 20 let a provedu vás celým procesem, od výběru přes notáře až po předání klíčů. Vy neřešíte nic v italštině.',
    ctaPrimary: 'Prohlédnout nabídku',
    ctaSecondary: 'Chci nezávaznou konzultaci',
    stats: [
      { val: 'TOP 10', lbl: 'RE/MAX ČR, 6. místo' },
      { val: '20 let', lbl: 'zkušeností v Abruzzu' },
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
  // kolik snimku uz smi stahovat: zpocatku jen prvni (LCP), dalsi az pred svym na radou
  const [mounted, setMounted] = useState(1);
  const copy = LOCALIZED_COPY[locale] ?? LOCALIZED_COPY.cs;

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setCurrentIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    // nasledujici snimek se zacne stahovat az po nacteni stranky, s predstihem pred prolnutim
    const next = Math.min(currentIndex + 2, HERO_BACKGROUNDS.length);
    if (next <= mounted) return;
    const t = setTimeout(() => setMounted(next), currentIndex === 0 ? 3000 : 0);
    return () => clearTimeout(t);
  }, [currentIndex, mounted]);

  return (
    <section className="hero-bienes" aria-label={{ cs: 'Úvodní představení', en: 'Introduction', it: 'Presentazione' }[locale]}>
      {/* Prioritne nacte prvni snimek pozadi (LCP) drive, nez na nej prijde rada
          v poradi vlozeni do DOM — React 19 tento <link> automaticky vytahne do <head>. */}
      <link rel="preload" as="image" href={mobileSrc(HERO_BACKGROUNDS[0])} media={MOBILE_MEDIA} fetchPriority="high" />
      <link rel="preload" as="image" href={desktopSrc(HERO_BACKGROUNDS[0])} media="(min-width: 641px)" fetchPriority="high" />

      {/* 1) Plynule se měnící snímky na pozadí — sahají přes celé hero (horní
          textovou zónu i "poličku" s portrétem pod ní na mobilu), ne jen přes
          horní zónu, ať karta působí jako jeden souvislý celek. Prvni snimek
          nacte hned (je to LCP prvek), dalsi se vlozi az pred svym prolnutim
          (loading="lazy" tu nepomaha, vsechny lezi ve viewportu). */}
      <div className="hero-bienes__bg-wrap" aria-hidden="true">
        {HERO_BACKGROUNDS.slice(0, mounted).map((bg, idx) => (
          <picture key={bg.name}>
            <source media={MOBILE_MEDIA} srcSet={mobileSrc(bg)} />
            <img
              src={desktopSrc(bg)}
              alt=""
              className={`hero-bienes__bg-slide ${idx === currentIndex ? 'is-active' : ''}`}
              fetchPriority={idx === 0 ? 'high' : 'low'}
              decoding="async"
            />
          </picture>
        ))}
      </div>

      {/* 2) Jemné gradientové překrytí pro špičkový kontrast — stejně přes celé hero */}
      <div className="hero-bienes__overlay" aria-hidden="true" />

      {/* Textový obsah (a přepínač fotek) drží vlastní "horní" box jen kvůli
          min-height/zarovnání ke spodku — fotokarusel a gradient nad ním
          už na něj vázané nejsou (viz výše), fungují přes celé hero. */}
      <div className="hero-bienes__top">
        {/* 3) Indikátory fotografií */}
        <div className="hero-bienes__indicators" role="group" aria-label={{ cs: 'Přepínač fotografií', en: 'Choose a photo', it: 'Scegli una foto' }[locale]}>
          {HERO_BACKGROUNDS.map((bg, idx) => (
            <button
              key={bg.name}
              type="button"
              className={`hero-bienes__indicator ${idx === currentIndex ? 'is-active' : ''}`}
              onClick={() => { setMounted((m) => Math.max(m, idx + 1)); setCurrentIndex(idx); setPaused(true); }}
              aria-label={`${{ cs: 'Fotografie', en: 'Photo', it: 'Foto' }[locale]} ${idx + 1}: ${locale === 'cs' ? bg.title : { en: ['Sandy beach at sunset', 'Harbour and turquoise sea', 'Lake Barrea and a mountain village', 'Rocca Calascio castle · Gran Sasso', 'Panorama of the Abruzzo mountains and valleys'], it: ['Spiaggia sabbiosa al tramonto', 'Porto e mare turchese', 'Lago di Barrea e borgo montano', 'Rocca Calascio · Gran Sasso', 'Panorama dei monti e delle valli abruzzesi'] }[locale][idx]}`}
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
