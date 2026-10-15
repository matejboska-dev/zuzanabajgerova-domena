import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { path, SERVICE_IDS, absolute } from '@/lib/routes';
import { SERVICE_COPY, SERVICE_UI } from '@/lib/services';
import { SERVICE_IMAGES, SERVICE_IMAGE_NOTE } from '@/lib/service-images';
import { CircleArrow } from './ServiceInteractions';
import ServiceMotion from './ServiceMotion';
import { waLink } from '@/lib/contact';
import JsonLd from '@/components/page/JsonLd';
import { agentNode, breadcrumbNode, graph, webPageNode } from '@/lib/schema';
import './service-design.css';

export default function ServiceHub({ locale }: { locale: Locale }) {
  const ui = SERVICE_UI[locale];
  const anchors = { koupe: 'servis', rekonstrukce: 'rekonstrukce', sprava: 'sprava', pronajem: 'investice' };
  return <ServiceMotion><main className="service-page purchase-page service-redesign estate-collection">
    <JsonLd data={graph(agentNode(), webPageNode({ type: 'CollectionPage', path: path('sluzby',locale), name: `${ui.hubTitle} ${ui.hubAccent}`, description: ui.hubLead }), breadcrumbNode([{name:ui.home,href:path('home',locale)},{name:ui.services,href:path('sluzby',locale)}]), {
      '@type': 'ItemList', itemListElement: SERVICE_IDS.map((id,i)=>({'@type':'ListItem',position:i+1,name:SERVICE_COPY[locale][id].title,url:absolute(path(id,locale))})),
    })} />
    <header className="estate-collection__head wrap">
      <nav className="svc-crumbs" aria-label={ui.services}><Link href={path('home',locale)}>{ui.home}</Link><span aria-hidden="true"> / </span><span>{ui.services}</span></nav>
      <h1>{ui.hubTitle}<em>{ui.hubAccent}</em></h1>
      <div className="estate-collection__intro"><p>{ui.hubLead}</p><nav className="estate-collection__choices" aria-label={ui.services}>{SERVICE_IDS.map(id => <a className="btn btn--ghost" key={id} href={`#${anchors[id]}`}><span>{SERVICE_COPY[locale][id].label}</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>)}</nav></div>
    </header>
    <figure className="estate-collection__landscape"><img src="/hero/backgrounds/abruzzo-montesilvano-plaz.webp" alt={{cs:'Večerní pobřeží v Montesilvanu, Abruzzo',en:'Evening on the coast in Montesilvano, Abruzzo',it:'La costa di Montesilvano al tramonto, Abruzzo'}[locale]} width="1920" height="1080" fetchPriority="high" /><div className="estate-collection__portrait" aria-hidden="true"><img src="/hero/portret-4k.webp" alt="" width="1254" height="1254" /></div><figcaption>Bc. Zuzana Bajgerová · Montesilvano, Abruzzo</figcaption></figure>
    <div className="wrap estate-collection__services">{SERVICE_IDS.map(id=>{
      const c=SERVICE_COPY[locale][id];
      const image=SERVICE_IMAGES[id];
      return <article className={`estate-service estate-service--${id}`} id={anchors[id]} key={id}>
        <Link className="estate-service__photo" href={path(id,locale)} aria-label={c.title}><img src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} loading="lazy" /><span className="estate-service__image-note">{SERVICE_IMAGE_NOTE[locale]}</span><CircleArrow /></Link>
        <div className="estate-service__copy"><h2><Link href={path(id,locale)}>{c.title}<em>{c.accent}</em></Link></h2><p>{c.lead}</p><Link className="buy-text-action" href={path(id,locale)}>{ui.explore}<CircleArrow /></Link></div>
      </article>;
    })}</div>
    <section className="estate-collection__contact" id="poptavka"><div className="wrap"><figure><img src="/media/about-zuzana.webp" alt="Bc. Zuzana Bajgerová" width="1000" height="1250" loading="lazy" /></figure><div><h2>{ui.enquiry}</h2><p>{ui.guaranteeText}</p><span className="svc-signature">Zuzana Bajgerová</span><div className="buy-actions"><Link className="buy-button" href={path('kontakt',locale)}>{ui.enquiry}<CircleArrow /></Link><a className="buy-text-action" href={waLink()} target="_blank" rel="noopener noreferrer">{ui.whatsapp}<CircleArrow /></a></div></div></div></section>
  </main></ServiceMotion>;
}
