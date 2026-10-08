import Zastupny from '@/components/Zastupny';
import ClickVideo from '@/components/page/ClickVideo';
import { VIDEO_ODPOVEDI } from '@/lib/home';

// sekce 10B — "Ptáte se, odpovídám". videa se pridavaji v lib/home.ts (VIDEO_ODPOVEDI):
// polozka bez src = zastupny box s pracovnim nazvem, polozka se src = skutecne video.
export default function VideoAnswers() {
  return (
    <section className="sec vqa" aria-labelledby="sec-10b">
      <div className="wrap">
        <div className="sec__head">
          <div className="listings__badge">
            <span className="listings__badge-dot" />
            <span>Video odpovědi · Nejčastější dotazy</span>
          </div>
          <h2 id="sec-10b" className="home-h2">
            Ptáte se, <em>odpovídám</em>
          </h2>
          <p className="home-lead">
            Krátká videa s odpověďmi na to, na co se mě klienti ptají nejčastěji.
          </p>
        </div>

        <ul className="vqa__grid">
          {VIDEO_ODPOVEDI.map((v) => (
            <li className="vqa-card" key={v.title}>
              {v.src && v.poster ? (
                <div className="vqa-card__media">
                  <ClickVideo src={v.src} poster={v.poster} label={v.title} ratio="4 / 5" />
                </div>
              ) : (
                <Zastupny
                  kind="video"
                  label={`Video: ${v.title}`}
                  ratio="4 / 5"
                  spec="1080 × 1350 px (4:5), svislé video z mobilu"
                  className="zastupny--compact"
                />
              )}
              <h3 className="vqa-card__t">{v.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
