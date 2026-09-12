'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

type FaqItem = { q: string; a: string };

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.4, 0, 0.2, 1)';

export default function FaqSection({
  faq,
  ctaHref,
  ctaLabel,
}: {
  faq: FaqItem[];
  ctaHref: string;
  ctaLabel: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDetailsElement | null)[]>([]);
  const anims = useRef(new Map<number, { anim: Animation; dir: boolean }>());
  const reduced = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) {
      el.setAttribute('data-anim', '');
      el.setAttribute('data-visible', '');
      return;
    }
    el.setAttribute('data-anim', '');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', '');
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggle(i: number) {
    const det = itemsRef.current[i];
    if (!det) return;
    const body = det.querySelector<HTMLElement>('.faq__body');
    const inner = det.querySelector<HTMLElement>('.faq__body-inner');
    if (!body || !inner) return;

    if (reduced.current) {
      det.classList.toggle('is-open');
      return;
    }

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
      if (!det.open) det.open = true; // content rendered before paint — no flash
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
    <section
      ref={ref}
      className="band band--stone faq-sec"
      aria-labelledby="sec-11"
    >
      <div className="wrap wrap--narrow">
        <h2 id="sec-11" className="home-h2 faq-sec__heading">
          Otázky, které dostávám <em>nejčastěji</em>
        </h2>

        <div className="faq">
          {faq.map((f, i) => (
            <details
              key={i}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="faq__item"
              style={{ animationDelay: `${80 + i * 60}ms` }}
            >
              <summary
                className="faq__summary"
                onClick={(e) => {
                  if (reduced.current) return;
                  e.preventDefault();
                  toggle(i);
                }}
              >
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <div className="faq__body">
                <div className="faq__body-inner">
                  <p>{f.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="faq-sec__cta">
          <Link href={ctaHref} className="btn btn--saffron faq-sec__btn">
            <span>{ctaLabel}</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="faq-sec__btn-arrow"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}