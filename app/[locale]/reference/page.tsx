import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Marked from '@/components/Marked';
import Zastupny from '@/components/Zastupny';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import ClickVideo from '@/components/page/ClickVideo';
import JsonLd from '@/components/page/JsonLd';
import MobileCtaBar from '@/components/page/MobileCtaBar';
import ReviewQuotes from '@/components/page/ReviewQuotes';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import { COMMUNITY_MEDIA, RENO_PAIRS } from '@/lib/home';
import { waLink } from '@/lib/contact';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { TESTIMONIALS, VIDEO_REFS } from '@/lib/reviews';
import { agentNode, breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

// Reference: videa klientu (Google Drive klientky), skutecne Google recenze (lib/reviews.ts),
// pripadova studie z jejich videi. Co chybi (pribeh, vysledek, screenshoty), je oznacene.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

const TITLE = 'Reference klientů';
const DESC =
  'Videoreference a recenze klientů, kteří koupili nemovitost v Abruzzu. Hodnocení 5,0 z 15 recenzí na Googlu.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  return pageMetadata({ id: 'reference', locale, title: TITLE, description: DESC, onlyCs: true, image: '/media/kom-obed.webp' });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  const here = path('reference', DEFAULT_LOCALE);
  const reviewNames = TESTIMONIALS.filter((t) => !t.isVideo && t.text).map((t) => t.name);
  const ostrava = RENO_PAIRS[0];
  const strip = COMMUNITY_MEDIA.filter((m) => m.src && !m.video).slice(0, 4);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          agentNode(),
          webPageNode({ type: 'CollectionPage', path: here, name: TITLE, description: DESC, image: '/media/kom-obed.webp' }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: 'O mně', href: path('oMne', DEFAULT_LOCALE) },
            { name: 'Reference', href: here },
          ]),
        )}
      />

      <SubHero
        id="reference-h1"
        badge="Reference · 5,0 z 15 recenzí"
        title="Reference"
        accent="od klientů"
        lead="Skutečné příběhy lidí, kteří se mnou koupili nemovitost v Abruzzu. Na videu, slovy z Googlu a na fotkách z našich společných akcí."
        bg={{ src: '/media/why-pocasi.webp', width: 1200, height: 800 }}
        bgPosition="center 60%"
        photo={{ src: '/media/kom-obed.webp', alt: 'Klienti u společného oběda v restauraci u moře', width: 800, height: 1000 }}
        ctas={[
          { href: path('konzultace', DEFAULT_LOCALE), label: 'Domluvit konzultaci' },
          { href: waLink(), label: 'Napsat na WhatsApp', variant: 'glass', external: true },
        ]}
        chips={['5,0 z 15 recenzí na Googlu', `${VIDEO_REFS.length} videoreferencí`, 'Komunita v Abruzzu']}
      />

      <Crumbs
        items={[
          { name: 'O mně', href: path('oMne', DEFAULT_LOCALE) },
          { name: 'Reference', href: here },
        ]}
      />

      <section className="sec" id="videa" aria-labelledby="ref-videa">
        <div className="wrap">
          <SecHead
            id="ref-videa"
            badge="Videoreference"
            title="Řeknou vám to"
            accent="sami"
            lead="Klienti vlastními slovy. Video se načte, až na něj kliknete."
          />
          <ul className="vrefs">
            {VIDEO_REFS.map((v) => (
              <li className="vref" key={v.src}>
                <ClickVideo src={v.src} poster={v.poster} label={`Videoreference: ${v.name}`} ratio="9 / 16" />
                <p className="vref__name">{v.name}</p>
                <p className="vref__note">{v.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--soft" id="recenze" aria-labelledby="ref-recenze">
        <div className="wrap">
          <SecHead
            id="ref-recenze"
            badge="Google recenze"
            title="Co píšou"
            accent="na Googlu"
            lead="Citace jsou přepsané beze změn."
          />
          <ReviewQuotes names={reviewNames} />
          <p className="ref__profile">
            <Marked text="[DOPLNIT: odkaz na profil s recenzemi na Googlu a Firmy.cz]" />
          </p>
        </div>
      </section>

      <section className="sec" id="pripadova-studie" aria-labelledby="ref-case">
        <div className="wrap">
          <SecHead
            id="ref-case"
            badge="Případová studie"
            title="Od klíčů"
            accent="po hotový byt"
            lead="Jedna koupě od začátku do konce: situace, co jsem udělala a jaký byl výsledek."
          />
          <article className="case">
            <div className="case__media">
              {ostrava.before && ostrava.after && (
                <div className="case__pair">
                  <figure className="media-zoom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ostrava.before.src} alt={ostrava.before.alt} loading="lazy" />
                    <figcaption className="media-chip">Před</figcaption>
                  </figure>
                  <figure className="media-zoom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ostrava.after.src} alt={ostrava.after.alt} loading="lazy" />
                    <figcaption className="media-chip media-chip--gold">Po</figcaption>
                  </figure>
                </div>
              )}
              <div className="case__video">
                <ClickVideo src="/media/reno-ostrava.mp4" poster="/media/reno-ostrava.webp" label="Celá proměna bytu klienta z Ostravy" ratio="9 / 16" />
              </div>
            </div>
            <div className="case__body">
              <h3 className="case__t">Byt klienta z Ostravy</h3>
              <dl className="case__dl">
                <div>
                  <dt>Situace</dt>
                  <dd>
                    <Marked text="[DOPLNIT: co klient hledal, rozpočet a výchozí stav bytu]" />
                  </dd>
                </div>
                <div>
                  <dt>Co jsme udělali</dt>
                  <dd>
                    Byt prošel rekonstrukcí na klíč: nová kuchyň, koupelna i obývací pokoj. Celou proměnu ukazuje video.{' '}
                    <Marked text="[DOPLNIT: délka prací a co dalšího jsem pro klienta zařídila]" />
                  </dd>
                </div>
                <div>
                  <dt>Výsledek</dt>
                  <dd>
                    <Marked text="[DOPLNIT: výsledek, například pronájem nebo vlastní bydlení, a slova klienta]" />
                  </dd>
                </div>
              </dl>
              <Link className="btn btn--ghost" href={`${path('sluzby', DEFAULT_LOCALE)}#rekonstrukce`}>
                Rekonstrukce na klíč
              </Link>
            </div>
          </article>
          <div className="case case--ph">
            <Zastupny
              label="Další případová studie: situace, co jsem udělala, výsledek a fotky"
              ratio="16 / 3"
              spec="2 až 4 fotky (4:5) a krátký text od klientky"
              className="zastupny--compact"
            />
          </div>
        </div>
      </section>

      <section className="sec sec--tight" aria-labelledby="ref-overeni">
        <div className="wrap">
          <SecHead id="ref-overeni" badge="Ověřená hodnocení" title="Hodnocení" accent="na profilech" />
          <div className="ref__shots">
            <Zastupny kind="recenze" label="Screenshot hodnocení na Googlu" ratio="16 / 7" spec="screenshot profilu, šířka 1600 px" className="zastupny--compact" />
            <Zastupny kind="recenze" label="Screenshot hodnocení na Firmy.cz" ratio="16 / 7" spec="screenshot profilu, šířka 1600 px" className="zastupny--compact" />
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="ref-komunita">
        <div className="wrap">
          <SecHead
            id="ref-komunita"
            badge="Komunita"
            title="Vztah nekončí"
            accent="u notáře"
            lead="Scházíme se, slavíme a jezdíme na výlety. Tady je pár momentů z posledních měsíců."
          />
          <div className="ref__strip">
            {strip.map((m) => (
              <figure className="media-tile" key={m.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.alt ?? m.label} loading="lazy" />
                <figcaption className="media-chip">{m.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        id="reference-cta"
        title="Chcete být"
        accent="další"
        text="Začneme nezávaznou konzultací. Řekneme si, co hledáte a co je reálné."
        primary={{ href: path('konzultace', DEFAULT_LOCALE), label: 'Vybrat termín hovoru' }}
      />
      <MobileCtaBar />
    </main>
  );
}
