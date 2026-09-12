import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="cs">
      <body>
        <main style={{ padding: '3rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 — Stránka nenalezena</h1>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>Požadovaná stránka neexistuje nebo byla přesunuta.</p>
          <Link href="/" style={{ color: '#1b2a4a', textDecoration: 'underline' }}>
            Zpět na úvodní stránku
          </Link>
        </main>
      </body>
    </html>
  );
}
