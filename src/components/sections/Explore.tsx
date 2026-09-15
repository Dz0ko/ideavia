import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const destinations = [
  {
    href: "/products",
    title: "Products",
    text: "Automation tools we build and operate ourselves: X growth automation, Instagram warm-up and AI chatbots for any platform.",
    cta: "Explore our products",
    accent: "#5b6bff",
  },
  {
    href: "/studio",
    title: "Studio",
    text: "Your idea, our engineering. Websites, marketplaces, apps, games, Web3, AI, full branding and marketing automation built for clients.",
    cta: "Discover our services",
    accent: "#38e8ff",
  },
  {
    href: "/projects",
    title: "Projects",
    text: "Case studies of platforms we've designed and shipped: TRAG, the Solana trading terminal, and NEXORA CRM for creator agencies.",
    cta: "View selected work",
    accent: "#8b7cff",
  },
  {
    href: "/lab",
    title: "Lab",
    text: "A look at what we're building right now: research, development and beta products.",
    cta: "See what's in development",
    accent: "#34e0a1",
  },
  {
    href: "/about",
    title: "About",
    text: "Who we are, how we think and how we take every idea from concept to reality.",
    cta: "Learn more about IDAEVIA",
    accent: "#ffb347",
  },
  {
    href: "/contact",
    title: "Start a Project",
    text: "Have an idea in mind? Tell us what you're building and we'll take it from there.",
    cta: "Get in touch",
    accent: "#ff6b8b",
  },
];

export default function Explore() {
  return (
    <section id="explore" className="scroll-mt-24 border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Discover IDAEVIA"
          title="LEARN MORE ABOUT WHAT WE DO."
          intro="From the products we build and operate ourselves to the work we deliver for clients. Explore the sections below to get a deeper look at IDAEVIA, our expertise and our approach."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.href} delay={i * 0.05}>
              <Link
                href={d.href}
                data-cursor="view"
                className="group relative flex h-full min-h-[260px] flex-col justify-between bg-ink p-8 transition-colors duration-500 hover:bg-ink-700 md:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: d.accent }}
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-chalk/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg text-chalk/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>
                  <h3 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
                    {d.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-chalk/50">
                    {d.text}
                  </p>
                </div>
                <span
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: d.accent }}
                >
                  {d.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span
                  className="absolute inset-x-8 bottom-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: d.accent }}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
