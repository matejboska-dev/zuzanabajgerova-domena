'use client';

import { useState, useRef, useEffect } from 'react';

interface PillarsVideoCardProps {
  videoSrc?: string;
  posterSrc?: string;
  photoSrc?: string;
}

export default function PillarsVideoCard({
  videoSrc = '/video/ctyri-veci-ktere-jinde-nedostanete.mp4',
  posterSrc = '/video/poster.jpg',
}: PillarsVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    let observer: IntersectionObserver | null = null;

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => setIsPlaying(false));
              }
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.05 },
      );
      observer.observe(video);
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    }

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      if (observer) observer.disconnect();
    };
  }, [videoSrc]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="pillars-media-card" aria-label="Video — Bc. Zuzana Bajgerová v Abruzzu">
      <div className="pillars-media-card__viewport" onClick={() => togglePlay()}>
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          preload="auto"
          loop
          playsInline
          className="pillars-media-card__video"
        />

        {/* Malá ovládací tlačítka vpravo dole: pause/play a mute/unmute */}
        <div className="pillars-media-card__actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="pillars-media-card__btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pozastavit video' : 'Přehrát video'}
            title={isPlaying ? 'Pozastavit video' : 'Přehrát video'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">
                <path d="M4 3.5v9l8-4.5-8-4.5z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="pillars-media-card__btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
            title={isMuted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
          >
            {isMuted ? (
              <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.707 7.5l1.147 1.146a.5.5 0 0 1-.708.708L12 8.207l-1.146 1.147a.5.5 0 0 1-.708-.708L11.293 7.5 10.146 6.354a.5.5 0 1 1 .708-.708L12 6.793l1.146-1.147a.5.5 0 0 1 .708 0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">
                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
