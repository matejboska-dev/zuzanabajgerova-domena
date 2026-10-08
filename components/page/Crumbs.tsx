import Link from 'next/link';

export type Crumb = { name: string; href: string };

// viditelna drobeckova navigace. stejna data jdou do BreadcrumbList (lib/schema.ts).
export default function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="pd-crumbs wrap" aria-label="Drobečková navigace">
      <Link href="/">Domů</Link>
      {items.map((c, i) => (
        <span key={c.href}>
          <span aria-hidden="true"> / </span>
          {i === items.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
        </span>
      ))}
    </nav>
  );
}
