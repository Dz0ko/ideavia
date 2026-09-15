"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const TechUniverse = dynamic(() => import("@/components/three/TechUniverse"), {
  ssr: false,
});

const detail: Record<string, string> = {
  WEB3: "Token launchpads, DEX, wallets, NFT platforms, DeFi and smart contracts.",
  GAMING: "Web3 games, casual and mobile games, multiplayer and game economies.",
  CASINO: "Casino and iGaming platforms: lobby, wallet, rewards, VIP and analytics.",
  MARKETPLACES: "Car marketplaces, real estate platforms, rentals, booking and service marketplaces.",
  "E-COMMERCE": "Multi-vendor stores, checkout, payments and inventory systems.",
  WEBSITES: "Corporate websites, landing pages, portfolios and 3D interactive experiences.",
  SAAS: "CRM, dashboards, analytics, subscriptions and admin panels built to scale.",
  MOBILE: "iOS, Android and cross-platform apps with their backends.",
  AI: "Agents, chatbots, recommendation systems and AI integrations.",
  AUTOMATION: "Business workflows, bots, scrapers, API integrations and CRM/ERP sync.",
  BRANDING: "Full branding: logo, identity, visual language, guidelines and launch assets.",
  MARKETING: "Social media marketing automation: growth, content pipelines, outreach and funnels.",
  FINTECH: "Payments, trading and high-volume financial systems.",
  INFRASTRUCTURE: "Cloud, databases, security, DevOps and scalability.",
};

export default function TechUniverseSection() {
  const [active, setActive] = useState("WEB3");

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-900 py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Ecosystem"
          title="THE IDAEVIA UNIVERSE"
          intro="A living map of everything we build, from blockchain to booking platforms. Hover, drag and rotate, then pick a domain."
          align="center"
        />
      </div>

      <div className="relative mt-6 grid items-center gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="h-[360px] w-full sm:h-[480px] md:h-[600px]">
          <TechUniverse active={active} onSelect={setActive} className="h-full w-full" />
        </div>

        <div className="container-x lg:pr-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8"
            >
              <span className="eyebrow">Selected domain</span>
              <h3 className="mt-4 text-4xl font-semibold tracking-tight accent-text">
                {active}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-chalk/60">
                {detail[active]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
