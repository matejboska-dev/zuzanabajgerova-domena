import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleView from '@/components/articles/ArticleView';
import { ARTICLES, articleBySlug, articleFor } from '@/lib/articles';
import { LOCALES, isLocale, DEFAULT_LOCALE } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return (['en', 'it'] as const).flatMap((locale) =>
    ARTICLES.map((a) => ({ locale, slug: articleFor(locale, a.slug)?.slug ?? a.slug })),
  );
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) return {};
  const a = articleBySlug(locale, slug);
  if (!a) return {};
  const slugs = Object.fromEntries(LOCALES.map((l) => [l, articleFor(l, a.id)?.slug]));
  const meta = pageMetadata({ id: 'clanek', locale, slug, slugs, title: a.metaTitle ?? a.title, description: a.description, image: a.image.src });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: a.published, modifiedTime: a.updated, authors: ['Bc. Zuzana Bajgerová'] },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  const a = articleBySlug(locale, slug);
  if (!a) notFound();
  return <ArticleView a={a} locale={locale} />;
}
