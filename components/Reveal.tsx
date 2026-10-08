'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Jemne objevovani obsahu pri scrollu. Jedno misto pro cely web: sleduje bloky podle trid
// nize, takze komponenty nemusi nic vedet. Bez JS a s omezenym pohybem je vse videt hned.
// Co uz je pri nacteni na obrazovce, se neanimuje (zadne blikani nad prehybem).
const TARGETS = [
  '.sec__head',
  '.why-card',
  '.community__item',
  '.reno-pair',
  '.reno__tile',
  '.reno__reels',
  '.vqa-card',
  '.stepcard',
  '.chan',
  '.tri__card',
  '.fact',
  '.mist__item',
  '.rq__item',
  '.zig__media',
  '.zig__text',
  '.vs',
  '.calc',
  '.answer',
  '.callout',
  '.legal__sec',
  '.vref',
  '.lok-card',
  '.lok-fact',
  '.media-tile',
  '.flt__bar',
  '.listing-grid .card',
  '.tour',
  '.case',
  '.sm__col',
  '.ctaband',
].join(',');

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.hasAttribute('data-rv'),
    );
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('rv-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92) continue; // uz na obrazovce: neanimovat, nic neskryvat
      if (el.parentElement?.closest('[data-rv]')) continue; // rodic uz se animuje
      el.setAttribute('data-rv', '');
      // sourozenci v mrizce prijizdi kratce po sobe
      const sibs = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = Math.max(0, sibs.indexOf(el));
      el.style.setProperty('--rv-d', `${Math.min(i, 5) * 70}ms`);
      io.observe(el);
    }
    root.classList.add('rv-ready');
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
