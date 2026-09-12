'use client';

import { useEffect, useState } from 'react';
import { thumbUrl } from '@/lib/types';

export default function Gallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActive((i) => Math.min(i + 1, photos.length - 1));
      if (e.key === 'ArrowLeft') setActive((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photos.length]);

  if (!photos.length) return null;

  return (
    <div className="pd-gallery">
      <div className="pd-gallery__main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={photos[active]}
          alt={alt}
          onError={(e) => {
            // plne rozliseni nekdy chybi -> zkus nahled (_th350), jinak ztlum
            const el = e.currentTarget;
            const t = thumbUrl(el.src);
            if (t !== el.src && !el.dataset.fb) {
              el.dataset.fb = '1';
              el.src = t;
            } else {
              el.style.opacity = '0.15';
            }
          }}
        />
      </div>
      {photos.length > 1 && (
        <div className="pd-gallery__strip">
          {photos.slice(0, 40).map((u, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={u + i}
              src={thumbUrl(u)}
              alt=""
              loading="lazy"
              className={i === active ? 'is-active' : undefined}
              onClick={() => setActive(i)}
              onError={(e) => e.currentTarget.remove()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
