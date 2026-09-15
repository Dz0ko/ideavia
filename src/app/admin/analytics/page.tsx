"use client";

import { useState } from "react";
import { useStats } from "@/components/admin/useStats";
import { Card, DailyBars, HBarList, HourlyBars, StatTile } from "@/components/admin/ui";

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const { stats } = useStats(days, 10000);

  if (!stats) return <div className="text-sm text-chalk/40">Loading…</div>;

  const periodViews = stats.series.reduce((a, d) => a + d.views, 0);
  const periodVisitors = stats.series.reduce((a, d) => a + d.visitors, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <div className="flex gap-1 rounded-lg border border-white/8 p-1 text-xs">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-md px-3 py-1.5 ${
                days === d ? "bg-white/10 text-white" : "text-chalk/50 hover:text-white"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label={`Views · ${days}d`} value={periodViews} />
        <StatTile label={`Visitor-days · ${days}d`} value={periodVisitors} sub="unique visitors per day, summed" />
        <StatTile label="Unique visitors" value={stats.totals.visitors} sub="all time" />
        <StatTile
          label="Views / visitor"
          value={stats.totals.visitors ? (stats.totals.pageviews / stats.totals.visitors).toFixed(1) : "0"}
          sub="all time"
        />
      </div>

      <Card title={`Page views · last ${days} days`}>
        <div className="pt-6">
          <DailyBars data={stats.series} valueKey="views" label="views" />
        </div>
      </Card>
      <Card title={`Unique visitors · last ${days} days`}>
        <div className="pt-6">
          <DailyBars data={stats.series} valueKey="visitors" label="visitors" />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Today by hour">
          <HourlyBars data={stats.hourly} />
        </Card>
        <Card title="Devices">
          <HBarList rows={stats.devices} labelKey="device" valueKey="views" />
        </Card>
        <Card title="Top pages">
          <HBarList rows={stats.topPages} labelKey="path" valueKey="views" />
        </Card>
        <Card title="Referrers">
          <HBarList
            rows={stats.referrers}
            labelKey="referrer"
            valueKey="views"
            formatLabel={(r) => {
              try {
                return r === "(direct)" ? r : new URL(r).hostname;
              } catch {
                return r;
              }
            }}
          />
        </Card>
        <Card title="Countries">
          <HBarList rows={stats.countries} labelKey="country" valueKey="views" />
          <p className="mt-4 text-[11px] text-chalk/35">
            Country is filled from the hosting provider&apos;s geo header (Vercel / Cloudflare). Locally it shows as unknown.
          </p>
        </Card>
        <Card title="Submissions by type">
          <HBarList rows={stats.submissionTypes} labelKey="type" valueKey="c" />
        </Card>
      </div>
    </div>
  );
}
