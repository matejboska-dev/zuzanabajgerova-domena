'use client';

import { useEffect, useRef, useState } from 'react';
import AutoLoop from '@/components/media/AutoLoop';
import { COMMUNITY_MEDIA } from '@/lib/home';

export default function CommunitySection() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = selected !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, video[controls]');
        const first = controls?.[0], last = controls?.[controls.length - 1];
        if (first && last && event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (first && last && !event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected((current) => current === null ? null : (current + 1) % COMMUNITY_MEDIA.length);
      if (event.key === 'ArrowLeft') setSelected((current) => current === null ? null : (current - 1 + COMMUNITY_MEDIA.length) % COMMUNITY_MEDIA.length);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  const active = selected === null ? null : COMMUNITY_MEDIA[selected];

  return (
    <section className="sec community" aria-labelledby="sec-09a">
      <div className="wrap">
        <div className="sec__head community__head">
          <h2 id="sec-09a" className="home-h2">
            Staňte se součástí <em>naší komunity</em>
          </h2>
          <p className="home-lead">
            Nekupujete si jen nemovitost v Itálii. Kupujete si kus nového života.
            Společné večeře, Velikonoce na pláži a přátelé, za kterými se rádi vracíte.
          </p>

        </div>

        <div className="community__grid community__grid--bento">
          {(expanded ? COMMUNITY_MEDIA : COMMUNITY_MEDIA.slice(0, 4)).map((m, i) => (
            <figure
              key={m.label}
              className={`community__item media-tile${i === 0 ? ' community__item--lead' : ''}`}
            >
              <button type="button" className="community__open" onClick={() => setSelected(i)} aria-label={`Zobrazit: ${m.label}`}>
                {m.src && m.video ? (
                  <AutoLoop src={m.video} poster={m.src} label={m.alt ?? m.label} />
                ) : m.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.src} alt="" loading="lazy" decoding="async" />
                ) : null}
                <span className="community__count" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="community__expand" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <figcaption className="community__caption">{m.label}</figcaption>
            </figure>
          ))}
        </div>

        <button className="btn btn--ghost community__more" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Zobrazit méně momentů' : `Dalších ${COMMUNITY_MEDIA.length - 4} momentů z našeho života`}</button>
        <p className="community__ig">
          <a href="https://www.instagram.com/bc.zuzana_remax/" target="_blank" rel="noopener noreferrer">
            Další momenty z Abruzza na Instagramu @bc.zuzana_remax <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>

      {active && (
        <div ref={dialogRef} className="community-lightbox" role="dialog" aria-modal="true" aria-label={active.label} onClick={() => setSelected(null)}>
          <button ref={closeRef} type="button" className="community-lightbox__close" onClick={() => setSelected(null)} aria-label="Zavřít galerii">×</button>
          <button type="button" className="community-lightbox__nav" onClick={(event) => { event.stopPropagation(); setSelected((selected! - 1 + COMMUNITY_MEDIA.length) % COMMUNITY_MEDIA.length); }} aria-label="Předchozí snímek">‹</button>
          <figure className="community-lightbox__figure" onClick={(event) => event.stopPropagation()}>
            {active.video ? (
              <video key={active.video} src={active.video} poster={active.src} controls autoPlay playsInline />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={active.src} alt={active.alt ?? active.label} />
            )}
            <figcaption><span>{String(selected! + 1).padStart(2, '0')} / {String(COMMUNITY_MEDIA.length).padStart(2, '0')}</span>{active.label}</figcaption>
          </figure>
          <button type="button" className="community-lightbox__nav" onClick={(event) => { event.stopPropagation(); setSelected((selected! + 1) % COMMUNITY_MEDIA.length); }} aria-label="Další snímek">›</button>
        </div>
      )}
    </section>
  );
}
