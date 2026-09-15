"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";

/**
 * Wraps the public site chrome (nav, footer, cursor, smooth scroll,
 * analytics beacon). The admin panel under /admin renders bare.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    document.documentElement.classList.toggle("admin-mode", !!isAdmin);
  }, [isAdmin]);

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <CustomCursor />
      <Analytics />
      <CookieConsent />
      <SmoothScroll>
        <Nav />
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
}
