"use client";

import { useEffect, useState } from "react";

type Snippet = { title: string; lang: string; code: string };

const SNIPPETS: Snippet[] = [
  {
    title: "IdaeviaToken.sol",
    lang: "solidity",
    code: `// TRAG Launch: bonding curve token
pragma solidity ^0.8.24;

contract IdaeviaToken is ERC20 {
  uint256 public constant CURVE_K = 1e15;
  mapping(address => uint256) public rewards;

  function buy() external payable {
    uint256 amount = _quote(msg.value);
    _mint(msg.sender, amount);
    emit Bought(msg.sender, amount);
  }

  function _quote(uint256 eth) internal view returns (uint256) {
    return sqrt(totalSupply() ** 2 + eth / CURVE_K) - totalSupply();
  }
}`,
  },
  {
    title: "agent.ts",
    lang: "typescript",
    code: `// NEXORA AI: autonomous fan intelligence
import { Agent, tool } from "@idaevia/ai";

export const analyst = new Agent({
  model: "idaevia-reasoner",
  tools: [
    tool("whaleActivity", async ({ token }) =>
      terminal.whales({ token, window: "24h" })
    ),
  ],
});

const signal = await analyst.run(
  "Summarize risk for $IDV over the last 24h"
);
await crm.notify({ team: "trading", signal });`,
  },
  {
    title: "swap.ts",
    lang: "typescript",
    code: `// TRAG Terminal: on-chain swap
const tx = new Transaction().add(
  swap({ from: USDC, to: IDV, amount: 2_500n })
);

const sig = await connection.sendTransaction(tx, [wallet]);
await connection.confirmTransaction(sig, "finalized");

console.log(\`✔ swapped · \${sig.slice(0, 8)}…\`);`,
  },
];

const KEYWORDS =
  /\b(pragma|solidity|contract|is|function|external|internal|view|payable|returns|public|constant|mapping|emit|return|uint256|address|import|export|const|new|async|await|from)\b/;

const TOKEN =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*n?\b|\b\d+e\d+\b)|(\b[A-Z][A-Za-z0-9_]*\b)|([A-Za-z_$][\w$]*)(?=\()|([A-Za-z_$][\w$]*)/gm;

function highlight(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const [text, comment, str, num, type, call, ident] = m;
    let cls = "text-chalk/85";
    if (comment) cls = "text-chalk/35 italic";
    else if (str) cls = "text-[#8be9a8]";
    else if (num) cls = "text-[#ffb347]";
    else if (type) cls = "text-[#38e8ff]";
    else if (call) cls = "text-[#c3c9ff]";
    else if (ident && KEYWORDS.test(ident)) cls = "text-[#8b97ff]";
    out.push(
      <span key={m.index} className={cls}>
        {text}
      </span>
    );
    last = m.index + text.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

export default function CodeTyper({ className = "" }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const snippet = SNIPPETS[idx];

  useEffect(() => {
    const full = snippet.code.length;
    if (len < full) {
      const ch = snippet.code[len];
      const delay = ch === "\n" ? 90 : /[{};]/.test(ch) ? 45 : 14 + Math.random() * 18;
      const t = setTimeout(() => setLen((l) => l + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLen(0);
      setIdx((i) => (i + 1) % SNIPPETS.length);
    }, 3400);
    return () => clearTimeout(t);
  }, [len, snippet]);

  const typed = snippet.code.slice(0, len);
  const lines = typed.split("\n");
  const totalLines = snippet.code.split("\n").length;

  return (
    <div className={`glass overflow-hidden rounded-2xl ${className}`}>
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 text-xs text-chalk/60">{snippet.title}</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-chalk/35">
          {snippet.lang}
        </span>
      </div>
      <pre className="h-[300px] overflow-hidden p-4 font-mono text-[11px] leading-[1.7] sm:h-[380px] sm:p-5 sm:text-[12.5px] md:text-[13px]">
        {Array.from({ length: totalLines }).map((_, i) => (
          <div key={i} className="flex">
            <span className="w-7 shrink-0 select-none text-right text-chalk/25 pr-4">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {lines[i] !== undefined ? highlight(lines[i]) : ""}
              {i === lines.length - 1 && (
                <span className="ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse bg-accent" />
              )}
            </span>
          </div>
        ))}
      </pre>
      <div className="flex items-center justify-between border-t border-white/8 px-4 py-2 text-[10px] tracking-[0.2em] text-chalk/35">
        <span>IDAEVIA · BUILD</span>
        <span>
          {String(Math.round((len / snippet.code.length) * 100)).padStart(3, " ")}%
        </span>
      </div>
    </div>
  );
}
