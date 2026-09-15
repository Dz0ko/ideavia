"use client";

import { useEffect, useState } from "react";
import type { Stats } from "@/lib/db";

/** Polls /api/admin/stats every `intervalMs` while the tab is visible. */
export function useStats(days = 30, intervalMs = 5000) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const load = async () => {
      try {
        const res = await fetch(`/api/admin/stats?days=${days}`, {
          cache: "no-store",
        });
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Stats;
        if (alive) {
          setStats(data);
          setError(null);
        }
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "error");
      } finally {
        if (alive) {
          timer = setTimeout(
            load,
            document.visibilityState === "visible" ? intervalMs : intervalMs * 6
          );
        }
      }
    };
    load();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [days, intervalMs]);

  return { stats, error };
}
