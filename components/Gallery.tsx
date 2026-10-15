'use client';

import { useEffect, useRef, useState } from 'react';
import { thumbUrl } from '@/lib/types';

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={back ? {transform:'rotate(180deg)'} : undefined}><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export default function Gallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const [useThumb, setUseThumb] = useState(false);
  const gallery = useRef<HTMLDivElement>(null);
  const available = photos.filter(url => !failed.includes(url));
  const current = available[Math.min(active, Math.max(0, available.length - 1))];
  useEffect(() => { setUseThumb(false); }, [current]);
  const select = (index: number) => {
    setActive(Math.max(0, Math.min(index, available.length - 1)));
  };
  useEffect(() => {
    const selected = gallery.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    // Scroll just the strip. scrollIntoView would move the whole page.
    if (selected?.parentElement) selected.parentElement.scrollTo({left:selected.offsetLeft - selected.parentElement.offsetLeft - 20,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }, [active]);
  if (!photos.length) return <div className="pd-gallery__empty">Fotografie vám ráda zašlu osobně.</div>;
  return <div className="pd-gallery" ref={gallery} role="region" aria-label="Fotogalerie nemovitosti" onKeyDown={event => {
    if (event.key === 'ArrowRight') { event.preventDefault();select(active + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault();select(active - 1); }
  }}>
    <div className="pd-gallery__main">
      {current ? <img key={`${current}-${useThumb}`} src={useThumb ? thumbUrl(current) : current} alt={`${alt} – fotografie ${Math.min(active + 1, available.length)} z ${available.length}`} width="1600" height="1000" fetchPriority="high" onError={() => {
        if (!useThumb && thumbUrl(current) !== current) setUseThumb(true);
        else { setFailed(previous => [...previous, current]);setActive(0); }
      }} /> : <div className="pd-gallery__empty">Fotografie vám ráda zašlu osobně. Napište mi prosím přes kontakty níže.</div>}
      {available.length > 1 && <div className="pd-gallery__controls">
        <button type="button" aria-label="Předchozí fotografie" disabled={active <= 0} onClick={() => select(active - 1)}><Arrow back /></button>
        <span className="pd-gallery__count" aria-live="polite">{Math.min(active + 1,available.length)} / {available.length}</span>
        <button type="button" aria-label="Další fotografie" disabled={active >= available.length - 1} onClick={() => select(active + 1)}><Arrow /></button>
      </div>}
    </div>
    {available.length > 1 && <div className="pd-gallery__strip" aria-label="Vybrat fotografii">{available.map((url,index) => <button key={url} type="button" className={`pd-gallery__thumb${index === active ? ' is-active' : ''}`} aria-label={`Zobrazit fotografii ${index + 1}`} aria-pressed={index === active} onClick={() => select(index)}>
      <img src={thumbUrl(url)} alt="" width="104" height="74" loading="lazy" onError={event => { const image=event.currentTarget;if (!image.dataset.fallback) {image.dataset.fallback='1';image.src=url;} else setFailed(previous => [...previous,url]); }} />
    </button>)}</div>}
  </div>;
}
