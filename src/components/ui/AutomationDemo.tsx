"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* IDAEVIA automation palette (matches the product artwork) */
const A = {
  bg: "#0b0b10",
  panel: "#111118",
  panel2: "#16161f",
  border: "rgba(255,255,255,0.08)",
  blue: "#2f3ae6",
  blueSoft: "#5b63ff",
  green: "#3ddc97",
  muted: "#7a7d8f",
  text: "#f1f1f5",
};

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Frame({ children, className = "", title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${className}`} style={{ background: A.bg, borderColor: A.border, color: A.text }}>
      {title !== undefined && (
        <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: A.border }}>
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-[11px]" style={{ color: A.muted }}>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function Mono({ children, color = A.muted, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${className}`} style={{ color }}>{children}</span>;
}

/* ================================ CHATBOT ================================ */

const SCRIPT: { from: "bot" | "user"; text: string }[] = [
  { from: "bot", text: "Hey, saw you run an agency. What are you using for outreach right now?" },
  { from: "user", text: "Mostly manual DMs, takes forever" },
  { from: "bot", text: "That's the part we automate. Same voice as yours, running on your accounts. Want a 15-minute walkthrough this week?" },
  { from: "user", text: "Thursday works" },
  { from: "bot", text: "Locked in, Thursday 14:00. I'll send the invite now and pass you the thread. 🎯" },
];

export function ChatbotDemo() {
  const { ref, inView } = useInView();
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const [handled, setHandled] = useState(1840);

  useEffect(() => {
    if (!inView) return;
    setShown(1);
    let i = 1;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (i >= SCRIPT.length) {
        t = setTimeout(() => { i = 1; setShown(1); step(); }, 4500);
        return;
      }
      setTyping(SCRIPT[i].from === "bot");
      t = setTimeout(() => {
        setTyping(false);
        i++;
        setShown(i);
        if (i === SCRIPT.length) setHandled((h) => h + 1);
        step();
      }, SCRIPT[i].from === "bot" ? 1600 : 1100);
    };
    step();
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <Frame>
      <div ref={ref}>
        <div className="flex items-center justify-between border-b px-4 py-3.5 sm:px-5" style={{ borderColor: A.border }}>
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full" style={{ background: A.blue }} />
            <div>
              <div className="text-[15px] font-semibold">Sales agent</div>
              <Mono color={A.green}>Online · Instagram DM</Mono>
            </div>
          </div>
          <span className="hidden rounded-md border px-3 py-1.5 sm:inline" style={{ borderColor: A.border }}>
            <Mono>Goal: Book a call</Mono>
          </span>
        </div>

        <div className="min-h-[300px] space-y-3 px-4 py-5 sm:px-5">
          <AnimatePresence initial={false}>
            {SCRIPT.slice(0, shown).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed sm:max-w-[78%]"
                  style={{
                    background: m.from === "user" ? A.panel2 : i === 0 ? A.panel : A.blue,
                    color: A.text,
                    borderBottomLeftRadius: m.from === "bot" ? 6 : undefined,
                    borderBottomRightRadius: m.from === "user" ? 6 : undefined,
                  }}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
              <div className="flex items-center gap-1.5 rounded-2xl px-4 py-3.5" style={{ background: A.panel }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-2 w-2 rounded-full" style={{ background: A.muted, animation: `pulse 1s ${d * 0.2}s infinite` }} />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-3 border-t" style={{ borderColor: A.border }}>
          {[
            ["Chats handled", handled.toLocaleString(), A.text],
            ["Reply rate", "37%", A.text],
            ["Uptime", "24/7", A.blueSoft],
          ].map(([k, v, c], i) => (
            <div key={k} className={`px-4 py-4 sm:px-5 ${i > 0 ? "border-l" : ""}`} style={{ borderColor: A.border }}>
              <Mono>{k}</Mono>
              <div className="mt-2 text-2xl font-bold tabular-nums sm:text-3xl" style={{ color: c }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* =============================== INSTAGRAM =============================== */

const PLAN = [
  { d: "Day 1–3 · Browse", p: 100 },
  { d: "Day 4–7 · Likes", p: 100 },
  { d: "Day 8–12 · Posting", p: 62 },
  { d: "Day 13+ · Follows & DMs", p: 0 },
];

export function InstagramDemo() {
  const { ref, inView } = useInView();
  const [prog, setProg] = useState(62);
  const [queued, setQueued] = useState(14);
  const [lit, setLit] = useState<number[]>([2, 7]);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setProg((p) => (p >= 100 ? 62 : p + 2));
      setQueued((q) => (q <= 8 ? 14 : q - 1));
      setLit((l) => {
        const next = Math.floor(Math.random() * 9);
        return [...l.slice(-1), next];
      });
    }, 1400);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <Frame>
      <div ref={ref} className="relative grid gap-6 p-5 sm:p-8 md:grid-cols-[minmax(0,260px)_1fr] md:items-center">
        <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full" style={{ background: `${A.blue}33` }} />
        {/* phone */}
        <div className="relative mx-auto w-full max-w-[260px] rounded-[26px] border p-3.5" style={{ borderColor: A.border, background: A.panel }}>
          <div className="mx-auto mb-3 h-1 w-14 rounded-full bg-white/15" />
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => {
              const on = lit.includes(i);
              return (
                <motion.div
                  key={i}
                  animate={{ backgroundColor: on ? A.blue : "#1a1a24" }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square"
                  style={{
                    backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 6px, transparent 6px 14px)",
                  }}
                />
              );
            })}
          </div>
          <div className="mt-4"><Mono>Posts queued · {queued}</Mono></div>
        </div>

        {/* plan */}
        <div className="rounded-xl border" style={{ borderColor: A.border, background: A.panel }}>
          <div className="border-b px-4 py-3" style={{ borderColor: A.border }}><Mono>Warm-up plan</Mono></div>
          <div className="space-y-4 p-4">
            {PLAN.map((s, i) => {
              const p = i === 2 ? prog : s.p;
              const done = p >= 100;
              const queuedRow = i === 3;
              const color = done ? A.green : queuedRow ? A.muted : A.blueSoft;
              return (
                <div key={s.d}>
                  <div className="flex items-center justify-between text-[14px]" style={{ color: queuedRow ? A.muted : A.text }}>
                    <span className="font-medium">{s.d}</span>
                    <span style={{ color }}>{done ? "done" : queuedRow ? "queued" : `${p}%`}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full" style={{ background: A.panel2 }}>
                    <motion.div className="h-full rounded-full" animate={{ width: `${p}%` }} transition={{ duration: 0.6 }} style={{ background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ================================== X ==================================== */

const LOG_POOL = [
  (n: number) => `Liked ${n} posts in #saas`,
  (n: number) => `Replied to ${Math.max(2, Math.round(n / 4))} threads`,
  (n: number) => `Followed ${Math.max(5, Math.round(n / 1.4))} accounts from list`,
  () => `Warm-up step 4 of 7 complete`,
  (n: number) => `Scraped ${n * 12} engagers from @competitor`,
  (n: number) => `Unfollowed ${Math.max(3, Math.round(n / 3))} non-followers`,
];

export function XDemo() {
  const { ref, inView } = useInView();
  const [likes, setLikes] = useState(412);
  const [follows, setFollows] = useState(138);
  const [scraped, setScraped] = useState(6200);
  const [log, setLog] = useState<{ t: string; m: string; id: number }[]>([
    { t: "09:41", m: "Liked 24 posts in #saas", id: 1 },
    { t: "09:36", m: "Replied to 6 threads", id: 2 },
    { t: "09:28", m: "Followed 18 accounts from list", id: 3 },
    { t: "09:15", m: "Warm-up step 4 of 7 complete", id: 4 },
  ]);
  const clock = useRef({ h: 9, m: 41, id: 5 });

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      const c = clock.current;
      c.m += 3 + Math.floor(Math.random() * 5);
      if (c.m >= 60) { c.m -= 60; c.h = (c.h + 1) % 24; }
      const n = 8 + Math.floor(Math.random() * 20);
      const gen = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      const m = gen(n);
      if (m.startsWith("Liked")) setLikes((v) => v + n);
      if (m.startsWith("Followed")) setFollows((v) => v + Math.round(n / 1.4));
      if (m.startsWith("Scraped")) setScraped((v) => v + n * 12);
      setLog((l) => [{ t: `${String(c.h).padStart(2, "0")}:${String(c.m).padStart(2, "0")}`, m, id: c.id++ }, ...l].slice(0, 4));
    }, 2200);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <Frame title="idaevia / x engine">
      <div ref={ref}>
        <div className="absolute" />
        <div className="grid grid-cols-3 border-b" style={{ borderColor: A.border }}>
          {[
            ["Likes today", likes.toLocaleString(), A.text],
            ["New follows", follows.toLocaleString(), A.text],
            ["Scraped", `${(scraped / 1000).toFixed(1)}k`, A.blueSoft],
          ].map(([k, v, c], i) => (
            <div key={k} className={`px-4 py-5 sm:px-5 ${i > 0 ? "border-l" : ""}`} style={{ borderColor: A.border }}>
              <Mono>{k}</Mono>
              <div className="mt-2 text-2xl font-bold tabular-nums sm:text-3xl" style={{ color: c }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between">
            <Mono>Activity log</Mono>
            <span className="flex items-center gap-2">
              <Mono>last 30 min</Mono>
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider" style={{ color: A.green }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: A.green }} /> RUNNING
              </span>
            </span>
          </div>
          <div className="mt-3 space-y-2">
            <AnimatePresence initial={false}>
              {log.map((l, i) => (
                <motion.div
                  key={l.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-4 rounded-md border-l-2 px-4 py-3 text-[14px]"
                  style={{ background: A.panel, borderLeftColor: i === 0 ? A.blue : "transparent" }}
                >
                  <span className="font-mono text-[11px]" style={{ color: A.muted }}>{l.t}</span>
                  <span>
                    {l.m.split(/(#\w+|@\w+)/).map((part, j) =>
                      /^[#@]/.test(part) ? <span key={j} style={{ color: A.blueSoft }}>{part}</span> : part
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Frame>
  );
}
