'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PHOTO = '.zig__media,.reno-pair,.media-tile,.about-hero__portrait,.about-life__gallery figure,.lok-card,.process-editorial__portrait,.why-editorial__photo';
const TEXT = '.sec__head,.guide-heading,.buy-heading-row,.estate-service__copy,.zig__text';
const ITEMS = '.service-card,.pillar,.stepcard,.process-card,.why-card,.chan,.estate-related__grid>a,.listing-grid .card';
const SELECTORS = `${PHOTO},${TEXT},${ITEMS}`;

/** Animate outside React-owned attributes so streaming/Suspense can hydrate safely. */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        observer.unobserve(target);
        const photo = target.matches(PHOTO);
        animations.push(target.animate(photo
          ? [{ clipPath:'inset(3% 2% 3% 2% round 20px)' }, { clipPath:'inset(0 round 20px)' }]
          : [{ opacity:.65,transform:'translateY(16px)' }, { opacity:1,transform:'translateY(0)' }],
          { duration:photo ? 750 : 550,easing:'cubic-bezier(.16,1,.3,1)' }));
      }
    }, { rootMargin:'0px 0px -4% 0px',threshold:.08 });
    const seen = new WeakSet<Element>();
    const observe = () => document.querySelectorAll(SELECTORS).forEach(node => {
      if (seen.has(node)) return;
      seen.add(node);
      if (node.getBoundingClientRect().top < innerHeight || node.parentElement?.closest(SELECTORS)) return;
      observer.observe(node);
    });
    observe();
    // A route can stream in after the shared layout's effect has mounted.
    const additions = new MutationObserver(observe);
    additions.observe(document.body,{childList:true,subtree:true});
    return () => { additions.disconnect();observer.disconnect();animations.forEach(a=>a.cancel()); };
  }, [pathname]);
  return null;
}
