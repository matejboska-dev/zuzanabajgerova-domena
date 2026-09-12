import { readDataset } from '@/lib/data.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const ds = await readDataset();
  return Response.json(ds ?? { properties: [], count: 0 }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
