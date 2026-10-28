'use client';
import { localized } from '@/lib/localize';


import { useState } from 'react';
import Link from 'next/link';
import { ABRUZZO_OUTLINE, mapPoint } from './abruzzo-outline';

export type MapArea = {
  slug: string;
  title: string;
  character: string;
  description: string;
  href: string;
};

// Representative places, not administrative boundaries of the four editorial areas.
const POINTS: Record<string, [number, number]> = {
  'pescara-a-pobrezi': [14.214, 42.464],
  'costa-dei-trabocchi': [14.46, 42.30],
  'teramo-a-sever': [13.97, 42.68],
  'gran-sasso-a-vnitrozemi': [13.65, 42.30],
};

function AreaMap({ areas }: { areas: MapArea[] }) {
  const [selected, setSelected] = useState(0);
  const active = areas[selected];
  const airport = mapPoint(14.181, 42.43);
  const mountain = mapPoint(13.565, 42.47);

  return (
    <div className="atlas-map">
      <div className="atlas-map__selection">
        <p className="atlas-map__instruction">Vyberte oblast na mapě nebo v seznamu.</p>
        <div className="atlas-map__choices" role="group" aria-label="Výběr oblasti">
          {areas.map((area, i) => (
            <button key={area.slug} type="button" aria-pressed={selected === i}
              aria-controls="atlas-map-detail" onClick={() => setSelected(i)}>
              <span className="atlas-map__number">0{i + 1}</span>
              <span>{area.title}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </button>
          ))}
        </div>
        <div id="atlas-map-detail" className="atlas-map__detail" aria-live="polite" aria-atomic="true">
          <h3>{active.character}</h3>
          <p>{active.description}</p>
          <Link href={active.href} className="atlas-link">Prozkoumat oblast <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></Link>
        </div>
      </div>
      <figure className="atlas-map__figure">
        <svg className="atlas-map__drawing" viewBox="0 0 600 510" role="group" aria-label="Mapa Abruzza se čtyřmi oblastmi">
          <path d={ABRUZZO_OUTLINE} className="atlas-map__land" />
          <text x="414" y="101" className="atlas-map__sea" transform="rotate(31 414 101)">Jaderské moře</text>
          <g className="atlas-map__north" aria-hidden="true"><path d="M64 73V41m-5 8 5-8 5 8" /><text x="64" y="30" textAnchor="middle">S</text></g>
          <g className="atlas-map__mountain" transform={`translate(${mountain.x - 13} ${mountain.y - 16})`}>
            <path d="m0 14 9-14 9 14m-5-6 7-11 12 17" />
            <text x="-19" y="36">Gran Sasso</text>
          </g>
          <g className="atlas-map__airport" transform={`translate(${airport.x - 17} ${airport.y + 24})`}>
            <path d="m-8 1 8-3V-9c0-3 3-3 3 0v7l8 3v2L3 2v6l3 2v2L1.5 10-3 12v-2l3-2V2l-8 1Z" />
            <path d="M1 15v6" className="atlas-map__leader" /><text x="1" y="36" textAnchor="middle">Letiště Pescara</text>
          </g>
          <text x="161" y="390" className="atlas-map__region">ABRUZZO</text>
          {areas.map((area, i) => {
            const point = mapPoint(...POINTS[area.slug]);
            return (
              <g key={area.slug}>
                <circle cx={point.x} cy={point.y} r={selected === i ? 29 : 22} className={`atlas-map__halo${selected === i ? ' is-active' : ''}`} />
                <g role="button" tabIndex={0} aria-label={`Vybrat oblast ${area.title}`} aria-pressed={selected === i}
                  aria-controls="atlas-map-detail" className={`atlas-map__pin${selected === i ? ' is-active' : ''}`}
                  onClick={() => setSelected(i)}
                  onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(i); } }}>
                  <title>{area.title}</title>
                  <circle cx={point.x} cy={point.y} r="20" />
                  <text x={point.x} y={point.y + 5} textAnchor="middle">0{i + 1}</text>
                </g>
              </g>
            );
          })}
        </svg>
        <figcaption>Body označují orientační polohu oblastí, nikoli jejich hranice. Obrys: <a href="https://github.com/guglielmo/geojson-italy" target="_blank" rel="noopener noreferrer">ISTAT / geojson-italy, CC BY</a>.</figcaption>
      </figure>
    </div>
  );
}

export default localized(AreaMap);
