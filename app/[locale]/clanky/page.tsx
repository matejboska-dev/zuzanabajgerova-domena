import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Vyhledávání";
const TITLE = "Články";
const LEAD = "Odpovědi na otázky, které lidé řeší dřív, než osloví makléře. Koupě, náklady, lokality, život v Itálii a investice.";
const SECTIONS = [
  "H1 + intro",
  "Kategorie: koupě, náklady, lokality, život, investice",
  "Pilířové průvodce (odkazy nahoru)",
  "Nejnovější články",
  "Hlídač nabídek",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({ id: 'clanky', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
