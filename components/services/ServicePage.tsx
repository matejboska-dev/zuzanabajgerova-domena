import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { absolute, path, type ServiceId } from '@/lib/routes';
import { AGENT_ID, breadcrumbNode, faqNode, graph } from '@/lib/schema';
import { SERVICE_COPY, SERVICE_UI } from '@/lib/services';
import EditorialServicePage from './EditorialServicePage';
import { SERVICE_IMAGES } from '@/lib/service-images';
import PurchasePage from './PurchasePage';

export default function ServicePage({ locale, service }: { locale: Locale; service: ServiceId }) {
  const c = SERVICE_COPY[locale][service], ui = SERVICE_UI[locale];
  const url = absolute(path(service, locale));
  const breadcrumbs = [{ name: ui.home, href: path('home', locale) }, { name: ui.services, href: path('sluzby', locale) }, { name: c.label, href: path(service, locale) }];
  const serviceNode = { '@type': 'Service', '@id': `${url}#service`, name: c.title, description: c.meta, url, serviceType: c.title, provider: { '@id': AGENT_ID }, areaServed: { '@type': 'AdministrativeArea', name: 'Abruzzo, Italia' } };
  const provider = { '@type': 'RealEstateAgent', '@id': AGENT_ID, name: 'Bc. Zuzana Bajgerová', url: absolute('/'), telephone: '+420723824348', areaServed: { '@type': 'AdministrativeArea', name: 'Abruzzo' } };
  const webPage = { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: `${c.title} ${c.accent}`, description: c.meta, inLanguage: locale, mainEntity: { '@id': `${url}#service` }, breadcrumb: { '@id': `${url}#breadcrumbs` }, primaryImageOfPage: { '@type': 'ImageObject', url: absolute(SERVICE_IMAGES[service].src) } };
  const breadcrumb = { ...breadcrumbNode(breadcrumbs), '@id': `${url}#breadcrumbs` };

  if (service === 'koupe') return <PurchasePage locale={locale} structuredData={graph(provider, serviceNode, webPage, breadcrumb, faqNode(c.faq))} breadcrumbs={<nav className="svc-crumbs" aria-label={ui.services}>{breadcrumbs.map((b, i) => <span key={b.href}>{i > 0 && <span aria-hidden="true"> / </span>}{i === 2 ? <span aria-current="page">{b.name}</span> : <Link href={b.href}>{b.name}</Link>}</span>)}</nav>} />;

  return <EditorialServicePage locale={locale} service={service} structuredData={graph(provider, serviceNode, webPage, breadcrumb, faqNode(c.faq))} breadcrumbs={<nav className="svc-crumbs" aria-label={ui.services}>{breadcrumbs.map((b, i) => <span key={b.href}>{i > 0 && <span aria-hidden="true"> / </span>}{i === 2 ? <span aria-current="page">{b.name}</span> : <Link href={b.href}>{b.name}</Link>}</span>)}</nav>} />;
}
