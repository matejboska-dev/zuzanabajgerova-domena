'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ClickVideo from '@/components/page/ClickVideo';
import type { Locale } from '@/lib/i18n';
import { homeData } from '@/lib/home.l10n';
import { HOME_UI } from './ui';

const INSTAGRAM_URL = 'https://www.instagram.com/bc.zuzana_remax/';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.8" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function VideoAnswers({ locale = 'cs' }: { locale?: Locale }) {
  const { INSTAGRAM_REELS } = homeData(locale);
  const ui = HOME_UI[locale].reels;
  const viewportRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const targetSlotRef = useRef(INSTAGRAM_REELS.length);
  const [current, setCurrent] = useState(0);
  const reelCount = INSTAGRAM_REELS.length;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reelCount < 2) return;

    const getStep = () => {
      const cards = viewport.querySelectorAll<HTMLElement>('.vqa-card');
      return cards[1].offsetLeft - cards[0].offsetLeft;
    };
    const centerOnCurrent = () => {
      const step = getStep();
      if (step) {
        targetSlotRef.current = reelCount + currentRef.current;
        viewport.scrollLeft = targetSlotRef.current * step;
      }
    };
    centerOnCurrent();
    window.addEventListener('resize', centerOnCurrent);
    return () => window.removeEventListener('resize', centerOnCurrent);
  }, [reelCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reelCount < 2) return;

    let settleTimer: ReturnType<typeof setTimeout>;
    const settle = () => {
      const cards = viewport.querySelectorAll<HTMLElement>('.vqa-card');
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      if (!step) return;
      const slot = Math.round(viewport.scrollLeft / step);
      const next = ((slot % reelCount) + reelCount) % reelCount;
      currentRef.current = next;
      setCurrent(next);
      if (slot < reelCount || slot >= reelCount * 2) {
        targetSlotRef.current = reelCount + next;
        viewport.scrollLeft = targetSlotRef.current * step;
      } else {
        targetSlotRef.current = slot;
      }
    };
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 160);
    };
    viewport.addEventListener('scroll', onScroll, { passive: true });
    viewport.addEventListener('scrollend', settle);
    return () => {
      clearTimeout(settleTimer);
      viewport.removeEventListener('scroll', onScroll);
      viewport.removeEventListener('scrollend', settle);
    };
  }, [reelCount]);

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = viewport.querySelectorAll<HTMLElement>('.vqa-card');
    if (cards.length < 2) return;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    viewport.querySelectorAll('video').forEach((video) => video.pause());
    targetSlotRef.current += direction;
    const next = ((targetSlotRef.current % reelCount) + reelCount) % reelCount;
    currentRef.current = next;
    setCurrent(next);
    viewport.scrollTo({ left: targetSlotRef.current * step, behavior: 'smooth' });
  };

  const playFromCopy = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = viewport.querySelectorAll<HTMLElement>('.vqa-card');
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    targetSlotRef.current = reelCount + index;
    currentRef.current = index;
    setCurrent(index);
    viewport.scrollLeft = targetSlotRef.current * step;
    cards[reelCount + index].querySelector<HTMLButtonElement>('.cvideo__play')?.click();
  };

  return (
    <section className="sec vqa" aria-labelledby="sec-10b">
      <div className="wrap">
        <div className="vqa__head">
          <div className="vqa__copy">
            <h2 id="sec-10b" className="home-h2">
              {ui.title} <em>{ui.accent}</em>
            </h2>
            <p className="home-lead">
              {ui.lead}
            </p>
          </div>

          <div className="vqa__profile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/about-zuzana.webp" alt="Bc. Zuzana Bajgerová" width="72" height="72" loading="lazy" decoding="async" />
            <div className="vqa__identity">
              <span>Bc. Zuzana Bajgerová</span>
              <span>@bc.zuzana_remax</span>
            </div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="vqa__follow">
              <InstagramIcon />
              <span>{ui.follow}</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7" /></svg>
            </a>
          </div>
        </div>

        <div className="vqa__viewport" ref={viewportRef} role="region" aria-roledescription={ui.carousel} aria-label={ui.region}>
          <ul className="vqa__grid">
            {[0, 1, 2].flatMap((copy) => INSTAGRAM_REELS.map((reel, index) => (
              <li className={`vqa-card${copy !== 1 ? ' vqa-card--copy' : ''}`} key={`${copy}-${reel.src}`} aria-hidden={copy !== 1} onClick={copy !== 1 ? () => playFromCopy(index) : undefined}>
                <div className="vqa-card__media">
                  {reel.image ? (
                    <div className="vqa-card__still">
                      <img src={reel.poster} alt={ui.awardAlt} loading="lazy" decoding="async" />
                    </div>
                  ) : copy === 1 ? (
                    <ClickVideo src={reel.src} poster={reel.poster} label={reel.title} ratio="9 / 16" />
                  ) : (
                    <div className="vqa-card__preview">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={reel.poster} alt="" loading="lazy" decoding="async" />
                      <span className="cvideo__play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                    </div>
                  )}
                </div>
                <div className="vqa-card__caption">
                  <span className="vqa-card__theme">{reel.theme}</span>
                  <h3 className="vqa-card__t">{reel.title}</h3>
                </div>
              </li>
            )))}
          </ul>
        </div>
        <div className="vqa__controls">
          <span className="vqa__position" aria-live="polite">{String(current + 1).padStart(2, '0')} / {String(reelCount).padStart(2, '0')}</span>
          <div className="vqa__arrows">
            <button type="button" onClick={() => move(-1)} aria-label={ui.prev}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6 6-6-6 6-6" /></svg>
            </button>
            <button type="button" onClick={() => move(1)} aria-label={ui.next}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>
        <a className="vqa__more" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          {ui.more} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
