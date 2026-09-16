"use client";

import { ReactNode, useState } from "react";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export function Card({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-white/8 bg-[#0b0b0f] ${className}`}
    >
      {(title || action) && (
        <header className="flex items-center justify-between border-b border-white/6 px-5 py-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-chalk/55">
            {title}
          </h2>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function StatTile({
  label,
  value,
  sub,
  live,
}: {
  label: string;
  value: number | string;
  sub?: string;
  live?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0b0b0f] p-5">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-chalk/50">
        {live && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34e0a1] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34e0a1]" />
          </span>
        )}
        {label}
      </div>
      <div className="mt-3 text-4xl font-semibold tabular-nums tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {sub && <div className="mt-1 text-xs text-chalk/40">{sub}</div>}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="py-10 text-center text-sm text-chalk/35">{children}</div>
  );
}

export function timeAgo(ts: number) {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function fmtDate(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ------------------------------------------------------------------ */
/* Visitor formatting helpers                                          */
/* ------------------------------------------------------------------ */

/** "MK" → "🇲🇰" */
export function flag(code?: string | null) {
  if (!code || code.length !== 2 || code === "XX") return "";
  return String.fromCodePoint(...code.toUpperCase().split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

/** "MK" → "North Macedonia" (browser locale). */
export function countryName(code?: string | null) {
  if (!code) return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) || code;
  } catch {
    return code;
  }
}

/** Referrer origin → readable source name. */
export function refHost(r?: string | null) {
  if (!r || r === "(direct)") return "Direct";
  try {
    const h = new URL(r).hostname.replace(/^www\./, "");
    const known: [RegExp, string][] = [
      [/google\./, "Google"], [/bing\./, "Bing"], [/duckduckgo/, "DuckDuckGo"], [/yahoo\./, "Yahoo"],
      [/instagram/, "Instagram"], [/facebook|fb\.com/, "Facebook"], [/^(t\.co|x\.com|twitter\.com)$/, "X / Twitter"],
      [/linkedin/, "LinkedIn"], [/t\.me|telegram/, "Telegram"], [/youtube|youtu\.be/, "YouTube"], [/tiktok/, "TikTok"],
      [/reddit/, "Reddit"], [/github/, "GitHub"], [/whatsapp/, "WhatsApp"],
    ];
    for (const [re, name] of known) if (re.test(h)) return name;
    return h;
  } catch {
    return r;
  }
}

/** Browser + OS from a user-agent string. */
export function parseUA(ua?: string | null) {
  if (!ua) return { browser: "—", os: "—" };
  const browser =
    /Edg\//.test(ua) ? "Edge" :
    /OPR\/|Opera/.test(ua) ? "Opera" :
    /SamsungBrowser/.test(ua) ? "Samsung" :
    /Firefox\//.test(ua) ? "Firefox" :
    /Chrome\/|CriOS/.test(ua) ? "Chrome" :
    /Safari\//.test(ua) ? "Safari" :
    /Instagram/.test(ua) ? "Instagram app" :
    /FBAN|FBAV/.test(ua) ? "Facebook app" :
    /Telegram/.test(ua) ? "Telegram" :
    /bot|crawl|spider/i.test(ua) ? "Bot" : "Other";
  const os =
    /iPhone|iPad|iPod/.test(ua) ? "iOS" :
    /Android/.test(ua) ? "Android" :
    /Windows/.test(ua) ? "Windows" :
    /Mac OS X|Macintosh/.test(ua) ? "macOS" :
    /CrOS/.test(ua) ? "ChromeOS" :
    /Linux/.test(ua) ? "Linux" : "—";
  return { browser, os };
}

export type FeedRow = {
  ts: number;
  path: string;
  referrer: string | null;
  device: string | null;
  country: string | null;
  city?: string | null;
  ua?: string | null;
  screen_w?: number | null;
  visitor_id: string;
};

/** Readable visitor log: when, page, where from, device / browser / OS, location. */
export function VisitorFeed({ rows, limit }: { rows: FeedRow[]; limit?: number }) {
  const list = limit ? rows.slice(0, limit) : rows;
  if (!list.length) return <Empty>No traffic recorded yet. Open the site in another tab.</Empty>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-[11px] uppercase tracking-wider text-chalk/40">
          <tr>
            <th className="py-2 pr-4">When</th>
            <th className="py-2 pr-4">Page</th>
            <th className="py-2 pr-4">Came from</th>
            <th className="py-2 pr-4">Device</th>
            <th className="py-2 pr-4">Location</th>
            <th className="py-2">Visitor</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p, i) => {
            const { browser, os } = parseUA(p.ua);
            const f = flag(p.country);
            return (
              <tr key={i} className="border-t border-white/5 align-top">
                <td className="py-2 pr-4 whitespace-nowrap text-chalk/50" title={new Date(p.ts).toLocaleString()}>
                  {timeAgo(p.ts)}
                </td>
                <td className="py-2 pr-4 font-medium">{p.path}</td>
                <td className="max-w-[200px] truncate py-2 pr-4 text-chalk/70" title={p.referrer || "Direct"}>
                  {refHost(p.referrer)}
                </td>
                <td className="py-2 pr-4 whitespace-nowrap">
                  <span className="capitalize">{p.device ?? "—"}</span>
                  <span className="ml-1.5 text-xs text-chalk/40">
                    {browser}{os !== "—" ? ` · ${os}` : ""}{p.screen_w ? ` · ${p.screen_w}px` : ""}
                  </span>
                </td>
                <td className="py-2 pr-4 whitespace-nowrap">
                  {f && <span className="mr-1.5">{f}</span>}
                  {countryName(p.country)}
                  {p.city && <span className="ml-1.5 text-xs text-chalk/40">· {p.city}</span>}
                </td>
                <td className="py-2 font-mono text-xs text-chalk/35">{p.visitor_id.slice(0, 8)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Charts (single-series, one hue, hover tooltip, table alternative)   */
/* ------------------------------------------------------------------ */

const HUE = "#5b6bff";

export function DailyBars({
  data,
  valueKey = "views",
  label = "views",
}: {
  data: { day: number; views: number; visitors: number }[];
  valueKey?: "views" | "visitors";
  label?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const max = Math.max(1, ...data.map((d) => d[valueKey]));
  const W = 800;
  const H = 180;
  const padB = 22;
  const gap = 2;
  const bw = (W - gap * (data.length - 1)) / data.length;

  if (table) {
    return (
      <div>
        <ToggleTable on={table} set={setTable} />
        <div className="max-h-64 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-chalk/40">
              <tr>
                <th className="py-2">Day</th>
                <th className="py-2 text-right">Views</th>
                <th className="py-2 text-right">Visitors</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.day} className="border-t border-white/5">
                  <td className="py-1.5">
                    {new Date(d.day).toLocaleDateString()}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{d.views}</td>
                  <td className="py-1.5 text-right tabular-nums">
                    {d.visitors}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ToggleTable on={table} set={setTable} />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-44 w-full"
        onMouseLeave={() => setHover(null)}
      >
        {/* baseline */}
        <line
          x1={0}
          x2={W}
          y1={H - padB}
          y2={H - padB}
          stroke="rgba(255,255,255,0.12)"
        />
        {data.map((d, i) => {
          const v = d[valueKey];
          const h = ((H - padB - 8) * v) / max;
          const x = i * (bw + gap);
          const y = H - padB - h;
          const isHover = hover === i;
          return (
            <g key={d.day} onMouseEnter={() => setHover(i)}>
              {/* hit target larger than the mark */}
              <rect x={x} y={0} width={bw + gap} height={H} fill="transparent" />
              {v > 0 && (
                <rect
                  x={x}
                  y={y}
                  width={bw}
                  height={h}
                  rx={Math.min(4, bw / 2)}
                  fill={HUE}
                  opacity={hover === null || isHover ? 1 : 0.45}
                />
              )}
              {v > 0 && h > 4 && (
                /* square off the bottom so rounding is data-end only */
                <rect x={x} y={y + h - 4} width={bw} height={4} fill={HUE}
                  opacity={hover === null || isHover ? 1 : 0.45} />
              )}
              {(i === 0 || i === data.length - 1 || i % 7 === 0) && (
                <text
                  x={x + bw / 2}
                  y={H - 6}
                  textAnchor="middle"
                  fontSize={10}
                  fill="rgba(255,255,255,0.4)"
                >
                  {new Date(d.day).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                  })}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-1 rounded-md border border-white/10 bg-[#15151c] px-3 py-2 text-xs shadow-xl"
          style={{
            left: `${((hover + 0.5) / data.length) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="text-chalk/50">
            {new Date(data[hover].day).toLocaleDateString(undefined, {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </div>
          <div className="mt-0.5 font-medium tabular-nums">
            {data[hover][valueKey].toLocaleString()} {label}
          </div>
        </div>
      )}
    </div>
  );
}

export function HourlyBars({ data }: { data: number[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data);
  return (
    <div className="relative">
      <div
        className="flex h-24 items-end gap-[2px]"
        onMouseLeave={() => setHover(null)}
      >
        {data.map((v, h) => (
          <div
            key={h}
            className="group relative flex h-full flex-1 items-end"
            onMouseEnter={() => setHover(h)}
          >
            <div
              className="w-full rounded-t-[3px]"
              style={{
                height: `${Math.max(v > 0 ? 3 : 0, (v / max) * 100)}%`,
                background: HUE,
                opacity: hover === null || hover === h ? 1 : 0.45,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-chalk/35">
        <span>00:00</span>
        <span>12:00</span>
        <span>23:00</span>
      </div>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-8 rounded-md border border-white/10 bg-[#15151c] px-2.5 py-1.5 text-xs shadow-xl"
          style={{
            left: `${((hover + 0.5) / 24) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {String(hover).padStart(2, "0")}:00 ·{" "}
          <span className="font-medium tabular-nums">{data[hover]}</span>
        </div>
      )}
    </div>
  );
}

export function HBarList({
  rows,
  labelKey,
  valueKey,
  formatLabel,
}: {
  rows: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
  formatLabel?: (v: string) => string;
}) {
  if (!rows.length) return <Empty>No data yet.</Empty>;
  const max = Math.max(1, ...rows.map((r) => Number(r[valueKey])));
  const total = rows.reduce((a, r) => a + Number(r[valueKey]), 0);
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => {
        const v = Number(r[valueKey]);
        const raw = String(r[labelKey]);
        const label = formatLabel ? formatLabel(raw) : raw;
        return (
          <li key={i} className="group text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="truncate text-chalk/80" title={raw}>
                {label}
              </span>
              <span className="shrink-0 tabular-nums text-chalk/60">
                {v.toLocaleString()}
                <span className="ml-1.5 text-xs text-chalk/35">
                  {total ? Math.round((v / total) * 100) : 0}%
                </span>
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{ width: `${(v / max) * 100}%`, background: HUE }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ToggleTable({
  on,
  set,
}: {
  on: boolean;
  set: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => set(!on)}
      className="absolute right-0 -top-9 text-[11px] uppercase tracking-wider text-chalk/40 hover:text-white"
    >
      {on ? "Chart" : "Table"}
    </button>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-[#5b6bff]/15 text-[#8b97ff] border-[#5b6bff]/30",
    contacted: "bg-[#38e8ff]/10 text-[#38e8ff] border-[#38e8ff]/30",
    in_progress: "bg-[#ffb347]/10 text-[#ffb347] border-[#ffb347]/30",
    won: "bg-[#34e0a1]/10 text-[#34e0a1] border-[#34e0a1]/30",
    archived: "bg-white/5 text-chalk/40 border-white/10",
  };
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
        map[status] || map.archived
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
