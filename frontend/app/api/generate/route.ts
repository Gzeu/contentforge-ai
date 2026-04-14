import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { topic, channel_info, platform, tone, length } = await req.json();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${backendUrl}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, channel_info, platform, tone, length }),
      signal: AbortSignal.timeout(55000),
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.detail || 'Backend error' }, { status: response.status });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
