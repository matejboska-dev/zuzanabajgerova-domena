'use client';

import { useEffect, useState } from 'react';
import { PHONE_TEL, waLink } from '@/lib/contact';

// Lepici lista pro mobil: po scrollnuti se objevi dve velka tlacitka (telefon, WhatsApp).
// Na desktopu se nezobrazuje (CSS).
export default function MobileCtaBar({ whatsAppText }: { whatsAppText?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll('#poptavka,#napsat,#rezervace,form.lf,.site-footer');
    const onScroll = () => {
      const contactVisible = Array.from(targets).some(target => {
        const rect = target.getBoundingClientRect();
        return rect.top < window.innerHeight - 60 && rect.bottom > 100;
      });
      setShow(window.scrollY > 520 && !contactVisible);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll);window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <>
      <div className="mcta-spacer" aria-hidden="true" />
      <div className={`mcta${show ? ' is-on' : ''}`} role="region" aria-label="Rychlý kontakt" inert={!show}>
        <a className="btn btn--cobalt" href={PHONE_TEL}>
          Zavolat
        </a>
        <a className="btn btn--saffron" href={waLink(whatsAppText)} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>
    </>
  );
}
