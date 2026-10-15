'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  { src: '/hero/backgrounds/abruzzo-pescara-z-letadla.webp', alt: 'Tyrkysové moře a dlouhé pláže u Pescary, fotografie Zuzany Bajgerové z letadla', place: 'Pobřeží u Pescary' },
  { src: '/hero/backgrounds/abruzzo-olivy-a-more.webp', alt: 'Olivové háje a moře v Abruzzu', place: 'Olivy a moře' },
  { src: '/hero/backgrounds/abruzzo-montesilvano-plaz.webp', alt: 'Pláž v Montesilvanu', place: 'Montesilvano' },
  { src: '/hero/backgrounds/abruzzo-montesilvano-colle.webp', alt: 'Montesilvano Colle na kopci nad pobřežím', place: 'Montesilvano Colle' },
  { src: '/hero/backgrounds/hero-bg-3-abruzzo-jezero-barrea.webp', alt: 'Jezero Barrea v národním parku Abruzzo', place: 'Jezero Barrea' },
  { src: '/hero/backgrounds/hero-bg-4-abruzzo-rocca-calascio.webp', alt: 'Pevnost Rocca Calascio v horách Abruzza', place: 'Rocca Calascio' },
  { src: '/hero/backgrounds/hero-bg-5-abruzzo-panoramaticke-udoli.webp', alt: 'Panoramatické údolí v Abruzzu', place: 'Panoramatické údolí' },
];

const INTERVAL_MS = 7000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <figure className="atlas-hero__photo atlas-carousel">
      {SLIDES.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={1920}
          height={1080}
          className={i === active ? 'is-active' : undefined}
          aria-hidden={i === active ? undefined : true}
          fetchPriority={i === 0 ? 'high' : undefined}
          loading={i === 0 ? undefined : 'lazy'}
        />
      ))}
      <figcaption aria-live="off"><span>{SLIDES[active].place}</span><span>Abruzzo, Italia</span></figcaption>
    </figure>
  );
}
