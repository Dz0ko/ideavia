import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import HeroTransform from "@/components/sections/HeroTransform";
import WhatIsIdaevia from "@/components/sections/WhatIsIdaevia";
import Journey from "@/components/sections/Journey";
import Vision from "@/components/sections/Vision";
import IdaeviaBuild from "@/components/sections/IdaeviaBuild";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <HeroTransform />
        <WhatIsIdaevia />
        <Journey />
        <Vision />
        <IdaeviaBuild />
        <FinalCta />
      </main>
    </>
  );
}
