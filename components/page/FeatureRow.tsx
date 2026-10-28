
import { localized } from '@/lib/localize';
/** stridava sekce (text + media), stejne tridy jako ZigRow na hlavni strane (.zig) */
function FeatureRow({
  id,
  badge,
  title,
  accent,
  lead,
  media,
  flip = false,
  className,
  children,
}: {
  id: string;
  badge?: string;
  title: string;
  accent?: string;
  lead?: React.ReactNode;
  media: React.ReactNode;
  flip?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`zig${flip ? ' zig--flip' : ''}${className ? ` ${className}` : ''}`} aria-labelledby={`${id}-h`} id={id}>
      <div className="wrap zig__grid">
        <div className="zig__media">{media}</div>
        <div className="zig__text">
          {badge && (
            <div className="listings__badge">
              <span className="listings__badge-dot" />
              <span>{badge}</span>
            </div>
          )}
          <h2 id={`${id}-h`} className="home-h2">
            {title}
            {accent && (
              <>
                {' '}
                <em>{accent}</em>
              </>
            )}
          </h2>
          {lead && <p className="home-lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export default localized(FeatureRow);
