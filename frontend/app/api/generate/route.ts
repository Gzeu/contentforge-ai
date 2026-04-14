import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
feat: add frontend API route /api/generate  const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

  const res = await fetch(`${backendUrl}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.detail }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
