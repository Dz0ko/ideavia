import type { Metadata } from "next";
import Products from "@/components/sections/Products";
import ProductCarousel from "@/components/sections/ProductCarousel";
import CtaBanner from "@/components/sections/CtaBanner";
import { productItems, productGroups } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Automation tools built by IDAEVIA: X growth automation, Instagram warm-up and AI chatbots for Instagram, X, Telegram, WhatsApp, Discord and your own site.",
};

export default function ProductsPage() {
  return (
    <main className="pt-[72px]">
      <Products
        items={productItems}
        groups={productGroups}
        eyebrow="Built by IDAEVIA"
        title="OUR PRODUCTS."
        intro="Tools we build and operate ourselves: growth automation for X and Instagram, AI chatbots that run conversations on any platform, and complete brand kits designed in-house."
      />
      <ProductCarousel items={productItems} />
      <CtaBanner />
    </main>
  );
}
