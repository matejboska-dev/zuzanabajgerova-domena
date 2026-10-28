import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readDataset } from '@/lib/data.server';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { homeData } from '@/lib/home.l10n';
import HomeSections from '@/components/home/HomeSections';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { HERO } = homeData(locale);
  return pageMetadata({ id: 'home', locale, title: HERO.h1, description: HERO.lead });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // sekce 05 se plni ze scraperu — doporucene nahoru, jen aktivni, max 9
  const ds = await readDataset();
  const featured = (ds?.properties ?? [])
    .filter((p) => !p.hidden && p.status === 'aktivní')
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 9);

  return <HomeSections locale={locale} featured={featured} />;
}
