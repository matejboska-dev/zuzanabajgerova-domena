import type { ReactNode } from 'react';
import Marked from '@/components/Marked';
import { breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import Crumbs from './Crumbs';
import JsonLd from './JsonLd';

// kostra pravnich stranek (ochrana udaju, cookies). Texty tam musi odpovidat tomu, co web
// opravdu dela, proto vznikly z kontroly kodu a mereni v prohlizeci, ne z vzoru.
// Znacky [DOPLNIT: ...] a [OVĚŘIT: ...] jsou zamerne videt: pred spustenim je musi nekdo vyresit.

export type LegalToc = { id: string; label: string };

export default function LegalPage({
  here,
  role = 'Právní informace',
  title,
  lead,
  description,
  updated,
  toc,
  children,
}: {
  here: string;
  role?: string;
  title: string;
  lead: string;
  description: string;
  /** text s datem poslední aktualizace, smí obsahovat značku [DOPLNIT: ...] */
  updated: string;
  toc: LegalToc[];
  children: ReactNode;
}) {
  return (
    <main className="subpage legal">
      <JsonLd
        data={graph(
          webPageNode({ path: here, name: title, description }),
          breadcrumbNode([
            { name: 'Domů', href: '/' },
            { name: title, href: here },
          ]),
        )}
      />
      <Crumbs items={[{ name: title, href: here }]} />

      <header className="legal__head">
        <div className="wrap wrap--narrow">
          <p className="page__role">{role}</p>
          <h1 className="page__title">{title}</h1>
          <p className="page__lead">{lead}</p>
          <p className="legal__meta">
            <Marked text={updated} />
          </p>
          <p className="legal__draft">
            <Marked text="[OVĚŘIT: text před spuštěním webu zkontroluje a schválí právník. Označená místa doplní Zuzana.]" />
          </p>
          <nav className="toc legal__toc" aria-label="Obsah stránky">
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`}>
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="wrap wrap--narrow legal__body">{children}</div>
    </main>
  );
}

export function LegalSec({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="legal__sec" id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>
        <span className="legal__n" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** blok s nadpisem a dvojicemi „popisek: hodnota", na mobilu se skládá pod sebe */
export function LegalRow({ title, rows }: { title: string; rows: [string, ReactNode][] }) {
  return (
    <div className="legal__row">
      <h3>{title}</h3>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
