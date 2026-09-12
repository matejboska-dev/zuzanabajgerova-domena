import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Technická";
const TITLE = "Ochrana osobních údajů";
const LEAD = "Jak nakládám s údaji z formulářů, kdo k nim má přístup a jak dlouho je uchovávám.";
const SECTIONS = [
  "Správce údajů a kontakt",
  "Jaké údaje sbírám a proč",
  "Právní základ zpracování",
  "Doba uchování",
  "Předání třetím stranám",
  "Práva subjektu údajů",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({ id: 'ochranaUdaju', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
