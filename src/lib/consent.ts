"use client";

/**
 * Consent state lives in localStorage (no cookie needed).
 *   "all"        → analytics allowed
 *   "essential"  → analytics off
 *   null         → not decided yet (banner shown, analytics off)
 */
export const CONSENT_KEY = "idevia_consent";
export type Consent = "all" | "essential";

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent("idevia:consent", { detail: v }));
}

export function clearConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem("idevia_vid");
    sessionStorage.removeItem("idevia_sid");
  } catch {}
  window.dispatchEvent(new CustomEvent("idevia:consent", { detail: null }));
}
