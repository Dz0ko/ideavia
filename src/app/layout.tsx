import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

// Rendered per request so the CSP nonce from middleware reaches every inline script.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://idaevia.com"),
  title: {
    default: "IDAEVIA · From Idea to Reality",
    template: "%s · IDAEVIA",
  },
  description:
    "IDAEVIA (ideæ via: the path of the idea) designs and builds every kind of digital product: Web3 platforms, Web3 and casual games, casino, car and real estate marketplaces, websites and landing pages, SaaS, mobile apps, AI, automation and custom software.",
  keywords: [
    "IDAEVIA",
    "software development company",
    "Web3 development",
    "blockchain",
    "game development",
    "casino platform",
    "marketplace development",
    "car marketplace",
    "real estate platform",
    "website development",
    "landing page",
    "SaaS",
    "mobile app development",
    "AI",
    "automation",
    "custom software",
  ],
  openGraph: {
    title: "IDAEVIA · From Idea to Reality",
    description: "We turn ambitious ideas into digital products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={space.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
