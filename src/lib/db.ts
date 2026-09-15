import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

/**
 * SQLite storage for analytics + contact submissions.
 * The DB file lives in ./data/idevia.db (git-ignored).
 * Set IDAEVIA_DB_PATH to relocate it.
 */

declare global {
  // eslint-disable-next-line no-var
  var __ideviaDb: Database.Database | undefined;
}

function open() {
  const file =
    process.env.IDAEVIA_DB_PATH ||
    path.join(process.cwd(), "data", "idevia.db");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id TEXT PRIMARY KEY,
      first_seen INTEGER NOT NULL,
      last_seen INTEGER NOT NULL,
      visits INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      visitor_id TEXT NOT NULL,
      started INTEGER NOT NULL,
      last_seen INTEGER NOT NULL,
      path TEXT NOT NULL,
      device TEXT,
      country TEXT
    );
    CREATE TABLE IF NOT EXISTS pageviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts INTEGER NOT NULL,
      visitor_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT,
      ua TEXT,
      device TEXT,
      country TEXT,
      screen_w INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_pageviews_ts ON pageviews(ts);
    CREATE INDEX IF NOT EXISTS idx_sessions_last ON sessions(last_seen);
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts INTEGER NOT NULL,
      type TEXT,
      idea TEXT,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      budget TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      country TEXT
    );
  `);
  // additive migration: submissions.source
  const cols = db.prepare(`PRAGMA table_info(submissions)`).all() as { name: string }[];
  if (!cols.some((c) => c.name === "source")) db.exec(`ALTER TABLE submissions ADD COLUMN source TEXT`);
  return db;
}

export function db() {
  if (!global.__ideviaDb) global.__ideviaDb = open();
  return global.__ideviaDb;
}

/* ------------------------------------------------------------------ */
/* Tracking                                                            */
/* ------------------------------------------------------------------ */

export type TrackInput = {
  visitorId: string;
  sessionId: string;
  path: string;
  referrer?: string | null;
  ua?: string | null;
  device?: string | null;
  country?: string | null;
  screenW?: number | null;
  kind: "pageview" | "heartbeat";
};

export function track(input: TrackInput) {
  const d = db();
  const now = Date.now();
  const tx = d.transaction(() => {
    d.prepare(
      `INSERT INTO visitors (id, first_seen, last_seen, visits) VALUES (?, ?, ?, 0)
       ON CONFLICT(id) DO UPDATE SET last_seen = excluded.last_seen`
    ).run(input.visitorId, now, now);

    const session = d
      .prepare(`SELECT id FROM sessions WHERE id = ?`)
      .get(input.sessionId);

    if (!session) {
      d.prepare(
        `INSERT INTO sessions (id, visitor_id, started, last_seen, path, device, country)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).run(
        input.sessionId,
        input.visitorId,
        now,
        now,
        input.path,
        input.device ?? null,
        input.country ?? null
      );
      d.prepare(`UPDATE visitors SET visits = visits + 1 WHERE id = ?`).run(
        input.visitorId
      );
    } else {
      d.prepare(
        `UPDATE sessions SET last_seen = ?, path = ? WHERE id = ?`
      ).run(now, input.path, input.sessionId);
    }

    if (input.kind === "pageview") {
      d.prepare(
        `INSERT INTO pageviews (ts, visitor_id, session_id, path, referrer, ua, device, country, screen_w)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        now,
        input.visitorId,
        input.sessionId,
        input.path,
        input.referrer ?? null,
        input.ua ?? null,
        input.device ?? null,
        input.country ?? null,
        input.screenW ?? null
      );
    }
  });
  tx();
}

/* ------------------------------------------------------------------ */
/* Submissions                                                         */
/* ------------------------------------------------------------------ */

export type SubmissionInput = {
  type?: string | null;
  idea?: string | null;
  name: string;
  company?: string | null;
  email: string;
  budget?: string | null;
  country?: string | null;
  source?: string | null;
};

export function addSubmission(s: SubmissionInput) {
  const r = db()
    .prepare(
      `INSERT INTO submissions (ts, type, idea, name, company, email, budget, country, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      Date.now(),
      s.type ?? null,
      s.idea ?? null,
      s.name,
      s.company ?? null,
      s.email,
      s.budget ?? null,
      s.country ?? null,
      s.source ?? null
    );
  return Number(r.lastInsertRowid);
}

export function listSubmissions(status?: string) {
  const d = db();
  if (status && status !== "all") {
    return d
      .prepare(`SELECT * FROM submissions WHERE status = ? ORDER BY ts DESC`)
      .all(status);
  }
  return d.prepare(`SELECT * FROM submissions ORDER BY ts DESC`).all();
}

export function updateSubmissionStatus(id: number, status: string) {
  db()
    .prepare(`UPDATE submissions SET status = ? WHERE id = ?`)
    .run(status, id);
}

export function deleteSubmission(id: number) {
  db().prepare(`DELETE FROM submissions WHERE id = ?`).run(id);
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

const DAY = 86_400_000;

function startOfDay(ts: number) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function getStats(days = 30) {
  const d = db();
  const now = Date.now();
  const activeWindow = now - 60_000; // active = seen within 60s
  const today = startOfDay(now);
  const since = startOfDay(now - (days - 1) * DAY);

  const one = <T>(sql: string, ...args: unknown[]) =>
    d.prepare(sql).get(...args) as T;
  const all = <T>(sql: string, ...args: unknown[]) =>
    d.prepare(sql).all(...args) as T[];

  const activeSessions = all<{
    id: string;
    path: string;
    started: number;
    last_seen: number;
    device: string | null;
    country: string | null;
  }>(
    `SELECT id, path, started, last_seen, device, country FROM sessions
     WHERE last_seen > ? ORDER BY last_seen DESC LIMIT 50`,
    activeWindow
  );

  const totals = {
    visitors: one<{ c: number }>(`SELECT COUNT(*) c FROM visitors`).c,
    pageviews: one<{ c: number }>(`SELECT COUNT(*) c FROM pageviews`).c,
    sessions: one<{ c: number }>(`SELECT COUNT(*) c FROM sessions`).c,
    submissions: one<{ c: number }>(`SELECT COUNT(*) c FROM submissions`).c,
    newSubmissions: one<{ c: number }>(
      `SELECT COUNT(*) c FROM submissions WHERE status = 'new'`
    ).c,
  };

  const todayStats = {
    pageviews: one<{ c: number }>(
      `SELECT COUNT(*) c FROM pageviews WHERE ts >= ?`,
      today
    ).c,
    visitors: one<{ c: number }>(
      `SELECT COUNT(DISTINCT visitor_id) c FROM pageviews WHERE ts >= ?`,
      today
    ).c,
    sessions: one<{ c: number }>(
      `SELECT COUNT(*) c FROM sessions WHERE started >= ?`,
      today
    ).c,
    submissions: one<{ c: number }>(
      `SELECT COUNT(*) c FROM submissions WHERE ts >= ?`,
      today
    ).c,
  };

  // daily series
  const rows = all<{ day: number; views: number; visitors: number }>(
    `SELECT (ts / ${DAY}) * ${DAY} AS day,
            COUNT(*) views,
            COUNT(DISTINCT visitor_id) visitors
     FROM pageviews WHERE ts >= ?
     GROUP BY day ORDER BY day`,
    since
  );
  // (ts/DAY)*DAY is UTC-day bucketed; align to local start-of-day for display
  const byDay = new Map<number, { views: number; visitors: number }>();
  for (const r of rows) {
    const key = startOfDay(r.day + DAY / 2);
    const cur = byDay.get(key) ?? { views: 0, visitors: 0 };
    byDay.set(key, {
      views: cur.views + r.views,
      visitors: cur.visitors + r.visitors,
    });
  }
  const series: { day: number; views: number; visitors: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = startOfDay(now - i * DAY);
    series.push({ day, ...(byDay.get(day) ?? { views: 0, visitors: 0 }) });
  }

  // hourly today (24 buckets)
  const hourly: number[] = Array(24).fill(0);
  for (const r of all<{ ts: number }>(
    `SELECT ts FROM pageviews WHERE ts >= ?`,
    today
  )) {
    hourly[new Date(r.ts).getHours()]++;
  }

  const topPages = all<{ path: string; views: number; visitors: number }>(
    `SELECT path, COUNT(*) views, COUNT(DISTINCT visitor_id) visitors
     FROM pageviews WHERE ts >= ? GROUP BY path ORDER BY views DESC LIMIT 12`,
    since
  );
  const referrers = all<{ referrer: string; views: number }>(
    `SELECT COALESCE(NULLIF(referrer, ''), '(direct)') referrer, COUNT(*) views
     FROM pageviews WHERE ts >= ? GROUP BY referrer ORDER BY views DESC LIMIT 10`,
    since
  );
  const devices = all<{ device: string; views: number }>(
    `SELECT COALESCE(device, 'unknown') device, COUNT(*) views
     FROM pageviews WHERE ts >= ? GROUP BY device ORDER BY views DESC`,
    since
  );
  const countries = all<{ country: string; views: number }>(
    `SELECT COALESCE(NULLIF(country, ''), 'unknown') country, COUNT(*) views
     FROM pageviews WHERE ts >= ? GROUP BY country ORDER BY views DESC LIMIT 10`,
    since
  );
  const recentPageviews = all<{
    ts: number;
    path: string;
    referrer: string | null;
    device: string | null;
    country: string | null;
    visitor_id: string;
  }>(
    `SELECT ts, path, referrer, device, country, visitor_id
     FROM pageviews ORDER BY ts DESC LIMIT 40`
  );
  const recentSubmissions = all<Record<string, unknown>>(
    `SELECT * FROM submissions ORDER BY ts DESC LIMIT 6`
  );

  const submissionTypes = all<{ type: string; c: number }>(
    `SELECT COALESCE(type, 'unspecified') type, COUNT(*) c
     FROM submissions GROUP BY type ORDER BY c DESC`
  );

  return {
    generatedAt: now,
    days,
    activeNow: activeSessions.length,
    activeSessions,
    totals,
    today: todayStats,
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

export type Stats = ReturnType<typeof getStats>;
