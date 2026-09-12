import Link from 'next/link';
import { path } from '@/lib/routes';
import { DEFAULT_LOCALE } from '@/lib/i18n';

// 404 uvnitr jazykove verze. Middleware prepisuje vsechny neprefixovane adresy
// na /cs/..., takze sem spadne i nezname URL bez jazykoveho prefixu.
export default function NotFound() {
  return (
    <div className="pd-notfound">
      <h1>Stránka nenalezena</h1>
      <p>
        Tahle adresa neexistuje, nebo už neplatí. Pokud jste hledali konkrétní nemovitost, může být
        prodaná nebo stažená z nabídky. Podobné mám ale dál.
      </p>
      <Link href={path('nemovitosti', DEFAULT_LOCALE)} className="btn btn--saffron">
        Zobrazit nabídky
      </Link>
    </div>
  );
}
