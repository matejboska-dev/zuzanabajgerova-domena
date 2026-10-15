import type { Locale } from '@/lib/i18n';
import type { ServiceId } from '@/lib/routes';
import { SERVICE_COPY } from '@/lib/services';
import { CircleArrow } from './ServiceInteractions';

const IMAGES = {
  koupe: '/services/curated/home-shutters.webp',
  rekonstrukce: '/services/curated/renovation-fireplace.webp',
  sprava: '/services/curated/home-terrace.webp',
  pronajem: '/services/curated/rental-bedroom.webp',
};
const ALTS = {
  cs: { koupe: 'Modré okenice domu v Abruzzu', rekonstrukce: 'Detail krbu v dokončeném interiéru', sprava: 'Terasa s výhledem na moře', pronajem: 'Ložnice apartmánu připraveného pro pobyty' },
  en: { koupe: 'Blue shutters of a home in Abruzzo', rekonstrukce: 'Fireplace in a completed interior', sprava: 'Terrace overlooking the sea', pronajem: 'Bedroom prepared for holiday stays' },
  it: { koupe: 'Persiane azzurre di una casa in Abruzzo', rekonstrukce: 'Camino in un interno completato', sprava: 'Terrazza affacciata sul mare', pronajem: 'Camera da letto pronta per i soggiorni' },
};
export default function ServiceJourney({ locale, service, cta }: { locale: Locale; service: ServiceId; cta: string }) {
  const c = SERVICE_COPY[locale][service];
  return <section className="estate-journey buy-section" id="postup"><div className="wrap">
    <div className="buy-heading-row"><h2>{c.processTitle}</h2><a className="buy-text-action" href="#poptavka">{cta}<CircleArrow /></a></div>
    <div className="estate-journey__grid"><figure><img src={IMAGES[service]} alt={ALTS[locale][service]} width="1080" height="1440" loading="lazy" /></figure>
      <ol>{c.steps.map((step, i) => <li key={step.title}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><CircleArrow /></li>)}</ol>
    </div>
  </div></section>;
}
