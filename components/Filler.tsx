// vyplnova fotka. drzi misto a pomer stran, nez dorazi skutecne fotky.
// fotograficky smer (PROJEKT-BAJGEROVA.md 3.6): krajina, nemovitost, portret,
// zivot v regionu. az prijdou fotky, tahle komponenta se nahradi za <img>/<picture>
// s WebP ve trech velikostech (SCRAPER-SPEC.md cast C).

type Kind = 'krajina' | 'nemovitost' | 'portret' | 'zivot' | 'video' | 'dokument';

const KIND_LABEL: Record<Kind, string> = {
  krajina: 'Krajina',
  nemovitost: 'Nemovitost',
  portret: 'Portrét',
  zivot: 'Život v regionu',
  video: 'Video',
  dokument: 'Dokument',
};

export default function Filler({
  kind,
  label,
  ratio = '4 / 3',
  className,
}: {
  kind: Kind;
  /** k cemu presne fotka bude — napr. "Costa dei Trabocchi" nebo "Portrét, dodá klientka" */
  label?: string;
  /** css aspect-ratio, napr. "16 / 10" */
  ratio?: string;
  className?: string;
}) {
  return (
    <figure
      className={`filler${className ? ` ${className}` : ''}`}
      data-kind={kind}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label ? `Výplňová fotka: ${label}` : `Výplňová fotka: ${KIND_LABEL[kind]}`}
    >
      <figcaption className="filler__cap">
        <span className="filler__kind">{KIND_LABEL[kind]}</span>
        {label && <span className="filler__note">{label}</span>}
      </figcaption>
    </figure>
  );
}
