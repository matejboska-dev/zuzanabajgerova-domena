// zastupny box pro chybejici foto / video. drzi misto i pomer stran finalniho
// materialu, aby se rozlozeni stranky pozdeji nerozbilo.
// VSECHNY zastupne boxy najdes jednim hledanim: data-zastupny="true".
// (plati i pro znacky [DOPLNIT: ...] a [OVERIT: ...], viz Marked.tsx)

type Kind = 'foto' | 'video' | 'recenze';

const KIND_LABEL: Record<Kind, string> = { foto: 'fotka', video: 'video', recenze: 'recenze' };

export default function Zastupny({
  label,
  kind = 'foto',
  ratio = '4 / 3',
  who = 'klientka',
  spec,
  className,
}: {
  /** co presne tam patri */
  label: string;
  kind?: Kind;
  /** css aspect-ratio finalniho materialu, napr. "16 / 9" */
  ratio?: string;
  /** kdo material dodá */
  who?: string;
  /** doporučené rozměry nebo poměr stran, napr. "1600 × 1200 px (4:3)" */
  spec: string;
  className?: string;
}) {
  return (
    <figure
      className={`zastupny${className ? ` ${className}` : ''}`}
      data-zastupny="true"
      data-kind={kind}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Zástupný box (${KIND_LABEL[kind]}): ${label}`}
    >
      <figcaption className="zastupny__cap">
        <span className="zastupny__tag">Zástupný box · {KIND_LABEL[kind]}</span>
        <span className="zastupny__label">{label}</span>
        <span className="zastupny__meta">
          Dodá: {who} · {spec}
        </span>
      </figcaption>
    </figure>
  );
}
