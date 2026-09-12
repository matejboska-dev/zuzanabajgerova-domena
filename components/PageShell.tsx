import LandscapeLine from './LandscapeLine';

/**
 * Kostra stranky. Vypise H1, samonosny odstavec pro AI Overview a seznam sekci
 * ze schvaleneho blueprintu (PROJEKT-BAJGEROVA.md sekce 5) v zavaznem poradi.
 *
 * Sekce, ktera uz je hotova, se preda jako `children` s klicem podle cisla;
 * zbytek se vykresli jako placeholder, aby bylo videt, co na strance jeste chybi.
 * Placeholdery se v produkci nezobrazuji (NEXT_PUBLIC_SHOW_BLUEPRINT=0).
 */
export default function PageShell({
  role,
  title,
  lead,
  sections,
  children,
}: {
  role: string;
  title: string;
  lead: string;
  sections: string[];
  children?: React.ReactNode;
}) {
  const showBlueprint = process.env.NEXT_PUBLIC_SHOW_BLUEPRINT !== '0';

  return (
    <main className="page">
      <div className="wrap">
        <p className="page__role">{role}</p>
        <h1 className="page__title">{title}</h1>
        <p className="page__lead">{lead}</p>
      </div>

      <LandscapeLine />

      {children}

      {showBlueprint && (
        <div className="wrap">
          <ol className="blueprint" aria-label="Sekce stránky podle schváleného blueprintu">
            {sections.map((s, i) => (
              <li key={s}>
                <span className="blueprint__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="blueprint__s">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}
