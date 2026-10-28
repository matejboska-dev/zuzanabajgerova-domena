import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleView from '@/components/articles/ArticleView';
import { ARTICLES, articleBySlug, articleFor } from '@/lib/articles';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ locale: DEFAULT_LOCALE, slug: a.slug }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = articleBySlug('cs', slug);
  if (locale !== DEFAULT_LOCALE || !a) return {};
  const slugs = Object.fromEntries(LOCALES.map((l) => [l, articleFor(l, a.id)?.slug]));
  const meta = pageMetadata({ id: 'clanek', locale: 'cs', slug, slugs, title: a.metaTitle ?? a.title, description: a.description, image: a.image.src });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: a.published, modifiedTime: a.updated, authors: ['Bc. Zuzana Bajgerová'] },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const a = articleBySlug('cs', slug);
  if (locale !== DEFAULT_LOCALE || !a) notFound();
  return <ArticleView a={a} locale="cs" />;
}
