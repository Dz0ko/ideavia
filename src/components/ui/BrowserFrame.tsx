import { ReactNode } from "react";

/** A minimal browser window chrome around any content. */
export default function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  const pretty = url?.replace(/^https?:\/\//, "");
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/8 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto flex h-6 w-full max-w-[70%] items-center justify-center gap-1.5 truncate rounded-md bg-white/5 px-2 font-mono text-[10px] text-chalk/50 sm:max-w-[60%]">
          <span className="text-[9px]">🔒</span>
          {pretty ?? "localhost"}
        </span>
      </div>
      {children}
    </div>
  );
}
