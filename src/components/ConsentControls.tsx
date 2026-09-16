"use client";

import { useEffect, useState } from "react";
import { clearConsent, getConsent, setConsent, type Consent } from "@/lib/consent";

/** Lets a visitor see and change their analytics choice (used on the Cookie Policy page). */
export default function ConsentControls() {
  const [c, setC] = useState<Consent | null>(null);
  useEffect(() => {
    const sync = () => setC(getConsent());
    sync();
    window.addEventListener("idevia:consent", sync);
    return () => window.removeEventListener("idevia:consent", sync);
  }, []);

  const label = c === "all" ? "Analytics accepted" : c === "essential" ? "Essential only" : "No choice made yet";

  return (
    <div className="rounded-2xl border border-white/8 bg-ink-800 p-6">
      <div className="eyebrow mb-2">Your current choice</div>
      <div className="text-lg font-semibold">{label}</div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button onClick={() => setConsent("all")} data-cursor="arrow" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-accent hover:text-white">
          Accept analytics
        </button>
        <button onClick={() => setConsent("essential")} data-cursor="arrow" className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-chalk/80 transition-colors hover:border-white/40 hover:text-white">
          Essential only
        </button>
        <button onClick={() => clearConsent()} data-cursor="arrow" className="rounded-full px-4 py-2 text-xs text-chalk/50 transition-colors hover:text-white">
          Reset and forget my identifiers
        </button>
      </div>
    </div>
  );
}
