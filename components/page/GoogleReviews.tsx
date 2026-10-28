import type { Locale } from '@/lib/i18n';

import { localized } from '@/lib/localize';
import { GOOGLE_REVIEWS, GOOGLE_SUMMARY } from '@/lib/reviews';
import GoogleG from './GoogleG';
import ReviewCarousel from './ReviewCarousel';
import ReviewText from './ReviewText';

function StarsContent({ label }: { label?: string }) {
  return (
    <span className="greview__stars" role="img" aria-label={label ?? '5 hvězdiček z 5'}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.96a1 1 0 0 0 .95.69h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.45a1 1 0 0 0-.36 1.12l1.28 3.95c.3.93-.75 1.7-1.54 1.12l-3.37-2.45a1 1 0 0 0-1.17 0l-3.37 2.45c-.79.57-1.84-.2-1.54-1.12l1.29-3.95a1 1 0 0 0-.37-1.12L2.07 9.39c-.79-.57-.38-1.81.59-1.81h4.16a1 1 0 0 0 .95-.69z" />
        </svg>
      ))}
    </span>
  );
}

/** Vsech 14 recenzi z Google profilu (lib/reviews.ts) s odkazem na originaly na Mapach Google. */
function GoogleReviews({ locale = 'cs' }: { locale?: Locale }) {
  return (
    <>
      <div className="greviews__summary">
        <GoogleG className="greviews__g" />
        <div className="greviews__score">
          <b>{GOOGLE_SUMMARY.rating}</b>
          <Stars label={`Hodnocení ${GOOGLE_SUMMARY.rating} z 5`} />
          <span>{GOOGLE_SUMMARY.count} recenzí na Googlu</span>
        </div>
        <a className="btn btn--cobalt greviews__link" href={GOOGLE_SUMMARY.url} target="_blank" rel="noopener noreferrer">
          <span>Ověřit na Mapách Google</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
      <ReviewCarousel count={GOOGLE_REVIEWS.length}>
        {GOOGLE_REVIEWS.map((r) => (
          <li className="rq-card greview" key={r.author}>
            <Stars />
            <blockquote lang={r.translatedFrom ? 'en' : 'cs'}>
              <ReviewText text={r.text} locale={locale} />
            </blockquote>
            <footer>
              <GoogleG />
              <span className="rq-card__who">
                <b>{r.author}</b>
                <span>{r.translatedFrom ? `Recenze z Googlu, přeloženo Googlem z ${r.translatedFrom}` : 'Recenze z Googlu'}</span>
              </span>
            </footer>
          </li>
        ))}
      </ReviewCarousel>
    </>
  );
}

export default localized(GoogleReviews);

const Stars = localized(StarsContent);
