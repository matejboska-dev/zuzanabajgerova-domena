import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE } from '@/lib/i18n';

// Vychozi jazyk (cs) jede bez prefixu, ale v app/ je vsechno pod [locale].
// Middleware to spojuje: '/nemovitosti' se interne prepise na '/cs/nemovitosti',
// zatimco v prohlizeci zustane ciste '/nemovitosti'.

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /cs/... nema existovat — jinak by kazda stranka byla na dvou adresach
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  // /en/... a /it/... uz odpovidaji strukture slozek
  // vychozi locale (cs) bez prefixu resi rewrites() v next.config.mjs —
  // rewrite z middlewaru na Netlify nespolehlive trefoval prerenderovane stranky
  return NextResponse.next();
}

export const config = {
  // mimo: /api, interni soubory Nextu, stara adresa detailu z dema (/nemovitost/<id>,
  // ta zije mimo [locale] a jen presmerovava) a cokoli s priponou (sitemap.xml, robots.txt, fotky)
  matcher: ['/((?!api|_next|nemovitost/|.*\\..*).*)'],
};
