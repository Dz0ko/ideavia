"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      router.push(params.get("next") || "/admin");
      router.refresh();
    } else {
      setError(true);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-2xl border border-white/8 bg-[#0b0b0f] p-8"
    >
      <div className="text-lg font-semibold tracking-[0.28em]">IDAEVIA</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-chalk/40">
        Admin access
      </div>
      <label className="mt-8 block text-xs uppercase tracking-wider text-chalk/50">
        Password
      </label>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-accent"
      />
      {error && (
        <p className="mt-3 text-xs text-[#ff6b8b]">Wrong password.</p>
      )}
      <button
        disabled={busy || !password}
        className="mt-6 w-full rounded-lg bg-white py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-white disabled:opacity-40"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050506] p-6 text-chalk">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
