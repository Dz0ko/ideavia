"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const nav = [
  { href: "/admin", label: "Overview", icon: "◎" },
  { href: "/admin/submissions", label: "Submissions", icon: "✉" },
  { href: "/admin/analytics", label: "Analytics", icon: "▤" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#050506] text-chalk">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-white/6 bg-[#08080b] md:flex">
        <div className="px-5 py-5">
          <Link href="/admin" className="text-base font-semibold tracking-[0.28em]">
            IDAEVIA
          </Link>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-chalk/35">
            Admin
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 px-3">
          {nav.map((n) => {
            const active =
              n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-white/8 text-white"
                    : "text-chalk/55 hover:bg-white/4 hover:text-white"
                }`}
              >
                <span className="w-4 text-center text-xs opacity-70">{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-white/6 p-3">
          <Link
            href="/"
            target="_blank"
            className="block rounded-lg px-3 py-2 text-sm text-chalk/55 hover:bg-white/4 hover:text-white"
          >
            ↗ View site
          </Link>
          <button
            onClick={logout}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-chalk/55 hover:bg-white/4 hover:text-white"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-3 md:hidden">
          <span className="text-sm font-semibold tracking-[0.25em]">IDAEVIA</span>
          <div className="flex gap-1 overflow-x-auto text-xs">
            {nav.map((n) => {
              const active =
                n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`shrink-0 rounded-md px-2.5 py-1.5 ${
                    active ? "bg-white/10 text-white" : "text-chalk/60"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <button onClick={logout} className="shrink-0 rounded-md px-2.5 py-1.5 text-chalk/60">
              Log out
            </button>
          </div>
        </div>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
