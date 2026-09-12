import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Vyhledávání";
const TITLE = "Lokality v Abruzzu";
const LEAD = "Abruzzo není jedno místo. Pobřeží u Pescary, rybářské trabocchi na jihu, podhůří Gran Sassa a vnitrozemí se liší cenou, dostupností i tím, pro koho se hodí.";
const SECTIONS = [
  "Rozcestník lokalit s fotkou a jednou větou",
  "Mapa Abruzza s vyznačenými oblastmi",
  "Srovnávací tabulka: ceny za m², moře, letiště, sezónnost",
  "Nabídky napříč lokalitami (automaticky)",
  "CTA: „Nevíte která? Zavolejme si.“",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({ id: 'lokality', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
