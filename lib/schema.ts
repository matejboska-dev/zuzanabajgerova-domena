// schema.org (JSON-LD) pro podstranky. Vsechno se sklada do jednoho @graph, agent ma
// stabilni @id, aby na nej ostatni uzly (Service, Person, FAQ) mohly odkazovat.
// NIC tu nevymyslet: jen fakta z PROJEKT-BAJGEROVA.md a z textu webu.

import { SITE_URL, absolute } from './routes';
import { EMAIL, OFFICE } from './contact';

export const AGENT_ID = `${SITE_URL}/#agent`;
export const PERSON_ID = `${SITE_URL}/#zuzana`;
export const SITE_ID = `${SITE_URL}/#website`;

const RE_MAX_PROFILE =
  'https://www.remax-czech.cz/reality/nemovitosti-maklere/12052/bc-zuzana-bajgerova/';
const INSTAGRAM = 'https://www.instagram.com/bc.zuzana_remax/';

export function agentNode() {
  return {
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': AGENT_ID,
    name: 'Bc. Zuzana Bajgerová',
    url: SITE_URL,
    image: absolute('/images/zuzana-bajgerova-portret.jpg'),
    description:
      'Realitní specialistka na nemovitosti v Itálii, region Abruzzo. Kompletní servis pro české a slovenské kupující, celý proces v češtině.',
    telephone: '+420723824348',
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE.street,
      addressLocality: OFFICE.city,
      postalCode: OFFICE.zip,
      addressCountry: OFFICE.country,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Abruzzo' },
      { '@type': 'Country', name: 'Itálie' },
    ],
    knowsLanguage: ['cs', 'it', 'en'],
    award: [
      'Platinum RE/MAX',
      'TOP 10 RE/MAX ČR (6. místo 2025)',
      'Hall of Fame RE/MAX',
      'Nejúspěšnější makléř měsíce RE/MAX ČR, 1. místo (červenec 2025)',
    ],
    parentOrganization: { '@type': 'Organization', name: OFFICE.name },
    sameAs: [RE_MAX_PROFILE, INSTAGRAM],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      reviewCount: '15',
    },
  };
}

export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Bc. Zuzana Bajgerová',
    jobTitle: 'Realitní specialistka na nemovitosti v Itálii',
    image: absolute('/images/zuzana-bajgerova-portret.jpg'),
    url: absolute('/o-mne'),
    worksFor: { '@type': 'Organization', name: OFFICE.name },
    knowsLanguage: ['cs', 'it', 'en'],
    knowsAbout: [
      'nemovitosti v Itálii',
      'region Abruzzo',
      'koupě nemovitosti cizincem v Itálii',
      'rekonstrukce a správa nemovitostí v Itálii',
    ],
    award: [
      'Platinum RE/MAX',
      'TOP 10 RE/MAX ČR (6. místo 2025)',
      'Hall of Fame RE/MAX',
      'Nejúspěšnější makléř měsíce RE/MAX ČR, 1. místo (červenec 2025)',
    ],
    sameAs: [RE_MAX_PROFILE, INSTAGRAM],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: 'Bc. Zuzana Bajgerová',
    inLanguage: 'cs',
    publisher: { '@id': AGENT_ID },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absolute(c.href),
    })),
  };
}

export function faqNode(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function webPageNode(opts: {
  type?: 'WebPage' | 'ContactPage' | 'AboutPage' | 'CollectionPage';
  path: string;
  name: string;
  description: string;
  image?: string;
  lang?: string;
}) {
  const url = absolute(opts.path);
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.lang ?? 'cs',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': AGENT_ID },
    ...(opts.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: absolute(opts.image) } } : {}),
  };
}

/** zabali uzly do jednoho dokumentu pro <script type="application/ld+json"> */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
