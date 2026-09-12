import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Konverze";
const TITLE = "Kontakt";
const LEAD = "Napište mi, zavolejte nebo si rovnou vyberte termín hovoru. Ozvu se do 24 hodin, konzultace je nezávazná a zdarma.";
const SECTIONS = [
  "H1 + co se stane po odeslání formuláře",
  "Kvalifikační formulář, maximálně 6 polí",
  "Telefon, WhatsApp, e-mail",
  "Kalendář pro rezervaci hovoru",
  "Kde mě zastihnete: Itálie / Ostrava",
  "Mapa kanceláře",
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
    ...pageMetadata({ id: 'kontakt', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
