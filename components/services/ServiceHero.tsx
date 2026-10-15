import type { Locale } from '@/lib/i18n';
import type { ServiceId } from '@/lib/routes';
import { SERVICE_COPY, SERVICE_UI } from '@/lib/services';
import { SERVICE_IMAGES, SERVICE_IMAGE_NOTE } from '@/lib/service-images';
import { CircleArrow, WhatsAppAction } from './ServiceInteractions';

export default function ServiceHero({ locale, service, breadcrumbs, cta }: {
  locale: Locale; service: ServiceId; breadcrumbs: React.ReactNode; cta: string;
}) {
  const c = SERVICE_COPY[locale][service], ui = SERVICE_UI[locale];
  const image = SERVICE_IMAGES[service];
  const title = locale === 'cs' ? { koupe: 'Koupě v Abruzzu', rekonstrukce: 'Rekonstrukce na klíč', sprava: 'Správa nemovitosti', pronajem: 'Pronájem v Abruzzu' }[service] : c.title;
  const accent = locale === 'cs' ? { koupe: 'V češtině. S oporou na místě.', rekonstrukce: 'Váš byt. Nový začátek.', sprava: 'Na místě, i když jste doma.', pronajem: 'O hosty se postaráme my.' }[service] : c.accent;
  return <section className={`estate-hero estate-hero--${service}`} id="service-hero" aria-labelledby="service-title">
    <div className="estate-hero__copy">
      {breadcrumbs}
      <h1 id="service-title">{title}<em>{accent}</em></h1>
      <p>{c.lead}</p>
      <div className="buy-actions"><a className="buy-button" href="#poptavka">{cta}<CircleArrow /></a><WhatsAppAction locale={locale} service={service} text={c.whatsapp} className="buy-text-action">{ui.whatsapp}<CircleArrow /></WhatsAppAction></div>
      <a className="estate-hero__down" href="#poznat">{ui.detail}<CircleArrow /></a>
    </div>
    <figure className="estate-hero__visual">
      <img data-estate-depth src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} fetchPriority="high" loading="eager" />
      <figcaption className="estate-hero__person"><img src="/services/curated/zuzana-office.webp" alt="" width="64" height="76" /><span><strong>Bc. Zuzana Bajgerová</strong><span>{ui.local}</span><span className="estate-hero__image-note">{SERVICE_IMAGE_NOTE[locale]}</span></span></figcaption>
    </figure>
  </section>;
}
