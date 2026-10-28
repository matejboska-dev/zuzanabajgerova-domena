'use client';
import { translate } from '@/lib/localize';
import type { Locale } from '@/lib/i18n';


import { useLayoutEffect, useRef, useState } from 'react';

/** Text recenze zkraceny na par radku; tlacitko ho rozbali jen kdyz je opravdu delsi. */
export default function ReviewText({ text, locale = 'cs' }: { text: string; locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && !open) setLong(el.scrollHeight > el.clientHeight + 2);
  }, [text, open]);

  return (
    <>
      <div ref={ref} className={`greview__text${open ? ' is-open' : ''}`}>
        {text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
      {(long || open) && (
        <button type="button" className="greview__more" aria-expanded={open} onClick={() => setOpen(!open)}>
          {translate(open ? 'Zobrazit méně' : 'Celá recenze', locale)}
        </button>
      )}
    </>
  );
}

