import type { Metadata } from "next";
import ShowcasePage from "@/components/ShowcasePage";
import { productItems } from "@/lib/data";

export function generateStaticParams() {
  return productItems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = productItems.find((x) => x.slug === params.slug);
  return p ? { title: p.name, description: p.description } : { title: "Product" };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ShowcasePage slug={params.slug} kind="product" />;
}
