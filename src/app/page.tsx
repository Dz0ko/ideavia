import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import HeroTransform from "@/components/sections/HeroTransform";
import WhatIsIdaevia from "@/components/sections/WhatIsIdaevia";
import Explore from "@/components/sections/Explore";
import PossibleCta from "@/components/sections/PossibleCta";
import Journey from "@/components/sections/Journey";
import CtaBanner from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <HeroTransform />
        <WhatIsIdaevia />
        <Journey />
        <PossibleCta />
        <Explore />
        <CtaBanner />
      </main>
    </>
  );
}
