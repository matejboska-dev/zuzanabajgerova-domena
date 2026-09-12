import { spawn } from 'child_process';
import path from 'path';
import { SCRAPER_DIR } from '@/lib/data.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let running = false;

export async function POST(req: Request) {
  if (running) {
    return new Response('Scraper už běží, počkejte na dokončení.', { status: 409 });
  }
  running = true;

  const url = new URL(req.url);
  const args = [path.join(SCRAPER_DIR, 'scraper.py')];
  const limit = url.searchParams.get('limit');
  if (limit && /^\d+$/.test(limit)) args.push('--limit', limit);
  if (url.searchParams.get('images') && !['0', 'false', 'no'].includes(url.searchParams.get('images')!))
    args.push('--images');

  const py = process.env.PYTHON_BIN || (process.platform === 'win32' ? 'python' : 'python3');
  const proc = spawn(py, ['-u', ...args], {
    cwd: SCRAPER_DIR,
    env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
  });

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const enc = new TextEncoder();
      const push = (chunk: Buffer) => controller.enqueue(enc.encode(chunk.toString('utf8')));
      proc.stdout.on('data', push);
      proc.stderr.on('data', push);
      proc.on('error', (err) => {
        controller.enqueue(enc.encode(`\nCHYBA: nelze spustit "${py}" (${err.message})\n__EXIT__ 1\n`));
        running = false;
        controller.close();
      });
      proc.on('close', (code) => {
        controller.enqueue(enc.encode(`\n__EXIT__ ${code ?? 1}\n`));
        running = false;
        controller.close();
      });
    },
    cancel() {
      proc.kill();
      running = false;
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
