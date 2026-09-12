'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { path } from '@/lib/routes';

interface Testimonial {
  name: string;
  role?: string;
  text: string;
  avatar?: string;
  isVideo?: boolean;
  videoSrc?: string;
  videoPoster?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: '',
    role: 'Google recenze',
    text: '',
    isVideo: true,
    // .mp4 je prekomprimovana verze puvodniho referencni-video.MOV (73 MB, 4K
    // portret) na 720x1280 / ~7 MB s +faststart, aby sla prehrat okamzite po
    // najeti do viewportu. Puvodni .MOV zustava (gitignore) jako zdrojovy soubor.
    videoSrc: '/video/referencni-video.mp4',
    videoPoster: '/video/referencni-video-poster.jpg',
  },
  {
    name: 'Lenka R',
    role: 'Google recenze',
    text: '„Dokonale pochopila, co hledám, a našla mi přesně to, co jsem si vysnila. Zuzana se postarala opravdu o všechno — od výběru a prohlídek, přes samotný nákup a notáře, až po kompletní servis po podpisu smlouvy. Díky její péči jsem se celým procesem cítila provázená a v naprostém klidu."',
  },
  {
    name: 'Alfredo Spinosi',
    role: 'Google recenze',
    text: '„Velice doporučuji tuhle makléřku na region Abruzzo, spolehlivá, rozumí opravdu realitám. Kdo hledá experta na nákup nemovitosti v Itálii."',
  },
  {
    name: 'Petra Chelíková',
    role: 'Google recenze',
    text: '„Paní Zuzka nám pomohla splnit si sen. Máme nádherné bydlení u moře. Milujeme to tam. Moc děkujeme za velmi profesionální a lidský přístup. Zuzka je opravdu jednička ve svém oboru."',
  },
  {
    name: 'René Cichý',
    role: 'Google recenze',
    text: '„Přání koupit si hezký apartmán u moře v Itálii nám pomohla vyřešit paní Zuzana Bajgerová. Vybrala nám možnosti, udělali jsme prohlídku, my si vybrali a vše ostatní už paní Zuzka zařídila. Vše proběhlo hladce a my máme krásný apartmánek přímo u moře v Montesilvánu."',
  },
  {
    name: 'Tomáš Čepek',
    role: 'Google recenze',
    text: '„Spolupráce s touto makléřkou byla naprosto výjimečná. Její znalost italského trhu, spolehlivost a osobní přístup zaručují jistotu i v zahraničním prostředí. Celý proces koupě nemovitosti proběhl hladce, s maximální péčí a důrazem na detail."',
  },
  {
    name: 'Vladimír Penc',
    role: 'Google recenze',
    text: '„V červnu tohoto roku jsem na základě inzerátu a následné komunikace s paní Zuzanou Bajgerovou navštívil Montesilváno s úmyslem koupit nemovitost. Celý proces ze strany paní Zuzany proběhl naprosto profesionálně, věcně, efektivně ve všech fázích."',
  },
  {
    name: 'Jakub Štádler',
    role: 'Google recenze',
    text: '„Zuzana Bajgerová ve tří krátkých větách: Úžasná. Skvělá. Báječná."',
  },
];

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}

function VideoTestimonialCard({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Pokazde od zacatku — i kdyz uzivatel video predtim rozjel, odscrolloval
            // a vratil se zpet, ma zase najet od nulte sekundy.
            video.currentTime = 0;
            video.play().catch(() => {});
            setIsInViewport(true);
          } else {
            video.pause();
            setIsInViewport(false);
          }
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      className={`test-card__video ${isPlaying ? 'is-playing' : 'is-paused'}`}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          togglePlay();
        }
      }}
      aria-label={isPlaying ? 'Pozastavit video' : 'Přehrát video se zvukem'}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="test-card__play-btn">
        <div className={`test-card__play-icon ${isPlaying ? 'is-pause' : ''}`}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>

      <button
        type="button"
        className="test-card__sound-btn"
        onClick={toggleMute}
        aria-label={isMuted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
        title={isMuted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </div>
  );
}

function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsCarousel({ locale }: { locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Podpora tažení myší (drag-to-scroll)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.test-card');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    isDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 5) {
      hasDragged.current = true;
      if (!isDragging) setIsDragging(true);
    }
    el.scrollLeft = scrollLeftStart.current - dx;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDragged.current = false;
    }, 50);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <section className="test-sec" aria-labelledby="sec-09">
      <div className="wrap">
        <div className="test-sec__head">
          <p className="eyebrow">Reference</p>
          <h2 id="sec-09" className="home-h2 test-sec__title">
            Věřte lidem, kteří to <em>už mají za sebou</em>
          </h2>
          <p className="home-lead test-sec__lead">
            Přečtěte si skutečné zkušenosti klientů, kteří si splnili sen o bydlení v Itálii.
          </p>
        </div>
      </div>

      <div className="test-carousel">
        <div
          className={`test-carousel__track ${isDragging ? 'is-dragging' : ''}`}
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClickCapture={handleClickCapture}
        >
          {TESTIMONIALS.map((t, i) => (
            <article className="test-card" key={i}>
              {t.isVideo && t.videoSrc ? (
                <VideoTestimonialCard src={t.videoSrc} poster={t.videoPoster} />
              ) : (
                <div className="test-card__avatar">
                  <span className="test-card__initials">{getInitials(t.name)}</span>
                </div>
              )}

              {t.text && (
                <blockquote className="test-card__text">
                  <p>{t.text}</p>
                </blockquote>
              )}

              <div className="test-card__footer">
                <div className="test-card__google-badge">
                  <GoogleIcon />
                  <span className="test-card__role">Google recenze</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="test-carousel__nav">
          <Link href={path('reference', locale)} className="btn btn--cobalt">
            <span>Všechny reference</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <button
            className="test-carousel__btn"
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Předchozí"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="test-carousel__btn"
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Další"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
