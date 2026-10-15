'use client';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

// Video, ktere se NEstahuje, dokud na nej navstevnik neklikne (jen poster). Pro tezka videa.
export default function ClickVideo({
  src,
  poster,
  label,
  ratio = '9 / 16',
  playLabel = 'Přehrát video',
  playbackRatio,
}: {
  src: string;
  poster: string;
  label: string;
  ratio?: string;
  playLabel?: string;
  /** Optional stable frame override, used for both the poster and playback. */
  playbackRatio?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [retry, setRetry] = useState(false);

  return (
    <div className="cvideo" style={{ aspectRatio: playbackRatio ?? ratio }}>
      <video
        ref={ref}
        src={on ? src : undefined}
        poster={poster}
        controls={on}
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setRetry(false)}
      />
      {(!on || retry) && (
        <button
          type="button"
          className="cvideo__play"
          aria-label={`${playLabel}: ${label}`}
          onClick={() => {
            // Attach the source before play(), while the click still grants playback permission.
            flushSync(() => { setOn(true); setRetry(false); });
            const video = ref.current;
            if (!video) return;
            if (video.error) video.load();
            void video.play().catch(() => setRetry(true));
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
