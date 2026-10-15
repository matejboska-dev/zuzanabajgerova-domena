'use client';

import { useState } from 'react';

/** Fallbacks always belong to the same property. Never substitute another house. */
export default function CardImage({ src, alt, priority, alternatives = [] }: {
  src: string; alt: string; priority?: boolean; alternatives?: string[];
}) {
  const candidates = [...new Set([src, ...alternatives])].filter(Boolean);
  const [failed, setFailed] = useState<string[]>([]);
  const current = candidates.find(url => !failed.includes(url));
  if (!current) return <div className="card__image-empty"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m4 14 12-10 12 10v14H4V14Zm8 14V18h8v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg><span>Fotografie vám zašlu na vyžádání</span></div>;
  return <img src={current} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" onError={() => setFailed(previous => [...previous, current])} />;
}
