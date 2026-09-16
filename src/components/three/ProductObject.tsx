"use client";

import LazyScene from "./LazyScene";
import { ProductMesh } from "./objects";

/** Product-specific 3D hero object (token, candles, cubes, dice, chips, neural net). */
export default function ProductObject({
  slug,
  accent,
  className = "",
}: {
  slug: string;
  accent: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${accent}55, transparent 60%)` }}
      />
      <LazyScene className="relative h-full w-full" accent={accent} camera={{ position: [0, 0, 6.2], fov: 40 }}>
        <ProductMesh slug={slug} accent={accent} />
      </LazyScene>
    </div>
  );
}
