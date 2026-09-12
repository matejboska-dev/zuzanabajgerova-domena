import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Konverze";
const TITLE = "Vy si vyberete dům. Zbytek udělám já.";
const LEAD = "Vyhledání, prohlídky, vyjednávání ceny, kompletní administrativa, plné moci, překlady, přepisy energií a registrace k daním. Po koupi rekonstrukce, vybavení, správa i pronájem.";
const SECTIONS = [
  "Hero: „Vy si vyberete dům. Zbytek udělám já.“",
  "Časová osa: před koupí / při koupi / po koupi",
  "Tabulka: co dělám já vs. co děláte Vy",
  "Co je v ceně a co není",
  "Rekonstrukce a vybavení",
  "Správa a pronájem po koupi",
  "Reference navázané na konkrétní službu",
  "FAQ ke službám",
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
    ...pageMetadata({ id: 'sluzby', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
