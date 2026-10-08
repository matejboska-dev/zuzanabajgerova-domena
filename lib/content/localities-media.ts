// Fotky a videa k lokalitam z materialu klientky (Google Drive, public/media).
// Popisky jsou podle nazvu souboru a toho, co je na zaberu. Prazdny seznam = zastupne boxy.

export type LocMedia = { src: string; alt: string; label: string };
export type LocVideo = { src: string; poster: string; label: string; ratio: string };

export const LOC_MEDIA: Record<string, { photos: LocMedia[]; video?: LocVideo; quotes: string[] }> = {
  'pescara-a-pobrezi': {
    photos: [
      { src: '/media/lok-pescara-colle.webp', alt: 'Výhled z terasy v Montesilvano Colle na město a moře', label: 'Montesilvano Colle' },
      { src: '/media/lok-pescara-plaz.webp', alt: 'Pláž v Montesilvanu při západu slunce', label: 'Pláž v Montesilvanu' },
      { src: '/media/lok-pescara-garsonka.webp', alt: 'Garsonka s otevřeným oknem a výhledem na moře', label: 'Garsonka s výhledem na moře' },
      { src: '/media/why-letiste.webp', alt: 'Pobřeží a přístav u Pescary z letadla', label: 'Pobřeží u Pescary z letadla' },
    ],
    video: { src: '/media/prohlidka-colle.mp4', poster: '/media/prohlidka-colle.webp', label: 'Videoprohlídka nemovitosti v Montesilvano Colle', ratio: '16 / 9' },
    // recenze, ktere Montesilvano primo zminuji (lib/reviews.ts)
    quotes: ['René Cichý', 'Vladimír Penc'],
  },
  'teramo-a-sever': {
    photos: [
      { src: '/media/lok-teramo-bazen.webp', alt: 'Bazén a palmy v rezidenci Le Dune v Silvi Marina', label: 'Rezidence Le Dune, Silvi Marina' },
      { src: '/media/lok-teramo-zahrada.webp', alt: 'Zahrada bytu v rezidenci Le Dune', label: 'Byt se zahradou, Le Dune' },
      { src: '/media/lok-teramo-posilovna.webp', alt: 'Posilovna s výhledem na moře v rezidenci Le Dune', label: 'Posilovna s výhledem na moře' },
      { src: '/media/lok-teramo-scerne.webp', alt: 'Terasa restaurace u moře v Scerne di Pineto', label: 'Scerne di Pineto' },
    ],
    video: { src: '/media/prohlidka-vila-silvi.mp4', poster: '/media/prohlidka-vila-silvi.webp', label: 'Videoprohlídka vily v Silvi', ratio: '16 / 9' },
    quotes: [],
  },
  'costa-dei-trabocchi': { photos: [], quotes: [] },
  'gran-sasso-a-vnitrozemi': {
    photos: [{ src: '/media/why-scanno.webp', alt: 'Jezero Scanno obklopené horami ve vnitrozemí Abruzza', label: 'Jezero Scanno' }],
    quotes: [],
  },
};
