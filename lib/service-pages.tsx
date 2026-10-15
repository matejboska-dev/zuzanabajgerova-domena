import { notFound } from 'next/navigation';
import { isLocale } from './i18n';
import { SERVICE_IDS, serviceFromSlug, serviceSlug } from './routes';
import { SERVICE_COPY } from './services';
import { pageMetadata } from './seo';
import ServicePage from '@/components/services/ServicePage';

type Props = { params: Promise<{ locale: string; service: string }> };
export function serviceRoute(locale: 'cs' | 'en' | 'it') {
  return {
    generateStaticParams: () => SERVICE_IDS.map(id => ({ locale, service: serviceSlug(id, locale) })),
    generateMetadata: async ({ params }: Props) => {
      const p = await params;
      if (p.locale !== locale) notFound();
      const id = serviceFromSlug(locale, p.service);
      if (!id) notFound();
      const c = SERVICE_COPY[locale][id];
      return pageMetadata({ id, locale, title: c.title.replace(/\.$/, ''), description: c.meta });
    },
    Page: async ({ params }: Props) => {
      const p = await params;
      if (!isLocale(p.locale) || p.locale !== locale) notFound();
      const id = serviceFromSlug(locale, p.service);
      if (!id) notFound();
      return <ServicePage locale={locale} service={id} />;
    },
  };
}
