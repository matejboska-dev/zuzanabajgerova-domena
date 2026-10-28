import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogIndex from '@/components/articles/BlogIndex';
import { BLOG_UI } from '@/components/articles/strings';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

// Rozcestnik blogu pro cestinu. Clanky jsou v lib/articles.ts, anglicky a italsky pod /blog.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: DEFAULT_LOCALE }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) return {};
  const ui = BLOG_UI.cs;
  return pageMetadata({ id: 'clanky', locale, title: ui.blogTitle, description: ui.lead });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== DEFAULT_LOCALE) notFound();
  return <BlogIndex locale="cs" />;
}
