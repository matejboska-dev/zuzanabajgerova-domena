import { notFound } from 'next/navigation';

// Sablona detailu clanku. Zdroj clanku (MDX nebo CMS) se resi v tydnu 3-4;
// route uz existuje, aby na ni slo prolinkovat z pilirovych stranek.
// Blueprint: H1 + TL;DR · obsah (kotvy) · telo · FAQ se strukturovanymi daty ·
// autorka a datum aktualizace · souvisejici clanky · hlidac nabidek · CTA.

export function generateStaticParams(): { locale: string; slug: string }[] {
  return [];
}

export default async function ClanekPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  await params;
  notFound();
}
