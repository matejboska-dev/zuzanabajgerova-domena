import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogIndex from '@/components/articles/BlogIndex';
import { BLOG_UI } from '@/components/articles/strings';
import { isLocale, DEFAULT_LOCALE } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

// Blog v anglictine a italstine (cs ma /clanky).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'it' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) return {};
  const ui = BLOG_UI[locale];
  return pageMetadata({ id: 'clanky', locale, title: ui.blogTitle, description: ui.lead });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  return <BlogIndex locale={locale} />;
}
