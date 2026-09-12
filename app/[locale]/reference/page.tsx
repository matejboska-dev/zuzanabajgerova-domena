import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';

// Sekce a jejich poradi pochazi ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md 5).
// Poradi se nemeni bez souhlasu klientky.
const ROLE = "Důvěra";
const TITLE = "Reference";
const LEAD = "Hodnocení 5,0 z 15 recenzí. Skutečné příběhy klientů, kteří koupili nemovitost v Itálii, s videem a s výsledkem.";
const SECTIONS = [
  "H1 + souhrnná čísla",
  "Videoreference (nejsilnější první)",
  "Případové studie: situace → co jsem udělala → výsledek",
  "Textové recenze se zdrojem (Google, Firmy.cz, RE/MAX)",
  "Screenshoty ověřených hodnocení",
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
    ...pageMetadata({ id: 'reference', locale, title: TITLE, description: LEAD }),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell role={ROLE} title={TITLE} lead={LEAD} sections={SECTIONS} />;
}
