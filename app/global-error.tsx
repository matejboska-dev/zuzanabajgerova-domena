'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="cs">
      <body>
        <main style={{ padding: '3rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Něco se pokazilo</h1>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>Omlouváme se, došlo k neočekávané chybě.</p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#1b2a4a',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Zkusit znovu
          </button>
        </main>
      </body>
    </html>
  );
}
