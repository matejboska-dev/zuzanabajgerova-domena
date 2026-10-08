import Marked from '@/components/Marked';
import Zastupny from '@/components/Zastupny';
import { WHY_ABRUZZO } from '@/lib/home';

// sekce 08 — "Proč právě Abruzzo". nahradila "Kde v Abruzzu hledat".
// fakta jsou od klientky (lib/home.ts), nic nepridavat. fotky jsou z jejich materialu,
// kde zadna neni, zustava zastupny box s popiskem.
export default function WhyAbruzzo() {
  return (
    <section className="sec why" aria-labelledby="sec-08">
      <div className="wrap">
        <div className="sec__head">
          <div className="listings__badge">
            <span className="listings__badge-dot" />
            <span>Střed Itálie · Hory i moře</span>
          </div>
          <h2 id="sec-08" className="home-h2">
            Proč právě <em>Abruzzo</em>
          </h2>
          <p className="home-lead">
            Hory, moře i letiště na dosah. Tohle jsou důvody, proč pro vás hledám nemovitosti právě
            tady.
          </p>
        </div>

        <ul className="why__grid">
          {WHY_ABRUZZO.map((c) => {
            const multi = c.photos.length > 1;
            return (
              <li className="why-card" key={c.title}>
                <div className="why-card__media" data-count={c.photos.length}>
                  {c.photos.map((p) =>
                    p.src ? (
                      <figure className="why-card__photo media-zoom" key={p.label} style={{ aspectRatio: multi ? '3 / 4' : '3 / 2' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.src} alt={p.alt ?? p.label} loading="lazy" decoding="async" />
                        {multi && <figcaption className="media-chip">{p.label}</figcaption>}
                      </figure>
                    ) : (
                      <Zastupny
                        key={p.label}
                        label={`Fotka: ${p.label}`}
                        ratio={multi ? '3 / 4' : '3 / 2'}
                        spec={multi ? '1200 × 1600 px (3:4)' : '1200 × 800 px (3:2)'}
                        className="zastupny--compact"
                      />
                    ),
                  )}
                </div>
                <div className="why-card__body">
                  <h3 className="why-card__t">{c.title}</h3>
                  <p className="why-card__d">
                    <Marked text={c.text} />
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
