import Link from 'next/link';
import type { Property } from '@/lib/types';
import { fmtEur, fmtCzk, photoUrls, thumbUrl, STATUS_LABEL } from '@/lib/types';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { propertySlug } from '@/lib/slug';
import CardImage from './CardImage';

const STATUS_TAG: Record<string, string> = {
  rezervováno: 'tag--reserved',
  prodáno: 'tag--sold',
  neaktivní: 'tag--inactive',
};

export default function PropertyCard({
  p,
  locale = DEFAULT_LOCALE,
  priority,
}: {
  p: Property;
  locale?: Locale;
  priority?: boolean;
}) {
  const first = photoUrls(p)[0];
  const cover = first ? thumbUrl(first) : '';
  const tagCls = STATUS_TAG[p.status];
  const specs = [
    p.disposition,
    p.area_usable_m2 ? `${p.area_usable_m2} m²` : null,
    p.locality?.provincie,
  ].filter(Boolean) as string[];

  return (
    <Link href={path('nemovitost', locale, propertySlug(p))} className="card">
      <div className="card__ph">
        {cover && <CardImage src={cover} alt={p.alt_text || p.title} priority={priority} />}
        {tagCls ? (
          <span className={`tag ${tagCls} card__tag`}>{STATUS_LABEL[p.status]}</span>
        ) : p.featured ? (
          <span className="tag card__tag">Doporučujeme</span>
        ) : (
          <span className="tag tag--exclusive card__tag">Exkluzivně</span>
        )}
        {p.energy_label && (
          <span className="card__energy" title="Energetická třída">
            {p.energy_label}
          </span>
        )}
      </div>
      <div className="card__body">
        <div className="card__price">
          {fmtEur(p.price_eur)}
          {p.price_czk != null && <span className="card__price-czk">{fmtCzk(p.price_czk)}</span>}
        </div>
        <div className="card__title">{p.title}</div>
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
