import type { Metadata } from "next";
import Studio from "@/components/sections/Studio";
import Capabilities from "@/components/sections/Capabilities";
import Journey from "@/components/sections/Journey";
import DevelopmentRoom from "@/components/sections/DevelopmentRoom";
import Technology from "@/components/sections/Technology";
import WhyIdaevia from "@/components/sections/WhyIdaevia";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Your idea. Our engineering. IDAEVIA builds websites, landing pages, marketplaces, mobile apps, SaaS, games, Web3, AI, automations and custom software for clients end-to-end.",
};

export default function StudioPage() {
  return (
    <main className="pt-[72px]">
      <Studio />
      <Capabilities />
      <Journey />
      <DevelopmentRoom />
      <Technology />
      <WhyIdaevia />
      <CtaBanner />
    </main>
  );
}
