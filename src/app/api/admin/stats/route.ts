import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Admin only (enforced by middleware session check). */
export async function GET(req: NextRequest) {
  const days = Math.min(90, Math.max(7, Number(req.nextUrl.searchParams.get("days")) || 30));
  const s = await store();
  return NextResponse.json(await s.getStats(days), { headers: { "Cache-Control": "no-store" } });
}
