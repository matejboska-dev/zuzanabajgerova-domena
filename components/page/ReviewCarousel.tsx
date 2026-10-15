'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import styles from './ReviewCarousel.module.css';
import { paintRail, railMetrics, useReviewRail } from '@/components/hooks/useReviewRail';

export default function ReviewCarousel({ children, count }: { children: ReactNode; count: number }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const frame = useRef(0);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [end, setEnd] = useState(false);

  const cancel = useCallback(() => {
    cancelAnimationFrame(frame.current);
    track.current?.style.setProperty('--rail-fraction', '0px');
  }, []);

  const move = useCallback((index: number) => {
    const el = track.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    cancel();
    const start = el.scrollLeft;
    const { starts, maximum } = railMetrics(el);
    const target = Math.min(starts[index] ?? 0, maximum);
    if (reduced) { el.scrollLeft = target; return; }
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 1100, 1);
      paintRail(el, start + (target - start) * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else el.style.setProperty('--rail-fraction', '0px');
    };
    frame.current = requestAnimationFrame(tick);
  }, [cancel, reduced]);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { cancel(); setReduced(media.matches); };
    update();
    media.addEventListener('change', update);
    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) cancel();
      setVisible(inView && !document.hidden);
    }, { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    const visibility = () => { if (document.hidden) cancel(); setVisible(inView && !document.hidden); };
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); cancel(); };
  }, [cancel]);

  useReviewRail(track, !paused && !hovered && !focused && visible && !reduced && count > 1, count);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const { step } = railMetrics(element);
      if (step > 1) setActive(Math.min(count - 1, Math.round(element.scrollLeft / step)));
      setEnd(element.scrollWidth > element.clientWidth && element.scrollLeft >= element.scrollWidth - element.clientWidth - 3);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [count]);

  const interrupt = () => { cancel(); setPaused(true); };

  return (
    <div className={styles.carousel} ref={root} role="region" aria-roledescription="carousel" aria-label="Google recenze klientů"
      onMouseEnter={() => { cancel(); setHovered(true); }} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => { cancel(); setFocused(true); }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <ul id={id} ref={track} className={`rq ${styles.track}`} tabIndex={0} aria-label="Recenze — posouvejte šipkami nebo přejetím"
        onScroll={() => {
          const el = track.current;
          if (!el || !el.children.length) return;
          const { step, maximum } = railMetrics(el);
          if (step <= 1 || maximum <= 0) return;
          const nearest = Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / step)));
          setActive(current => current === nearest ? current : nearest);
          setEnd(el.scrollLeft >= maximum - 3);
        }}
        onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault(); interrupt();
          move(event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : Math.max(0, Math.min(count - 1, active + (event.key === 'ArrowRight' ? 1 : -1))));
        }}
        onWheel={interrupt}
        onPointerDown={(event) => {
          interrupt();
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft };
          event.currentTarget.setPointerCapture(event.pointerId);

        }}
        onPointerMove={(event) => { if (drag.current) event.currentTarget.scrollLeft = drag.current.scroll + drag.current.x - event.clientX; }}
        onPointerUp={(event) => { drag.current = null; }}
        onPointerCancel={(event) => { drag.current = null; }}>
        {children}
      </ul>
      {count > 1 && <div className={styles.controls}>
        <span className={styles.position} aria-live={paused ? 'polite' : 'off'}><b>{String(active + 1).padStart(2, '0')}</b><span aria-hidden="true"> / </span><span>{String(count).padStart(2, '0')}</span></span>
        <div className={styles.buttons}>
          {!reduced && <button type="button" className={styles.pause} onClick={() => { cancel(); setPaused(!paused); }} aria-label={paused ? 'Spustit automatické posouvání' : 'Pozastavit automatické posouvání'} aria-pressed={paused}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{paused ? <path d="m9 5 11 7-11 7Z" /> : <path d="M9 5v14M15 5v14" />}</svg>
          </button>}
          <button type="button" aria-controls={id} aria-label="Předchozí recenze" disabled={active === 0} onClick={() => { interrupt(); move(active - 1); }}><Arrow previous /></button>
          <button type="button" aria-controls={id} aria-label="Další recenze" disabled={end} onClick={() => { interrupt(); move(Math.min(count - 1, active + 1)); }}><Arrow /></button>
        </div>
      </div>}
    </div>
  );
}

function Arrow({ previous = false }: { previous?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={previous ? { transform: 'rotate(180deg)' } : undefined}><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}
