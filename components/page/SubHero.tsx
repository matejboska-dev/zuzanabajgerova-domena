import Link from 'next/link';

type Cta = { href: string; label: string; variant?: 'saffron' | 'glass'; external?: boolean };

/**
 * Hero podstranky: stejny jazyk jako hero hlavni strany (zaoblena karta, foto s gradientem,
 * odznak, nadpis s Playfair akcentem, dve CTA), jen nizsi. Bud vystrizeny portret vpravo
 * (`portrait`), nebo ramovana fotka (`photo`).
 */
export default function SubHero({
  id,
  badge,
  title,
  accent,
  lead,
  bg,
  bgPosition = 'center 40%',
  portrait,
  photo,
  ctas,
  chips,
}: {
  id: string;
  badge: string;
  title: string;
  accent?: string;
  lead: string;
  bg: { src: string; width: number; height: number };
  bgPosition?: string;
  portrait?: { src: string; alt: string };
  photo?: { src: string; alt: string; width: number; height: number };
  ctas?: Cta[];
  chips?: string[];
}) {
  return (
    <section className="subhero" aria-labelledby={id}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="subhero__bg"
        src={bg.src}
        alt=""
        width={bg.width}
        height={bg.height}
        style={{ objectPosition: bgPosition }}
        fetchPriority="high"
      />
      <div className="subhero__overlay" aria-hidden="true" />

      {portrait && (
        <div className="subhero__portrait" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait.src} alt={portrait.alt} width={1254} height={1254} />
        </div>
      )}

      {photo && (
        <figure className="subhero__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
        </figure>
      )}

      <div className="subhero__content">
        <div className="subhero__badge">
          <span className="subhero__dot" />
          <span>{badge}</span>
        </div>
        <h1 id={id} className="subhero__h1">
          {title}
          {accent && (
            <>
              {' '}
              <em>{accent}</em>
            </>
          )}
        </h1>
        <p className="subhero__lead">{lead}</p>

        {ctas && ctas.length > 0 && (
          <div className="subhero__cta">
            {ctas.map((c) =>
              c.external ? (
                <a
                  key={c.label}
                  className={`btn ${c.variant === 'glass' ? 'btn--glass' : 'btn--saffron'}`}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.label}
                </a>
              ) : (
                <Link
                  key={c.label}
                  className={`btn ${c.variant === 'glass' ? 'btn--glass' : 'btn--saffron'}`}
                  href={c.href}
                >
                  {c.label}
                </Link>
              ),
            )}
          </div>
        )}

        {chips && chips.length > 0 && (
          <ul className="subhero__chips">
            {chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
