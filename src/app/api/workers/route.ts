import { NextResponse } from 'next/server';
import workersData from '/workers.json'  // adjust path as needed
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  try {
    // resolve to your repo data path
    const dataPath = path.join(process.cwd(), 'data', 'workers.json');
    const raw = await fs.promises.readFile(dataPath, 'utf-8');
    const workers = JSON.parse(raw);
    // Optionally support query params for server-side paging:
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || ${workers.length}, 10);

    // basic server-side pagination (optional)
    const start = (page - 1) * limit;
    const paged = workers.slice(start, start + limit);

    return NextResponse.json({
      success: true,
      total: workers.length,
      page,
      limit,
      data: paged
    });
  } catch (err) {
    console.error('API /api/workers error', err);
    return NextResponse.json({ success: false, message: 'Failed to load workers' }, { status: 500 });
  }
}


