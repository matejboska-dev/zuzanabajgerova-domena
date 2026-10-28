
import { localized } from '@/lib/localize';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { fmtEur, fmtCzk, photoUrls, thumbUrl } from '@/lib/types';
import { PROPERTY_UI, STATUS_LABEL_L, fmtEurL, localizedTitle } from '@/lib/property-i18n';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { propertySlug } from '@/lib/slug';
import CardImage from './CardImage';

const STATUS_TAG: Record<string, string> = {
  rezervováno: 'tag--reserved',
  prodáno: 'tag--sold',
  neaktivní: 'tag--inactive',
};

function PropertyCard({
  p,
  locale = DEFAULT_LOCALE,
  priority,
}: {
  p: Property;
  locale?: Locale;
  priority?: boolean;
}) {
  const ui = PROPERTY_UI[locale];
  const title = localizedTitle(p, locale);
  const first = photoUrls(p)[0];
  const cover = first ? thumbUrl(first) : '';
  const tagCls = STATUS_TAG[p.status];
  const specs = [
    p.disposition ? p.disposition.replace(locale === 'cs' ? /$^/ : / a více/, locale === 'cs' ? '' : '+') : p.disposition,
    p.area_usable_m2 ? `${p.area_usable_m2} m²` : null,
    p.locality?.provincie,
  ].filter(Boolean) as string[];

  return (
    <Link href={path('nemovitost', locale, propertySlug(p))} className="card">
      <div className="card__ph">
        {cover && <CardImage src={cover} alternatives={photoUrls(p).slice(0, 3)} alt={locale === 'cs' ? p.alt_text || p.title : title} priority={priority} emptyLabel={{ cs: 'Fotografie vám zašlu na vyžádání', en: 'Photos available on request', it: 'Foto disponibili su richiesta' }[locale]} />}
        {tagCls ? (
          <span className={`tag ${tagCls} card__tag`}>{STATUS_LABEL_L[locale][p.status]}</span>
        ) : p.featured ? (
          <span className="tag card__tag">{ui.recommended}</span>
        ) : (
          <span className="tag tag--exclusive card__tag">{ui.exclusive}</span>
        )}
        {p.energy_label && (
          <span className="card__energy" title={ui.energy}>
            {p.energy_label}
          </span>
        )}
      </div>
      <div className="card__body">
        <div className="card__price">
          {locale === 'cs' ? fmtEur(p.price_eur) : fmtEurL(p.price_eur, locale)}
          {locale === 'cs' && p.price_czk != null && <span className="card__price-czk">{fmtCzk(p.price_czk)}</span>}
        </div>
        <div className="card__title">{title}</div>
        <div className="card__loc">
          {[p.locality?.obec, p.locality?.region].filter(Boolean).join(', ')}
        </div>
        <div className="card__specs">
          {specs.map((x) => (
            <span className="chip" key={x}>
              {x}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default localized(PropertyCard);
