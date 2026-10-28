'use client';
import { localized } from '@/lib/localize';

import { useEffect, useRef, type ReactNode } from 'react';

function GuideMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    if (!window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches) return;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          if (root.current?.querySelector('[data-guide-depth]')) gsap.to('[data-guide-depth]', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: '.guide-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
          gsap.utils.toArray<HTMLElement>('.guide-contracts__photo img').forEach((el) => {
            gsap.fromTo(el, { clipPath: 'inset(8% 6% 8% 6% round var(--r-img))' }, { clipPath: 'inset(0% 0% 0% 0% round var(--r-img))', ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 38%', scrub: 1, once: true } });
          });
          gsap.utils.toArray<HTMLElement>('[data-photo-drift]').forEach((el) => {
            gsap.fromTo(el, { y: 24 }, { y: -24, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
          });
        }, root);
        return () => context.revert();
      });
      cleanup = () => mm.revert();
    }).catch(() => { /* The complete page remains visible without animation. */ });
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return <div ref={root}>{children}</div>;
}

export default localized(GuideMotion);
