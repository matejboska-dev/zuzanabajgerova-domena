import Link from 'next/link';
import Zastupny from '@/components/Zastupny';
import ClickVideo from '@/components/page/ClickVideo';
import AutoLoop from '@/components/media/AutoLoop';
import { RENO_DONE, RENO_PAIRS } from '@/lib/home';

// sekce 10A — rekonstrukce na klic. skutecny par pred a po, hotove realizace a reel klientky.
// vse je z jejich videi (slozka Rekonstrukce). dalsi pary pred a po doda klientka.
export default function RenoSection({ href }: { href: string }) {
  return (
    <section className="sec reno" aria-labelledby="sec-10a">
      <div className="wrap">
        <div className="sec__head sec__head--left">
          <div className="listings__badge">
            <span className="listings__badge-dot" />
            <span>Rekonstrukce na klíč · Abruzzo</span>
          </div>
          <h2 id="sec-10a" className="home-h2">
            Rekonstrukce <em>na klíč</em>
          </h2>
          <p className="home-lead">
            S naší paní architektkou a vlastním týmem ověřených řemeslníků vám byt zrekonstruujeme
            na klíč. Ohlídám rozpočet i termíny a během prací vám posílám fotky.
          </p>
        </div>

        <div className="reno__grid">
          <div className="reno__main">
            {RENO_PAIRS.map((pair) => (
              <article className="reno-pair" key={pair.title}>
                <h3 className="reno-pair__t">{pair.title}</h3>
                <div className="reno-pair__row">
                  {pair.before && pair.after ? (
                    <>
                      <figure className="reno-pair__img media-zoom">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pair.before.src} alt={pair.before.alt} loading="lazy" decoding="async" />
                        <figcaption className="media-chip">Před</figcaption>
                      </figure>
                      <figure className="reno-pair__img media-zoom">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pair.after.src} alt={pair.after.alt} loading="lazy" decoding="async" />
                        <figcaption className="media-chip media-chip--gold">Po</figcaption>
                      </figure>
                    </>
                  ) : (
                    <Zastupny
                      label={`${pair.title}: dvojice fotek před a po`}
                      ratio="16 / 5"
                      spec="2× 1600 × 2000 px (4:5), stejný úhel pohledu před i po"
                      className="zastupny--compact reno-pair__ph"
                    />
                  )}
                </div>
              </article>
            ))}

            <div className="reno__done">
              <p className="reno__done-h">Hotové realizace</p>
              <div className="reno__tiles">
                {RENO_DONE.map((r) => (
                  <figure className="reno__tile media-tile" key={r.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.src} alt={r.alt} loading="lazy" decoding="async" />
                    <figcaption className="media-chip">{r.label}</figcaption>
                  </figure>
                ))}
                <figure className="reno__tile media-tile">
                  <AutoLoop
                    src="/media/loop-dojata-klientka.mp4"
                    poster="/media/loop-dojata-klientka.webp"
                    label="Dojatá klientka v hotovém bytě"
                  />
                  <figcaption className="media-chip">Dojatá klientka</figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div className="reno__reels">
            <ClickVideo
              src="/media/reno-ostrava.mp4"
              poster="/media/reno-ostrava.webp"
              label="Celá proměna bytu klienta z Ostravy, video"
              ratio="9 / 16"
            />
            <p className="reno__reels-cap">Celá proměna bytu klienta z Ostravy</p>
          </div>
        </div>

        <div className="reno__cta">
          <Link href={href} className="btn btn--saffron">
            <span>Domluvit nezávaznou konzultaci</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
