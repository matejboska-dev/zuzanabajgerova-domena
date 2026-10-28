import { localizeTree, translate } from '@/lib/localize.server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DotaznikForm from '@/components/DotaznikForm';
import LandscapeLine from '@/components/LandscapeLine';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n';
import { path } from '@/lib/routes';

// Neverejna stranka: odkaz posila klientka sama. NENI v menu, v paticce ani v sitemape,
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

const baseMetadata = {
  title: 'Dotazník pro vážné zájemce | Bc. Zuzana Bajgerová',
  description: 'Dotazník pro vážné zájemce o koupi nemovitosti v Abruzzu.',
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; return { ...baseMetadata, title: translate(baseMetadata.title, locale), description: translate(baseMetadata.description, locale) }; }

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main className="page dq">
      <div className="wrap">
        <p className="page__role">Pro vážné zájemce</p>
        <h1 className="page__title">Dotazník pro vážné zájemce</h1>
        <p className="page__lead">
          Tento dotazník slouží k tomu, abychom hned na začátku zjistili, co hledáte a jestli je to
          v Abruzzu reálné. Odpovězte, jak to teď cítíte. K ničemu vás to nezavazuje.
        </p>
      </div>

      <LandscapeLine />

      <div className="wrap dq__wrap">
        <DotaznikForm privacyHref={path('ochranaUdaju', locale)} />
      </div>
    </main>
  );
}

export default async function LocalizedPage(props: Parameters<typeof Page>[0]) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return localizeTree(await Page(props), locale);
}
