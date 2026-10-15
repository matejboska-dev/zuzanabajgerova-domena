import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/reviews';
import GoogleG from './GoogleG';
import ReviewCarousel from './ReviewCarousel';

/** tri skutecne Google recenze (lib/reviews.ts), nic se nevymysli ani neupravuje */
export default function ReviewQuotes({
  names,
  carousel = false,
  href,
  linkLabel = 'Všechny reference',
}: {
  names: string[];
  carousel?: boolean;
  href?: string;
  linkLabel?: string;
}) {
  const items = names
    .map((n) => TESTIMONIALS.find((t) => t.name === n && t.text))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const cards = items.map((t) => (
          <li className="rq-card" key={t.name}>
            <blockquote>
              <p>{t.text}</p>
            </blockquote>
            <footer>
              <GoogleG />
              <span className="rq-card__who">
                <b>{t.name}</b>
                <span>Google recenze</span>
              </span>
            </footer>
          </li>
        ));

  return (
    <>
      {carousel ? <ReviewCarousel count={items.length}>{cards}</ReviewCarousel> : <ul className="rq">{cards}</ul>}
      {href && (
        <div className="rq__more">
          <Link href={href} className="btn btn--cobalt">
            <span>{linkLabel}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
}
