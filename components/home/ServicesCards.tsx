import Link from 'next/link';
import { SERVICES_CARDS } from '@/lib/home';
import { path, SERVICE_IDS } from '@/lib/routes';
import { SERVICE_COPY, SERVICE_UI } from '@/lib/services';
import type { Locale } from '@/lib/i18n';

export default function ServicesCards({ locale = 'cs' }: { locale?: Locale }) {
  return (
    <section className="services-section" aria-label={`${SERVICE_UI[locale].services}: Bc. Zuzana Bajgerová`}>
      <div className="services-grid">
        {SERVICES_CARDS.map((service, i) => (
          <Link
            key={service.title}
            href={path(SERVICE_IDS[i], locale)}
            className="service-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt=""
              className="service-card__bg"
              loading="lazy"
              decoding="async"
              width="960"
              height="1200"
            />
            <div className="service-card__overlay" aria-hidden="true" />

            <div className="service-card__content">
              <h3 className="service-card__title">{SERVICE_COPY[locale][SERVICE_IDS[i]].label}</h3>
              <p className="service-card__lead">{locale === 'cs' ? service.lead : SERVICE_COPY[locale][SERVICE_IDS[i]].lead}</p>
            </div>
            <span className="service-card__arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
