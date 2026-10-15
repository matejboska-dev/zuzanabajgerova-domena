'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languagePath, path, SERVICE_IDS, type RouteId } from '@/lib/routes';
import { NAV_TREE, megaMenu } from '@/lib/nav';
import { LOCALES, LOCALE_NAME, type Locale } from '@/lib/i18n';
import { SERVICE_IMAGES } from '@/lib/service-images';

function LanguageFlag({ locale }: { locale: Locale }) {
  if (locale === 'cs') return <svg viewBox="0 0 30 20" aria-hidden="true"><path fill="#fff" d="M0 0h30v20H0z" /><path fill="#d7141a" d="M0 10h30v10H0z" /><path fill="#11457e" d="m0 0 15 10L0 20z" /></svg>;
  if (locale === 'it') return <svg viewBox="0 0 30 20" aria-hidden="true"><path fill="#fff" d="M0 0h30v20H0z" /><path fill="#009246" d="M0 0h10v20H0z" /><path fill="#ce2b37" d="M20 0h10v20H20z" /></svg>;
  return <svg viewBox="0 0 60 30" aria-hidden="true"><path fill="#012169" d="M0 0h60v30H0z" /><path stroke="#fff" strokeWidth="6" d="m0 0 60 30M60 0 0 30" /><path fill="#c8102e" d="M0 0 26 13h-6L0 3zm60 0L34 13h6L60 3zM0 30l26-13h-6L0 27zm60 0L34 17h6l20 10z" /><path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" /><path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" /></svg>;
}

// Plovoucí pill header (DOMŮ + 6 větví: Nemovitosti, Lokality, Jak koupit v Itálii, Služby, O mně, Kontakt)
export default function SiteNav({ locale }: { locale: Locale }) {
  // Next rewrites /sluzby to /cs/sluzby on the server. Use the public path in both renders.
  const pathname = usePathname().replace(/^\/cs(?=\/|$)/, '') || '/';
  const isServicePage = SERVICE_IDS.some(id => pathname === path(id, locale));
  const ui = {
    cs: { home: 'domů', menu: 'Hlavní menu', pages: 'Rozcestník', cta: isServicePage ? 'Probrat můj záměr' : 'Nezávazná konzultace', close: 'Zavřít menu', open: 'Otevřít menu', all: 'Rozcestník webu' },
    en: { home: 'home', menu: 'Main navigation', pages: 'Explore', cta: 'Discuss my plans', close: 'Close menu', open: 'Open menu', all: 'Explore the website' },
    it: { home: 'home', menu: 'Menu principale', pages: 'Esplora', cta: 'Parliamo del progetto', close: 'Chiudi menu', open: 'Apri menu', all: 'Esplora il sito' },
  }[locale];
  const languageLabel = { cs: 'Výběr jazyka', en: 'Choose language', it: 'Scegli la lingua' }[locale];
  const contactHref = isServicePage ? '#poptavka' : path('konzultace', locale);
  const header = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as const;
  const dropdownMotion = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 8, x: '-50%', scale: reduceMotion ? 1 : 0.98 },
    animate: { opacity: 1, y: 0, x: '-50%', scale: 1 },
    exit: { opacity: 0, y: reduceMotion ? 0 : 5, x: '-50%', scale: reduceMotion ? 1 : 0.98 },
    transition: { duration: reduceMotion ? 0 : 0.22, ease: easeCurve },
  };
  const langMenuMotion = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 6, scale: reduceMotion ? 1 : 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: reduceMotion ? 0 : 4, scale: reduceMotion ? 1 : 0.96 },
    transition: { duration: reduceMotion ? 0 : 0.18, ease: easeCurve },
  };
  const megaMenuMotion = {
    initial: { opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: reduceMotion ? 0 : -6, scale: reduceMotion ? 1 : 0.99 },
    transition: { duration: reduceMotion ? 0 : 0.24, ease: easeCurve },
  };
  const mobileMenuMotion = {
    initial: { opacity: 0, y: reduceMotion ? 0 : -10, scale: reduceMotion ? 1 : 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 },
    transition: { duration: reduceMotion ? 0 : 0.22, ease: easeCurve },
  };
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<RouteId | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobile && !mega && !activeDropdown && !langOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { setMobile(false);setMega(false);setActiveDropdown(null);setLangOpen(false); }
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [mobile, mega, activeDropdown, langOpen]);

  // Zavřít menu při změně stránky nebo klávesou Esc
  useEffect(() => {
    setMega(false);
    setMobile(false);
    setActiveDropdown(null);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobile) header.current?.querySelector<HTMLButtonElement>('.sitehdr__burger')?.focus();
        else if (mega) header.current?.querySelector<HTMLButtonElement>('.sitehdr__pagesbtn')?.focus();
        setMega(false);
        setMobile(false);
        setActiveDropdown(null);
        setLangOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobile, mega]);

  const home = path('home', locale);
  const isActive = (href: string) =>
    href === home ? pathname === home : pathname === href || pathname.startsWith(href + '/');

  const cls = [
    'sitehdr',
    scrolled && 'is-scrolled',
    mega && 'is-mega',
    mobile && 'is-mobile',
  ]
    .filter(Boolean)
    .join(' ');

  const columns = megaMenu(locale);

  return (
    <header className={cls} ref={header}>
      <div className="sitehdr__pill">
        {/* DOMŮ [K] — wordmark */}
        <Link href={home} className="wordmark" aria-label={`Bc. Zuzana Bajgerová, ${ui.home}`}>
          Bajgerová<span className="wordmark__dot">.</span>
        </Link>

        {/* 6 hlavních větví IA */}
        <nav className="sitehdr__nav" aria-label={ui.menu}>
          {NAV_TREE.map((item) => {
            const itemHref = item.href(locale);
            const active = isActive(itemHref);
            const isOpen = activeDropdown === item.id;

            return (
              <div
                key={item.id}
                className="sitehdr__item"
                onMouseEnter={() => {
                  setMega(false);
                  setActiveDropdown(item.id);
                }}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => { setMega(false); setActiveDropdown(item.id); }}
                onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveDropdown(null); }}
              >
                <Link
                  href={itemHref}
                  className={`sitehdr__link ${active ? 'is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  aria-haspopup={item.children.length > 0 ? 'true' : undefined}
                  aria-expanded={isOpen}
                >
                  <span>{item.label[locale]}</span>
                  {item.children.length > 0 && (
                    <svg className="sitehdr__arrow" viewBox="0 0 10 6" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown při hoveru na položku */}
                <AnimatePresence>
                {isOpen && item.children.length > 0 && (
                  <motion.div {...dropdownMotion} key={item.id} className={`sitehdr__dropdown${item.id === 'sluzby' ? ' sitehdr__dropdown--services' : ''}`} aria-label={item.label[locale]}>
                    <div className="sitehdr__dropdown-head">
                      <span className="sitehdr__dropdown-title">{item.label[locale]}</span>
                    </div>
                    {item.children.map((child, index) => (
                      <Link
                        key={`${item.id}-${index}`}
                        href={child.href(locale)}
                        className="sitehdr__dropdown-link"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.id === 'sluzby' && SERVICE_IDS[index] && <img className="sitehdr__service-photo" src={SERVICE_IMAGES[SERVICE_IDS[index]].src} alt="" width="112" height="112" />}
                        <span className="sitehdr__dropdown-text">{child.label[locale]}</span>
                        {item.id === 'sluzby' && <svg className="sitehdr__service-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" /></svg>}
                      </Link>
                    ))}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            );
          })}

        </nav>

        <div className="sitehdr__actions">
          <div
            className={`sitehdr__languages${langOpen ? ' is-open' : ''}`}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setLangOpen(false); }}
          >
            <button
              type="button"
              className="sitehdr__lang-btn"
              aria-label={`${languageLabel}: ${LOCALE_NAME[locale]}`}
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <LanguageFlag locale={locale} />
              <span className="sitehdr__lang-code">{locale.toUpperCase()}</span>
              <svg className="sitehdr__lang-arrow" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul {...langMenuMotion} key="lang" className="sitehdr__lang-menu" aria-label={languageLabel}>
                  {LOCALES.map((l) => (
                    <li key={l}>
                      <Link
                        href={languagePath(pathname, l)}
                        lang={l}
                        hrefLang={l}
                        aria-current={l === locale ? 'true' : undefined}
                        onClick={() => setLangOpen(false)}
                      >
                        <LanguageFlag locale={l} />
                        <span>{LOCALE_NAME[l]}</span>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* CTA — Konverze */}
          <Link href={contactHref} className="btn btn--saffron sitehdr__cta">
            {ui.cta}
          </Link>

          <button
            type="button"
            className="sitehdr__burger"
            aria-label={mobile ? ui.close : ui.open}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Kompletní mega menu (Rozcestník) se všemi 6 větvemi */}
      <AnimatePresence>
      {mega && (
        <motion.div {...megaMenuMotion} key="mega" className="megamenu" role="region" aria-label={ui.all}>
          <div className="megamenu__header">
            <p className="megamenu__caption">{ui.all}</p>
          </div>

          <div className="megamenu__grid megamenu__grid--6">
            {columns.map((col) => (
              <div className="megamenu__col" key={col.title}>
                <Link href={col.href} className="megamenu__h-link">
                  <p className="megamenu__h">
                    <span>{col.title}</span>
                  </p>
                </Link>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="megamenu__link">
                        <span className="megamenu__link-text">{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Mobilní menu s kompletní 6větvovou strukturou */}
      <AnimatePresence>
      {mobile && (
        <motion.div {...mobileMenuMotion} key="mobile" className="mobilemenu" onClick={event => {if ((event.target as Element).closest('a')) setMobile(false);}}>
          {NAV_TREE.map((section) => (
            <div key={section.id} className="mobilemenu__section">
              <div className="mobilemenu__section-header">
                <Link
                  href={section.href(locale)}
                  className={`mobilemenu__section-link ${isActive(section.href(locale)) ? 'is-active' : ''}`}
                >
                  <span>{section.label[locale]}</span>
                </Link>
              </div>
              <ul className="mobilemenu__sublist">
                {section.children.map((child) => (
                  <li key={child.label[locale]}>
                    <Link href={child.href(locale)} className="mobilemenu__sublink">
                      <span>{child.label[locale]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link href={contactHref} className="btn btn--saffron" onClick={() => setMobile(false)}>
            {ui.cta}
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
