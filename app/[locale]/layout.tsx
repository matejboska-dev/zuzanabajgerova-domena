import { notFound } from 'next/navigation';
import { Playfair_Display, Archivo } from 'next/font/google';
import localFont from 'next/font/local';
import { HTML_LANG, LOCALES, isLocale } from '@/lib/i18n';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import '../globals.css';

// Archivo je hlavni rez (nadpisy, text). Playfair na patkove akcenty.
// Priestacy je elegantni kaligraficky podpisovy font pro logo/wordmark (navbar, footer).
const display = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const cursive = localFont({
  src: '../fonts/Priestacy.otf',
  variable: '--font-cursive',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={HTML_LANG[locale]} className={`${display.variable} ${body.variable} ${cursive.variable}`}>
      <body>
        <SiteNav locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
