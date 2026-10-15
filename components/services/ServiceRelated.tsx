import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { SERVICE_IDS, path, type ServiceId } from '@/lib/routes';
import { SERVICE_COPY, SERVICE_UI } from '@/lib/services';
import { SERVICE_IMAGES } from '@/lib/service-images';
import { CircleArrow } from './ServiceInteractions';

export default function ServiceRelated({ locale, service }: { locale: Locale; service: ServiceId }) {
  const title = { cs: 'Co může přijít dál.', en: 'What comes next.', it: 'Come proseguire.' }[locale];
  return <aside className="wrap estate-related"><div className="buy-heading-row"><h2>{title}</h2><Link className="buy-text-action" href={path('sluzby', locale)}>{SERVICE_UI[locale].services}<CircleArrow /></Link></div>
    <div className="estate-related__grid">{SERVICE_IDS.filter(id => id !== service).map(id => <Link href={path(id, locale)} key={id}><figure><img src={SERVICE_IMAGES[id].src} alt="" width={SERVICE_IMAGES[id].width} height={SERVICE_IMAGES[id].height} loading="lazy" /></figure><span>{SERVICE_COPY[locale][id].label}<CircleArrow /></span></Link>)}</div>
  </aside>;
}
