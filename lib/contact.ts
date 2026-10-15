// jedno misto pro kontaktni udaje. nikde v komponentach nepsat cislo ani e-mail natvrdo.

export const PHONE_DISPLAY = '+420 723 824 348';
export const PHONE_TEL = 'tel:+420723824348';
export const WA_NUMBER = '420723824348';
export const EMAIL = 'zuzana.bajgerova@re-max.cz';

export const OFFICE = {
  name: 'RE/MAX Černá perla',
  street: 'Slavíkova 6068/18',
  city: 'Ostrava-Poruba',
  zip: '708 00',
  country: 'CZ',
} as const;

export const OFFICE_ONE_LINE = `${OFFICE.name}, ${OFFICE.street}, ${OFFICE.zip} ${OFFICE.city}`;

/** predvyplnena zprava pro WhatsApp (schvalena klientkou v design review) */
export const WA_DEFAULT_TEXT =
  'Dobrý den, mám vážný zájem o koupi nemovitosti v Abruzzu. Prosím, ozvěte se mi co nejdříve.';

/** wa.me odkaz s URL-enkodovanym UTF-8 textem (diakritika musi projit) */
export function waLink(text: string = WA_DEFAULT_TEXT): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** odkaz do map (otevre se v aplikaci nebo v prohlizeci) */
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${OFFICE.street}, ${OFFICE.zip} ${OFFICE.city}`,
)}`;

/** embed mapy se nacita az po kliknuti (GDPR, rychlost) */
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  `${OFFICE.street}, ${OFFICE.zip} ${OFFICE.city}`,
)}&output=embed`;

/** rozpoctove pasmo ve formularich. navrh, klientka muze upravit */
export const BUDGET_OPTIONS = [
  'Do 100 000 €',
  '100 000 až 150 000 €',
  '150 000 až 250 000 €',
  'Nad 250 000 €',
  'Zatím nevím',
];

export const PURPOSE_OPTIONS = [
  'Vlastní rekreace',
  'Investice a pronájem',
  'Trvalé bydlení',
  'Zatím nevím',
];

// User confirmed Zuzana operates the website as an entrepreneur (14 Oct 2026).
// Identity and registered address verified in ARES, IČO also matches her RE/MAX profile.
// https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/87491095
export const BUSINESS = {
  name: 'Bc. Zuzana Bajgerová',
  ico: '87491095',
  address: 'Karolíny Světlé 1363/16, Podlesí, 736 01 Havířov',
} as const;
