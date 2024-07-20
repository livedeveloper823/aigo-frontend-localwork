import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit");
  const page = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const desc = url.searchParams.get("desc")

  try {
    const response = await fetch(`${process.env.API_BASE_URI}/api4/public/coins/list/v2?&limit=${limit}&page=${page}&sort=${sort}&desc=${desc}`, {
      headers: {
        'Authorization': `Bearer ${process.env.TOKEN!}`,
      },
      next: { revalidate: 5 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch coin data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return NextResponse.json({ error: 'Failed to fetch coin data' }, { status: 500 });
  }
}
