import type { Metadata } from "next";
import Lab from "@/components/sections/Lab";
import Numbers from "@/components/sections/Numbers";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "The Lab",
  description: "Products currently in development inside the IDAEVIA lab.",
};

export default function LabPage() {
  return (
    <main className="pt-[72px]">
      <Lab />
      <Numbers />
      <CtaBanner />
    </main>
  );
}
