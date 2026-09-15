export type Product = {
  slug: string;
  /** "product" = something IDAEVIA offers; "project" = a case study */
  kind: "product" | "project";
  /** Category used for grouping/filtering on the listing pages */
  group: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  features: string[];
  accent: string;
  cta: string;
  /** Live product URL, if launched */
  url?: string;
  /** Path to a presentation video in /public */
  video?: string;
  /** Short brand tagline */
  tagline?: string;
  /** Feature groups shown on the product page */
  highlights?: { title: string; text: string }[];
  /** "How it works" steps */
  steps?: string[];
  faq?: { q: string; a: string }[];
  /** Which interactive UI demo to render */
  demo?: "nexora" | "trag" | "chatbot" | "instagram" | "x" | "website";
  /** Platforms / integrations */
  platforms?: string[];
  /** Brand mark (square) and optional round icon, paths under /public */
  logo?: string;
  icon?: string;
  /** Poster artwork used as the hero visual (replaces the 3D object) */
  cover?: string;
  /** "portrait" posters sit beside the text; "landscape" screenshots get a browser frame */
  coverAspect?: "portrait" | "landscape";
  /** Additional artwork / screenshots shown in a gallery; tone "light" images are inverted to fit the dark theme */
  gallery?: { src: string; alt: string; tone?: "light" | "dark" }[];
  /** Big-number facts (lines of code, screens, …) */
  stats?: { value: string; label: string }[];
  /** Key/value facts (type, stack, chain, role) */
  facts?: { k: string; v: string }[];
  /** Tiered pricing rows */
  tiers?: { name: string; volume: string; cashback: string; net: string; referral: string }[];
  /** Risk / status levels */
  levels?: { name: string; text: string; color: string }[];
  /** Tech stack groups */
  stack?: { group: string; items: string[] }[];
  /** Product decisions worth defending */
  decisions?: { tag: string; title: string; text: string }[];
};

const AUTO = "#2f3ae6";

export const products: Product[] = [
  /* ------------------------------ AUTOMATION ------------------------------ */
  {
    slug: "x-automation",
    kind: "product",
    group: "Automation",
    logo: "/logos/x.svg",
    name: "X AUTOMATION",
    category: "X / TWITTER",
    headline: "X GROWTH ON AUTOPILOT.",
    tagline: "One tool for the whole loop.",
    description:
      "Likes, replies, follow and unfollow, user scraping and full account warm-up, all running without you. Find the right accounts, engage with them, and build a profile that behaves like a real person.",
    features: [
      "Auto-like",
      "Auto-reply",
      "Follow / Unfollow",
      "Scraper",
      "Account warm-up",
      "Targeted by keyword, list or competitor",
      "Daily caps and randomised delays",
      "Export followers and engagers to CSV",
      "Gradual activity ramp from day one",
      "Multi-account",
    ],
    accent: AUTO,
    cta: "Explore X Automation",
    demo: "x",
    cover: "/products/x-automation/cover.png",
    gallery: [
      { src: "/products/x-automation/ui.png", alt: "X engine dashboard: likes, follows, scraped and activity log" },
      { src: "/products/x-automation/features.png", alt: "X Automation: targeting, caps, CSV export, activity ramp", tone: "light" },
    ],
    highlights: [
      { title: "Find the right accounts", text: "Target by keyword, list or competitor. Scrape followers and engagers of any account and export them to CSV." },
      { title: "Engage like a person", text: "Likes, replies, follows and unfollows on a human rhythm: daily caps, randomised delays, day-and-night pattern." },
      { title: "Warm up from day one", text: "A gradual activity ramp so fresh accounts age safely instead of tripping limits on day one." },
      { title: "Runs without you", text: "Set the targets and the caps once. The engine runs 24/7 and logs every action with a timestamp." },
    ],
    steps: ["Connect your account(s)", "Pick targets: keywords, lists, competitors", "Set daily caps and the ramp", "Watch the activity log"],
    faq: [
      { q: "Can I run several accounts?", a: "Yes. Each account has its own targets, caps and warm-up schedule, and a whole batch can run in parallel." },
      { q: "How do you keep accounts safe?", a: "Daily caps, randomised delays, a day-and-night rhythm and a gradual ramp from day one. The profile behaves like a real person." },
    ],
  },
  {
    slug: "instagram-warmup",
    kind: "product",
    group: "Automation",
    logo: "/logos/instagram.svg",
    name: "INSTAGRAM WARM-UP",
    category: "INSTAGRAM",
    headline: "FRESH ACCOUNTS, AGED THE SAFE WAY.",
    tagline: "Content, posting, likes and follows on a human schedule.",
    description:
      "Content, posting, likes and follows released step by step, so the profile looks lived-in instead of new. Posts and stories are scheduled for you, engagement ramps week by week, and a whole batch can run in parallel.",
    features: [
      "Content feed",
      "Auto-post",
      "Likes",
      "Follows",
      "Drip schedule",
      "Posts and stories scheduled for you",
      "Likes and follows ramp week by week",
      "Random delays, day and night rhythm",
      "Run a whole batch in parallel",
    ],
    accent: AUTO,
    cta: "Explore Instagram Warm-up",
    demo: "instagram",
    cover: "/products/instagram-warmup/cover.png",
    gallery: [
      { src: "/products/instagram-warmup/ui.png", alt: "Instagram warm-up: queued posts and the warm-up plan" },
      { src: "/products/instagram-warmup/features.png", alt: "Instagram warm-up: scheduling, ramp, delays, batches", tone: "light" },
    ],
    highlights: [
      { title: "Content, scheduled", text: "Posts and stories go out on a drip schedule from a content feed, so the profile fills up naturally." },
      { title: "Engagement that ramps", text: "Browse first, then likes, then posting, then follows and DMs, released step by step over the first weeks." },
      { title: "Human rhythm", text: "Random delays and a day-and-night pattern. Nothing fires at 4am at machine speed." },
      { title: "Batches in parallel", text: "Warm up ten accounts or a hundred, each on its own plan, from one dashboard." },
    ],
    steps: ["Add the accounts", "Load a content feed", "Pick a warm-up plan", "Let it age the profiles"],
    faq: [
      { q: "How long does a warm-up take?", a: "A typical plan runs about two weeks: browse, likes, posting, then follows and DMs. Every step can be stretched or shortened." },
      { q: "Do I need to supply content?", a: "You load a content feed once; posts and stories are scheduled from it automatically." },
    ],
  },
  {
    slug: "ai-chatbot",
    kind: "product",
    group: "Automation",
    logo: "/logos/chatbot.svg",
    name: "AI CHATBOT",
    category: "AI / CONVERSATIONS",
    headline: "A CHATBOT THAT WRITES ANYTHING.",
    tagline: "You set the goal and the voice. It handles the conversation.",
    description:
      "Give it the goal, the audience and the voice. The bot runs the conversation from first message to close: sales, pitching, support, DMs and follow-ups, wherever your audience writes to you.",
    features: [
      "Your prompt",
      "Any tone",
      "Any platform",
      "Multi-account",
      "24/7",
      "Sales, pitching, support, onboarding",
      "Formal, friendly or flirty, your choice",
      "Remembers each contact's history",
      "Passes hot leads to you on demand",
    ],
    platforms: ["Instagram", "X", "Telegram", "WhatsApp", "Discord", "Your own site"],
    accent: AUTO,
    cta: "Explore AI Chatbot",
    demo: "chatbot",
    cover: "/products/ai-chatbot/cover.png",
    gallery: [
      { src: "/products/ai-chatbot/ui.png", alt: "AI chatbot: sales agent conversation on Instagram DM" },
      { src: "/products/ai-chatbot/features.png", alt: "AI chatbot: platforms it plugs into and what it does", tone: "light" },
    ],
    highlights: [
      { title: "Goal, audience, voice", text: "Tell it what to achieve (book a call, close a sale, answer support), who it is talking to, and how it should sound." },
      { title: "Plugs in anywhere", text: "Instagram, X, Telegram, WhatsApp, Discord or your own site. Wherever your audience writes to you, the bot can answer there." },
      { title: "Remembers everyone", text: "Each contact's history is kept, so the second conversation picks up where the first one ended." },
      { title: "Hands you the hot leads", text: "When a conversation is ready for a human, it passes the lead to you on demand with the full context." },
    ],
    steps: ["Write the prompt: goal and voice", "Connect the platforms", "Run it on one account or many", "Take over hot leads when you want"],
    faq: [
      { q: "Which platforms does it support?", a: "Instagram, X, Telegram, WhatsApp, Discord and your own website. New channels can be added." },
      { q: "Can it sound like me?", a: "Yes. Formal, friendly or flirty: the tone is yours to set, and it stays consistent across every conversation." },
    ],
  },

  /* ------------------------------- PROJECTS ------------------------------- */
  {
    slug: "trag",
    kind: "project",
    group: "Web3",
    logo: "/logos/trag.png",
    icon: "/logos/trag-round.png",
    name: "TRAG",
    category: "WEB3 / SOLANA TRADING TERMINAL & LAUNCHPAD",
    headline: "FIND IT. CHECK IT. TRADE IT. ONE SCREEN.",
    tagline: "A non-custodial Solana trading terminal and launchpad.",
    description:
      "Traders on Solana normally run three tabs: one to find tokens, one to check whether they are a scam, and one to actually buy. TRAG puts the three on one screen. Non-custodial throughout, with a fee that falls as you trade more.",
    features: [
      "In-browser wallet",
      "Swap routing",
      "Configurable hotkeys",
      "Take profit / stop loss / dip buy",
      "Live candles 1s–1D",
      "Per-token trader ranking",
      "Deployer verification",
      "Venue attribution",
      "One-transaction mint",
      "IPFS metadata",
      "Tiered fees with cashback",
      "3-level referrals",
      "Portfolio with cost basis",
      "Alerts & watchlists",
      "On-chain risk scoring",
      "Admin panel",
    ],
    accent: "#d9ff4a",
    cta: "Explore TRAG",
    video: "/videos/trag.mp4",
    demo: "trag",
    facts: [
      { k: "Type", v: "Full-stack web application" },
      { k: "Stack", v: "Next.js 16 · React 19 · TypeScript" },
      { k: "Chain", v: "Solana mainnet" },
      { k: "Role", v: "Sole designer and engineer" },
    ],
    stats: [
      { value: "13,669", label: "Lines of TypeScript" },
      { value: "45", label: "API routes" },
      { value: "18", label: "Screens" },
      { value: "5", label: "Runtime deps" },
      { value: "10", label: "Chart timeframes" },
      { value: "16", label: "Venues detected" },
    ],
    highlights: [
      {
        title: "Trading · in-browser wallet",
        text: "One click to a real Solana address. Keys are generated and stored only in the browser and every transaction is signed locally: no extension popup, no deposit, no seed phrase asked. That is also what makes unattended orders possible.",
      },
      {
        title: "Trading · routing, hotkeys, automation",
        text: "Every trade routes through the deepest pool; sells are by percentage. Buy, sell and four quick amounts bound to keys you choose. Take profit, stop loss and dip buy fire once and stop, so a single wick cannot drain a balance.",
      },
      {
        title: "Intelligence · live candles 1s to 1D",
        text: "Built from real trade events, never price snapshots. Only intervals that traded get a bar, so quiet seconds do not become a dotted line across the chart.",
      },
      {
        title: "Intelligence · traders, deployers, venues",
        text: "Every wallet's average-cost book per token with aggregators filtered out. Deployer wallet age, self-sells, holdings and rug history, reported as Unverified rather than Clean when a check could not run. Sixteen launch venues resolved.",
      },
      {
        title: "Launch · one-transaction mint",
        text: "Name a token, upload art, and it mints on Solana in one signed transaction with metadata pinned to IPFS. The form quotes 0.0339 SOL and shows every line behind it. Success is only reported once the mint account is verified on-chain.",
      },
      {
        title: "Economy · fees, cashback, referrals",
        text: "0.90% gross on every swap, part returned as SOL. Seven tiers set by rolling 30-day volume, referral payouts three levels deep. Cashback is paid, not quietly discounted, and recorded against the swap signature so it is auditable.",
      },
      {
        title: "Prices that arrive when the trade lands",
        text: "No polling. Every Solana AMM keeps reserves in SPL token accounts whose balance is a u64 at byte offset 64. TRAG subscribes to both vaults over websocket, decodes the reserves, and the delta between slots is the trade. Price, feed and candles from one connection, on a pool that launched minutes ago.",
      },
      {
        title: "Portfolio, alerts, admin",
        text: "Average entry per position from the user's own fills with realised and unrealised P&L kept apart. Browser notifications on market cap, price and wallet activity. A credentialed admin panel with revenue, users, launches and the fee ledger.",
      },
    ],
    steps: [
      "Find a token: venue, deployer and holder facts on one screen",
      "Check it: hard on-chain rules override any reputation score",
      "Trade it: local signing, hotkeys and automated exits",
      "Launch your own: one signed transaction, address on confirm",
    ],
    tiers: [
      { name: "Wood", volume: "any", cashback: "0.050%", net: "0.850%", referral: "30 / 5 / 3" },
      { name: "Bronze", volume: "10 SOL", cashback: "0.100%", net: "0.800%", referral: "32 / 5 / 3" },
      { name: "Silver", volume: "50 SOL", cashback: "0.150%", net: "0.750%", referral: "34 / 5 / 3" },
      { name: "Gold", volume: "250 SOL", cashback: "0.200%", net: "0.700%", referral: "36 / 6 / 3" },
      { name: "Platinum", volume: "1,000 SOL", cashback: "0.250%", net: "0.650%", referral: "38 / 6 / 4" },
      { name: "Diamond", volume: "5,000 SOL", cashback: "0.300%", net: "0.600%", referral: "42 / 7 / 4" },
      { name: "Champion", volume: "20,000 SOL", cashback: "0.350%", net: "0.550%", referral: "50 / 8 / 5" },
    ],
    levels: [
      { name: "RUGGED", text: "Liquidity is gone. There is nothing left to sell into.", color: "#ff4d6d" },
      { name: "CRITICAL", text: "Mint or freeze authority is live, or ten wallets hold everything.", color: "#ff6b8b" },
      { name: "HIGH", text: "Unlocked liquidity in a pool small enough for one actor to drain.", color: "#ffb347" },
      { name: "MEDIUM", text: "Notable concentration, or a pool thin against its market cap.", color: "#ffe27a" },
      { name: "LOW", text: "No lever the owner can pull unilaterally against a holder.", color: "#34e0a1" },
    ],
    stack: [
      { group: "Application", items: ["Next.js 16 · App Router", "React 19", "TypeScript strict", "Tailwind v4", "Turbopack"] },
      { group: "Data sources", items: ["Helius RPC · websocket", "Jupiter swap routing", "DexScreener prices", "GeckoTerminal OHLCV", "RugCheck risk", "IPFS metadata"] },
      { group: "Storage & auth", items: ["node:sqlite · 6 databases", "Fills ledger · cost basis", "Fee ledger · per signature", "Rewards · tiers · referrals", "Admin auth · HMAC-SHA256"] },
    ],
    decisions: [
      { tag: "CHART", title: "Linear price axis, not logarithmic.", text: "A log axis picks its own ticks and produces unevenly spaced labels that are hard to read a level off. Readability every day beat one extreme case." },
      { tag: "CANDLES", title: "No gap filling.", text: "On one measured token, 94% of bars would have been filler. Skipping the silence puts the real trades next to each other and lets the time axis report the gaps." },
      { tag: "CUSTODY", title: "No server-side keys, ever.", text: "Which also means automation only works with the in-browser wallet, and the product says so rather than pretending otherwise." },
      { tag: "CLAIMS", title: "Unknown is a valid answer.", text: "No public index lists every token a wallet has launched, so the deployer panel reports what is checkable instead of inventing a count." },
    ],
    faq: [
      { q: "Is TRAG custodial?", a: "No. The built-in wallet generates its keypair in the browser, stores it only there and signs locally. Nothing is deposited and the app never asks for a seed phrase. You can also connect your own extension wallet." },
      { q: "What does launching a token cost?", a: "Nothing beyond Solana network rent. The form quotes 0.0339 SOL and shows every line. Withdrawals are free; graduation to a full AMM pool is charged once at 0.01 SOL." },
      { q: "How is risk scored?", a: "From on-chain facts: mint and freeze authority, liquidity lock weighted by pool size, top-ten holder concentration and deployer behaviour. Hard rules override any third-party reputation score, and unanswerable checks report as unknown." },
      { q: "Why so few dependencies?", a: "Five runtime deps: Next, React, React DOM, the Solana web3 library and a base58 codec. Built-in SQLite instead of an ORM, a vendored chart library and hand-authored SVG icons: almost no supply chain and nothing to upgrade out from under it." },
    ],
  },
  {
    slug: "nexora-website",
    kind: "project",
    group: "Websites",
    logo: "/logos/nexora.png",
    name: "NEXORA OFM WEBSITE",
    category: "WEBSITE / LANDING PAGE",
    headline: "THE COMPLETE OFM SYSTEM, ON ONE PAGE.",
    tagline: "Elite chatting, a traffic system that fills the inbox, and a CRM to run it all.",
    description:
      "The public website for NEXORA, a premium OnlyFans management agency. A cinematic dark landing page with a 3D planet hero, three system pillars (Chatting, Traffic, CRM), results, and two conversion paths: agencies that want to partner, and chatters who want to apply.",
    features: [
      "3D planet hero with orbit rings",
      "Gradient brand typography",
      "Three systems section",
      "Chatters application flow",
      "Agencies partnership flow",
      "Results & metrics",
      "Sticky glass navigation",
      "Framer Motion animations",
      "Responsive on every screen",
      "Cookie consent",
      "Auth-backed apply form",
      "SEO-ready structure",
    ],
    accent: "#c04bff",
    cta: "Explore the website",
    url: "https://www.nexoraofm.com",
    cover: "/projects/nexora-website/hero.png",
    coverAspect: "landscape",
    demo: "website",
    gallery: [
      { src: "/projects/nexora-website/systems.png", alt: "Three systems. One agency: Chatting, Traffic and NEXORA CRM cards" },
      { src: "/projects/nexora-website/full.png", alt: "Full landing page, top to bottom" },
    ],
    facts: [
      { k: "Type", v: "Marketing website + application flows" },
      { k: "Stack", v: "React · Vite · Framer Motion · Supabase" },
      { k: "For", v: "NEXORA, OFM chatting agency" },
      { k: "Role", v: "Design and development" },
    ],
    highlights: [
      { title: "A hero that sells the system", text: "Gradient NEXORA wordmark, 'The complete OFM system.' and a purple 3D planet with orbit rings and particles. Two CTAs: Partner With Us and Apply as Chatter." },
      { title: "Three systems. One agency.", text: "Chatting (top 1% chatters, structured shifts, tested scripts, +3,438% agency revenue growth), Traffic (proven methods and social automation, 24/7) and NEXORA CRM (one dashboard for the entire agency)." },
      { title: "Two audiences, two paths", text: "Agencies get a partnership pitch: plug NEXORA in and get chatting, traffic and CRM working together from day one. Chatters get premium pay, flexible remote shifts and accounts that already have traffic." },
      { title: "Built to convert", text: "Sticky glass navigation with the primary CTA always visible, quick links to each system, results section and an auth-backed application form." },
    ],
    steps: ["Land on the hero and the promise", "Scan the three systems", "See results and how it works", "Partner or apply"],
    stack: [
      { group: "Frontend", items: ["React", "Vite", "Framer Motion", "Custom CSS design system"] },
      { group: "Backend", items: ["Supabase auth", "Application forms", "Session handling"] },
      { group: "Design", items: ["Dark cinematic theme", "Gradient brand typography", "3D planet hero", "Glass UI"] },
    ],
    faq: [
      { q: "What was the goal?", a: "One page that explains the whole NEXORA offer in seconds and converts two audiences: agencies looking to partner and chatters looking to join." },
      { q: "Is it connected to NEXORA CRM?", a: "Yes. The CRM card links straight to the product, and the application flow is backed by the same auth stack." },
    ],
  },
  /* ------------------------------- PROJECTS ------------------------------- */
  {
    slug: "nexora",
    kind: "project",
    group: "SaaS",
    logo: "/logos/nexora.png",
    name: "NEXORA CRM",
    category: "SAAS / CREATOR AGENCY CRM",
    headline: "MISSION CONTROL FOR EVERY MODEL, CHATTER AND FAN.",
    tagline: "Chat smarter. Sell better. Scale faster.",
    description:
      "NEXORA is a CRM built for creator agencies. One inbox for every model and fan, AI reply assistance, deep fan intelligence, shifts with automatic payouts and agency-wide analytics, all in one desktop app.",
    features: [
      "Unified inbox",
      "AI reply assistant",
      "Fan intelligence",
      "AI fan scoring",
      "AI quality control",
      "Churn detection & win-back",
      "Fan segments",
      "Targeted campaigns",
      "PPV creation & pricing",
      "Media vault",
      "Shifts & clock-in",
      "Automatic payouts",
      "Goals & bonuses",
      "Leaderboards",
      "Chatter training",
      "LTV & cohort analytics",
      "Roles & permissions",
      "Audit log & 2FA",
      "Automation rules",
      "Desktop app (Win/Mac)",
    ],
    accent: "#8b7cff",
    cta: "Explore NEXORA",
    url: "https://www.nexoracrm.xyz",
    video: "/videos/nexora-teaser.mp4",
    demo: "nexora",
    highlights: [
      {
        title: "One inbox for everything",
        text: "Every model and fan in one threaded, searchable place. Start a conversation the moment a fan comes online and make sure every conversation is answered.",
      },
      {
        title: "AI reply assistant",
        text: "Analyzes the current conversation and instantly generates multiple relevant reply suggestions, so chatters respond faster while staying consistent. AI suggests, a human sends.",
      },
      {
        title: "Deep fan intelligence",
        text: "A living profile of every fan: key facts, interests, buying behavior and what to avoid, remembered forever. Every fan is automatically scored.",
      },
      {
        title: "Churn & quality control",
        text: "Flags fans about to cancel or go cold with a one-click win-back, and AI quality control catches missed upsells across conversations.",
      },
      {
        title: "Campaigns, PPV & vault",
        text: "Blast targeted campaigns to the right fans and track opens, purchases and revenue per send. Create and price PPV, attach from an AI-tagged media vault.",
      },
      {
        title: "Shifts, payouts & goals",
        text: "Assign shifts, schedule chatters, set hourly rates or commission %, clock in and automatically calculate earnings for chatters and the agency. Goals, bonuses and leaderboards on real revenue.",
      },
      {
        title: "Agency analytics",
        text: "Fan lifetime value, cohorts, ARPU, chat vs subscription revenue, fan growth, top spenders and chatter performance, for every connected model, side by side.",
      },
      {
        title: "Built for agencies",
        text: "Roles with configurable permissions, audit logging of every action, 2FA, automation rules (WHEN → THEN) and a Windows/Mac desktop app that updates itself. Encrypted and multi-tenant.",
      },
    ],
    steps: [
      "Create your agency account and download the desktop app",
      "Connect your models with a secure one-time link",
      "Invite chatters with roles, commission % and shifts",
      "Chat, sell and scale from one inbox with AI assistance",
    ],
    faq: [
      {
        q: "Who is NEXORA for?",
        a: "Creator agencies managing multiple models, chatters and thousands of fan conversations who want one place to chat, sell and run operations.",
      },
      {
        q: "Do I need the desktop app?",
        a: "Yes. You create your agency account in the browser, then download NEXORA for Windows or Mac. It's fast, secure and updates itself automatically.",
      },
      {
        q: "Is my data safe and separated?",
        a: "Data is encrypted in transit, every workspace and its data is separated (multi-tenant), and access to production systems is restricted.",
      },
      {
        q: "Can I add my whole team?",
        a: "Absolutely. Invite chatters with roles, set commission %, run shifts that attribute earnings, and pay out automatically.",
      },
    ],
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productItems = products.filter((p) => p.kind === "product");
export const projectItems = products.filter((p) => p.kind === "project");

/** Listing-page groups in display order */
export const productGroups = ["Automation"];
export const projectGroups = ["Web3", "SaaS", "Websites"];

/** Route for a product or project detail page */
export const hrefFor = (p: Product) =>
  `${p.kind === "project" ? "/projects" : "/products"}/${p.slug}`;

export type TechArea = {
  key: string;
  title: string;
  detail: string;
};

export const techAreas: TechArea[] = [
  { key: "WEB3", title: "WEB3 & BLOCKCHAIN", detail: "Token launchpads · DEX · Wallets · NFT · DeFi · Smart contracts" },
  { key: "GAMING", title: "GAMING", detail: "Web3 games · Casino & iGaming · Casual & mobile games · Multiplayer" },
  { key: "MARKETPLACES", title: "MARKETPLACES", detail: "Cars · Real estate · Rentals & booking · Services · Multi-vendor e-commerce" },
  { key: "WEBSITES", title: "WEBSITES & LANDING PAGES", detail: "Corporate sites · Landing pages · Portfolios · Media · 3D interactive sites" },
  { key: "SAAS", title: "SAAS & PLATFORMS", detail: "CRM · Dashboards · Analytics · Subscriptions · Admin panels" },
  { key: "MOBILE", title: "MOBILE APPS", detail: "iOS · Android · Cross-platform · PWA" },
  { key: "AI", title: "AI", detail: "Agents · Chatbots · Intelligence · Data pipelines · AI platforms" },
  { key: "AUTOMATION", title: "AUTOMATION & INTEGRATIONS", detail: "Workflows · Bots & scrapers · API integrations · Payments · CRM/ERP sync" },
  { key: "BRANDING", title: "FULL BRANDING", detail: "Logo & identity · Brand system · Visual language · Guidelines · Launch assets" },
  { key: "MARKETING", title: "SOCIAL MEDIA MARKETING", detail: "Growth automation · Content pipelines · Outreach bots · Funnels · Analytics" },
  { key: "CUSTOM", title: "CUSTOM SOFTWARE", detail: "Internal tools · Infrastructure · Migrations · Anything that needs to be built." },
];

export const universeNodes = [
  "WEB3",
  "GAMING",
  "CASINO",
  "MARKETPLACES",
  "E-COMMERCE",
  "WEBSITES",
  "SAAS",
  "MOBILE",
  "AI",
  "AUTOMATION",
  "BRANDING",
  "MARKETING",
  "FINTECH",
  "INFRASTRUCTURE",
];

/* Social links (fill in the hrefs when the profiles are live) */
export const socials = [
  { key: "telegram", label: "Telegram", href: "" },
  { key: "instagram", label: "Instagram", href: "" },
  { key: "x", label: "X", href: "" },
  { key: "linkedin", label: "LinkedIn", href: "" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

/* What we build: the full capability map used on the homepage & studio */
export const capabilities = [
  {
    title: "WEB3 & BLOCKCHAIN",
    items: ["Token launchpads", "DEX & trading platforms", "Wallets", "NFT platforms", "DeFi protocols", "Smart contracts", "DAOs"],
  },
  {
    title: "GAMING",
    items: ["Web3 games", "Casino & iGaming", "Casual & hyper-casual games", "Mobile games", "Multiplayer & backends", "Game economies"],
  },
  {
    title: "MARKETPLACES",
    items: ["Car marketplaces", "Real estate platforms", "Rentals & booking", "Service marketplaces", "B2B marketplaces", "Multi-vendor e-commerce"],
  },
  {
    title: "WEBSITES & LANDING PAGES",
    items: ["Corporate websites", "Landing pages", "Product sites", "Portfolios", "Blogs & media", "3D / interactive experiences"],
  },
  {
    title: "SAAS & PLATFORMS",
    items: ["CRM & ERP", "Dashboards & analytics", "Subscription products", "Admin panels", "Multi-tenant platforms"],
  },
  {
    title: "MOBILE APPS",
    items: ["iOS", "Android", "Cross-platform", "PWAs", "App backends"],
  },
  {
    title: "AI",
    items: ["AI agents", "Chatbots & assistants", "Recommendation systems", "Data pipelines", "AI integrations"],
  },
  {
    title: "AUTOMATION & INTEGRATIONS",
    items: ["Business workflows", "Bots & scrapers", "API integrations", "Payment systems", "CRM / ERP sync", "Reporting automation"],
  },
  {
    title: "FULL BRANDING",
    items: ["Logo & identity", "Brand system & guidelines", "Visual language & typography", "Product & app branding", "Pitch decks & launch assets", "Social media kits"],
  },
  {
    title: "SOCIAL MEDIA MARKETING",
    items: ["Growth automation (X, Instagram, Telegram)", "Content pipelines & scheduling", "Outreach & DM bots", "Funnels & landing pages", "Community & engagement systems", "Analytics & reporting"],
  },
  {
    title: "CUSTOM SOFTWARE",
    items: ["Internal tools", "Infrastructure & DevOps", "Migrations & rebuilds", "Technical consulting", "Anything else"],
  },
];

export const marqueeItems = [
  "Web3 platforms", "Token launchpads", "Web3 games", "Casino & iGaming", "Casual games", "Car marketplaces",
  "Real estate platforms", "Booking & rentals", "E-commerce", "Corporate websites", "Landing pages", "SaaS",
  "CRM", "Dashboards", "Mobile apps", "AI agents", "Chatbots", "Automations", "Bots & scrapers", "API integrations",
  "Payment systems", "Trading platforms", "Full branding", "Social media marketing", "Custom software",
];

export type ProcessStep = {
  no: string;
  title: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  { no: "01", title: "IDEA & PLAN", detail: "We listen, ask the hard questions and turn the idea into a clear plan with goals, scope and priorities." },
  { no: "02", title: "STRATEGY", detail: "Market, audience, positioning and a roadmap. What to build first, what can wait, how it makes money." },
  { no: "03", title: "BRANDING", detail: "Name, logo, identity, visual language and guidelines. The product gets a face before it gets a screen." },
  { no: "04", title: "UX & UI", detail: "User flows, wireframes, design system and high-fidelity screens. Every interaction designed on purpose." },
  { no: "05", title: "MVP", detail: "The smallest version that proves the idea. Real users, real feedback, fast iteration." },
  { no: "06", title: "DEVELOPMENT", detail: "Frontend, backend, integrations, infrastructure. Clean architecture built to scale from day one." },
  { no: "07", title: "TESTING & QA", detail: "Functional, performance and security testing on every device. Nothing ships broken." },
  { no: "08", title: "LAUNCH", detail: "Deployment, monitoring, analytics and a launch plan across web and social channels." },
  { no: "09", title: "GROWTH & MARKETING", detail: "Social media automation, content pipelines, outreach and funnels that bring the right people in." },
  { no: "10", title: "SCALE & SUPPORT", detail: "New features, optimisation and long-term support. We stay after launch." },
];

export const techStack = [
  { layer: "FRONTEND", items: ["React", "Next.js", "TypeScript"] },
  { layer: "BACKEND", items: ["Node.js", "Python", "APIs"] },
  { layer: "DATA", items: ["PostgreSQL", "Redis", "Analytics"] },
  { layer: "BLOCKCHAIN", items: ["Solana", "Ethereum", "EVM"] },
  { layer: "AI", items: ["LLMs", "Agents", "Automation"] },
  { layer: "INFRASTRUCTURE", items: ["Cloud", "Docker", "CI/CD"] },
];

export const labProjects = [
  { name: "IDAEVIA PROJECT", stage: "RESEARCH", progress: 40 },
  { name: "IDAEVIA PROJECT", stage: "DEVELOPMENT", progress: 80 },
  { name: "IDAEVIA PROJECT", stage: "BETA", progress: 90 },
];

export const whyIdaevia = [
  { title: "PRODUCT FIRST", detail: "We think beyond code." },
  { title: "ONE TEAM", detail: "Strategy, design and engineering together." },
  { title: "BUILT TO SCALE", detail: "Architecture designed for growth." },
  { title: "FAST EXECUTION", detail: "From idea to working product." },
  { title: "TECHNOLOGY AGNOSTIC", detail: "We choose technology based on the problem." },
  { title: "LONG-TERM", detail: "We don't disappear after launch." },
];

export const numbers = [
  { value: 3, suffix: "", label: "Products Live" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 8, suffix: "", label: "Industries" },
  { value: 30, suffix: "+", label: "Technologies" },
  { value: 5, suffix: "", label: "Countries" },
];

export const studioServices = [
  { title: "PRODUCT STRATEGY", items: ["Idea validation", "Product architecture", "Roadmaps", "MVP planning"] },
  { title: "UI/UX DESIGN", items: ["Research", "Wireframes", "Design systems", "Prototypes"] },
  { title: "WEBSITES & LANDING PAGES", items: ["Corporate sites", "Landing pages", "Portfolios", "3D / interactive"] },
  { title: "WEB APPS & SAAS", items: ["Frontend", "Backend", "APIs", "Dashboards & admin panels"] },
  { title: "MOBILE APPS", items: ["iOS", "Android", "Cross-platform", "PWAs"] },
  { title: "MARKETPLACES & E-COMMERCE", items: ["Cars", "Real estate", "Booking & rentals", "Multi-vendor stores"] },
  { title: "WEB3", items: ["Blockchain", "Smart contracts", "Wallets", "Token infrastructure"] },
  { title: "GAMING", items: ["Web3 games", "Casino & iGaming", "Casual & mobile games", "Game infrastructure"] },
  { title: "AI", items: ["Agents", "Chatbots", "AI integrations", "Data pipelines"] },
  { title: "AUTOMATION & INTEGRATIONS", items: ["Workflows", "Bots & scrapers", "API integrations", "CRM / ERP sync"] },
  { title: "FULL BRANDING", items: ["Logo & identity", "Brand system", "Guidelines", "Launch assets"] },
  { title: "SOCIAL MEDIA MARKETING", items: ["Growth automation", "Content pipelines", "Outreach bots", "Funnels & analytics"] },
  { title: "INFRASTRUCTURE", items: ["Cloud", "Databases", "Security", "Scalability"] },
  { title: "CUSTOM SOFTWARE", items: ["Internal tools", "Migrations & rebuilds", "Technical consulting", "Anything else"] },
];

