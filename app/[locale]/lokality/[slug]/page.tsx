import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE } from '@/lib/i18n';
import { LOCALITIES, LOCALITY_SLUGS } from '@/lib/localities';

const SECTIONS = [
  'Hero foto lokality + H1',
  'Rychlá fakta: letiště, moře, ceny za m², sezónnost',
  'Pro koho se hodí a pro koho ne',
  'Nabídky v této lokalitě (automaticky)',
  'Život tady: doprava, vybavenost, zdravotnictví',
  'Ceny a provozní náklady (IMU, TARI)',
  'Video a fotogalerie lokality',
  'Reference klienta, který tu koupil',
  'Sousední lokality (prolinkování)',
  'CTA: „Nevíte která? Zavolejme si.“',
];

export function generateStaticParams() {
  return LOCALITY_SLUGS.map((slug) => ({ locale: DEFAULT_LOCALE, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = LOCALITIES[slug];
  if (!isLocale(locale) || !loc) return {};
  return pageMetadata({ id: 'lokalita', locale, slug, title: loc.title, description: loc.lead });
}

export default async function LokalitaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = LOCALITIES[slug];
  if (!isLocale(locale) || !loc) notFound();

  return (
    <PageShell role="Lokalita · vyhledávání" title={loc.title} lead={loc.lead} sections={SECTIONS} />
  );
}
