import { permanentRedirect, notFound } from 'next/navigation';
import { getProperty } from '@/lib/data.server';
import { propertySlug } from '@/lib/slug';
import { path } from '@/lib/routes';
import { DEFAULT_LOCALE } from '@/lib/i18n';

// Stara adresa detailu z dema (/nemovitost/<id>). Zustava jako trvale presmerovani
// na kanonicky tvar /nemovitosti/<typ>-<obec>-<id>, aby uz odeslane odkazy nekoncily 404.
// Az prestane chodit provoz (par mesicu po spusteni), muze cely adresar zmizet.

export const dynamic = 'force-dynamic';

export default async function LegacyDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getProperty(id);
  if (!p) notFound();
  permanentRedirect(path('nemovitost', DEFAULT_LOCALE, propertySlug(p)));
}
