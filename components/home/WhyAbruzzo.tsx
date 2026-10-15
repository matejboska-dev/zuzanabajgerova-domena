'use client';

import { useState } from 'react';
import Link from 'next/link';
import { path } from '@/lib/routes';
import { WHY_ABRUZZO } from '@/lib/home';

const DEFAULT_IMAGE = {
  src: '/hero/backgrounds/abruzzo-montesilvano-colle.webp',
  alt: 'Výhled z Montesilvana na pobřeží Abruzza',
  caption: 'Montesilvano · tady žiji',
};

export default function WhyAbruzzo() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeCaption =
    activeIndex !== null ? WHY_ABRUZZO[activeIndex].caption : DEFAULT_IMAGE.caption;

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="sec why why-editorial" aria-labelledby="sec-08">
      <div className="wrap">
        <div className="sec__head">
          <h2 id="sec-08" className="home-h2">
            Moře. Hory. <em>Abruzzo.</em>
          </h2>
          <p className="home-lead">
            Místo, které znám z každodenního života. Vybereme lokalitu podle toho, jak tady chcete žít.
          </p>
        </div>

        <div className="why-editorial__layout">
          <figure className="why-editorial__photo">
            <div className="why-editorial__photo-stage">
              {/* Výchozí fotografie Montesilvano */}
              <img
                src={DEFAULT_IMAGE.src}
                alt={DEFAULT_IMAGE.alt}
                width={1920}
                height={1080}
                className={`why-editorial__img ${activeIndex === null ? 'is-active' : ''}`}
                loading="eager"
              />

              {/* Fotografie jednotlivých karet s plynulým prolínáním */}
              {WHY_ABRUZZO.map((item, idx) => (
                <img
                  key={item.title}
                  src={item.photo}
                  alt={item.photoAlt}
                  width={1400}
                  height={900}
                  className={`why-editorial__img ${activeIndex === idx ? 'is-active' : ''}`}
                  loading="lazy"
                />
              ))}
            </div>

            <figcaption className="why-editorial__caption">
              <span className="why-editorial__caption-dot" aria-hidden="true" />
              <span key={activeCaption} className="why-editorial__caption-text">
                {activeCaption}
              </span>
            </figcaption>
          </figure>

          <div className="why-editorial__notes">
            {WHY_ABRUZZO.map((item, i) => {
              const isOpen = activeIndex === i;
              return (
                <details
                  key={item.title}
                  className={`why-editorial__item ${isOpen ? 'is-open' : ''}`}
                  open
                >
                  <summary
                    className="why-editorial__summary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggle(i);
                    }}
                    aria-expanded={isOpen}
                  >
                    <h3>{item.title}</h3>
                    <span className="why-editorial__icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        className="why-editorial__icon-svg"
                      >
                        <line x1="8" y1="3" x2="8" y2="13" />
                        <line x1="3" y1="8" x2="13" y2="8" />
                      </svg>
                    </span>
                  </summary>
                  <div className="why-editorial__collapse" aria-hidden={!isOpen}>
                    <div className="why-editorial__content">
                      <p>{item.text}</p>
                    </div>
                  </div>
                </details>
              );
            })}

            <Link href={path('lokality', 'cs')} className="btn btn--cobalt">
              Poznat lokality v Abruzzu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
