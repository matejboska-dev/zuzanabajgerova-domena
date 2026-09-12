'use client';

// Fotka na karte. Vlastni klientska komponenta jen kvuli onError: galerie RE/MAXu
// obcas odkazuje na smazane soubory (viz SCRAPER-SPEC.md, cast A) a rozbity obrazek
// vypada hur nez zadny. Diky tomu muze zbytek karty zustat server komponenta.

export default function CardImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
