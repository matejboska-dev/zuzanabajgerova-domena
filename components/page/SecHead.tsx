
import { localized } from '@/lib/localize';
/** hlavicka sekce: odznak, nadpis s Playfair akcentem, perex. Stejny vzhled jako sekce na hlavni strane. */
function SecHead({
  id,
  title,
  accent,
  lead,
  left = false,
}: {
  id: string;
  badge?: string;
  title: string;
  accent?: string;
  lead?: React.ReactNode;
  left?: boolean;
}) {
  return (
    <div className={`sec__head${left ? ' sec__head--left' : ''}`}>
      <h2 id={id} className="home-h2">
        {title}
        {accent && (
          <>
            {' '}
            <em>{accent}</em>
          </>
        )}
      </h2>
      {lead && <p className="home-lead">{lead}</p>}
    </div>
  );
}

export default localized(SecHead);
