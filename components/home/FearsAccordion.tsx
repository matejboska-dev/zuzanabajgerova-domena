'use client';

import { useEffect, useRef } from 'react';
import Marked from '@/components/Marked';

type FearItem = {
  q: string;
  a: string;
};

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.4, 0, 0.2, 1)';

export default function FearsAccordion({ items }: { items: FearItem[] }) {
  const itemsRef = useRef<(HTMLDetailsElement | null)[]>([]);
  const anims = useRef<Map<number, { anim: Animation; dir: boolean }>>(new Map());
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  function toggle(i: number, e: React.MouseEvent<HTMLElement>) {
    if (reduced.current) return;
    e.preventDefault();

    const det = itemsRef.current[i];
    if (!det) return;
    const body = det.querySelector<HTMLElement>('.fear__body');
    const inner = det.querySelector<HTMLElement>('.fear__body-inner');
    if (!body || !inner) return;

    const prev = anims.current.get(i);
    const currentH = prev ? Math.round(body.getBoundingClientRect().height) : null;
    const currentO = prev
      ? Number(parseFloat(window.getComputedStyle(body).opacity)) || 1
      : 1;

    if (prev) {
      prev.anim.onfinish = null;
      prev.anim.cancel();
      anims.current.delete(i);
    }

    const willOpen = prev ? !prev.dir : !det.open;

    if (willOpen) {
      det.classList.add('is-open');
      if (!det.open) det.open = true;
    } else {
      det.classList.remove('is-open');
    }

    const to = willOpen ? inner.scrollHeight : 0;
    const from = currentH ?? (willOpen ? 0 : body.getBoundingClientRect().height);
    const fromO = currentH !== null ? currentO : willOpen ? 0 : 1;

    if (from === to) {
      body.style.height = '';
      if (!willOpen) det.open = false;
      return;
    }

    body.style.height = `${from}px`;

    const anim = body.animate(
      [
        { height: `${from}px`, opacity: fromO },
        { height: `${to}px`, opacity: willOpen ? 1 : 0 },
      ],
      {
        duration: willOpen ? 340 : 220,
        easing: willOpen ? EASE_OUT : EASE_IN_OUT,
      }
    );

    anims.current.set(i, { anim, dir: willOpen });

    anim.onfinish = () => {
      body.style.height = '';
      if (!willOpen) det.open = false;
      anims.current.delete(i);
    };
  }

  return (
    <ul className="fears">
      {items.map((f, i) => (
        <li className="fear" key={i}>
          <details
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="fear__details"
          >
            <summary
              className="fear__summary"
              onClick={(e) => toggle(i, e)}
            >
              <span className="fear__num">0{i + 1}</span>
              <h3 className="fear__q">
                <Marked text={f.q} />
              </h3>
              <span className="fear__toggle" aria-hidden="true" />
            </summary>
            <div className="fear__body">
              <div className="fear__body-inner">
                <p className="fear__a">
                  <Marked text={f.a} />
                </p>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
