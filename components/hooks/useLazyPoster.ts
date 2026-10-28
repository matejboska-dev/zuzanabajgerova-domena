'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Poster videa nastavi az ve chvili, kdy se video blizi obrazovce. Atribut poster v HTML
 * prohlizec stahne hned pri nacteni stranky (i s preload="none"), coz na homepage s desitkou
 * videi brzdilo nacteni hero fotky.
 */
export function useLazyPoster(ref: RefObject<HTMLVideoElement | null>, poster: string | undefined) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !poster) return;
    if (typeof IntersectionObserver === 'undefined') {
      v.poster = poster;
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        v.poster = poster;
        io.disconnect();
      },
      { rootMargin: '600px' },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [ref, poster]);
}
