import { localized } from '@/lib/localize';
import Link from 'next/link';
import Crumbs from '@/components/page/Crumbs';
import CtaBand from '@/components/page/CtaBand';
import JsonLd from '@/components/page/JsonLd';
import { articleFor, formatDate, type ArticleBlock, type LocalizedArticle } from '@/lib/articles';
import { HTML_LANG, type Locale } from '@/lib/i18n';
import { absolute, path } from '@/lib/routes';
import { AGENT_ID, PERSON_ID, agentNode, breadcrumbNode, faqNode, graph, personNode, webPageNode } from '@/lib/schema';
import { BLOG_UI } from './strings';
import './article.css';

function Block({ b }: { b: ArticleBlock }) {
  if (b.t === 'p') return <p>{b.text}</p>;
  if (b.t === 'ul') return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  if (b.t === 'callout') return <aside className="art-callout"><strong>{b.title}</strong><p>{b.text}</p></aside>;
  return (
    <div className="art-tablewrap">
      <table>
        <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{b.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>)}</tbody>
      </table>
      {b.note && <p className="art-note">{b.note}</p>}
    </div>
  );
}

function ArticleView({ a, locale }: { a: LocalizedArticle; locale: Locale }) {
  const ui = BLOG_UI[locale];
  const here = path('clanek', locale, a.slug);
  const index = path('clanky', locale);
  const homeHref = path('home', locale);
  const related = a.related.map((id) => articleFor(locale, id)).filter((x): x is LocalizedArticle => Boolean(x));
  const ctaHref = path(a.cta.routeId, locale);
  const faqId = ui.faqHref;
  const lang = HTML_LANG[locale];

  return (
    <main className="subpage article">
      <JsonLd
        data={graph(
          agentNode(),
          personNode(),
          webPageNode({ path: here, name: a.title, description: a.description, image: a.image.src, lang }),
          {
            '@type': 'BlogPosting',
            '@id': `${absolute(here)}#article`,
            headline: a.title,
            description: a.description,
            inLanguage: lang,
            datePublished: a.published,
            dateModified: a.updated,
            mainEntityOfPage: { '@id': `${absolute(here)}#webpage` },
            author: { '@id': PERSON_ID },
            publisher: { '@id': AGENT_ID },
            image: absolute(a.image.src),
          },
          breadcrumbNode([
            { name: ui.home, href: homeHref },
            { name: ui.blog, href: index },
            { name: a.title, href: here },
          ]),
          faqNode(a.faq),
        )}
      />

      <Crumbs home={{ name: ui.home, href: homeHref }} label={ui.crumbsAria} items={[{ name: ui.blog, href: index }, { name: a.title, href: here }]} />

      <header className="art-head wrap">
        <p className="art-kicker">{a.category}</p>
        <h1>{a.title}</h1>
        <p className="art-meta">
          {ui.preparedBy} <Link href={path('oMne', locale)}>Bc. Zuzana Bajgerová</Link> · {ui.updated}{' '}
          <time dateTime={a.updated}>{formatDate(a.updated, locale)}</time> · {a.readMinutes} {ui.minRead}
        </p>
        <p className="art-summary">{a.summary}</p>
      </header>

      <div className="art-hero wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} fetchPriority="high" />
      </div>

      <div className="art-body wrap">
        <nav className="art-toc" aria-label={ui.toc}>
          <p>{ui.toc}</p>
          <ol>
            {a.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.h}</a></li>)}
            <li><a href={`#${faqId}`}>{ui.faq}</a></li>
          </ol>
        </nav>

        <article className="art-text">
          {a.sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2>{s.h}</h2>
              {s.blocks.map((b, i) => <Block key={i} b={b} />)}
            </section>
          ))}

          <section id={faqId}>
            <h2>{ui.faq}</h2>
            {a.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>

          <p className="art-note">
            {ui.disclaimerA} <Link href={path('jakKoupit', locale)}>{ui.guide}</Link> {ui.and}{' '}
            <Link href={path('koupePrakticky', locale)}>{ui.practical}</Link>.
          </p>
        </article>
      </div>

      {related.length > 0 && (
        <section className="art-related wrap" aria-labelledby="art-related-h">
          <h2 id="art-related-h">{ui.readOn}</h2>
          <ul>
            {related.map((r) => (
              <li key={r.id}>
                <Link href={path('clanek', locale, r.slug)}>
                  <span>{r.category}</span>
                  <strong>{r.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand
        id="art-cta"
        title={a.cta.title}
        accent={a.cta.accent}
        text={a.cta.text}
        primary={{ href: ctaHref, label: a.cta.label }}
        whatsAppLabel={{ cs: 'Napsat na WhatsApp', en: 'Message on WhatsApp', it: 'Scrivi su WhatsApp' }[locale]}
      />
    </main>
  );
}

export default localized(ArticleView);
