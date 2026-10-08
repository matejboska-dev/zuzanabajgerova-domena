import { EMAIL, PHONE_DISPLAY, PHONE_TEL, waLink } from '@/lib/contact';

const ICON = {
  wa: 'M4 20l1.5-4A8 8 0 1 1 9 19z',
  tel: 'M4 4h5l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v5a2 2 0 0 1-2 2A17 17 0 0 1 2 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3z M3 7l9 6 9-6',
};

/** tri cesty ke mne: WhatsApp (nejrychlejsi), telefon, e-mail + info okenko od klientky */
export default function ChannelCards() {
  const items = [
    {
      icon: ICON.wa,
      title: 'WhatsApp',
      text: 'Nejrychlejší odpověď. Otevře se chat s předvyplněnou zprávou.',
      cta: 'Napsat na WhatsApp',
      href: waLink(),
      external: true,
      primary: true,
    },
    { icon: ICON.tel, title: 'Telefon', text: PHONE_DISPLAY, cta: 'Zavolat', href: PHONE_TEL },
    { icon: ICON.mail, title: 'E-mail', text: EMAIL, cta: 'Napsat e-mail', href: `mailto:${EMAIL}` },
  ];

  return (
    <div className="chan">
      <ul className="chan__list">
        {items.map((c) => (
          <li className="chan__item" key={c.title}>
            <span className="contact__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d={c.icon} />
              </svg>
            </span>
            <div className="chan__body">
              <h3 className="chan__t">{c.title}</h3>
              <p className="chan__d">{c.text}</p>
            </div>
            <a
              className={`btn ${c.primary ? 'btn--saffron' : 'btn--ghost'}`}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {c.cta}
            </a>
          </li>
        ))}
      </ul>
      <aside className="contact__note" aria-label="Jak mě nejlépe zastihnete">
        <p>
          Nejrychleji mě zastihnete přes WhatsApp. Pokud máte vážný zájem a nedovoláte se mi, zavolejte
          klidně znovu. Kvůli vysokému zájmu se mi občas stane, že mi číslo unikne, když zrovna telefonuji.
        </p>
      </aside>
    </div>
  );
}
