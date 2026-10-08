'use client';

import { useEffect, useRef } from 'react';

/**
 * Kratka ticha smycka (atmosfera, komunita, rekonstrukce). Stahuje se a hraje, AZ kdyz je
 * na obrazovce, mimo ni se zastavi. Kdo ma v systemu omezeny pohyb, vidi jen poster.
 */
export default function AutoLoop({
  src,
  poster,
  label,
  ratio,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  ratio?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={`autoloop${className ? ` ${className}` : ''}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      style={ratio ? { aspectRatio: ratio } : undefined}
    />
  );
}
