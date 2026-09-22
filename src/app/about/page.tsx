import type { Metadata } from "next";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import TechUniverseSection from "@/components/sections/TechUniverseSection";
import WhyIdaevia from "@/components/sections/WhyIdaevia";
import Numbers from "@/components/sections/Numbers";
import Vision from "@/components/sections/Vision";
import PossibleCta from "@/components/sections/PossibleCta";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "About",
  description: "We are builders. IDAEVIA turns ambitious ideas into reality.",
};

export default function AboutPage() {
  return (
    <main className="pt-[72px]">
      <Intro />
      <About />
      <PossibleCta eyebrow="Our promise" />
      <TechUniverseSection />
      <WhyIdaevia />
      <Numbers />
      <Vision />
      <CtaBanner />
    </main>
  );
}
