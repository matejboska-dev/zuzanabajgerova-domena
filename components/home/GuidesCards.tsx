'use client';

import Link from 'next/link';
import { path } from '@/lib/routes';
import type { Locale } from '@/lib/i18n';
import { GUIDES } from '@/lib/home';

export default function GuidesCards({ locale }: { locale: Locale }) {
  const guides = GUIDES;

  return (
    <section className="band guides-cards" aria-labelledby="guides-heading">
      <div className="wrap">
        <h2 id="guides-heading" className="guides-cards__title">
          Než se rozhodnete, přečtěte si tohle
        </h2>
        <div className="guides-cards__grid">
          {guides.map((g) => (
            <Link
              key={g.title}
              href={`${path(g.route, locale)}${g.hash ? `#${g.hash}` : ''}`}
              className="guide-3d"
              aria-label={g.title}
            >
              <div className="guide-3d__inner">
                <div
                  className="guide-3d__bg"
                  style={{ backgroundImage: `url("${g.image.src}")` }}
                  aria-hidden="true"
                />
                <div className="guide-3d__overlay" aria-hidden="true" />
                <div className="guide-3d__bottom">
                  <h3 className="guide-3d__title">{g.title}</h3>
                  <span className="guide-3d__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="guide-3d__depth" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}