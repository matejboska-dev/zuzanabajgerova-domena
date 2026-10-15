import { notFound } from 'next/navigation';
import ServiceHub from '@/components/services/ServiceHub';
import { pageMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'it' }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'it') notFound();
  return pageMetadata({ id: 'sluzby', locale: 'it', title: 'Servizi immobiliari in Abruzzo', description: 'Supporto personale per acquisto, ristrutturazione, gestione immobiliare e affitti brevi in Abruzzo. Scopri i servizi di Zuzana Bajgerová.' });
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'it') notFound();
  return <ServiceHub locale="it" />;
}
