'use client';

import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Property } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import PropertyCard from './PropertyCard';

export default function Slider({
  properties,
  locale,
  cta,
}: {
  properties: Property[];
  locale: Locale;
  cta?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Podpora tažení myší (drag-to-scroll)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 12);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 12);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.card');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.75;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    isDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 5) {
      hasDragged.current = true;
      if (!isDragging) setIsDragging(true);
    }
    el.scrollLeft = scrollLeftStart.current - dx;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  if (!properties.length) {
    return <div className="empty">Zatím žádné nabídky. Spusťte scraper tlačítkem nahoře.</div>;
  }

  return (
    <div className="slider">
      <div
        className={`track ${isDragging ? 'is-dragging' : ''}`}
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClickCapture={handleClickCapture}
      >
        {properties.map((p, i) => (
          <PropertyCard key={p.id || i} p={p} locale={locale} priority={i < 6} />
        ))}
      </div>

      <div className="wrap">
        <div className="slider__actions">
          {cta}
          <div className="slider__nav">
            <button
              type="button"
              className={`nav nav--prev ${!canPrev ? 'is-disabled' : ''}`}
              aria-label={
                locale === 'cs'
                  ? 'Předchozí nabídka'
                  : locale === 'it'
                  ? 'Offerta precedente'
                  : 'Previous property'
              }
              onClick={() => scroll(-1)}
              disabled={!canPrev}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>

            <button
              type="button"
              className={`nav nav--next ${!canNext ? 'is-disabled' : ''}`}
              aria-label={
                locale === 'cs'
                  ? 'Další nabídka'
                  : locale === 'it'
                  ? 'Offerta successiva'
                  : 'Next property'
              }
              onClick={() => scroll(1)}
              disabled={!canNext}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
