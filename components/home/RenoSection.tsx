import Link from 'next/link';
import BeforeAfter from '@/components/page/BeforeAfter';
import ClickVideo from '@/components/page/ClickVideo';
import { RENO_PAIRS } from '@/lib/home';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';

// sekce 10A — rekonstrukce na klíč / případová studie Ostrava.
// Stejná prémiová karta s BeforeAfter sliderem a videem jako na /reference.
export default function RenoSection({ href }: { href?: string }) {
  const ostrava = RENO_PAIRS[0];

  return (
    <section className="sec case2-sec reno" id="rekonstrukce" aria-labelledby="sec-10a">
      <div className="wrap">
        <article className="case2">
          <header className="case2__head">
            <p className="case2__eyebrow">
              <span>01</span> Případová studie · Ostrava
            </p>
            <h2 id="sec-10a" className="case2__h">
              Od klíčů <em>po hotový byt</em>
            </h2>
            <p className="case2__lead">
              Skutečná proměna bytu klienta z Ostravy. Fotografie a video ukazují původní stav i dokončený interiér.
            </p>
          </header>

          <div className="case2__stage">
            {ostrava?.before && ostrava?.after && (
              <div className="case2__slider">
                <BeforeAfter before={ostrava.before} after={ostrava.after} />
                <p className="case2__hint">Posuňte dělítko a porovnejte kuchyň před a po</p>
              </div>
            )}
            <div className="case2__video">
              <ClickVideo
                src="/media/reno-ostrava.mp4"
                poster="/media/reno-ostrava.webp"
                label="Celá proměna bytu klienta z Ostravy"
                ratio="9 / 16"
              />
              <p className="case2__vcap">Celá proměna ve videu</p>
            </div>
          </div>

          <ul className="case2__facts" aria-label="Rozsah rekonstrukce">
            <li>
              <strong>Na klíč</strong>
              <span>Od plánu po předání</span>
            </li>
            <li>
              <strong>3 prostory</strong>
              <span>Kuchyň · koupelna · obývací pokoj</span>
            </li>
            <li>
              <strong>Ostrava</strong>
              <span>Byt klienta</span>
            </li>
          </ul>

          <dl className="case2__dl">
            <div>
              <dt>Situace</dt>
              <dd>Původní podobu bytu zachycují fotografie před rekonstrukcí. Srovnání ukazuje různé pohledy na prostor.</dd>
            </div>
            <div>
              <dt>Co jsme udělali</dt>
              <dd>Byt prošel rekonstrukcí na klíč: nová kuchyň, koupelna i obývací pokoj. Celou proměnu ukazuje video.</dd>
            </div>
            <div>
              <dt>Výsledek</dt>
              <dd>Dokončený a vybavený interiér si můžete projít ve videu. Rozsah každé další rekonstrukce domlouváme individuálně.</dd>
            </div>
          </dl>

          <div className="case2__cta">
            <Link className="btn btn--saffron" href={path('rekonstrukce', DEFAULT_LOCALE)}>
              <span>Rekonstrukce na klíč</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
            {href && (
              <Link className="btn btn--glass" href={href}>
                <span>Domluvit nezávaznou konzultaci</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
