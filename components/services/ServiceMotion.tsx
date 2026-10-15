'use client';
import { useEffect, useRef, type ReactNode } from 'react';

export default function ServiceMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    if (!root.current?.querySelector('.estate-hero') || !window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches) return;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          // Text stays readable; the photograph opens like a window, then drifts with the scroll.
          gsap.fromTo('.estate-hero__visual', { clipPath: 'inset(2% 3% 2% 3% round var(--r-shell))' }, { clipPath: 'inset(0% 0% 0% 0% round var(--r-shell))', duration: .85, ease: 'expo.out' });
          gsap.to('[data-estate-depth]', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.estate-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
        }, root);
        return () => context.revert();
      });
      revert = () => mm.revert();
    }).catch(() => { /* The server-rendered content remains complete without motion. */ });
    return () => { disposed = true; revert?.(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
