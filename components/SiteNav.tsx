'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { path, type RouteId } from '@/lib/routes';
import { NAV_TREE, megaMenu } from '@/lib/nav';
import { LOCALES, LOCALE_NAME, type Locale } from '@/lib/i18n';

// Plovoucí pill header (DOMŮ + 6 větví: Nemovitosti, Lokality, Jak koupit v Itálii, Služby, O mně, Kontakt)
export default function SiteNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<RouteId | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Zavřít menu při změně stránky nebo klávesou Esc
  useEffect(() => {
    setMega(false);
    setMobile(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(false);
        setMobile(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
    <header className={cls}>
      <div className="sitehdr__pill">
        {/* DOMŮ [K] — wordmark */}
        <Link href={home} className="wordmark" aria-label="Bc. Zuzana Bajgerová — domů">
          Bajgerová<span className="wordmark__dot">.</span>
        </Link>

        {/* 6 hlavních větví IA */}
        <nav className="sitehdr__nav" aria-label="Hlavní menu">
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
                {isOpen && item.children.length > 0 && (
                  <div className="sitehdr__dropdown" role="menu" aria-label={item.label[locale]}>
                    <div className="sitehdr__dropdown-head">
                      <span className="sitehdr__dropdown-title">{item.label[locale]}</span>
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.label[locale]}
                        href={child.href(locale)}
                        className="sitehdr__dropdown-link"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="sitehdr__dropdown-text">{child.label[locale]}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Tlačítko pro kompletní 6sloupcový rozcestník */}
          <button
            type="button"
            className="sitehdr__pagesbtn"
            aria-expanded={mega}
            aria-haspopup="true"
            onClick={() => {
              setActiveDropdown(null);
              setMega((v) => !v);
            }}
          >
            Rozcestník
            <svg viewBox="0 0 12 8" aria-hidden="true">
              <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </nav>

        {/* CTA — Konverze */}
        <Link href={path('konzultace', locale)} className="btn btn--saffron sitehdr__cta">
          Nezávazná konzultace
        </Link>

        <button
          type="button"
          className="sitehdr__burger"
          aria-label={mobile ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={mobile}
          onClick={() => setMobile((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Kompletní mega menu (Rozcestník) se všemi 6 větvemi */}
      {mega && (
        <div className="megamenu" role="region" aria-label="Rozcestník celé struktury webu">
          <div className="megamenu__header">
            <p className="megamenu__caption">Struktura webu · Informační architektura</p>
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
        </div>
      )}

      {/* Mobilní menu s kompletní 6větvovou strukturou */}
      {mobile && (
        <div className="mobilemenu">
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

          <hr className="mobilemenu__sep" />
          <div className="mobilemenu__lang">
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
          </div>
          <Link href={path('konzultace', locale)} className="btn btn--saffron">
            Nezávazná konzultace
          </Link>
        </div>
      )}
    </header>
  );
}
