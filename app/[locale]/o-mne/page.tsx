import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Důvěra";
const TITLE = "O mně";
const LEAD = "Většinu roku žiji v Abruzzu a mám tam vlastní ověřenou síť realitních kanceláří, notářů, právníků a techniků. Dvacet let v oboru, Platinum a Hall of Fame RE/MAX.";
const SECTIONS = [
  "Portrét + jedna věta, kdo jsem",
  "Příběh: proč Itálie a jak to začalo",
  "Čísla a ocenění",
  "Jak pracuju: hodnoty a pravidla",
  "Moje síť v Itálii: notáři, právníci, technici, řemeslníci",
  "Fotky ze života a práce v Abruzzu",
  "Reference, ukázka + odkaz",
  "CTA",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({ id: 'oMne', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
