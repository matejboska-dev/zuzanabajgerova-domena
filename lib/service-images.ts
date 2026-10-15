import type { Locale } from './i18n';
import type { ServiceId } from './routes';

// The same illustrative images identify services on the homepage and service pages.
// These existing AI images do not depict actual client projects or a verified location.
export const SERVICE_IMAGES: Record<ServiceId, {
  src: string; width: number; height: number; alt: Record<Locale, string>;
}> = {
  koupe: {
    src: '/services/koupe-editorial.jpg', width: 960, height: 1200,
    alt: { cs: 'Ilustrační fotografie: dohoda při koupi domu u moře', en: 'Illustrative image: agreeing a home purchase by the sea', it: 'Immagine illustrativa: accordo per l’acquisto di una casa al mare' },
  },
  rekonstrukce: {
    src: '/services/rekonstrukce-editorial.jpg', width: 960, height: 1200,
    alt: { cs: 'Ilustrační fotografie: plán rekonstrukce a výběr materiálů', en: 'Illustrative image: renovation plans and material selection', it: 'Immagine illustrativa: progetto di ristrutturazione e scelta dei materiali' },
  },
  sprava: {
    src: '/services/sprava-editorial.jpg', width: 960, height: 1200,
    alt: { cs: 'Ilustrační fotografie: klíče a péče o nemovitost', en: 'Illustrative image: keys and property care', it: 'Immagine illustrativa: chiavi e cura dell’immobile' },
  },
  pronajem: {
    src: '/services/pronajem-editorial.jpg', width: 960, height: 1200,
    alt: { cs: 'Ilustrační fotografie: příprava apartmánu a klíčů pro hosty', en: 'Illustrative image: preparing an apartment and keys for guests', it: 'Immagine illustrativa: preparazione dell’appartamento e delle chiavi per gli ospiti' },
  },
};

export const SERVICE_IMAGE_NOTE = {
  cs: 'Ilustrační fotografie služby',
  en: 'Illustrative service photograph',
  it: 'Fotografia illustrativa del servizio',
} as const;
