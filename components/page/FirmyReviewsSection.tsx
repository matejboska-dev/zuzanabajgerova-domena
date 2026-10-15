'use client';

import { useEffect, useRef, useState } from 'react';
import { railMetrics, useReviewRail } from '@/components/hooks/useReviewRail';
import { FIRMY_REVIEWS, FIRMY_SUMMARY, type FirmyReview } from '@/lib/reviews';

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} aria-hidden="true" className="firmy-star">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="firmy-heart">
      <path d="M11 2.667c-1.241 0-2.336.619-3 1.563-.664-.944-1.759-1.563-3-1.563C2.975 2.667 1.333 4.309 1.333 6.333c0 .149.011.294.029.437.288 2.972 3.459 5.324 6.638 7.23 3.179-1.906 6.35-4.258 6.638-7.23.018-.143.029-.288.029-.437 0-2.024-1.642-3.666-3.667-3.666z" />
    </svg>
  );
}

function CheckShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="firmy-check-icon">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM13.707 8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}


function ReviewCard({ rev, full = false, onRead, onPhoto }: {
  rev: FirmyReview;
  full?: boolean;
  onRead: (review: FirmyReview) => void;
  onPhoto: (src: string) => void;
}) {
  return (
            <article className={`firmy-card ${full ? 'firmy-card--full' : ''}`}>
              {/* Hlavicka karty */}
              <div className="firmy-card__header">
                <div className="firmy-card__author-wrap">
                  <div className="firmy-card__avatar" aria-hidden="true">
                    <span>{rev.initials}</span>
                  </div>
                  <div className="firmy-card__author-info">
                    <div className="firmy-card__author-row">
                      <b className="firmy-card__author-name">{rev.author}</b>
                      {rev.bankIdVerified && (
                        <span className="firmy-card__bankid" title="Uživatel ověřen přes Bank iD">
                          <CheckShieldIcon />
                          <span>Bank iD</span>
                        </span>
                      )}
                    </div>
                    {rev.role && <span className="firmy-card__role">{rev.role}</span>}
                    <span className="firmy-card__date">{rev.date}</span>
                  </div>
                </div>

                <div className="firmy-card__rating">
                  <div className="firmy-card__stars" aria-label={`${rev.rating} hvězdiček z 5`}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < Math.floor(rev.rating)} />
                    ))}
                  </div>
                  <span className="firmy-card__rating-num">{rev.rating.toFixed(1).replace('.', ',')}</span>
                </div>
              </div>

              <div className="firmy-card__excerpt">
              {/* Text recenze */}
              <blockquote className="firmy-card__body">
                {rev.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </blockquote>

              {/* Galerie fotografii od klienta */}
              {rev.photos && rev.photos.length > 0 && (
                <div className="firmy-card__photos">
                  <div className="firmy-card__photos-label">
                    <span>Fotografie klienta ({rev.photos.length}):</span>
                  </div>
                  <div className="firmy-card__photos-grid">
                    {rev.photos.map((src, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        className="firmy-card__photo-btn"
                        onClick={() => onPhoto(src)}
                        aria-label={`Zvětšit fotografii ${pIdx + 1} od ${rev.author}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Fotografie k recenzi od ${rev.author} (${pIdx + 1})`}
                          loading="lazy"
                          className="firmy-card__photo-img"
                        />
                        <span className="firmy-card__photo-zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M10 7v6M7 10h6"/></svg></span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              </div>
              {!full && <button type="button" className="firmy-card__read" onClick={() => onRead(rev)} aria-label={`Přečíst celé hodnocení od ${rev.author}`}>Přečíst celé hodnocení <span aria-hidden="true">↗</span></button>}
              {/* Reakce Zuzany */}
              {full && rev.reply && (
                <div className="firmy-card__reply">
                  <div className="firmy-card__reply-head">
                    <span className="firmy-card__reply-avatar" aria-hidden="true">ZB</span>
                    <div>
                      <b className="firmy-card__reply-author">Reakce Bc. Zuzany Bajgerové:</b>
                      <span className="firmy-card__reply-sub">Realitní specialistka</span>
                    </div>
                  </div>
                  <p className="firmy-card__reply-text">{rev.reply}</p>
                </div>
              )}

              {/* Paticka karty */}
              <div className="firmy-card__footer">
                <span className="firmy-card__like" title="Počet lidí, kterým se recenze líbí">
                  <HeartIcon />
                  <span>Líbí se ({rev.likes ?? 1})</span>
                </span>
                <a
                  href={FIRMY_SUMMARY.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="firmy-card__source"
                >
                  <span>{full ? 'Přečíst na Firmy.cz' : 'Firmy.cz'}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
  );
}

export default function FirmyReviewsSection() {
  const [filter, setFilter] = useState<'all' | 'photos'>('all');
  const [activeReview, setActiveReview] = useState<FirmyReview | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [position, setPosition] = useState(1);
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dragging = useRef<{ x: number; scroll: number } | null>(null);
  const reviews = FIRMY_REVIEWS.filter((review) => filter === 'all' || !!review.photos?.length);
  const photosCount = FIRMY_REVIEWS.filter((review) => !!review.photos?.length).length;
  const modalOpen = !!(activeReview || activePhoto);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useReviewRail(rail, playing && !reducedMotion && !modalOpen, filter);

  useEffect(() => {
    if (!modalOpen) return;
    const element = dialog.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => { element?.close(); document.body.style.overflow = oldOverflow; };
  }, [modalOpen]);

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const { step } = railMetrics(element);
    element.scrollBy({ left: direction * step, behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  function close() { setActiveReview(null); setActivePhoto(null); }

  return (
    <section className="sec firmy-sec" id="ref-firmy" aria-labelledby="ref-firmy-title">
      <div className="wrap">
        <div className="firmy-head">
          <h2 id="ref-firmy-title" className="home-h2 firmy-head__title">Recenze <em>na Firmy.cz</em></h2>
        </div>
        <div className="firmy-filters">
          <div className="firmy-filter-tabs" role="group" aria-label="Filtr recenzí z Firmy.cz">
            {(['all', 'photos'] as const).map((value) => (
              <button type="button" key={value} aria-pressed={filter === value}
                className={`firmy-filter-tab ${filter === value ? 'is-active' : ''}`}
                onClick={() => { setFilter(value); setPosition(1); if (rail.current) rail.current.scrollLeft = 0; }}>
                {value === 'all' ? `Všechna hodnocení (${FIRMY_REVIEWS.length})` : `S fotografiemi (${photosCount})`}
              </button>
            ))}
          </div>
          <a href={FIRMY_SUMMARY.url} target="_blank" rel="noopener noreferrer" className="firmy-add-review-link">Napsat recenzi <span aria-hidden="true">↗</span></a>
        </div>
        <div ref={rail} className="firmy-carousel" role="region" aria-roledescription="karusel" aria-label="Recenze klientů z Firmy.cz" tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
          }}
          onPointerDown={(event) => {
                    if (event.pointerType !== 'mouse' || (event.target as HTMLElement).closest('button, a')) return;
            dragging.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => { if (dragging.current) event.currentTarget.scrollLeft = dragging.current.scroll + dragging.current.x - event.clientX; }}
          onPointerUp={() => { dragging.current = null; }}
          onPointerCancel={() => { dragging.current = null; }}
          onScroll={() => {
            const element = rail.current;
            if (!element) return;
            const { step } = railMetrics(element);
            if (step <= 1) return;
            const next = Math.min(reviews.length, Math.round(element.scrollLeft / step) + 1);
            setPosition(current => current === next ? current : next);
          }}>
          {reviews.map((rev) => <ReviewCard key={rev.id} rev={rev} onRead={setActiveReview} onPhoto={setActivePhoto} />)}
        </div>
        <div className="firmy-carousel__controls">
          <span className="firmy-carousel__position" aria-live="off">{String(position).padStart(2, '0')} / {reviews.length}</span>
          <div className="firmy-carousel__buttons">
            {!reducedMotion && <button type="button" className="firmy-carousel__play" onClick={() => setPlaying(!playing)} aria-pressed={!playing}>{playing ? 'Pozastavit' : 'Spustit posouvání'}</button>}
            <button type="button" className="firmy-carousel__arrow" aria-label="Předchozí recenze" onClick={() => move(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button>
            <button type="button" className="firmy-carousel__arrow" aria-label="Další recenze" onClick={() => move(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button>
          </div>
        </div>
      </div>
      {modalOpen && <dialog ref={dialog} className={`firmy-dialog ${activePhoto ? 'firmy-dialog--photo' : ''}`} aria-label={activePhoto ? 'Detail fotografie' : `Hodnocení od ${activeReview?.author}`} onCancel={close} onClose={close}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div className="firmy-dialog__bar">
          {activeReview && activePhoto && <button type="button" onClick={() => setActivePhoto(null)}>Zpět k hodnocení</button>}
          <button type="button" className="firmy-dialog__close" onClick={close} aria-label="Zavřít detail" autoFocus><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button>
        </div>
        {activePhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="firmy-dialog__photo" src={activePhoto} alt="Detail fotografie z recenze" />
        ) : activeReview && <ReviewCard rev={activeReview} full onRead={setActiveReview} onPhoto={setActivePhoto} />}
      </dialog>}
    </section>
  );
}
