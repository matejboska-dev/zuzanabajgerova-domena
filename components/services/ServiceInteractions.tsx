'use client';

import { useEffect, useRef, useState } from 'react';
import { waLink } from '@/lib/contact';
import { trackEvent } from '@/lib/forms';
import type { Locale } from '@/lib/i18n';
import type { ServiceId } from '@/lib/routes';
import { SERVICE_UI } from '@/lib/services';

export function CircleArrow() {
  return <span className="svc-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
}

export function WhatsAppAction({ locale, service, text, className, children }: {
  locale: Locale; service: ServiceId; text: string; className?: string; children: React.ReactNode;
}) {
  return <a href={waLink(text)} className={className} target="_blank" rel="noopener noreferrer"
    onClick={() => trackEvent('whatsapp_click', { service, locale })}>{children}</a>;
}

export function BeforeAfter({ locale }: { locale: Locale }) {
  const ui = SERVICE_UI[locale];
  const [after, setAfter] = useState(false);
  return <div className="svc-transform">
    <div className="svc-transform__switch" role="group" aria-label={ui.beforeAfter}>
      <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>{ui.before}</button>
      <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>{ui.after}<CircleArrow /></button>
    </div>
    <figure>
      {/* Both images stay in the DOM: instant switch, fixed geometry and no misleading overlay comparison. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/reno-ostrava-pred.webp" alt={ui.before} loading="eager" width="720" height="1000" hidden={after} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/reno-ostrava-po.webp" alt={ui.after} loading="eager" width="720" height="1000" hidden={!after} />
      <figcaption aria-live="polite">{after ? ui.after : ui.before}</figcaption>
    </figure>
  </div>;
}

export function ServiceMobileActions({ locale, service, text }: { locale: Locale; service: ServiceId; text: string }) {
  const ui = SERVICE_UI[locale];
  const [visible, setVisible] = useState(false);
  const contactVisible = useRef(false);
  useEffect(() => {
    const hero = document.getElementById('service-hero');
    const contact = document.getElementById('poptavka');
    const update = () => setVisible(Boolean(hero && hero.getBoundingClientRect().bottom < 100 && !contactVisible.current));
    const observer = new IntersectionObserver(([entry]) => { contactVisible.current = entry.isIntersecting; update(); });
    if (contact) observer.observe(contact);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', update); };
  }, []);
  if (!visible) return null;
  return <nav className="svc-mobile-actions" aria-label={ui.enquiry}>
    <a className="btn btn--saffron" href="#poptavka">{ui.enquiry}</a>
    <WhatsAppAction locale={locale} service={service} text={text} className="svc-mobile-actions__wa">WhatsApp<CircleArrow /></WhatsAppAction>
  </nav>;
}
