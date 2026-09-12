import Link from 'next/link';
import { SERVICES_CARDS } from '@/lib/home';

export default function ServicesCards({ hrefServices }: { hrefServices: string }) {
  return (
    <section className="services-section" aria-label="Služby — Bc. Zuzana Bajgerová">
      <div className="services-grid">
        {SERVICES_CARDS.map((service) => (
          <Link
            key={service.title}
            href={`${hrefServices}${service.anchor}`}
            className="service-card"
          >
            <div
              className="service-card__bg"
              style={{ backgroundImage: `url("${service.image}")` }}
              aria-hidden="true"
            />
            <div className="service-card__overlay" aria-hidden="true" />

            <div className="service-card__content">
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__lead">{service.lead}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
