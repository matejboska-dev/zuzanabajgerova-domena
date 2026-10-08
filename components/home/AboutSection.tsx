import Link from 'next/link';
import Marked from '@/components/Marked';
import { ABOUT } from '@/lib/home';

// sekce 12A — "O mně". text a kompletni seznam oceneni dodá klientka (lib/home.ts, ABOUT).
export default function AboutSection({ href }: { href: string }) {
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
          <div className="listings__badge">
            <span className="listings__badge-dot" />
            <span>O mně · Bc. Zuzana Bajgerová</span>
          </div>
          <h2 id="sec-12a" className="home-h2">
            O <em>mně</em>
          </h2>
          <p className="home-lead">
            <Marked text={ABOUT.text} />
          </p>
          <p className="about__awards-h">Ocenění</p>
          <ul className="about__awards">
            {ABOUT.awards.map((a) => (
              <li key={a}>
                <Marked text={a} />
              </li>
            ))}
          </ul>
          <Link href={href} className="btn btn--ghost about__btn">
            <span>Více o mně</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
