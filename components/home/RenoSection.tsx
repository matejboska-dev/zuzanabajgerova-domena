import Link from 'next/link';
import BeforeAfter from '@/components/page/BeforeAfter';
import ClickVideo from '@/components/page/ClickVideo';
import { homeData } from '@/lib/home.l10n';
import type { Locale } from '@/lib/i18n';
import { HOME_UI } from './ui';
import { path } from '@/lib/routes';

// sekce 10A — rekonstrukce na klíč / případová studie Ostrava.
// Stejná prémiová karta s BeforeAfter sliderem a videem jako na /reference.
export default function RenoSection({ href, locale = 'cs' }: { href?: string; locale?: Locale }) {
  const ostrava = homeData(locale).RENO_PAIRS[0];
  const ui = HOME_UI[locale].reno;

  return (
    <section className="sec case2-sec reno" id="rekonstrukce" aria-labelledby="sec-10a">
      <div className="wrap">
        <article className="case2">
          <header className="case2__head">
            <p className="case2__eyebrow">
              <span>01</span> {ui.badge}
            </p>
            <h2 id="sec-10a" className="case2__h">
              {ui.title} <em>{ui.accent}</em>
            </h2>
            <p className="case2__lead">
              {ui.lead}
            </p>
          </header>

          <div className="case2__stage">
            {ostrava?.before && ostrava?.after && (
              <div className="case2__slider">
                <BeforeAfter before={ostrava.before} after={ostrava.after} beforeLabel={ui.before} afterLabel={ui.after} ariaLabel={ui.hint} />
                <p className="case2__hint">{ui.hint}</p>
              </div>
            )}
            <div className="case2__video">
              <ClickVideo
                src="/media/reno-ostrava.mp4"
                poster="/media/reno-ostrava.webp"
                label={ui.videoLabel}
                ratio="9 / 16"
              />
              <p className="case2__vcap">{ui.videoCap}</p>
            </div>
          </div>

          <ul className="case2__facts" aria-label={ui.factsAria}>
            <li>
              <strong>{ui.turnkey}</strong>
              <span>{ui.fromPlan}</span>
            </li>
            <li>
              <strong>{ui.threeSpaces}</strong>
              <span>{ui.rooms}</span>
            </li>
            <li>
              <strong>Ostrava</strong>
              <span>{ui.clientFlat}</span>
            </li>
          </ul>

          <dl className="case2__dl">
            <div>
              <dt>{ui.situation}</dt>
              <dd>{ui.beforeText}</dd>
            </div>
            <div>
              <dt>{ui.whatWeDid}</dt>
              <dd>{ui.whatText}</dd>
            </div>
            <div>
              <dt>{ui.result}</dt>
              <dd>{ui.resultText}</dd>
            </div>
          </dl>

          <div className="case2__cta">
            <Link className="btn btn--saffron" href={path('rekonstrukce', locale)}>
              <span>{ui.reelTag}</span>
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
                <span>{ui.consult}</span>
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
