'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Zajišťuje, že se každá stránka při přechodu i načtení otevře úplně nahoře (0, 0).
 * Zabraňuje prohlížeči v náhodném obnovování staré pozice skrolování
 * nebo uvíznutí v půlce stránky kvůli asynchronnímu načítání (loading.tsx / Suspense).
 *
 * Pokud odkaz obsahuje kotvu (#hash), zachová plynulý posun na cílovou sekci.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const userInteractedRef = useRef(false);

  // 1. Vypnutí automatického obnovování pozice skrolování prohlížečem
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {
        // Starší prohlížeče
      }
    }

    const onUserInteraction = () => {
      userInteractedRef.current = true;
    };

    window.addEventListener('wheel', onUserInteraction, { passive: true });
    window.addEventListener('touchmove', onUserInteraction, { passive: true });
    window.addEventListener('keydown', onUserInteraction, { passive: true });

    // Obsluha kliknutí na kotvy na stejné stránce (např. href="#poptavka")
    // a kliknutí na logo / odkaz na aktuální stránku
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Kotva na stejné stránce -> plynulý scroll na sekci
      if (href.startsWith('#') && href.length > 1) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
        return;
      }

      // Odkaz na stejnou stránku bez kotvy (např. klik na logo nebo "Domů") -> ihned na začátek
      try {
        const url = new URL(target.href, window.location.href);
        if (
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          !url.hash
        ) {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      } catch {
        // Ignorovat nevalidní URL
      }
    };

    // Obnovení na začátek při návratu z bfcache
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      window.removeEventListener('wheel', onUserInteraction);
      window.removeEventListener('touchmove', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  // 2. Při každé změně cesty (pathname) resetovat skrolování na (0, 0)
  useEffect(() => {
    userInteractedRef.current = false;

    const resetToTop = () => {
      // Pokud uživatel sám začal skrolovat, nepřerušovat ho
      if (userInteractedRef.current) return;

      // Pokud URL nese kotvu (#id), posunout na daný element
      if (window.location.hash) {
        const targetId = window.location.hash.slice(1);
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView();
          return;
        }
      }

      // Vynucení horní pozice napříč všemi prohlížeči
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch {
        window.scrollTo(0, 0);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Okamžitý reset
    resetToTop();

    // Reset v dalším vykreslovacím rámci (po aplikaci změn DOMu)
    const rafId = requestAnimationFrame(resetToTop);

    // Pojistka pro asynchronní Suspense streaming / loading.tsx a načtení obrázků
    const t1 = setTimeout(resetToTop, 50);
    const t2 = setTimeout(resetToTop, 150);
    const t3 = setTimeout(resetToTop, 350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}
