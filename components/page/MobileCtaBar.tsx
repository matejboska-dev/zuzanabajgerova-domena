'use client';

import { useEffect, useState } from 'react';
import { PHONE_TEL, waLink } from '@/lib/contact';

// Lepici lista pro mobil: po scrollnuti se objevi dve velka tlacitka (telefon, WhatsApp).
// Na desktopu se nezobrazuje (CSS).
export default function MobileCtaBar({ whatsAppText }: { whatsAppText?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="mcta-spacer" aria-hidden="true" />
      <div className={`mcta${show ? ' is-on' : ''}`} role="region" aria-label="Rychlý kontakt">
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
