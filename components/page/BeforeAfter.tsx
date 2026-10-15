'use client';

import { useState } from 'react';

// Porovnání před/po s tažným dělítkem. Přístupné přes nativní input[type=range] (klávesnice, čtečky).
export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Před',
  afterLabel = 'Po',
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba" style={{ ['--ba-pos' as string]: `${pos}%` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ba__img" src={after.src} alt={after.alt} loading="lazy" decoding="async" draggable={false} />
      <div className="ba__before">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ba__img" src={before.src} alt={before.alt} loading="lazy" decoding="async" draggable={false} />
      </div>
      <span className="ba__chip ba__chip--l">{beforeLabel}</span>
      <span className="ba__chip ba__chip--r">{afterLabel}</span>
      <span className="ba__handle" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
        </svg>
      </span>
      <input
        className="ba__range"
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Posuňte pro porovnání stavu před a po rekonstrukci"
      />
    </div>
  );
}
