"use client";

import { useEffect, useState } from "react";

/**
 * "Site ready" signal: flips once the preloader has finished (or was skipped).
 * Entrance animations for the nav, hero text and globe wait for it so they
 * play in front of the user instead of behind the loading screen.
 */

const EVENT = "idevia:ready";
let ready = false;

export function markSiteReady() {
  if (ready) return;
  ready = true;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

export function useSiteReady() {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (ready) {
      setState(true);
      return;
    }
    const on = () => setState(true);
    window.addEventListener(EVENT, on);
    // safety net: never leave the site hidden if the signal is somehow missed
    const t = setTimeout(markSiteReady, 6000);
    return () => {
      window.removeEventListener(EVENT, on);
      clearTimeout(t);
    };
  }, []);
  return state;
}
