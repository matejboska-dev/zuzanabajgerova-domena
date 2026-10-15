import { notFound } from 'next/navigation';
import ServiceHub from '@/components/services/ServiceHub';
import { pageMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'en' }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'en') notFound();
  return pageMetadata({ id: 'sluzby', locale: 'en', title: 'Property services in Abruzzo', description: 'Personal support for buying, renovating, caring for and renting out a property in Abruzzo, Italy. Discover the services of Zuzana Bajgerová.' });
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'en') notFound();
  return <ServiceHub locale="en" />;
}
