import Link from 'next/link';
import { BUSINESS } from '@/lib/contact';
import { FOOTER_NAV, MAIN_NAV, SEGMENTS, path } from '@/lib/routes';
import { LIVE_LOCALES, LOCALE_NAME, type Locale } from '@/lib/i18n';

const FOOTER_LABEL: Record<string, string> = {
  [SEGMENTS.ochranaUdaju]: 'Ochrana osobních údajů',
  [SEGMENTS.podminky]: 'Podmínky užití',
  [SEGMENTS.cookies]: 'Cookies',
  [SEGMENTS.mapaStranek]: 'Mapa stránek',
};

// skutecne profily doplni klientka. ikona se zobrazi az se skutecnym odkazem (zadne mrtve '#').
const SOCIAL = [
  { label: 'IG', href: 'https://www.instagram.com/bc.zuzana_remax/', title: 'Instagram @bc.zuzana_remax' },
  { label: 'YT', href: '#', title: 'YouTube' },
  { label: 'FB', href: '#', title: 'Facebook' },
];

export default function SiteFooter({ locale }: { locale: Locale }) {
  const ui = {
    cs: { intro: 'Realitní specialistka na nemovitosti v Itálii, region Abruzzo. Kompletní servis pro české a slovenské kupující, celý proces v češtině, od výběru přes notáře až po klíče.', sections: 'Sekce webu', contact: 'Kontakt', info: 'Informace', legal: 'Povinné stránky', privacy: 'Ochrana osobních údajů', terms: 'Podmínky užití', sitemap: 'Mapa stránek' },
    en: { intro: 'Personal support for property in Abruzzo, Italy. From choosing a home and coordinating the purchase to renovation, ongoing care and rental operations with a local team.', sections: 'Website sections', contact: 'Contact', info: 'Information', legal: 'Legal information', privacy: 'Privacy policy', terms: 'Terms of use', sitemap: 'Sitemap' },
    it: { intro: 'Supporto personale per gli immobili in Abruzzo. Dalla scelta della casa e dall’acquisto alla ristrutturazione, alla cura dell’immobile e agli affitti, con un team locale.', sections: 'Sezioni del sito', contact: 'Contatti', info: 'Informazioni', legal: 'Informazioni legali', privacy: 'Privacy', terms: 'Condizioni d’uso', sitemap: 'Mappa del sito' },
  }[locale];
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <p>
            {ui.intro}
          </p>
          {SOCIAL.some((s) => s.href !== '#') && (
          <div className="footer-socials">
            {SOCIAL.filter((s) => s.href !== '#').map((s) => (
              <a key={s.label} href={s.href} aria-label={s.title} title={s.title} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          )}
        </div>

        <div className="footer-cols">
          <nav aria-label={ui.sections}>
            <p className="footer-cols__h">Web</p>
            {MAIN_NAV.map((item) => (
              <Link key={item.id} href={path(item.id, locale)}>
                {item.label[locale]}
              </Link>
            ))}
          </nav>

          <address aria-label={ui.contact}>
            <p className="footer-cols__h">{ui.contact}</p>
            <a href="tel:+420723824348">+420 723 824 348</a>
            <a href="mailto:zuzana.bajgerova@re-max.cz">zuzana.bajgerova@re-max.cz</a>
            <span>RE/MAX Černá perla</span>
            <span>Slavíkova 6068/18, 708 00 Ostrava-Poruba</span>
          </address>

          <nav aria-label={ui.legal}>
            <p className="footer-cols__h">{ui.info}</p>
            {FOOTER_NAV.map((id) => (
              <Link key={id} href={path(id, locale)}>
                {id === 'ochranaUdaju' ? ui.privacy : id === 'podminky' ? ui.terms : id === 'mapaStranek' ? ui.sitemap : FOOTER_LABEL[SEGMENTS[id]] ?? id}
              </Link>
            ))}
            {LIVE_LOCALES.length > 1 && (
              <span className="footer-lang">
                {LIVE_LOCALES.map((l) => (
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
            )}
          </nav>
        </div>
      </div>

      <div className="footer-word" aria-hidden="true">
        Bajgerová<span className="wordmark__dot">.</span>
      </div>

      <div className="footer-legal">
        <span>© {new Date().getFullYear()} {BUSINESS.name}</span>
        <span>{{ cs: 'IČO', en: 'Business ID', it: 'ID impresa' }[locale]} {BUSINESS.ico}</span>
        <span>·</span>
        <span>Web: matejboska.cz</span>
      </div>
    </footer>
  );
}
