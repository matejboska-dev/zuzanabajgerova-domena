'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Zalogovat chybu do konzole
    console.error('Došlo k chybě při vykreslení stránky:', error);
  }, [error]);

  return (
    <div className="wrap" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-display, serif)' }}>
        Něco se nepovedlo
      </h1>
      <p style={{ maxWidth: '540px', margin: '0 auto 2rem', color: '#555', lineHeight: 1.6 }}>
        Omlouváme se, při načítání stránky došlo k chybě. Zkuste to prosím znovu nebo se vraťte na úvodní stránku.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => reset()}
          className="btn btn--saffron"
          style={{ cursor: 'pointer', border: 'none' }}
        >
          Zkusit znovu
        </button>
        <Link href="/" className="btn btn--ghost">
          Zpět na úvodní stránku
        </Link>
      </div>
    </div>
  );
}
