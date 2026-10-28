
import { localized } from '@/lib/localize';
/** odrazkovy seznam se safranovymi fajfkami (stejna ikona jako v sekci ceny na hlavni strane) */
function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((x) => (
        <li key={x}>
          <span className="pricecol__icon pricecol__icon--check" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5l3 3 6-6" />
            </svg>
          </span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export default localized(CheckList);
