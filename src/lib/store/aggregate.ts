import type { Stats } from "./types";

const DAY = 86_400_000;
const startOfDay = (ts: number) => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

type PV = { ts: number; visitor_id: string; session_id: string; path: string; referrer: string | null; device: string | null; country: string | null };
type S = { id: string; visitor_id: string; started: number; last_seen: number; path: string; device: string | null; country: string | null };
type Sub = Record<string, unknown> & { ts: number; status: string; type: string | null };

/** Pure aggregation used by stores that cannot run the SQL in db.ts (e.g. PostgREST). */
export function aggregate(opts: {
  days: number;
  pageviews: PV[];          // within the window
  sessions: S[];            // all sessions (or at least recent)
  submissions: Sub[];       // all submissions
  totals: { visitors: number; pageviews: number; sessions: number };
}): Stats {
  const { days, pageviews, sessions, submissions, totals } = opts;
  const now = Date.now();
  const today = startOfDay(now);
  const activeWindow = now - 60_000;

  const activeSessions = sessions
    .filter((s) => s.last_seen > activeWindow)
    .sort((a, b) => b.last_seen - a.last_seen)
    .slice(0, 50)
    .map(({ id, path, started, last_seen, device, country }) => ({ id, path, started, last_seen, device, country }));

  const todayPv = pageviews.filter((p) => p.ts >= today);
  const count = <T>(arr: T[], key: (x: T) => string) => {
    const m = new Map<string, number>();
    for (const x of arr) m.set(key(x), (m.get(key(x)) ?? 0) + 1);
    return m;
  };

  const byDay = new Map<number, { views: number; visitors: Set<string> }>();
  for (const p of pageviews) {
    const k = startOfDay(p.ts);
    const cur = byDay.get(k) ?? { views: 0, visitors: new Set<string>() };
    cur.views++;
    cur.visitors.add(p.visitor_id);
    byDay.set(k, cur);
  }
  const series = Array.from({ length: days }, (_, i) => {
    const day = startOfDay(now - (days - 1 - i) * DAY);
    const b = byDay.get(day);
    return { day, views: b?.views ?? 0, visitors: b?.visitors.size ?? 0 };
  });

  const hourly: number[] = Array(24).fill(0);
  for (const p of todayPv) hourly[new Date(p.ts).getHours()]++;

  const topPages = Array.from(count(pageviews, (p) => p.path))
    .map(([path, views]) => ({ path, views, visitors: new Set(pageviews.filter((p) => p.path === path).map((p) => p.visitor_id)).size }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 12);
  const referrers = Array.from(count(pageviews, (p) => p.referrer || "(direct)"))
    .map(([referrer, views]) => ({ referrer, views })).sort((a, b) => b.views - a.views).slice(0, 10);
  const devices = Array.from(count(pageviews, (p) => p.device || "unknown"))
    .map(([device, views]) => ({ device, views })).sort((a, b) => b.views - a.views);
  const countries = Array.from(count(pageviews, (p) => p.country || "unknown"))
    .map(([country, views]) => ({ country, views })).sort((a, b) => b.views - a.views).slice(0, 10);
  const submissionTypes = Array.from(count(submissions, (s) => s.type || "unspecified"))
    .map(([type, c]) => ({ type, c })).sort((a, b) => b.c - a.c);

  const recentPageviews = [...pageviews].sort((a, b) => b.ts - a.ts).slice(0, 40)
    .map(({ ts, path, referrer, device, country, visitor_id }) => ({ ts, path, referrer, device, country, visitor_id }));
  const recentSubmissions = [...submissions].sort((a, b) => b.ts - a.ts).slice(0, 6);

  return {
    generatedAt: now,
    days,
    activeNow: activeSessions.length,
    activeSessions,
    totals: {
      visitors: totals.visitors,
      pageviews: totals.pageviews,
      sessions: totals.sessions,
      submissions: submissions.length,
      newSubmissions: submissions.filter((s) => s.status === "new").length,
    },
    today: {
      pageviews: todayPv.length,
      visitors: new Set(todayPv.map((p) => p.visitor_id)).size,
      sessions: sessions.filter((s) => s.started >= today).length,
      submissions: submissions.filter((s) => s.ts >= today).length,
    },
    series,
    hourly,
    topPages,
    referrers,
    devices,
    countries,
    recentPageviews,
    recentSubmissions,
    submissionTypes,
  };
}
