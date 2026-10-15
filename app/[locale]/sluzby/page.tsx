import { notFound } from 'next/navigation';
import ServiceHub from '@/components/services/ServiceHub';
import { pageMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'cs' }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'cs') notFound();
  return pageMetadata({ id: 'sluzby', locale: 'cs', title: 'Služby: koupě, rekonstrukce, správa a pronájem v Abruzzu', description: 'Osobní podpora Zuzany Bajgerové při koupi, rekonstrukci, správě a pronájmu nemovitosti v Abruzzu. Vyberte si službu a proberme váš záměr.' });
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'cs') notFound();
  return <ServiceHub locale="cs" />;
}
