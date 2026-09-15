import type { Metadata } from "next";
import Products from "@/components/sections/Products";
import CtaBanner from "@/components/sections/CtaBanner";
import { projectItems, projectGroups } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected platforms IDAEVIA has designed and built: TRAG, the Solana trading terminal, and NEXORA CRM for creator agencies.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-[72px]">
      <Products
        id="projects"
        items={projectItems}
        groups={projectGroups}
        eyebrow="Selected Projects"
        title="PROJECTS WE'VE BUILT."
        intro="Platforms and products we've designed, engineered and shipped. Each one comes with a full case study, a live demo and a presentation."
      />
      <CtaBanner />
    </main>
  );
}
