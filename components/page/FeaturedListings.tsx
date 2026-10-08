import Link from 'next/link';
import { listProperties } from '@/lib/data.server';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';
import PropertyCard from '@/components/PropertyCard';

/** 3 aktualni nabidky (skutecne fotky z RE/MAX, plni se samo ze scraperu) */
export default async function FeaturedListings({ id, title, accent }: { id: string; title: string; accent?: string }) {
  const items = (await listProperties()).filter((p) => p.status === 'aktivní').slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="sec fl" aria-labelledby={id}>
      <div className="wrap">
        <div className="sec__head">
          <div className="listings__badge">
            <span className="listings__badge-dot" />
            <span>Aktuální nabídka · Abruzzo, Itálie</span>
          </div>
          <h2 id={id} className="home-h2">
            {title}
            {accent && (
              <>
                {' '}
                <em>{accent}</em>
              </>
            )}
          </h2>
        </div>
        <div className="listing-grid fl__grid">
          {items.map((p) => (
            <PropertyCard key={p.id} p={p} locale={DEFAULT_LOCALE} />
          ))}
        </div>
        <div className="fl__more">
          <Link href={path('nemovitosti', DEFAULT_LOCALE)} className="btn btn--saffron">
            Všechny nabídky nemovitostí
          </Link>
        </div>
      </div>
    </section>
  );
}
