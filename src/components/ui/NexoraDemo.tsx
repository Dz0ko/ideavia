"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* NEXORA palette (matches nexoracrm.xyz) */
const P = {
  bg: "#0b0c12",
  panel: "#0f1018",
  border: "rgba(255,255,255,0.07)",
  purple: "#8b7cff",
  green: "#22e59a",
  cyan: "#38c8ff",
  pink: "#ff4fa3",
  muted: "#7c7f93",
};

type TabKey = "dashboard" | "inbox" | "fans" | "vault" | "ai" | "payouts" | "shifts";

const TABS: { key: TabKey; label: string; icon: JSX.Element }[] = [
  { key: "dashboard", label: "Dashboard", icon: <I d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" /> },
  { key: "inbox", label: "Inbox", icon: <I d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  { key: "fans", label: "Fans", icon: <I d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
  { key: "vault", label: "Media Vault", icon: <I d="M3 3h18v18H3zM3 15l5-5 4 4 3-3 6 6" /> },
  { key: "ai", label: "AI Intelligence", icon: <I d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8zM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z" /> },
  { key: "payouts", label: "Payouts", icon: <I d="M2 7h20v12H2zM2 11h20M16 15h2" /> },
  { key: "shifts", label: "Shifts", icon: <I d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2" /> },
];

function I({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const FANS = [
  { n: "Jason", h: "@jason_w", msg: "just unlocked your PPV 🔥", whale: true, amt: "$2,480", unread: 0, g: "from-[#8b7cff] to-[#ff4fa3]" },
  { n: "Kevin", h: "@kev.n", msg: "can I get a custom?", whale: false, amt: "$310", unread: 2, g: "from-[#38c8ff] to-[#8b7cff]" },
  { n: "Derek", h: "@derek99", msg: "tipped $50", whale: true, amt: "$1,905", unread: 0, g: "from-[#ff4fa3] to-[#8b7cff]" },
  { n: "Aaron", h: "@aaronx", msg: "good morning gorgeous", whale: false, amt: "$140", unread: 1, g: "from-[#8b7cff] to-[#38c8ff]" },
];

const REVENUE = [38, 52, 44, 61, 47, 72, 88];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function NexoraDemo({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<TabKey>("dashboard");
  const [manualUntil, setManualUntil] = useState(0);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const frame = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 60, y: 60 });
  const [inView, setInView] = useState(false);

  // Only animate while visible.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-cycle tabs.
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      if (Date.now() < manualUntil) return;
      setActive((a) => {
        const i = TABS.findIndex((x) => x.key === a);
        return TABS[(i + 1) % TABS.length].key;
      });
    }, 3800);
    return () => clearInterval(t);
  }, [inView, manualUntil]);

  // Move the fake cursor onto the active tab.
  useEffect(() => {
    const btn = tabRefs.current[active];
    const box = frame.current;
    if (!btn || !box) return;
    const b = btn.getBoundingClientRect();
    const f = box.getBoundingClientRect();
    setCursor({ x: b.left - f.left + 44, y: b.top - f.top + b.height / 2 });
  }, [active]);

  const pick = (k: TabKey) => {
    setActive(k);
    setManualUntil(Date.now() + 12000);
  };

  return (
    <div
      ref={frame}
      className={`relative overflow-hidden rounded-2xl border text-[13px] ${className}`}
      style={{ background: P.bg, borderColor: P.border, fontFamily: "Inter, var(--font-space), system-ui, sans-serif" }}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: P.border }}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 h-4 w-44 rounded-full bg-white/5" />
        <span
          className="ml-auto flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider"
          style={{ color: P.green, borderColor: `${P.green}55`, background: `${P.green}12` }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: P.green }} />
          LIVE DEMO
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] md:grid-cols-[170px_1fr]">
        {/* sidebar (horizontal tab strip on phones) */}
        <aside
          className="flex gap-1 overflow-x-auto border-b p-2 sm:block sm:overflow-visible sm:border-b-0 sm:border-r sm:p-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ borderColor: P.border }}
        >
          {TABS.map((t) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                ref={(el) => { tabRefs.current[t.key] = el; }}
                onClick={() => pick(t.key)}
                data-cursor="arrow"
                className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left text-[12px] transition-colors sm:mb-0.5 sm:w-full sm:gap-2.5"
                style={{
                  color: on ? "#fff" : P.muted,
                  background: on ? `${P.purple}22` : "transparent",
                }}
              >
                <span style={{ color: on ? P.purple : P.muted }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </aside>

        {/* content */}
        <div className="relative min-h-[300px] p-3 sm:p-4 md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {active === "dashboard" && <Dashboard />}
              {active === "inbox" && <Inbox />}
              {active === "fans" && <Fans />}
              {active === "vault" && <Vault />}
              {active === "ai" && <AI />}
              {active === "payouts" && <Payouts />}
              {active === "shifts" && <Shifts />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* animated demo cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-12 w-12 rounded-full border"
        style={{ borderColor: `${P.purple}88`, background: `${P.purple}14`, marginLeft: -24, marginTop: -24 }}
        animate={{ x: cursor.x, y: cursor.y, scale: [1, 0.85, 1] }}
        transition={{ x: { type: "spring", stiffness: 120, damping: 18 }, y: { type: "spring", stiffness: 120, damping: 18 }, scale: { duration: 0.5 } }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe27a]" />
      </motion.div>
    </div>
  );
}

/* ---------------- panels ---------------- */

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-xl border ${className}`} style={{ background: P.panel, borderColor: P.border, ...style }}>
      {children}
    </div>
  );
}

function Stat({ label, value, delta, color, icon }: { label: string; value: string; delta: string; color: string; icon: string }) {
  return (
    <Card className="p-2.5 sm:p-3.5" style={{ background: `linear-gradient(135deg, ${color}14, ${P.panel} 70%)` }}>
      <div className="flex items-center justify-between text-[9px] tracking-wider sm:text-[10px]" style={{ color: P.muted }}>
        {label}
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="mt-2 text-base font-bold sm:text-xl" style={{ color }}>{value}</div>
      <div className="mt-1 text-[11px] font-semibold" style={{ color: P.green }}>↗ {delta}</div>
    </Card>
  );
}

function Dashboard() {
  const max = Math.max(...REVENUE);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label="TODAY" value="$4,910" delta="24%" color={P.green} icon="$" />
        <Stat label="PPV SENT" value="128" delta="12%" color={P.cyan} icon="➤" />
        <Stat label="ACTIVE FANS" value="1,204" delta="8%" color={P.pink} icon="⚇" />
      </div>
      <Card className="p-4">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-semibold text-white"><span style={{ color: P.purple }}>▥</span> Revenue · 7 days</span>
          <span className="font-semibold" style={{ color: P.green }}>↗ +24%</span>
        </div>
        <div className="mt-4 flex h-24 items-end gap-3">
          {REVENUE.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                className="w-full rounded-t-[4px]"
                style={{ background: i === REVENUE.length - 1 ? P.purple : `${P.purple}55` }}
                initial={{ height: 0 }}
                animate={{ height: `${(v / max) * 100}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              />
              <span className="text-[9px]" style={{ color: P.muted }}>{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="flex items-center gap-2 px-4 py-2.5 text-[12px]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: P.green }} />
        <span className="text-white/90"><b>Jason</b> just unlocked a <b style={{ color: P.green }}>$45</b> PPV</span>
        <span className="ml-auto text-[10px]" style={{ color: P.muted }}>now</span>
      </Card>
    </div>
  );
}

function Avatar({ n, g }: { n: string; g: string }) {
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${g} text-[12px] font-bold text-white`}>
      {n[0]}
    </span>
  );
}

function Whale() {
  return (
    <span className="rounded px-1.5 py-[2px] text-[8px] font-bold tracking-wider" style={{ color: P.pink, background: `${P.pink}22` }}>
      WHALE
    </span>
  );
}

function Inbox() {
  return (
    <Card>
      <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: P.border }}>
        <span className="font-semibold text-white">Inbox · Aria</span>
        <span className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: P.green, background: `${P.green}18` }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: P.green }} /> Live
        </span>
      </div>
      {FANS.map((f) => (
        <div key={f.n} className="flex items-center gap-3 border-b px-4 py-2.5 last:border-0" style={{ borderColor: P.border }}>
          <Avatar n={f.n} g={f.g} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 font-semibold text-white">{f.n} {f.whale && <Whale />}</div>
            <div className="truncate text-[12px]" style={{ color: P.muted }}>{f.msg}</div>
          </div>
          {f.unread > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: P.purple }}>
              {f.unread}
            </span>
          )}
        </div>
      ))}
    </Card>
  );
}

function Fans() {
  return (
    <div className="space-y-2">
      {FANS.map((f) => (
        <Card key={f.n} className="flex items-center gap-3 px-4 py-2.5">
          <Avatar n={f.n} g={f.g} />
          <div className="flex-1">
            <div className="flex items-center gap-2 font-semibold text-white">{f.n} {f.whale && <Whale />}</div>
            <div className="text-[12px]" style={{ color: P.muted }}>{f.h}</div>
          </div>
          <span className="font-bold" style={{ color: P.green }}>{f.amt}</span>
        </Card>
      ))}
    </div>
  );
}

function Vault() {
  const tags = ["custom", "luxury", "teaser", "photoset", "bts", "PPV", "story", "clip"];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold text-white">Media Vault</span>
        <span className="text-[10px]" style={{ color: P.purple }}>✦ AI tagging your media</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {tags.map((t, i) => (
          <div
            key={t}
            className="relative aspect-square overflow-hidden rounded-lg border"
            style={{
              borderColor: P.border,
              background: `linear-gradient(${135 + i * 20}deg, ${[P.purple, P.pink, P.cyan][i % 3]}33, ${P.panel})`,
            }}
          >
            <span className="absolute bottom-1.5 left-1.5 rounded px-1.5 py-[2px] text-[8px] font-semibold text-white/80" style={{ background: "rgba(0,0,0,0.5)" }}>
              #{t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AI() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ background: `linear-gradient(135deg, ${P.purple}, ${P.pink})` }}>✦</span>
        <div className="flex-1">
          <div className="font-semibold text-white">AI Suggestion</div>
          <div className="text-[11px]" style={{ color: P.muted }}>for Jason · high spender</div>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ color: P.green, background: `${P.green}18` }}>92% match</span>
      </div>
      <Card className="px-4 py-3 text-[12.5px] leading-relaxed text-white/85">
        &ldquo;Hey babe 😈 I just filmed something I know you&apos;ve been waiting for… want me to unlock it just for you?&rdquo;
      </Card>
      <div className="grid grid-cols-3 gap-2">
        {[["SUGGESTED PPV", "$500"], ["BEST TIME", "9:40pm"], ["OPPORTUNITY", "High"]].map(([k, v]) => (
          <Card key={k} className="px-3 py-2.5 text-center">
            <div className="text-[9px] tracking-wider" style={{ color: P.muted }}>{k}</div>
            <div className="mt-1 font-bold" style={{ color: P.purple }}>{v}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Payouts() {
  const rows = [
    ["Mia", "Shift 1 · 08–16", "$3,120", "$624"],
    ["Leo", "Shift 2 · 16–00", "$2,540", "$508"],
    ["Sara", "Shift 3 · 00–08", "$1,880", "$376"],
  ];
  return (
    <Card className="overflow-x-auto">
      <div className="grid min-w-[420px] grid-cols-[1fr_1.2fr_1fr_1fr] border-b px-4 py-2 text-[9px] tracking-wider" style={{ borderColor: P.border, color: P.muted }}>
        <span>CHATTER</span><span>SHIFT</span><span>NET EARNED</span><span>PAYOUT · 20%</span>
      </div>
      {rows.map((r) => (
        <div key={r[0]} className="grid min-w-[420px] grid-cols-[1fr_1.2fr_1fr_1fr] items-center border-b px-4 py-2.5 text-[12px] last:border-0" style={{ borderColor: P.border }}>
          <span className="font-semibold text-white">{r[0]}</span>
          <span style={{ color: P.muted }}>{r[1]}</span>
          <span className="text-white/90">{r[2]}</span>
          <span className="flex items-center gap-2 font-bold" style={{ color: P.green }}>
            {r[3]}
            <span className="rounded px-1.5 py-[1px] text-[8px]" style={{ background: `${P.green}18` }}>PAID</span>
          </span>
        </div>
      ))}
    </Card>
  );
}

function Shifts() {
  const slots = [
    { t: "08:00 – 16:00", who: ["Mia", "Noah"], live: false },
    { t: "16:00 – 00:00", who: ["Leo"], live: true },
    { t: "00:00 – 08:00", who: ["Sara", "Eli"], live: false },
  ];
  return (
    <div className="space-y-2">
      {slots.map((s) => (
        <Card key={s.t} className="flex items-center gap-3 px-4 py-3">
          <span className="w-28 text-[12px] font-semibold text-white">{s.t}</span>
          <div className="flex -space-x-2">
            {s.who.map((w, i) => (
              <span key={w} className={`flex h-7 w-7 items-center justify-center rounded-full border-2 bg-gradient-to-br ${["from-[#8b7cff] to-[#38c8ff]", "from-[#ff4fa3] to-[#8b7cff]"][i % 2]} text-[10px] font-bold text-white`} style={{ borderColor: P.bg }}>
                {w[0]}
              </span>
            ))}
          </div>
          <span className="text-[11px]" style={{ color: P.muted }}>{s.who.join(", ")}</span>
          <span className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-semibold" style={s.live ? { color: P.green, background: `${P.green}18` } : { color: P.muted, background: "rgba(255,255,255,0.05)" }}>
            {s.live ? "● CLOCKED IN" : "SCHEDULED"}
          </span>
        </Card>
      ))}
    </div>
  );
}
