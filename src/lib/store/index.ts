import type { Store } from "./types";

export * from "./types";

/**
 * Picks the database backend from the environment:
 *  - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set  → Supabase (Postgres, RLS on)
 *  - otherwise                                     → local SQLite file
 * Both are server-only. Nothing here is ever bundled for the browser.
 */
let cached: Store | null = null;

export async function store(): Promise<Store> {
  if (cached) return cached;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    cached = (await import("./supabase")).supabaseStore;
  } else {
    cached = (await import("./sqlite")).sqliteStore;
  }
  return cached;
}
