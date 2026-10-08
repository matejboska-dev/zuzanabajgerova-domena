import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/reviews';
import GoogleG from './GoogleG';

/** tri skutecne Google recenze (lib/reviews.ts), nic se nevymysli ani neupravuje */
export default function ReviewQuotes({
  names,
  href,
  linkLabel = 'Všechny reference',
}: {
  names: string[];
  href?: string;
  linkLabel?: string;
}) {
  const items = names
    .map((n) => TESTIMONIALS.find((t) => t.name === n && t.text))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <ul className="rq">
        {items.map((t) => (
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
        ))}
      </ul>
      {href && (
        <div className="rq__more">
          <Link href={href} className="btn btn--cobalt">
            <span>{linkLabel}</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
}
