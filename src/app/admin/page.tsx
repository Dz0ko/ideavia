"use client";

import Link from "next/link";
import { useStats } from "@/components/admin/useStats";
import {
  Card,
  DailyBars,
  Empty,
  HBarList,
  HourlyBars,
  StatTile,
  StatusBadge,
  VisitorFeed,
  countryName,
  flag,
  fmtDate,
  timeAgo,
} from "@/components/admin/ui";

export default function AdminOverview() {
  const { stats, error } = useStats(30, 5000);

  if (!stats) {
    return (
      <div className="text-sm text-chalk/40">
        {error ? `Could not load stats (${error})` : "Loading…"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-xs text-chalk/40">
            Live · refreshes every 5s · updated {timeAgo(stats.generatedAt)}
          </p>
        </div>
        {stats.totals.newSubmissions > 0 && (
          <Link
            href="/admin/submissions?status=new"
            className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium text-[#8b97ff]"
          >
            {stats.totals.newSubmissions} new submission
            {stats.totals.newSubmissions === 1 ? "" : "s"} →
          </Link>
        )}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatTile label="Active now" value={stats.activeNow} live sub="seen in last 60s" />
        <StatTile label="Visitors today" value={stats.today.visitors} sub={`${stats.today.pageviews} views`} />
        <StatTile label="Total visitors" value={stats.totals.visitors} sub={`${stats.totals.sessions} sessions`} />
        <StatTile label="Total views" value={stats.totals.pageviews} sub="all time" />
        <StatTile label="Submissions" value={stats.totals.submissions} sub={`${stats.today.submissions} today`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Views · last 30 days" className="lg:col-span-2">
          <div className="pt-6">
            <DailyBars data={stats.series} valueKey="views" label="views" />
          </div>
        </Card>
        <Card title="Today by hour">
          <HourlyBars data={stats.hourly} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Active sessions">
          {stats.activeSessions.length === 0 ? (
            <Empty>Nobody on the site right now.</Empty>
          ) : (
            <ul className="divide-y divide-white/5 text-sm">
              {stats.activeSessions.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-2">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{s.path}</div>
                    <div className="text-xs text-chalk/40">
                      <span className="capitalize">{s.device ?? "?"}</span>
                      {s.country ? ` · ${flag(s.country)} ${countryName(s.country)}` : ""}
                      {s.city ? ` · ${s.city}` : ""} · on site {timeAgo(s.started).replace(" ago", "")}
                    </div>
                  </div>
                  <span className="ml-3 h-2 w-2 shrink-0 rounded-full bg-[#34e0a1]" />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Top pages · 30d">
          <HBarList rows={stats.topPages} labelKey="path" valueKey="views" />
        </Card>

        <Card
          title="Latest submissions"
          action={
            <Link href="/admin/submissions" className="text-xs text-chalk/50 hover:text-white">
              All →
            </Link>
          }
        >
          {stats.recentSubmissions.length === 0 ? (
            <Empty>No submissions yet.</Empty>
          ) : (
            <ul className="divide-y divide-white/5 text-sm">
              {stats.recentSubmissions.map((s) => (
                <li key={String(s.id)} className="py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-medium">{String(s.name)}</span>
                    <StatusBadge status={String(s.status)} />
                  </div>
                  <div className="mt-0.5 truncate text-xs text-chalk/40">
                    {String(s.type ?? "N/A")} · {String(s.email)} · {fmtDate(Number(s.ts))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card
        title="Live feed · latest page views"
        action={
          <Link href="/admin/analytics" className="text-xs text-chalk/50 hover:text-white">
            Full log →
          </Link>
        }
      >
        <VisitorFeed rows={stats.recentPageviews} limit={30} />
      </Card>
    </div>
  );
}
