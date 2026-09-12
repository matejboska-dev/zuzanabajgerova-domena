import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { listProperties, readDataset } from '@/lib/data.server';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import PageShell from '@/components/PageShell';
import PropertyCard from '@/components/PropertyCard';
import ScrapeButton from '@/components/ScrapeButton';

export const revalidate = 300;

const TITLE = 'Nemovitosti v Abruzzu';
const LEAD =
  'Byty, domy, vily a pozemky v italském Abruzzu, od pobřeží u Pescary po podhůří Gran Sassa. ' +
  'Nabídky se aktualizují automaticky.';

const SECTIONS = [
  'H1 + dvě věty, žádná SEO výplň',
  'Filtr: lokalita, cena, typ, stav, vzdálenost od moře',
  'Rychlé výběry (vedou na filtrované statické stránky, indexovatelné)',
  'Přepínač mřížka / mapa',
  'Karty nabídek: cena v EUR i CZK, štítek „cena konečná“',
  'Načítání dalších nabídek',
  'Hlídač nabídek',
  '„Nenašli jste? Mám i nabídky mimo systém“ + formulář',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ id: 'nemovitosti', locale, title: TITLE, description: LEAD });
}

export default async function NemovitostiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const properties = await listProperties();
  const ds = await readDataset();
  const stamp = ds?.generated_at ? new Date(ds.generated_at) : null;
  const showScrapeButton = process.env.NEXT_PUBLIC_SHOW_SCRAPE_BUTTON !== '0';

  return (
    <PageShell role="Nemovitosti · automatický obsah" title={TITLE} lead={LEAD} sections={SECTIONS}>
      <section className="wrap">
        <div className="listing-bar">
          <p className="count">
            Zobrazeno <b>{properties.length}</b> z <b>{ds?.total_reported ?? properties.length}</b>{' '}
            nabídek
          </p>
          {stamp && (
            <div className="stamp">
              <span className="dot" />
              <span>Aktualizováno {stamp.toLocaleDateString('cs-CZ')}</span>
            </div>
          )}
          {showScrapeButton && <ScrapeButton />}
        </div>

        {properties.length === 0 ? (
          <div className="empty">Zatím žádné nabídky.</div>
        ) : (
          <div className="listing-grid">
            {properties.map((p, i) => (
              <PropertyCard key={p.id} p={p} locale={locale} priority={i < 6} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
