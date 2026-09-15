"use client";

import UIPreview from "./UIPreview";
import NexoraDemo from "./NexoraDemo";
import TragDemo from "./TragDemo";
import WebsitePreview from "./WebsitePreview";
import { ChatbotDemo, InstagramDemo, XDemo } from "./AutomationDemo";
import BrandKitDemo from "./BrandKitDemo";
import type { Product } from "@/lib/data";

/** Picks the right interactive preview for a product or project. */
export default function ProductPreview({ product }: { product: Product }) {
  switch (product.demo) {
    case "nexora": return <NexoraDemo />;
    case "trag": return <TragDemo />;
    case "chatbot": return <ChatbotDemo />;
    case "instagram": return <InstagramDemo />;
    case "x": return <XDemo />;
    case "website": return <WebsitePreview product={product} />;
    case "brandkit": return product.brandKit ? <BrandKitDemo kit={product.brandKit} /> : <UIPreview accent={product.accent} />;
    default: return <UIPreview accent={product.accent} />;
  }
}
