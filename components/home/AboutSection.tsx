import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { homeData } from '@/lib/home.l10n';
import { HOME_UI } from './ui';

// sekce 12A — "O mně". Text a ocenění z doložených podkladů.
export default function AboutSection({ href, locale = 'cs' }: { href: string; locale?: Locale }) {
  const { ABOUT } = homeData(locale);
  const ui = HOME_UI[locale].about;
  return (
    <section className="zig about" aria-labelledby="sec-12a">
      <div className="wrap zig__grid">
        <div className="zig__media">
          <figure className="about__photo media-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ABOUT.photo.src}
              alt={ABOUT.photo.alt}
              width={ABOUT.photo.width}
              height={ABOUT.photo.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
        <div className="zig__text">
          <h2 id="sec-12a" className="home-h2">
            {ui.title} <em>{ui.accent}</em>
          </h2>
          <p className="home-lead">
            {ABOUT.text}
          </p>
          <p className="about__awards-h">{ui.awards}</p>
          <ul className="about__awards">
            {ABOUT.awards.map((a) => (
              <li key={a}>
                {a}
              </li>
            ))}
          </ul>
          <Link href={href} className="btn btn--ghost about__btn">
            <span>{ui.more}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
