"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* TRAG palette */
const T = {
  bg: "#07080a",
  panel: "#0d0f12",
  panel2: "#111418",
  border: "rgba(255,255,255,0.07)",
  lime: "#d9ff4a",
  red: "#ff4d6d",
  amber: "#ffb347",
  muted: "#7a8088",
  text: "#e8eaed",
};

type TabKey = "terminal" | "risk" | "traders" | "automation" | "launch" | "fees";

const TABS: { key: TabKey; label: string; k: string }[] = [
  { key: "terminal", label: "Terminal", k: "T" },
  { key: "risk", label: "Risk", k: "R" },
  { key: "traders", label: "Traders", k: "H" },
  { key: "automation", label: "Automation", k: "A" },
  { key: "launch", label: "Launch", k: "L" },
  { key: "fees", label: "Fees", k: "F" },
];

/* ---------- deterministic candle series ---------- */
type Candle = { o: number; h: number; l: number; c: number; v: number; gap?: boolean };
function seed(n: number) {
  let s = n;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
function makeCandles(count = 32): Candle[] {
  const r = seed(7);
  let p = 0.00118;
  const out: Candle[] = [];
  for (let i = 0; i < count; i++) {
    if (r() < 0.12) {
      out.push({ o: p, h: p, l: p, c: p, v: 0, gap: true });
      continue;
    }
    const o = p;
    const drift = (r() - 0.42) * 0.00009;
    const c = Math.max(0.0006, o + drift);
    const h = Math.max(o, c) + r() * 0.00004;
    const l = Math.min(o, c) - r() * 0.00004;
    out.push({ o, h, l, c, v: 0.2 + r() * 1.6 });
    p = c;
  }
  return out;
}

const WALLETS = ["7hG4…k9Qp", "Bx2m…Ld1a", "9sTq…Wz3e", "F1kR…p8Nu", "3vXe…Qm7y", "Hn5c…Zt2b"];

export default function TragDemo({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<TabKey>("terminal");
  const [manualUntil, setManualUntil] = useState(0);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const frame = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 60, y: 80 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      if (Date.now() < manualUntil) return;
      setActive((a) => {
        const i = TABS.findIndex((x) => x.key === a);
        return TABS[(i + 1) % TABS.length].key;
      });
    }, 4200);
    return () => clearInterval(t);
  }, [inView, manualUntil]);

  useEffect(() => {
    const btn = tabRefs.current[active];
    const box = frame.current;
    if (!btn || !box) return;
    const b = btn.getBoundingClientRect();
    const f = box.getBoundingClientRect();
    setCursor({ x: b.left - f.left + 40, y: b.top - f.top + b.height / 2 });
  }, [active]);

  const pick = (k: TabKey) => {
    setActive(k);
    setManualUntil(Date.now() + 12000);
  };

  return (
    <div
      ref={frame}
      className={`relative overflow-hidden rounded-2xl border text-[12.5px] ${className}`}
      style={{ background: T.bg, borderColor: T.border, color: T.text }}
    >
      {/* top bar */}
      <div className="flex items-center gap-3 border-b px-3 py-2.5 sm:px-4" style={{ borderColor: T.border }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/trag-round.png" alt="" className="h-6 w-6 rounded-full" />
        <span className="hidden font-semibold tracking-[0.2em] sm:inline">TRAG</span>
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md border px-2.5 text-[11px]" style={{ borderColor: T.border, background: T.panel, color: T.muted }}>
          <span>⌕</span>
          <span className="truncate">Search token or paste contract address…</span>
          <kbd className="ml-auto hidden rounded border px-1.5 text-[9px] sm:inline" style={{ borderColor: T.border }}>/</kbd>
        </div>
        <span className="hidden items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] md:flex" style={{ borderColor: T.border, background: T.panel }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.lime }} />
          7hG4…k9Qp · 12.40 SOL
        </span>
        <span className="flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wider" style={{ color: T.lime, borderColor: `${T.lime}55`, background: `${T.lime}12` }}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: T.lime }} />
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr]">
        <aside
          className="flex gap-1 overflow-x-auto border-b p-2 sm:block sm:border-b-0 sm:border-r [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ borderColor: T.border }}
        >
          {TABS.map((t) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                ref={(el) => { tabRefs.current[t.key] = el; }}
                onClick={() => pick(t.key)}
                data-cursor="arrow"
                className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2 text-left text-[12px] transition-colors sm:mb-0.5 sm:w-full"
                style={{ color: on ? T.text : T.muted, background: on ? `${T.lime}14` : "transparent" }}
              >
                <kbd
                  className="flex h-5 w-5 items-center justify-center rounded border font-mono text-[9px]"
                  style={{ borderColor: on ? `${T.lime}66` : T.border, color: on ? T.lime : T.muted }}
                >
                  {t.k}
                </kbd>
                {t.label}
              </button>
            );
          })}
        </aside>

        <div className="relative min-h-[320px] p-3 sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {active === "terminal" && <Terminal live={inView && active === "terminal"} />}
              {active === "risk" && <Risk />}
              {active === "traders" && <Traders />}
              {active === "automation" && <Automation />}
              {active === "launch" && <Launch live={inView && active === "launch"} />}
              {active === "fees" && <Fees />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-11 w-11 rounded-full border"
        style={{ borderColor: `${T.lime}88`, background: `${T.lime}12`, marginLeft: -22, marginTop: -22 }}
        animate={{ x: cursor.x, y: cursor.y, scale: [1, 0.85, 1] }}
        transition={{ x: { type: "spring", stiffness: 120, damping: 18 }, y: { type: "spring", stiffness: 120, damping: 18 }, scale: { duration: 0.5 } }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: T.lime }} />
      </motion.div>
    </div>
  );
}

/* ---------------- shared ---------------- */

function Panel({ children, className = "", title, right }: { children: React.ReactNode; className?: string; title?: string; right?: React.ReactNode }) {
  return (
    <div className={`rounded-lg border ${className}`} style={{ background: T.panel, borderColor: T.border }}>
      {(title || right) && (
        <div className="flex items-center justify-between border-b px-3 py-2 text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: T.border, color: T.muted }}>
          <span>{title}</span>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

function Level({ level }: { level: "RUGGED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" }) {
  const c = { RUGGED: T.red, CRITICAL: "#ff6b8b", HIGH: T.amber, MEDIUM: "#ffe27a", LOW: T.lime }[level];
  return (
    <span className="rounded px-1.5 py-[2px] text-[9px] font-bold tracking-wider" style={{ color: c, background: `${c}1c`, border: `1px solid ${c}55` }}>
      {level}
    </span>
  );
}

const fmt = (n: number) => n.toFixed(5);

/* ---------------- Terminal ---------------- */

function Terminal({ live }: { live: boolean }) {
  const base = useMemo(() => makeCandles(30), []);
  const [candles, setCandles] = useState<Candle[]>(base);
  const [trades, setTrades] = useState<{ side: "BUY" | "SELL"; sol: number; price: number; w: string; id: number }[]>(() =>
    [0, 1, 2, 3, 4].map((i) => ({ side: i % 3 === 1 ? "SELL" : "BUY", sol: 0.3 + i * 0.4, price: 0.00118, w: WALLETS[i], id: i }))
  );
  const tick = useRef(10);

  useEffect(() => {
    if (!live) return;
    const r = seed(Date.now() % 1000);
    const t = setInterval(() => {
      tick.current++;
      setCandles((cs) => {
        const next = cs.slice();
        const last = { ...next[next.length - 1] };
        const move = (r() - 0.45) * 0.00003;
        last.c = Math.max(0.0006, last.c + move);
        last.h = Math.max(last.h, last.c);
        last.l = Math.min(last.l, last.c);
        last.v += 0.15;
        last.gap = false;
        next[next.length - 1] = last;
        if (tick.current % 6 === 0) {
          next.push({ o: last.c, h: last.c, l: last.c, c: last.c, v: 0.1 });
          next.shift();
        }
        return next;
      });
      setTrades((ts) => {
        const price = candles[candles.length - 1]?.c ?? 0.00118;
        const side: "BUY" | "SELL" = r() > 0.38 ? "BUY" : "SELL";
        return [{ side, sol: +(0.1 + r() * 2.4).toFixed(2), price, w: WALLETS[Math.floor(r() * WALLETS.length)], id: tick.current }, ...ts].slice(0, 6);
      });
    }, 900);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live]);

  const last = candles[candles.length - 1];
  const first = candles.find((c) => !c.gap)!;
  const chg = ((last.c - first.o) / first.o) * 100;
  const up = chg >= 0;

  return (
    <div className="space-y-3">
      {/* token header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `${T.lime}22`, color: T.lime }}>P</span>
          <div>
            <div className="flex items-center gap-2 font-semibold">
              PULSE <span className="font-mono text-[10px]" style={{ color: T.muted }}>PLSE</span>
              <span className="rounded px-1.5 py-[1px] text-[9px]" style={{ background: T.panel2, color: T.muted }}>pump.fun</span>
              <Level level="LOW" />
            </div>
            <div className="font-mono text-[10px]" style={{ color: T.muted }}>Pu1s…pump · 4m ago</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 font-mono">
          <div>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: T.muted }}>Price</div>
            <div className="font-semibold">{fmt(last.c)}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: T.muted }}>MC</div>
            <div className="font-semibold">${Math.round(last.c * 1e9 / 10).toLocaleString()}K</div>
          </div>
          <div className="font-semibold" style={{ color: up ? T.lime : T.red }}>{up ? "▲" : "▼"} {Math.abs(chg).toFixed(1)}%</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_190px]">
        {/* chart */}
        <Panel
          title="1s · from trade events"
          right={<span className="font-mono normal-case tracking-normal">no gap filling</span>}
        >
          <CandleChart candles={candles} />
        </Panel>

        {/* trade box */}
        <Panel title="Trade" right={<span className="font-mono normal-case tracking-normal">hotkeys on</span>}>
          <div className="space-y-2 p-3">
            <div className="grid grid-cols-2 gap-1.5">
              <button className="rounded-md py-1.5 text-[11px] font-bold" style={{ background: T.lime, color: "#07080a" }}>BUY <kbd className="ml-1 opacity-60">B</kbd></button>
              <button className="rounded-md border py-1.5 text-[11px] font-bold" style={{ borderColor: `${T.red}66`, color: T.red }}>SELL <kbd className="ml-1 opacity-60">S</kbd></button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {["0.1", "0.5", "1", "2"].map((a, i) => (
                <button key={a} className="rounded border py-1 font-mono text-[10px]" style={{ borderColor: T.border, background: i === 1 ? `${T.lime}14` : "transparent", color: i === 1 ? T.lime : T.text }}>
                  {a}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {["25%", "50%", "75%", "100%"].map((a) => (
                <button key={a} className="rounded border py-1 font-mono text-[10px]" style={{ borderColor: T.border, color: T.muted }}>{a}</button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t pt-2 font-mono text-[10px]" style={{ borderColor: T.border, color: T.muted }}>
              <span>route</span><span style={{ color: T.text }}>deepest pool</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px]" style={{ color: T.muted }}>
              <span>fee</span><span style={{ color: T.text }}>0.750% · Silver</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px]" style={{ color: T.muted }}>
              <span>signing</span><span style={{ color: T.lime }}>local · no popup</span>
            </div>
          </div>
        </Panel>
      </div>

      {/* trade feed */}
      <Panel title="Trades · reconstructed from reserve deltas">
        <div className="divide-y" style={{ borderColor: T.border }}>
          <AnimatePresence initial={false}>
            {trades.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -8, backgroundColor: t.side === "BUY" ? `${T.lime}22` : `${T.red}22` }}
                animate={{ opacity: 1, x: 0, backgroundColor: "rgba(0,0,0,0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-[52px_1fr_1fr_1fr] items-center gap-2 px-3 py-1.5 font-mono text-[10.5px]"
                style={{ borderColor: T.border }}
              >
                <span className="font-bold" style={{ color: t.side === "BUY" ? T.lime : T.red }}>{t.side}</span>
                <span>{t.sol.toFixed(2)} SOL</span>
                <span style={{ color: T.muted }}>@ {fmt(t.price)}</span>
                <span className="truncate text-right" style={{ color: T.muted }}>{t.w}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Panel>
    </div>
  );
}

function CandleChart({ candles }: { candles: Candle[] }) {
  const W = 560, H = 150, padT = 8, padB = 22;
  const real = candles.filter((c) => !c.gap);
  const min = Math.min(...real.map((c) => c.l));
  const max = Math.max(...real.map((c) => c.h));
  const y = (v: number) => padT + ((max - v) / (max - min || 1)) * (H - padT - padB);
  const slot = W / candles.length;
  const bw = Math.max(3, slot * 0.6);
  const maxV = Math.max(...real.map((c) => c.v));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-40 w-full">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={0} x2={W} y1={padT + g * (H - padT - padB)} y2={padT + g * (H - padT - padB)} stroke="rgba(255,255,255,0.05)" />
      ))}
      {candles.map((c, i) => {
        const x = i * slot + slot / 2;
        if (c.gap) return <text key={i} x={x} y={H - 8} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.18)">·</text>;
        const up = c.c >= c.o;
        const col = up ? T.lime : T.red;
        const top = y(Math.max(c.o, c.c));
        const bot = y(Math.min(c.o, c.c));
        return (
          <g key={i}>
            <rect x={x - bw / 2} y={H - padB + 4} width={bw} height={Math.max(1, (c.v / maxV) * 14)} fill={col} opacity={0.25} />
            <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeWidth={1} />
            <rect x={x - bw / 2} y={top} width={bw} height={Math.max(1.5, bot - top)} fill={col} rx={1} />
          </g>
        );
      })}
      <text x={W - 4} y={y(candles[candles.length - 1].c) - 4} textAnchor="end" fontSize={9} fill={T.lime} fontFamily="monospace">
        {fmt(candles[candles.length - 1].c)}
      </text>
    </svg>
  );
}

/* ---------------- Risk ---------------- */

function Risk() {
  const checks = [
    { k: "AUTHORITY", title: "Mint & freeze", v: "Both revoked", ok: true, note: "Supply cannot be inflated; tokens cannot be frozen in your wallet." },
    { k: "LIQUIDITY", title: "Lock, weighted by pool size", v: "62% locked · pool $41.2K", ok: true, note: "Aggregated across every market, not sampled from one." },
    { k: "HOLDERS", title: "Top-ten concentration", v: "38.4%", ok: false, note: "Pool address excluded so liquidity is not mistaken for a whale." },
    { k: "DEPLOYER", title: "Behaviour, not reputation", v: "Unverified", ok: null, note: "Wallet 3d old · sold own token: no · rug history: unknown" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.15em]" style={{ color: T.muted }}>Risk · PULSE</div>
          <Level level="MEDIUM" />
        </div>
        <div className="ml-auto flex flex-wrap gap-1">
          {(["RUGGED", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((l) => (
            <span key={l} style={{ opacity: l === "MEDIUM" ? 1 : 0.35 }}><Level level={l} /></span>
          ))}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {checks.map((c) => (
          <Panel key={c.k} className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: T.lime }}>{c.k}</span>
              <span
                className="font-mono text-[10px] font-semibold"
                style={{ color: c.ok === true ? T.lime : c.ok === false ? T.amber : T.muted }}
              >
                {c.ok === true ? "✓ " : c.ok === false ? "! " : "? "}{c.v}
              </span>
            </div>
            <div className="mt-1.5 font-medium">{c.title}</div>
            <div className="mt-1 text-[11px] leading-relaxed" style={{ color: T.muted }}>{c.note}</div>
          </Panel>
        ))}
      </div>
      <div className="rounded-lg border px-3 py-2 text-[11px]" style={{ borderColor: `${T.lime}33`, background: `${T.lime}0a`, color: T.muted }}>
        Hard rules override any score. Unanswerable checks read <b style={{ color: T.text }}>Unverified</b>, never <i>Clean</i>.
      </div>
    </div>
  );
}

/* ---------------- Traders ---------------- */

function Traders() {
  const rows = [
    { w: WALLETS[0], in: 14.2, out: 21.8, hold: 3.1, bot: false },
    { w: WALLETS[1], in: 9.5, out: 4.1, hold: 12.6, bot: false },
    { w: WALLETS[2], in: 6.0, out: 8.9, hold: 0, bot: false },
    { w: WALLETS[3], in: 3.3, out: 0, hold: 4.0, bot: false },
    { w: "JUP6…aggr", in: 40.1, out: 40.0, hold: 0, bot: true },
    { w: WALLETS[4], in: 2.1, out: 3.4, hold: 0.2, bot: false },
  ].filter((r) => !r.bot);
  return (
    <Panel title="Traders · average-cost book" right={<span className="font-mono normal-case tracking-normal">1 aggregator filtered</span>}>
      <div className="overflow-x-auto">
        <div className="grid min-w-[460px] grid-cols-[28px_1.4fr_1fr_1fr_1fr_1fr] border-b px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider" style={{ borderColor: T.border, color: T.muted }}>
          <span>#</span><span>Wallet</span><span>Put in</span><span>Took out</span><span>Holding</span><span className="text-right">PnL</span>
        </div>
        {rows.map((r, i) => {
          const pnl = r.out + r.hold - r.in;
          return (
            <div key={r.w} className="grid min-w-[460px] grid-cols-[28px_1.4fr_1fr_1fr_1fr_1fr] items-center border-b px-3 py-2 font-mono text-[11px] last:border-0" style={{ borderColor: T.border }}>
              <span style={{ color: T.muted }}>{i + 1}</span>
              <span className="flex items-center gap-2">
                {r.w}
                {i === 0 && <span className="rounded px-1 text-[8px] font-bold" style={{ background: `${T.lime}22`, color: T.lime }}>TOP</span>}
              </span>
              <span>{r.in.toFixed(1)}</span>
              <span>{r.out.toFixed(1)}</span>
              <span>{r.hold.toFixed(1)}</span>
              <span className="text-right font-semibold" style={{ color: pnl >= 0 ? T.lime : T.red }}>{pnl >= 0 ? "+" : ""}{pnl.toFixed(1)} SOL</span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ---------------- Automation ---------------- */

function Automation() {
  const rules = [
    { name: "Take profit", cond: "MC ≥ $250K", act: "Sell 50%", on: true },
    { name: "Stop loss", cond: "Price ≤ −35%", act: "Sell 100%", on: true },
    { name: "Dip buy", cond: "Price ≤ 0.00104", act: "Buy 0.5 SOL", on: false },
  ];
  const keys = [["Buy", "B"], ["Sell", "S"], ["0.1", "1"], ["0.5", "2"], ["1", "3"], ["2", "4"]];
  return (
    <div className="space-y-3">
      <Panel title="Rules · each fires once, then stops">
        {rules.map((r) => (
          <div key={r.name} className="flex items-center gap-3 border-b px-3 py-2.5 last:border-0" style={{ borderColor: T.border }}>
            <span className="h-4 w-7 rounded-full p-[2px]" style={{ background: r.on ? T.lime : T.panel2, border: `1px solid ${r.on ? T.lime : T.border}` }}>
              <span className="block h-3 w-3 rounded-full" style={{ background: r.on ? "#07080a" : T.muted, marginLeft: r.on ? 12 : 0 }} />
            </span>
            <span className="w-24 font-medium">{r.name}</span>
            <span className="font-mono text-[11px]" style={{ color: T.muted }}>WHEN <b style={{ color: T.text }}>{r.cond}</b></span>
            <span className="ml-auto font-mono text-[11px]" style={{ color: T.muted }}>THEN <b style={{ color: r.act.startsWith("Buy") ? T.lime : T.red }}>{r.act}</b></span>
          </div>
        ))}
      </Panel>
      <Panel title="Hotkeys" right={<span className="font-mono normal-case tracking-normal" style={{ color: T.lime }}>master switch: on</span>}>
        <div className="flex flex-wrap gap-2 p-3">
          {keys.map(([l, k]) => (
            <span key={l} className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[11px]" style={{ borderColor: T.border, background: T.panel2 }}>
              {l} <kbd className="rounded border px-1.5 font-mono text-[10px]" style={{ borderColor: `${T.lime}55`, color: T.lime }}>{k}</kbd>
            </span>
          ))}
          <span className="ml-auto self-center text-[10px]" style={{ color: T.muted }}>A key already in use is refused, not stolen.</span>
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- Launch ---------------- */

function Launch({ live }: { live: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!live) return;
    setStep(0);
    const t = setInterval(() => setStep((s) => Math.min(3, s + 1)), 1100);
    return () => clearInterval(t);
  }, [live]);
  const lines = [
    ["Mint account rent", "0.00146 SOL"],
    ["Metadata account", "0.01512 SOL"],
    ["Token account", "0.00204 SOL"],
    ["Network fees", "0.00003 SOL"],
    ["Pool graduation (later)", "0.01000 SOL"],
  ];
  const states = ["Pinning metadata to IPFS…", "Signing in browser…", "Confirming on Solana…", "Confirmed"];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Panel title="New token">
        <div className="space-y-2 p-3">
          {[["Name", "Pulse"], ["Symbol", "PLSE"], ["Description", "Community token, fair launch"]].map(([k, v]) => (
            <div key={k}>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: T.muted }}>{k}</div>
              <div className="mt-0.5 rounded-md border px-2.5 py-1.5 text-[11px]" style={{ borderColor: T.border, background: T.panel2 }}>{v}</div>
            </div>
          ))}
          <div className="flex h-14 items-center justify-center rounded-md border border-dashed text-[10px]" style={{ borderColor: T.border, color: T.muted }}>
            ⬆ Artwork · pinned to IPFS
          </div>
        </div>
      </Panel>
      <Panel title="Honest cost accounting" right={<span className="font-mono normal-case tracking-normal">balance 12.40 SOL</span>}>
        <div className="p-3">
          {lines.map(([k, v]) => (
            <div key={k} className="flex justify-between py-1 font-mono text-[10.5px]" style={{ color: T.muted }}>
              <span>{k}</span><span style={{ color: T.text }}>{v}</span>
            </div>
          ))}
          <div className="mt-1 flex justify-between border-t pt-2 font-mono text-[12px] font-semibold" style={{ borderColor: T.border }}>
            <span>Total now</span><span style={{ color: T.lime }}>0.0339 SOL</span>
          </div>
          <button className="mt-3 w-full rounded-md py-2 text-[11px] font-bold" style={{ background: T.lime, color: "#07080a" }}>
            Mint in one transaction
          </button>
          <div className="mt-2.5 flex items-center gap-2 font-mono text-[10.5px]">
            {step < 3 ? (
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: T.amber }} />
            ) : (
              <span className="h-2 w-2 rounded-full" style={{ background: T.lime }} />
            )}
            <span style={{ color: step < 3 ? T.muted : T.lime }}>{states[step]}</span>
            {step === 3 && <span className="ml-auto" style={{ color: T.muted }}>CA <b style={{ color: T.text }}>Pu1s…pump</b></span>}
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- Fees & Portfolio ---------------- */

function Fees() {
  const positions = [
    { t: "PULSE", entry: 0.00104, mark: 0.00121, sol: 2.0 },
    { t: "ORBIT", entry: 0.0082, mark: 0.0071, sol: 1.2 },
    { t: "NOVA", entry: 0.00031, mark: 0.00058, sol: 0.6 },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-[220px_1fr]">
      <Panel title="Your tier">
        <div className="p-3">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold" style={{ color: T.lime }}>Silver</span>
            <span className="font-mono text-[10px]" style={{ color: T.muted }}>net 0.750%</span>
          </div>
          <div className="mt-2 font-mono text-[10px]" style={{ color: T.muted }}>30-day volume</div>
          <div className="font-mono text-[12px]">128.4 <span style={{ color: T.muted }}>/ 250 SOL → Gold</span></div>
          <div className="mt-1.5 h-1.5 rounded-full" style={{ background: T.panel2 }}>
            <div className="h-full rounded-full" style={{ width: "51%", background: T.lime }} />
          </div>
          <div className="mt-3 space-y-1 font-mono text-[10.5px]">
            <div className="flex justify-between" style={{ color: T.muted }}><span>Cashback paid</span><span style={{ color: T.lime }}>+0.42 SOL</span></div>
            <div className="flex justify-between" style={{ color: T.muted }}><span>Referral L1/L2/L3</span><span style={{ color: T.text }}>34 / 5 / 3%</span></div>
            <div className="flex justify-between" style={{ color: T.muted }}><span>Recorded against</span><span style={{ color: T.text }}>each signature</span></div>
          </div>
        </div>
      </Panel>
      <Panel title="Portfolio · real cost basis" right={<span className="font-mono normal-case tracking-normal">marked live</span>}>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] border-b px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider" style={{ borderColor: T.border, color: T.muted }}>
          <span>Token</span><span>Avg entry</span><span>Mark</span><span className="text-right">Unrealised</span>
        </div>
        {positions.map((p) => {
          const pct = ((p.mark - p.entry) / p.entry) * 100;
          return (
            <div key={p.t} className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center border-b px-3 py-2 font-mono text-[11px] last:border-0" style={{ borderColor: T.border }}>
              <span className="font-semibold">{p.t}</span>
              <span style={{ color: T.muted }}>{fmt(p.entry)}</span>
              <span>{fmt(p.mark)}</span>
              <span className="text-right font-semibold" style={{ color: pct >= 0 ? T.lime : T.red }}>{pct >= 0 ? "+" : ""}{pct.toFixed(1)}%</span>
            </div>
          );
        })}
        <div className="flex justify-between px-3 py-2 font-mono text-[10.5px]" style={{ color: T.muted }}>
          <span>Realised (kept apart)</span><span style={{ color: T.lime }}>+1.86 SOL</span>
        </div>
      </Panel>
    </div>
  );
}
