import type { Metadata } from "next";
import ShowcasePage from "@/components/ShowcasePage";
import { projectItems } from "@/lib/data";

export function generateStaticParams() {
  return projectItems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projectItems.find((x) => x.slug === params.slug);
  return p ? { title: p.name, description: p.description } : { title: "Project" };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ShowcasePage slug={params.slug} kind="project" />;
}
