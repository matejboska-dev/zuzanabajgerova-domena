'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Universal smooth disclosure (accordion) animation for native <details> elements.
 * Uses Web Animations API with craft-floor easing cubic-bezier(.16, 1, .3, 1).
 *
 * - Intercepts clicks on <summary> that are not already custom-handled.
 * - Animates height from summary height to full content height on open, and reverse on close.
 * - Prevents the native abrupt snap-close by holding open=true until the closing animation finishes.
 * - Manages 'is-open', 'is-opening', 'is-closing' classes for synchronous icon rotation and styling.
 * - Seamlessly reverses mid-flight if the user clicks rapidly.
 * - Respects prefers-reduced-motion.
 */
export default function SmoothInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    const isReduced = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial 'is-open' on details elements that have open attribute on load
    document.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((det) => {
      if (!det.classList.contains('is-open')) {
        det.classList.add('is-open');
      }
    });

    const handleClick = (e: MouseEvent) => {
      // If an existing component already called e.preventDefault(), do not interfere
      if (e.defaultPrevented) return;

      const summary = (e.target as HTMLElement)?.closest('summary');
      if (!summary) return;

      const details = summary.parentElement;
      if (!details || !(details instanceof HTMLDetailsElement)) return;
      if (details.hasAttribute('data-no-smooth')) return;

      if (isReduced()) return;

      e.preventDefault();

      // Cancel any ongoing animation on this element
      const animRecord = (details as any)._smoothDetailsAnim as
        | { anim: Animation; isOpening: boolean }
        | undefined;

      const currentlyOpen = details.open;
      const willOpen = animRecord ? !animRecord.isOpening : !currentlyOpen;

      if (animRecord) {
        try {
          animRecord.anim.cancel();
        } catch {
          // Ignore cancellation errors
        }
        (details as any)._smoothDetailsAnim = null;
      }

      if (willOpen) {
        // OPENING SEQUENCE
        if (!details.open) details.open = true;
        details.classList.remove('is-closing');
        details.classList.add('is-opening', 'is-open');

        const summaryH = summary.offsetHeight;
        const fullH = details.scrollHeight;
        const startH = animRecord
          ? Math.round(details.getBoundingClientRect().height)
          : summaryH;

        details.style.overflow = 'hidden';
        details.style.height = `${startH}px`;

        const anim = details.animate(
          [
            { height: `${startH}px` },
            { height: `${fullH}px` },
          ],
          {
            duration: 340,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }
        );

        (details as any)._smoothDetailsAnim = { anim, isOpening: true };

        anim.onfinish = () => {
          details.style.height = '';
          details.style.overflow = '';
          details.classList.remove('is-opening');
          (details as any)._smoothDetailsAnim = null;
        };
      } else {
        // CLOSING SEQUENCE
        details.classList.remove('is-opening', 'is-open');
        details.classList.add('is-closing');

        const summaryH = summary.offsetHeight;
        const startH = animRecord
          ? Math.round(details.getBoundingClientRect().height)
          : details.offsetHeight;

        details.style.overflow = 'hidden';
        details.style.height = `${startH}px`;

        const anim = details.animate(
          [
            { height: `${startH}px` },
            { height: `${summaryH}px` },
          ],
          {
            duration: 260,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }
        );

        (details as any)._smoothDetailsAnim = { anim, isOpening: false };

        anim.onfinish = () => {
          details.open = false;
          details.style.height = '';
          details.style.overflow = '';
          details.classList.remove('is-closing');
          (details as any)._smoothDetailsAnim = null;
        };
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname]);

  return null;
}
