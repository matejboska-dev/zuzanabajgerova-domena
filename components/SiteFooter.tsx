import Link from 'next/link';
import { FOOTER_NAV, MAIN_NAV, SEGMENTS, path } from '@/lib/routes';
import { LOCALES, LOCALE_NAME, type Locale } from '@/lib/i18n';

const FOOTER_LABEL: Record<string, string> = {
  [SEGMENTS.ochranaUdaju]: 'Ochrana osobních údajů',
  [SEGMENTS.cookies]: 'Cookies',
  [SEGMENTS.mapaStranek]: 'Mapa stránek',
};

// TODO: skutecne profily doplni klientka (Instagram pro vertikalni videa — funkce 05).
const SOCIAL = [
  { label: 'IG', href: '#', title: 'Instagram' },
  { label: 'YT', href: '#', title: 'YouTube' },
  { label: 'FB', href: '#', title: 'Facebook' },
];

export default function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <p>
            Realitní specialistka na nemovitosti v Itálii, region Abruzzo. Kompletní servis pro
            české a slovenské kupující, celý proces v češtině — od výběru přes notáře až po klíče.
          </p>
          <div className="footer-socials">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.title} title={s.title}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-cols">
          <nav aria-label="Sekce webu">
            <p className="footer-cols__h">Web</p>
            {MAIN_NAV.map((item) => (
              <Link key={item.id} href={path(item.id, locale)}>
                {item.label[locale]}
              </Link>
            ))}
          </nav>

          <address aria-label="Kontakt">
            <p className="footer-cols__h">Kontakt</p>
            <a href="tel:+420723824348">+420 723 824 348</a>
            <a href="mailto:zuzana.bajgerova@re-max.cz">zuzana.bajgerova@re-max.cz</a>
            <span>RE/MAX Černá perla</span>
            <span>Slavíkova 6068/18, 708 00 Ostrava-Poruba</span>
          </address>

          <nav aria-label="Povinné stránky">
            <p className="footer-cols__h">Informace</p>
            {FOOTER_NAV.map((id) => (
              <Link key={id} href={path(id, locale)}>
                {FOOTER_LABEL[SEGMENTS[id]] ?? id}
              </Link>
            ))}
            <span className="footer-lang">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={path('home', l)}
                  lang={l}
                  aria-current={l === locale ? 'true' : undefined}
                >
                  {LOCALE_NAME[l]}
                </Link>
              ))}
            </span>
          </nav>
        </div>
      </div>

      <div className="footer-word" aria-hidden="true">
        Bajgerová<span className="wordmark__dot">.</span>
      </div>

      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Bc. Zuzana Bajgerová</span>
        <span>·</span>
        <span>Web: matejboska.cz</span>
      </div>
    </footer>
  );
}
