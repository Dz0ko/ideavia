import { NextRequest, NextResponse } from "next/server";
import { store, SUBMISSION_STATUSES, type SubmissionStatus } from "@/lib/store";
import { readJson, sameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

/** Admin only (enforced by middleware session check). */
export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") || "all";
  if (status !== "all" && !SUBMISSION_STATUSES.includes(status as SubmissionStatus)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const s = await store();
  return NextResponse.json({ items: await s.listSubmissions(status), statuses: SUBMISSION_STATUSES }, { headers: NO_STORE });
}

export async function PATCH(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  const b = await readJson<{ id?: unknown; status?: unknown }>(req, 1_000);
  const id = Number(b?.id);
  const status = String(b?.status ?? "");
  if (!Number.isInteger(id) || id <= 0 || !SUBMISSION_STATUSES.includes(status as SubmissionStatus)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const s = await store();
  await s.updateSubmissionStatus(id, status as SubmissionStatus);
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}

export async function DELETE(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ ok: false }, { status: 400 });
  const s = await store();
  await s.deleteSubmission(id);
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
