import { NextRequest, NextResponse } from 'next/server';
import config from '@/config';

const BASE_URL = `https://api.runpod.ai/v2/${config.runpod_id}`

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'No id provided' }, { status: 400 });
  }
  const response = await fetch(`${BASE_URL}/status/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.RUNPOD_API_TOKEN}`,
    }
  });
  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}