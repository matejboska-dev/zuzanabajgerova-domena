'use client';

import { useRef, useState } from 'react';

// Video, ktere se NEstahuje, dokud na nej navstevnik neklikne (jen poster). Pro tezka videa.
export default function ClickVideo({
  src,
  poster,
  label,
  ratio = '9 / 16',
}: {
  src: string;
  poster: string;
  label: string;
  ratio?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);

  return (
    <div className="cvideo" style={{ aspectRatio: ratio }}>
      <video
        ref={ref}
        src={on ? src : undefined}
        poster={poster}
        controls={on}
        playsInline
        preload="none"
        aria-label={label}
      />
      {!on && (
        <button
          type="button"
          className="cvideo__play"
          aria-label={`Přehrát video: ${label}`}
          onClick={() => {
            setOn(true);
            setTimeout(() => ref.current?.play().catch(() => {}), 50);
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
