import Link from 'next/link';
import { path } from '@/lib/routes';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

// 404 uvnitr jazykove verze. Neprefixovane adresy se prepisuji na /cs/..., takze sem spadne
// i nezname URL bez jazykoveho prefixu. Nejcasteji jde o prodanou nebo stazenou nabidku.
export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nf__bg" src="/media/why-more.webp" alt="" aria-hidden="true" />
        <div className="nf__overlay" aria-hidden="true" />
        <div className="nf__body">
          <p className="nf__code">404</p>
          <h1 className="nf__h">
            Tahle stránka <em>už tu není</em>
          </h1>
          <p className="nf__p">
            Adresa neexistuje, nebo už neplatí. Pokud jste hledali konkrétní nemovitost, může být prodaná nebo stažená z
            nabídky. Podobné ale mám dál.
          </p>
          <div className="nf__cta">
            <Link href={path('nemovitosti', DEFAULT_LOCALE)} className="btn btn--saffron">
              Zobrazit nabídky
            </Link>
            <a href={waLink()} className="btn btn--glass" target="_blank" rel="noopener noreferrer">
              Napsat na WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
