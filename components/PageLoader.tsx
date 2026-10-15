'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LOCALES } from '@/lib/i18n';

/** Play the intro only when the document opens on a homepage, never on navigation. */
export default function PageLoader() {
  const pathname = usePathname();
  const [initialPath] = useState(pathname);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (pathname !== initialPath) setActive(false);
  }, [pathname, initialPath]);

  const isHome = initialPath === '/' || LOCALES.some((locale) => initialPath === `/${locale}` || initialPath === `/${locale}/`);
  if (!active || !isHome || pathname !== initialPath) return null;

  return <HomeIntro />;
}

/** One CSS-driven signature reveal, followed directly by the curtain exit. */
function HomeIntro() {
  const [ready, setReady] = useState(false);
  const [lifting, setLifting] = useState(false);
  const [removed, setRemoved] = useState(false);
  const curtain = useRef<HTMLElement>(null);
  const fitViewport = () => {
    if (curtain.current) curtain.current.style.width = `${window.innerWidth}px`;
  };
  const release = useRef<() => void>(() => {});

  useEffect(() => {
    let cancelled = false;
    let started = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const prevOverflow = document.body.style.overflow;

    const cleanup = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove('intro-active');
      window.removeEventListener('resize', fitViewport);
    };
    release.current = cleanup;

    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setRemoved(true);
        return cleanup;
      }

      fitViewport();
      window.addEventListener('resize', fitViewport);
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('intro-active');

      const start = () => {
        if (cancelled || started) return;
        started = true;
        setReady(true);
        // Fail open if an animation is interrupted or its end event is lost.
        timers.push(setTimeout(() => {
          cleanup();
          setRemoved(true);
        }, 6000));
      };

      // Avoid changing font metrics halfway through the signature reveal.
      const family = getComputedStyle(document.documentElement).getPropertyValue('--font-cursive').trim();
      document.fonts.load(`84px ${family}`, 'Zuzana Bajgerová').then(start, start);
      timers.push(setTimeout(start, 1200));
    } catch {
      cleanup();
      setRemoved(true);
    }

    return cleanup;
  }, []);

  if (removed) return null;

  return (
    <aside
      ref={curtain}
      className={`intro-curtain${ready ? ' intro-curtain--ready' : ''}${lifting ? ' intro-curtain--lift' : ''}`}
      aria-label="Bc. Zuzana Bajgerová"
      aria-busy={!lifting}
      role="status"
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !lifting) return;
        release.current();
        setRemoved(true);
      }}
    >
      <div className="intro-curtain__glow" aria-hidden="true" />
      <div className={`intro-curtain__body${lifting ? ' intro-curtain__body--exit' : ''}`}>
        <div
          className="intro-curtain__sig-wrap"
          onAnimationEnd={(event) => {
            if (event.animationName === 'intro-sig-draw') setLifting(true);
          }}
        >
          <span className="intro-curtain__signature">Zuzana Bajgerová</span>
        </div>
      </div>
      <svg className="intro-curtain__tail" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 0 0 L 1440 0 L 1440 24 Q 720 140 0 24 Z" fill="var(--zafferano, #D9A441)" />
        <path d="M 0 0 L 1440 0 L 1440 0 Q 720 118 0 0 Z" fill="var(--cobalto-deep, #071326)" />
      </svg>
    </aside>
  );
}
