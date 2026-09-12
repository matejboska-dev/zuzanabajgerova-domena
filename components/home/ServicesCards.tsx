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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt=""
              className="service-card__bg"
              loading="lazy"
              decoding="async"
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
