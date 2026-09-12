'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScrapeButton({ limit = 12 }: { limit?: number }) {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const [logText, setLogText] = useState('');

  async function run() {
    setRunning(true);
    setOpen(true);
    setLogText('Spouštím scraper…\n');
    try {
      const res = await fetch(`/api/scrape?limit=${limit}`, { method: 'POST' });
      if (!res.ok || !res.body) {
        const msg = await res.text();
        setLogText((t) => t + '\n' + msg);
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      let code: number | null = null;
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const m = buf.match(/__EXIT__ (\d+)/);
        if (m) code = Number(m[1]);
        setLogText(buf.replace(/\r/g, '').replace(/\n?__EXIT__ \d+\n?/, '\n'));
      }
      if (code === 0) {
        setLogText((t) => t + '\n✔ Hotovo, načítám nová data…');
        router.refresh();
        setTimeout(() => setOpen(false), 1500);
      } else {
        setLogText((t) => t + `\n✖ Scraper skončil s chybou (kód ${code}). Data zůstala beze změny.`);
      }
    } catch (err) {
      setLogText((t) => t + '\nChyba spojení: ' + err);
    } finally {
      setRunning(false);
    }
  }

  return (
    <>
      <button className="btn btn--ghost" onClick={run} disabled={running}>
        <svg viewBox="0 0 24 24">
          <path d="M4 12a8 8 0 1 1 2.3 5.6" />
          <path d="M4 20v-4h4" />
        </svg>
        {running ? 'Načítám…' : 'Načíst nabídky z RE/MAXu'}
      </button>
      {open && (
        <div className="console">
          <h3>
            Scraper
            <span className="cx" onClick={() => setOpen(false)}>
              zavřít ✕
            </span>
          </h3>
          <pre>{logText}</pre>
        </div>
      )}
    </>
  );
}
