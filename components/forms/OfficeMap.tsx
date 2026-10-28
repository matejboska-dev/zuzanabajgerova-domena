'use client';
import { localized } from '@/lib/localize';


import { useState, type ReactNode } from 'react';
import { MAPS_EMBED, MAPS_LINK, OFFICE } from '@/lib/contact';

// Mapa kancelare se nacte az po kliknuti: nic z Googlu se nestahuje, dokud navstevnik nechce
// (rychlost a soukromi). Dokud neni nacteno, je tu adresa a odkaz do map.
function OfficeMap({
  src = MAPS_EMBED,
  title = `Mapa: ${OFFICE.name}, ${OFFICE.street}, ${OFFICE.city}`,
  href = MAPS_LINK,
  label = (
    <>
      {OFFICE.name}
      <br />
      {OFFICE.street}, {OFFICE.zip} {OFFICE.city}
    </>
  ),
  className,
}: {
  src?: string;
  title?: string;
  href?: string;
  label?: ReactNode;
  className?: string;
} = {}) {
  const [on, setOn] = useState(false);

  return (
    <div className={`omap${className ? ` ${className}` : ''}`}>
      {on ? (
        <iframe
          className="omap__frame"
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="omap__ph">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7-6.7-7-11a7 7 0 0 1 14 0c0 4.3-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          <p className="omap__addr">{label}</p>
          <div className="omap__actions">
            <button type="button" className="btn btn--cobalt" onClick={() => setOn(true)}>
              Zobrazit mapu
            </button>
            <a className="btn btn--ghost" href={href} target="_blank" rel="noopener noreferrer">
              Otevřít v Mapách
            </a>
          </div>
          <p className="omap__fine">Načtením mapy se spojíte se službou Google.</p>
        </div>
      )}
    </div>
  );
}

export default localized(OfficeMap);
