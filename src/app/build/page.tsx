import type { Metadata } from "next";
import IdaeviaBuild from "@/components/sections/IdaeviaBuild";

export const metadata: Metadata = {
  title: "Build",
  description: "Build websites, apps and digital products with an AI product team in one workspace.",
};

export default function BuildPage() {
  return (
    <main className="pt-[72px]">
      <IdaeviaBuild />
    </main>
  );
}
