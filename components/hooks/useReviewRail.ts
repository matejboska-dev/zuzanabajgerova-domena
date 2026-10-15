'use client';

import { useEffect, type RefObject } from 'react';

const metrics = new WeakMap<HTMLElement, { step: number; starts: number[]; maximum: number }>();
export function railMetrics(element: HTMLElement) {
  return metrics.get(element) ?? { step: 1, starts: [0], maximum: 0 };
}

/** Native scrolling retains touch, keyboard and focus behavior. The fractional
 * remainder moves on the compositor instead of being rounded to whole pixels. */
export function paintRail(element: HTMLElement, offset: number) {
  element.scrollLeft = offset;
  element.style.setProperty('--rail-fraction', `${element.scrollLeft - offset}px`);
}

export function useReviewRail(ref: RefObject<HTMLElement | null>, running: boolean, key: string | number = '') {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const parent = element.parentElement!;
    const measure = () => {
      const style = getComputedStyle(parent);
      const content = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      element.style.setProperty('--rail-content-width', `${content}px`);
      element.style.setProperty('--rail-width', `${document.documentElement.clientWidth - element.getBoundingClientRect().left}px`);
    };
    const cache = () => {
      const first = (element.firstElementChild as HTMLElement | null)?.offsetLeft ?? 0;
      const starts = Array.from(element.children, child => (child as HTMLElement).offsetLeft - first);
      metrics.set(element, { step: starts[1] ?? element.clientWidth, starts, maximum: element.scrollWidth - element.clientWidth });
    };
    /* Left-edge fade grows with scroll distance, so the first card stays crisp at rest. */
    const fade = () => element.style.setProperty('--rail-fade', `${Math.min(element.scrollLeft, 64)}px`);
    measure(); cache(); fade();
    const railObserver = new ResizeObserver(cache);
    railObserver.observe(element);
    const observer = new ResizeObserver(() => { measure(); cache(); });
    observer.observe(parent);
    window.addEventListener('resize', measure);
    element.addEventListener('scroll', fade, { passive: true });
    return () => { observer.disconnect(); railObserver.disconnect(); window.removeEventListener('resize', measure); element.removeEventListener('scroll', fade); };
  }, [ref, key]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !running) return;
    let offset = element.scrollLeft;
    let maximum = 0;
    let direction = 1;
    let last = 0;
    let frame = 0;
    let visible = false;
    let hovered = false;
    let pressed = false;
    let resumeAt = 0;
    const geometry = new ResizeObserver(() => { maximum = element.scrollWidth - element.clientWidth; });
    geometry.observe(element);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    const enter = () => { hovered = true; };
    const leave = () => { hovered = false; };
    const interrupt = () => { resumeAt = performance.now() + 8000; element.style.setProperty('--rail-fraction', '0px'); };
    const down = () => { pressed = true; interrupt(); };
    const up = () => { pressed = false; interrupt(); };
    element.addEventListener('mouseenter', enter);
    element.addEventListener('mouseleave', leave);
    element.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    element.addEventListener('pointercancel', up);
    element.addEventListener('wheel', interrupt, { passive: true });
    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 50) : 0;
      last = now;
      if (visible && !document.hidden && !hovered && !pressed && !element.contains(document.activeElement) && now > resumeAt && maximum > 0) {
        if (Math.abs(element.scrollLeft - offset) > 2) offset = element.scrollLeft;
        offset = Math.max(0, Math.min(maximum, offset + direction * delta * .022));
        paintRail(element, offset);
        if (offset === maximum || offset === 0) { direction *= -1; resumeAt = now + 1600; }
      } else {
        offset = element.scrollLeft;
        element.style.setProperty('--rail-fraction', '0px');
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); geometry.disconnect();
      element.style.setProperty('--rail-fraction', '0px');
      element.removeEventListener('mouseenter', enter); element.removeEventListener('mouseleave', leave);
      element.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up);
      element.removeEventListener('pointercancel', up); element.removeEventListener('wheel', interrupt);
    };
  }, [ref, running, key]);
}
