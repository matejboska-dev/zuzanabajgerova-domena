import Link from 'next/link';
import { waLink } from '@/lib/contact';

/** zaverecne CTA: tmava karta s dvema cestami (hovor, WhatsApp). opakuje se po velkych sekcich. */
export default function CtaBand({
  id,
  title,
  accent,
  text,
  primary,
  whatsAppText,
}: {
  id: string;
  title: string;
  accent?: string;
  text: string;
  primary: { href: string; label: string };
  /** vlastni predvyplnena zprava, jinak vychozi */
  whatsAppText?: string;
}) {
  return (
    <section className="sec ctaband-sec" aria-labelledby={id}>
      <div className="wrap">
        <div className="ctaband">
          <div className="ctaband__text">
            <h2 id={id} className="ctaband__h">
              {title}
              {accent && (
                <>
                  {' '}
                  <em>{accent}</em>
                </>
              )}
            </h2>
            <p className="ctaband__p">{text}</p>
          </div>
          <div className="ctaband__actions">
            <Link href={primary.href} className="btn btn--saffron">
              {primary.label}
            </Link>
            <a
              href={waLink(whatsAppText)}
              className="btn btn--glass"
              target="_blank"
              rel="noopener noreferrer"
            >
              Napsat na WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
