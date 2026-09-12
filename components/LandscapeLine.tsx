'use client';

import { useEffect, useRef } from 'react';

/**
 * "Landscape Line" — decentní vlnovka inspirovaná profilem Gran Sassa.
 * Při scrollnutí do viewportu se sama dokreslí (stroke-dashoffset).
 */
export default function LandscapeLine({ accent = false }: { accent?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const path = el?.querySelector('path');
    if (!el || !path) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return; // čára zůstane staticky vykreslená
    }
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          path.style.strokeDashoffset = '0';
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`landscape-line${accent ? ' accent' : ''}`} ref={ref} aria-hidden>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          d="M0,30 C90,14 170,34 280,24 C400,13 470,31 600,20 C740,8 820,30 960,19 C1060,11 1130,25 1200,17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
