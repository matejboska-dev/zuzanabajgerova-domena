import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Vyhledávání";
const TITLE = "Jak koupit nemovitost v Itálii";
const LEAD = "Koupě nemovitosti v Itálii pro českého kupujícího vyžaduje italské daňové číslo, notářskou smlouvu a počítat s náklady zhruba deset až patnáct procent nad kupní cenu. Celý proces lze vyřídit i na plnou moc, bez opakovaných cest do Itálie.";
const SECTIONS = [
  "H1 + odpověď v jednom odstavci (formát pro AI vyhledávání)",
  "Obsah stránky (kotvy)",
  "Proces v 8 krocích, přehled",
  "Krok za krokem: proposta, compromesso, rogito",
  "Codice fiscale + odkaz na samostatnou stránku",
  "Náklady a daně: tabulka + kalkulačka",
  "Plná moc: na podpis nemusíte letět",
  "7 chyb, které dělají čeští kupující",
  "FAQ se strukturovanými daty",
  "„Co z toho udělám za Vás“ + CTA",
  "Související články",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({ id: 'jakKoupit', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
