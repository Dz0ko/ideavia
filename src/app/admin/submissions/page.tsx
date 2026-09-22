"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Empty, StatusBadge, fmtDate } from "@/components/admin/ui";

type Submission = {
  id: number;
  ts: number;
  type: string | null;
  idea: string | null;
  name: string;
  company: string | null;
  email: string;
  budget: string | null;
  status: string;
  country: string | null;
  contact?: string | null;
};

/** Telegram handle or WhatsApp number → clickable link. */
function contactLink(c: string) {
  const v = c.trim();
  if (v.startsWith("@")) return { href: `https://t.me/${v.slice(1)}`, label: `${v} (Telegram)` };
  const digits = v.replace(/[^\d]/g, "");
  if (/^\+?[\d\s()-]{7,}$/.test(v) && digits.length >= 7) return { href: `https://wa.me/${digits}`, label: `${v} (WhatsApp)` };
  if (/^[a-z0-9_]{4,}$/i.test(v)) return { href: `https://t.me/${v}`, label: `@${v} (Telegram)` };
  return { href: null, label: v };
}

function SubmissionsInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState(params.get("status") || "all");
  const [items, setItems] = useState<Submission[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/submissions?status=${status}`, { cache: "no-store" });
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const data = await res.json();
    setItems(data.items);
    setStatuses(data.statuses);
    setLoading(false);
  }, [status]);

  useEffect(() => {
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, [load]);

  async function setItemStatus(id: number, next: string) {
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status: next } : x)));
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this submission permanently?")) return;
    await fetch(`/api/admin/submissions?id=${id}`, { method: "DELETE" });
    setOpen(null);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Submissions</h1>
        <div className="flex flex-wrap gap-1 rounded-lg border border-white/8 p-1 text-xs">
          {["all", ...statuses].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-md px-3 py-1.5 capitalize ${
                status === s ? "bg-white/10 text-white" : "text-chalk/50 hover:text-white"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {loading ? (
          <Empty>Loading…</Empty>
        ) : items.length === 0 ? (
          <Empty>No submissions{status !== "all" ? ` with status "${status}"` : ""}.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wider text-chalk/40">
                <tr>
                  <th className="py-2 pr-4">Received</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Building</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Telegram / WhatsApp</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setOpen(open === s.id ? null : s.id)}
                    className={`cursor-pointer border-t border-white/5 transition-colors hover:bg-white/[0.03] ${
                      open === s.id ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <td className="py-2.5 pr-4 whitespace-nowrap text-chalk/50">{fmtDate(s.ts)}</td>
                    <td className="py-2.5 pr-4 font-medium">
                      {s.name}
                      {s.company && <span className="ml-1.5 text-chalk/40">· {s.company}</span>}
                    </td>
                    <td className="py-2.5 pr-4">{s.type ?? "N/A"}</td>
                    <td className="py-2.5 pr-4 text-chalk/60">{s.email}</td>
                    <td className="py-2.5 pr-4 text-chalk/60">{s.contact ?? "N/A"}</td>
                    <td className="py-2.5">
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {open !== null && (() => {
        const s = items.find((x) => x.id === open);
        if (!s) return null;
        return (
          <Card
            title={`Submission #${s.id}`}
            action={
              <button onClick={() => setOpen(null)} className="text-xs text-chalk/50 hover:text-white">
                Close
              </button>
            }
          >
            <div className="grid gap-6 md:grid-cols-[1fr_260px]">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-chalk/40">Idea</div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-chalk/80">
                  {s.idea || <span className="text-chalk/35">No description provided.</span>}
                </p>
              </div>
              <dl className="space-y-3 text-sm">
                <Row k="Name" v={s.name} />
                <Row k="Company" v={s.company ?? "N/A"} />
                <Row k="Email" v={<a className="text-[#8b97ff] hover:underline" href={`mailto:${s.email}`}>{s.email}</a>} />
                <Row
                  k="Telegram / WhatsApp"
                  v={(() => {
                    if (!s.contact) return "N/A";
                    const c = contactLink(s.contact);
                    return c.href ? (
                      <a className="text-[#8b97ff] hover:underline" href={c.href} target="_blank" rel="noreferrer">{c.label}</a>
                    ) : c.label;
                  })()}
                />
                <Row k="Building" v={s.type ?? "N/A"} />
                <Row k="Country" v={s.country ?? "N/A"} />
                <Row k="Received" v={new Date(s.ts).toLocaleString()} />
                <div className="pt-2">
                  <div className="text-[11px] uppercase tracking-wider text-chalk/40">Status</div>
                  <select
                    value={s.status}
                    onChange={(e) => setItemStatus(s.id, e.target.value)}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm capitalize outline-none focus:border-accent"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st} className="bg-[#0b0b0f]">
                        {st.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => remove(s.id)}
                  className="mt-2 text-xs text-[#ff6b8b]/70 hover:text-[#ff6b8b]"
                >
                  Delete submission
                </button>
              </dl>
            </div>
          </Card>
        );
      })()}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-chalk/40">{k}</dt>
      <dd className="mt-0.5">{v}</dd>
    </div>
  );
}

export default function SubmissionsPage() {
  return (
    <Suspense>
      <SubmissionsInner />
    </Suspense>
  );
}
