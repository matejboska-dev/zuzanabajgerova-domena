import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DotaznikForm from '@/components/DotaznikForm';
import LandscapeLine from '@/components/LandscapeLine';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';

// Neverejna stranka: odkaz posila klientka sama. NENI v menu, v paticce ani v sitemape,
// nikde na webu na ni nevede odkaz a ma noindex. Jen cesky (en a it dostanou 404).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

export const metadata: Metadata = {
  title: 'Dotazník pro vážné zájemce | Bc. Zuzana Bajgerová',
  description: 'Dotazník pro vážné zájemce o koupi nemovitosti v Abruzzu.',
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();

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
        <DotaznikForm privacyHref={path('ochranaUdaju', DEFAULT_LOCALE)} />
      </div>
    </main>
  );
}
