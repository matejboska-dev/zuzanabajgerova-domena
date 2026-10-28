import { localized } from '@/lib/localize';
import Link from 'next/link';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import JsonLd from '@/components/page/JsonLd';
import SecHead from '@/components/page/SecHead';
import SubHero from '@/components/page/SubHero';
import { formatDate, listArticles } from '@/lib/articles';
import { HTML_LANG, type Locale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import { BLOG_UI } from './strings';
import './article.css';

function BlogIndex({ locale }: { locale: Locale }) {
  const ui = BLOG_UI[locale];
  const here = path('clanky', locale);
  const guide = path('jakKoupit', locale);
  const home = path('home', locale);
  const articles = listArticles(locale);

  return (
    <main className="subpage">
      <JsonLd
        data={graph(
          webPageNode({ type: 'CollectionPage', path: here, name: ui.blogTitle, description: ui.lead, lang: HTML_LANG[locale] }),
          breadcrumbNode([{ name: ui.home, href: home }, { name: ui.blog, href: here }]),
        )}
      />

      <SubHero
        id="clanky-h1"
        badge={ui.badge}
        title={ui.heroTitle}
        accent={ui.heroAccent}
        lead={ui.lead}
        bg={{ src: '/media/why-pocasi.webp', width: 1200, height: 800 }}
        ctas={[{ href: guide, label: ui.guideCta }]}
      />

      <Crumbs home={{ name: ui.home, href: home }} items={[{ name: ui.blog, href: here }]} />

      <section className="sec sec--tight" aria-labelledby="clanky-nove">
        <div className="wrap">
          <SecHead id="clanky-nove" badge={ui.latest} title={ui.latest} accent={ui.latestAccent} />
          <ul className="blog-list">
            {articles.map((a) => (
              <li key={a.id}>
                <Link href={path('clanek', locale, a.slug)} className="blog-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} loading="lazy" />
                  <span className="blog-card__body">
                    <span className="blog-card__cat">{a.category}</span>
                    <span className="blog-card__t">{a.title}</span>
                    <span className="blog-card__d">{a.description}</span>
                    <span className="blog-card__meta">{formatDate(a.updated, locale)} · {a.readMinutes} {ui.minRead}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="clanky-pilir">
        <div className="wrap">
          <Link href={guide} className="pillar media-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/jak-notar.webp" alt={ui.pillarAlt} loading="lazy" />
            <span className="pillar__body">
              <span id="clanky-pilir" className="pillar__t">{ui.pillarTitle}</span>
              <span className="pillar__d">{ui.pillarDesc}</span>
              <span className="pillar__more">{ui.pillarMore}</span>
            </span>
          </Link>
        </div>
      </section>

      <CtaBand
        id="clanky-cta"
        title={ui.watchTitle}
        accent={ui.watchAccent}
        text={ui.watchText}
        primary={{ href: `${path('nemovitosti', locale)}#hlidac`, label: ui.watchLabel }}
        whatsAppLabel={{ cs: 'Napsat na WhatsApp', en: 'Message on WhatsApp', it: 'Scrivi su WhatsApp' }[locale]}
      />
    </main>
  );
}

export default localized(BlogIndex);
