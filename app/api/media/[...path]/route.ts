import { promises as fs } from 'fs';
import path from 'path';
import { SCRAPER_DIR } from '@/lib/data.server';

export const runtime = 'nodejs';

const IMG_ROOT = path.join(SCRAPER_DIR, 'data', 'images');
const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const rel = path.normalize(parts.join('/'));
  const full = path.join(IMG_ROOT, rel);

  // zadny path traversal mimo data/images/
  if (!full.startsWith(IMG_ROOT)) return new Response('nope', { status: 403 });

  try {
    const buf = await fs.readFile(full);
    return new Response(new Uint8Array(buf), {
      headers: {
        'Content-Type': MIME[path.extname(full).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response('not found', { status: 404 });
  }
}
