import type { Store, Submission } from "./types";
import { aggregate } from "./aggregate";

/**
 * Supabase (PostgREST) store. Server-side only: uses the SERVICE ROLE key,
 * which must never reach the browser. Tables are created by
 * supabase/schema.sql with Row Level Security enabled and NO public policies,
 * so the anon key cannot read or write anything.
 */

const URL = process.env.SUPABASE_URL!;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (KEY && (KEY.startsWith("sb_publishable_") || /"role":"anon"/.test(safeJwtPayload(KEY)))) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY must be the SECRET key (sb_secret_… or the legacy service_role JWT). A publishable/anon key cannot write behind RLS."
  );
}

function safeJwtPayload(k: string) {
  try {
    const p = k.split(".")[1];
    return p ? Buffer.from(p, "base64url").toString("utf8") : "";
  } catch {
    return "";
  }
}

/** New-style keys (sb_secret_…) go in `apikey` only; legacy JWT keys also need the Bearer header. */
function authHeaders(): Record<string, string> {
  return KEY.startsWith("sb_") ? { apikey: KEY } : { apikey: KEY, Authorization: `Bearer ${KEY}` };
}

async function rest<T = unknown>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<{ data: T; count: number | null }> {
  const res = await fetch(`${URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
      ...(init.prefer ? { Prefer: init.prefer } : {}),
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase ${init.method || "GET"} ${path}: ${res.status} ${await res.text()}`);
  const range = res.headers.get("content-range"); // "0-9/123"
  const count = range?.includes("/") ? Number(range.split("/")[1]) : null;
  const text = await res.text();
  return { data: (text ? JSON.parse(text) : null) as T, count: Number.isFinite(count as number) ? count : null };
}

const q = (v: string) => encodeURIComponent(v);

/**
 * Insert a row; if the table predates a newly added optional column (schema not yet
 * migrated), retry without those columns so tracking never breaks.
 */
async function insertWithFallback(table: string, row: Record<string, unknown>, optional: string[], prefer = "return=minimal") {
  try {
    return await rest<{ id: number }[]>(table, { method: "POST", prefer, body: JSON.stringify(row) });
  } catch (e) {
    const msg = String(e);
    if (!optional.some((c) => msg.includes(`'${c}'`) || msg.includes(`"${c}"`) || msg.includes(c))) throw e;
    const slim = { ...row };
    for (const c of optional) delete slim[c];
    return await rest<{ id: number }[]>(table, { method: "POST", prefer, body: JSON.stringify(slim) });
  }
}

export const supabaseStore: Store = {
  async track(input) {
    const now = Date.now();
    await rest("visitors", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=minimal",
      headers: { "on_conflict": "id" } as Record<string, string>,
      body: JSON.stringify({ id: input.visitorId, first_seen: now, last_seen: now }),
    }).catch(async () => {
      await rest(`visitors?id=eq.${q(input.visitorId)}`, { method: "PATCH", prefer: "return=minimal", body: JSON.stringify({ last_seen: now }) });
    });

    const { data: existing } = await rest<{ id: string }[]>(`sessions?id=eq.${q(input.sessionId)}&select=id`);
    if (!existing?.length) {
      await insertWithFallback(
        "sessions",
        { id: input.sessionId, visitor_id: input.visitorId, started: now, last_seen: now, path: input.path, device: input.device ?? null, country: input.country ?? null, city: input.city ?? null },
        ["city"]
      );
      const { data: v } = await rest<{ visits: number }[]>(`visitors?id=eq.${q(input.visitorId)}&select=visits`);
      await rest(`visitors?id=eq.${q(input.visitorId)}`, { method: "PATCH", prefer: "return=minimal", body: JSON.stringify({ visits: (v?.[0]?.visits ?? 0) + 1, last_seen: now }) });
    } else {
      await rest(`sessions?id=eq.${q(input.sessionId)}`, { method: "PATCH", prefer: "return=minimal", body: JSON.stringify({ last_seen: now, path: input.path }) });
    }

    if (input.kind === "pageview") {
      await insertWithFallback(
        "pageviews",
        { ts: now, visitor_id: input.visitorId, session_id: input.sessionId, path: input.path, referrer: input.referrer ?? null, ua: input.ua ?? null, device: input.device ?? null, country: input.country ?? null, city: input.city ?? null, screen_w: input.screenW ?? null },
        ["city"]
      );
    }
  },

  async addSubmission(s) {
    const { data } = await insertWithFallback(
      "submissions",
      { ts: Date.now(), type: s.type ?? null, idea: s.idea ?? null, name: s.name, company: s.company ?? null, email: s.email, budget: s.budget ?? null, country: s.country ?? null, source: s.source ?? null, contact: s.contact ?? null, status: "new" },
      ["contact"],
      "return=representation"
    );
    return data[0].id;
  },

  async listSubmissions(status) {
    const filter = status && status !== "all" ? `&status=eq.${q(status)}` : "";
    const { data } = await rest<Submission[]>(`submissions?select=*&order=ts.desc${filter}`);
    return data;
  },

  async updateSubmissionStatus(id, status) {
    await rest(`submissions?id=eq.${id}`, { method: "PATCH", prefer: "return=minimal", body: JSON.stringify({ status }) });
  },

  async deleteSubmission(id) {
    await rest(`submissions?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" });
  },

  async getStats(days) {
    const DAY = 86_400_000;
    const since = new Date();
    since.setHours(0, 0, 0, 0);
    const sinceTs = since.getTime() - (days - 1) * DAY;

    // `city` may not exist yet if schema.sql was not re-run; fall back to the older column set.
    const selectPv = (withCity: boolean) =>
      rest<Parameters<typeof aggregate>[0]["pageviews"]>(`pageviews?select=ts,visitor_id,session_id,path,referrer,device,country,ua,screen_w${withCity ? ",city" : ""}&ts=gte.${sinceTs}&order=ts.desc&limit=20000`);
    const selectSess = (withCity: boolean) =>
      rest<Parameters<typeof aggregate>[0]["sessions"]>(`sessions?select=id,visitor_id,started,last_seen,path,device,country${withCity ? ",city" : ""}&last_seen=gte.${Date.now() - DAY}&order=last_seen.desc&limit=5000`);
    const [pv, sessions, subs, visitors, pvTotal, sessTotal] = await Promise.all([
      selectPv(true).catch(() => selectPv(false)),
      selectSess(true).catch(() => selectSess(false)),
      rest<Parameters<typeof aggregate>[0]["submissions"]>(`submissions?select=*&order=ts.desc&limit=1000`),
      rest<unknown[]>(`visitors?select=id&limit=1`, { prefer: "count=exact" }),
      rest<unknown[]>(`pageviews?select=id&limit=1`, { prefer: "count=exact" }),
      rest<unknown[]>(`sessions?select=id&limit=1`, { prefer: "count=exact" }),
    ]);

    return aggregate({
      days,
      pageviews: pv.data,
      sessions: sessions.data,
      submissions: subs.data,
      totals: { visitors: visitors.count ?? 0, pageviews: pvTotal.count ?? 0, sessions: sessTotal.count ?? 0 },
    });
  },
};
