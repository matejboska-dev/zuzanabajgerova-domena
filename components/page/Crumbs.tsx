
import { localized } from '@/lib/localize';
import Link from 'next/link';

export type Crumb = { name: string; href: string };

// viditelna drobeckova navigace. stejna data jdou do BreadcrumbList (lib/schema.ts).
function Crumbs({ items, home = { name: 'Domů', href: '/' }, label = 'Drobečková navigace' }: { items: Crumb[]; home?: Crumb; label?: string }) {
  return (
    <nav className="pd-crumbs wrap" aria-label={label}>
      <Link href={home.href}>{home.name}</Link>
      {items.map((c, i) => (
        <span key={c.href}>
          <span aria-hidden="true"> / </span>
          {i === items.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
        </span>
      ))}
    </nav>
  );
}

export default localized(Crumbs);
