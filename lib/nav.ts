import { path, type RouteId } from './routes';
import type { Locale } from './i18n';

/**
 * Role stránek podle schváleného blueprintu a informační architektury (PROJEKT-BAJGEROVA.md 4.1):
 * - A: automatický obsah / akvizice
 * - V: vyhledávání / SEO
 * - K: konverze
 * - D: důvěra / reference
 * - T: technická / noindex
 */
export type RoleTag = 'A' | 'V' | 'K' | 'D' | 'T';

export type NavChild = {
  label: Record<Locale, string>;
  href: (locale: Locale) => string;
  roleTag?: RoleTag;
};

export type NavSection = {
  id: RouteId;
  label: Record<Locale, string>;
  roleTag?: RoleTag;
  href: (locale: Locale) => string;
  children: NavChild[];
};

/**
 * 6 hlavních větví informační architektury webu (pod kořenem DOMŮ /):
 * 1. NEMOVITOSTI [A]
 * 2. LOKALITY [V]
 * 3. JAK KOUPIT V ITÁLII [V]
 * 4. SLUŽBY [K]
 * 5. O MNĚ [D]
 * 6. KONTAKT [K]
 */
export const NAV_TREE: NavSection[] = [
  {
    id: 'nemovitosti',
    label: { cs: 'Nemovitosti', en: 'Properties', it: 'Immobili' },
    roleTag: 'A',
    href: (l) => path('nemovitosti', l),
    children: [
      {
        label: { cs: 'Detail nabídky (šablona)', en: 'Property detail', it: 'Dettaglio immobile' },
        roleTag: 'A',
        href: (l) => path('nemovitosti', l),
      },
      {
        label: { cs: 'Filtrované výpisy (6 ks)', en: 'Filtered listings (6)', it: 'Annunci filtrati (6)' },
        roleTag: 'V',
        href: (l) => `${path('nemovitosti', l)}#filtr`,
      },
      {
        label: { cs: 'Videoprohlídky', en: 'Video tours', it: 'Video tour' },
        roleTag: 'K',
        href: (l) => `${path('nemovitosti', l)}#videa`,
      },
      {
        label: { cs: 'Poptávka na míru', en: 'Custom inquiry', it: 'Richiesta su misura' },
        roleTag: 'K',
        href: (l) => path('konzultace', l),
      },
    ],
  },
  {
    id: 'lokality',
    label: { cs: 'Lokality', en: 'Locations', it: 'Località' },
    roleTag: 'V',
    href: (l) => path('lokality', l),
    children: [
      {
        label: { cs: 'Pescara a pobřeží', en: 'Pescara & coast', it: 'Pescara e costa' },
        roleTag: 'V',
        href: (l) => path('lokalita', l, 'pescara-a-pobrezi'),
      },
      {
        label: { cs: 'Costa dei Trabocchi', en: 'Costa dei Trabocchi', it: 'Costa dei Trabocchi' },
        roleTag: 'V',
        href: (l) => path('lokalita', l, 'costa-dei-trabocchi'),
      },
      {
        label: { cs: 'Teramo a sever', en: 'Teramo & north', it: 'Teramo e nord' },
        roleTag: 'V',
        href: (l) => path('lokalita', l, 'teramo-a-sever'),
      },
      {
        label: { cs: 'Gran Sasso a vnitrozemí', en: 'Gran Sasso & inland', it: 'Gran Sasso e entroterra' },
        roleTag: 'V',
        href: (l) => path('lokalita', l, 'gran-sasso-a-vnitrozemi'),
      },
    ],
  },
  {
    id: 'jakKoupit',
    label: { cs: 'Jak koupit v Itálii', en: 'How to buy in Italy', it: 'Come comprare in Italia' },
    roleTag: 'V',
    href: (l) => path('jakKoupit', l),
    children: [
      {
        label: { cs: 'Náklady a daně', en: 'Costs & taxes', it: 'Costi e imposte' },
        roleTag: 'V',
        href: (l) => `${path('jakKoupit', l)}#naklady`,
      },
      {
        label: { cs: 'Kalkulačka nákladů', en: 'Cost calculator', it: 'Calcolatore costi' },
        roleTag: 'K',
        href: (l) => `${path('jakKoupit', l)}#kalkulacka`,
      },
      {
        label: { cs: 'Codice fiscale pro Čechy', en: 'Codice fiscale for buyers', it: 'Codice fiscale per stranieri' },
        roleTag: 'V',
        href: (l) => `${path('jakKoupit', l)}#codice-fiscale`,
      },
      {
        label: { cs: 'Domy za 1 euro: pravda', en: '1-Euro houses: truth', it: 'Case a 1 euro: la verità' },
        roleTag: 'V',
        href: (l) => `${path('jakKoupit', l)}#domy-za-1-euro`,
      },
      {
        label: { cs: 'Cesta do Abruzza (lety)', en: 'Travel to Abruzzo (flights)', it: 'Voli per l’Abruzzo' },
        roleTag: 'V',
        href: (l) => `${path('jakKoupit', l)}#cesta`,
      },
      {
        label: { cs: 'Časté dotazy (FAQ)', en: 'FAQ', it: 'Domande frequenti' },
        roleTag: 'V',
        href: (l) => `${path('jakKoupit', l)}#faq`,
      },
      {
        label: { cs: 'Slovníček pojmů', en: 'Glossary of terms', it: 'Glossario immobiliare' },
        roleTag: 'V',
        href: (l) => `${path('jakKoupit', l)}#slovnicek`,
      },
      {
        label: { cs: 'Články (rozcestník)', en: 'Articles hub', it: 'Articoli' },
        roleTag: 'V',
        href: (l) => path('clanky', l),
      },
      {
        label: { cs: 'Detail článku (šablona)', en: 'Article detail template', it: 'Dettaglio articolo' },
        roleTag: 'V',
        href: (l) => path('clanky', l),
      },
      {
        label: { cs: 'Průvodce ke stažení', en: 'Download buyer’s guide', it: 'Guida scaricabile' },
        roleTag: 'K',
        href: (l) => `${path('jakKoupit', l)}#pruvodce`,
      },
    ],
  },
  {
    id: 'sluzby',
    label: { cs: 'Služby', en: 'Services', it: 'Servizi' },
    roleTag: 'K',
    href: (l) => path('sluzby', l),
    children: [
      {
        label: { cs: 'Servis při koupi A–Z', en: 'A–Z Purchase service', it: 'Servizio acquisto A–Z' },
        roleTag: 'K',
        href: (l) => `${path('sluzby', l)}#servis`,
      },
      {
        label: { cs: 'Rekonstrukce a vybavení', en: 'Renovation & furnishing', it: 'Ristrutturazione e arredo' },
        roleTag: 'K',
        href: (l) => `${path('sluzby', l)}#rekonstrukce`,
      },
      {
        label: { cs: 'Správa a pronájem', en: 'Property management & rental', it: 'Gestione e locazione' },
        roleTag: 'K',
        href: (l) => `${path('sluzby', l)}#sprava`,
      },
      {
        label: { cs: 'Investice do nemovitosti', en: 'Real estate investment', it: 'Investimenti immobiliari' },
        roleTag: 'K',
        href: (l) => `${path('sluzby', l)}#investice`,
      },
    ],
  },
  {
    id: 'oMne',
    label: { cs: 'O mně', en: 'About me', it: 'Chi sono' },
    roleTag: 'D',
    href: (l) => path('oMne', l),
    children: [
      {
        label: { cs: 'Reference', en: 'Testimonials', it: 'Testimonianze' },
        roleTag: 'D',
        href: (l) => path('reference', l),
      },
      {
        label: { cs: 'Případová studie (šablona)', en: 'Case study template', it: 'Casi studio' },
        roleTag: 'D',
        href: (l) => `${path('reference', l)}#pripadova-studie`,
      },
    ],
  },
  {
    id: 'kontakt',
    label: { cs: 'Kontakt', en: 'Contact', it: 'Contatti' },
    roleTag: 'K',
    href: (l) => path('kontakt', l),
    children: [
      {
        label: { cs: 'Rezervace hovoru', en: 'Book a call', it: 'Prenota una chiamata' },
        roleTag: 'K',
        href: (l) => path('konzultace', l),
      },
      {
        label: { cs: 'Děkujeme (bez indexace)', en: 'Thank you (noindex)', it: 'Grazie (noindex)' },
        roleTag: 'T',
        href: (l) => path('dekujeme', l),
      },
    ],
  },
];

export const HEADER_NAV = NAV_TREE;

export type MegaLink = { label: string; href: string; roleTag?: RoleTag };
export type MegaCol = { title: string; href: string; roleTag?: RoleTag; links: MegaLink[] };

export function megaMenu(locale: Locale): MegaCol[] {
  return NAV_TREE.map((s) => ({
    title: s.label[locale],
    href: s.href(locale),
    roleTag: s.roleTag,
    links: s.children.map((c) => ({
      label: c.label[locale],
      href: c.href(locale),
      roleTag: c.roleTag,
    })),
  }));
}
