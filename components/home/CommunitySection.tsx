import Zastupny from '@/components/Zastupny';
import AutoLoop from '@/components/media/AutoLoop';
import { COMMUNITY_MEDIA } from '@/lib/home';

// sekce 09A — komunita, hned pod referencemi. bento mrizka: velke video vlevo, fotky a kratke
// smycky z akci s klienty. popisky jsou podle nazvu souboru od klientky. polozka bez src = box.
export default function CommunitySection() {
  return (
    <section className="sec community" aria-labelledby="sec-09a">
      <div className="wrap">
        <div className="sec__head">
          <div className="listings__badge">
            <span className="listings__badge-dot" />
            <span>Komunita · Abruzzo</span>
          </div>
          <h2 id="sec-09a" className="home-h2">
            Staňte se součástí <em>naší komunity</em>
          </h2>
          <p className="home-lead">
            S našimi klienty tvoříme komunitu. Scházíme se na společných večeřích, slavíme Velikonoce
            na pláži a fotíme se u notáře po podpisu. Vztah s klienty nekončí podpisem.
          </p>
        </div>

        <div className="community__grid community__grid--bento">
          {COMMUNITY_MEDIA.map((m, i) => (
            <figure
              key={m.label}
              className={`community__item media-tile${i === 0 ? ' community__item--lead' : ''}`}
            >
              {m.src && m.video ? (
                <AutoLoop src={m.video} poster={m.src} label={m.alt ?? m.label} />
              ) : m.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.src} alt={m.alt ?? m.label} loading="lazy" decoding="async" />
              ) : (
                <Zastupny
                  label={m.label}
                  ratio="4 / 5"
                  spec="1600 × 2000 px (4:5)"
                  className="zastupny--compact"
                />
              )}
              {m.src && <figcaption className="media-chip">{m.label}</figcaption>}
            </figure>
          ))}
        </div>

        <p className="community__ig">
          <a href="https://www.instagram.com/bc.zuzana_remax/" target="_blank" rel="noopener noreferrer">
            Další momenty z Abruzza na Instagramu @bc.zuzana_remax
          </a>
        </p>
      </div>
    </section>
  );
}
