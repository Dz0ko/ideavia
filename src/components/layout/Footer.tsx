import Link from "next/link";
import { socials, legalLinks } from "@/lib/data";
import Wordmark from "@/components/ui/Wordmark";

const nav = [
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SocialIcon = ({ k }: { k: string }) => {
  const common = { className: "h-[18px] w-[18px]", fill: "currentColor", viewBox: "0 0 24 24" } as const;
  switch (k) {
    case "telegram":
      return <svg {...common}><path d="M21.9 4.6 18.9 19c-.2 1-.8 1.3-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L9.5 13.1 5 11.7c-1-.3-1-1 .2-1.4l17.4-6.7c.8-.3 1.5.2 1.3 1z" /></svg>;
    case "instagram":
      return <svg {...common}><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21.8 8c-.1-1.7-.5-3.2-1.7-4.4S17.4 2.2 15.7 2.1C14 2 10 2 8.3 2.1 6.6 2.2 5.1 2.6 3.9 3.8S2.2 6.6 2.1 8.3C2 10 2 14 2.1 15.7c.1 1.7.5 3.2 1.7 4.4s2.7 1.6 4.4 1.7c1.7.1 5.7.1 7.4 0 1.7-.1 3.2-.5 4.4-1.7s1.6-2.7 1.7-4.4c.1-1.7.1-5.7 0-7.7zM19.7 17.3a3.6 3.6 0 0 1-2 2c-1.4.6-4.8.4-5.7.4s-4.3.2-5.7-.4a3.6 3.6 0 0 1-2-2c-.6-1.4-.4-4.8-.4-5.7s-.2-4.3.4-5.7a3.6 3.6 0 0 1 2-2c1.4-.6 4.8-.4 5.7-.4s4.3-.2 5.7.4a3.6 3.6 0 0 1 2 2c.6 1.4.4 4.8.4 5.7s.2 4.3-.4 5.7z" /></svg>;
    case "x":
      return <svg {...common}><path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.7l7.7-8.8L1.3 2.3h6.8l4.7 6.2 5.4-6.2zm-1.2 17.5h1.8L7.1 4.1H5.1l11.9 15.7z" /></svg>;
    case "linkedin":
      return <svg {...common}><path d="M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6zM8 19H5V9.5h3V19zM6.5 8.2a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3h.1c.4-.8 1.4-1.5 2.8-1.5 3 0 3.6 2 3.6 4.6V19z" /></svg>;
    default:
      return null;
  }
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="container-x py-16">
        {/* top row: brand + social */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-2xl font-semibold tracking-[0.28em]"><Wordmark /></div>
            <p className="mt-3 text-sm text-chalk/50">
              <span className="italic text-chalk/70">ideæ via</span> · the path of the idea. From idea to reality.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => {
              const cls = "flex h-10 w-10 items-center justify-center rounded-full border transition-colors";
              return s.href ? (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  title={s.label}
                  data-cursor="arrow"
                  className={`${cls} border-white/12 text-chalk/70 hover:border-white/40 hover:text-white`}
                >
                  <SocialIcon k={s.key} />
                </a>
              ) : (
                <span key={s.key} aria-label={`${s.label} (coming soon)`} title={`${s.label} · coming soon`} className={`${cls} border-white/8 text-chalk/30`}>
                  <SocialIcon k={s.key} />
                </span>
              );
            })}
          </div>
        </div>

        {/* nav row */}
        <nav className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/5 pt-8">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-chalk/60 transition-colors hover:text-white" data-cursor="arrow">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* bottom row */}
        <div className="mt-8 flex flex-col gap-3 text-xs text-chalk/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} IDAEVIA. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white" data-cursor="arrow">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
