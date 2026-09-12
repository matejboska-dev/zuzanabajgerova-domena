import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Konverze";
const TITLE = "Nezávazná konzultace";
const LEAD = "Vyberte si termín, který Vám vyhovuje. Projdeme, co hledáte, jaký máte rozpočet a co všechno koupě v Itálii obnáší. Nic neplatíte a k ničemu se nezavazujete.";
const SECTIONS = [
  "H1 + co se stane po rezervaci",
  "Kalendář pro rezervaci hovoru",
  "Kvalifikační formulář, maximálně 6 polí",
  "Čemu se budeme věnovat",
  "FAQ: platí se konzultace? musím letět?",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({ id: 'konzultace', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
