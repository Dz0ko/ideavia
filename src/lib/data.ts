/** Data for the interactive brand-kit board (BrandKitDemo). */
export type BrandKit = {
  mark: "plate" | "squircle" | "pupil";
  letter?: string;
  wordmark: string;
  tagline: string;
  accent: string;
  ground: string;
  paper: string;
  grid?: string;
  version: string;
  docLabel?: string;
  typeLabel: string;
  headline: [string, string];
  /** Order matters: [accent, ground, panel, hairline, muted, paper, ...]. `dark` = label drawn in ground colour. */
  colors: { name: string; hex: string; dark?: boolean }[];
  chips: { label: string; solid?: boolean }[];
  chipRadius?: number;
};

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
  demo?: "nexora" | "trag" | "chatbot" | "instagram" | "x" | "website" | "brandkit";
  /** Show the interactive demo in the products slide even when a screenshot exists. */
  preferDemo?: boolean;
  /** A downloadable deliverable (e.g. brand guidelines PDF). */
  file?: { href: string; label: string };
  /** Landscape covers render in a browser frame by default; "none" shows the image plainly (documents, decks). */
  coverFrame?: "browser" | "none";
  brandKit?: BrandKit;
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

  /* ------------------------------- BRANDING ------------------------------- */
  {
    slug: "perk-brand-kit",
    kind: "product",
    group: "Branding",
    logo: "/logos/perk.png",
    name: "PERK SOCIETY",
    category: "BRAND KIT / WEB3 COMMUNITY",
    headline: "A WHOLE WORLD OF PERKS.",
    tagline: "A complete brand identity for a Solana rewards community, built by IDAEVIA.",
    description:
      "PERK Society is a community-driven rewards platform on Solana. We built the whole identity from scratch: the mark and logo system, the lime-on-void colour system, typography, graphic language, voice and tone, social templates and a full asset handoff, documented in a 10-page brand guidelines book.",
    features: [
      "Mark & logo system",
      "Colour system",
      "Typography",
      "Graphic language",
      "Voice & tone",
      "Social templates",
      "App icons & favicons",
      "Asset index & handoff",
    ],
    accent: "#D4F71E",
    cta: "Explore the brand kit",
    demo: "brandkit",
    preferDemo: true,
    brandKit: {
      mark: "plate",
      letter: "P",
      wordmark: "PERK\nSOCIETY",
      tagline: "A whole world of perks",
      accent: "#D4F71E",
      ground: "#050705",
      paper: "#E0F2E8",
      grid: "#0D120B",
      version: "V2 · 2026",
      typeLabel: "Display · 900 · -2.5% tracking",
      headline: ["SHOW UP.", "GET REWARDED."],
      colors: [
        { name: "Perk Lime", hex: "#D4F71E", dark: true },
        { name: "Void Black", hex: "#050705" },
        { name: "Panel", hex: "#0F140D" },
        { name: "Hairline", hex: "#2F3B25" },
        { name: "Muted", hex: "#98A292" },
        { name: "Paper", hex: "#E0F2E8", dark: true },
      ],
      chips: [{ label: "Outline chip" }, { label: "Solid chip", solid: true }, { label: "Loop chip ↻" }],
    },
    cover: "/products/perk-brand-kit/pages/page-01.png",
    file: { href: "/products/perk-brand-kit/perk-society-brand-guidelines.pdf", label: "View brand guidelines (PDF)" },
    gallery: [
      { src: "/products/perk-brand-kit/pages/page-03.png", alt: "PERK Society mark: horizontal, single line, stacked, avatar and monochrome versions" },
      { src: "/products/perk-brand-kit/pages/page-05.png", alt: "PERK Society colour system: Perk Lime, Void Black, panel, hairline, muted, paper" },
      { src: "/products/perk-brand-kit/pages/page-06.png", alt: "PERK Society typography: Archivo display and JetBrains Mono labels" },
      { src: "/products/perk-brand-kit/pages/page-07.png", alt: "PERK Society graphic language: grid field, lime glow, chips and geometry" },
      { src: "/products/perk-brand-kit/pages/page-09.png", alt: "PERK Society applications: social banner, square post, lime post and icons" },
      { src: "/products/perk-brand-kit/pages/page-08.png", alt: "PERK Society voice: direct, confident, never overpromising" },
    ],
    facts: [
      { k: "Client", v: "PERK Society" },
      { k: "Sector", v: "Web3 · Solana · Rewards" },
      { k: "Deliverables", v: "Brand guidelines (10 pages) + 11 logo and application files" },
      { k: "Year", v: "2026" },
    ],
    highlights: [
      { title: "One mark, every size", text: "A bold P in a rounded square that works from a 24 px favicon to a festival banner, with lime-on-dark, dark-on-lime and monochrome colourways." },
      { title: "Lime is the accent, never the field", text: "A strict ratio rule: 80% void, 14% panel, 6% lime. The colour hits hard because it is rationed." },
      { title: "Type with a voice", text: "Archivo 900 for display, JetBrains Mono for labels and UI. Headlines in caps, short and verb-first; body in sentence case." },
      { title: "Ready to ship", text: "Social banners, square posts, app icons and favicons, plus a transparent-PNG asset index so the team can post on day one." },
    ],
    steps: ["Discovery and positioning", "Mark and logo system", "Colour, type and graphic language", "Voice, templates and asset handoff"],
    faq: [
      { q: "What does a brand kit from IDAEVIA include?", a: "Positioning, the mark and logo system, colour and typography, a graphic language, voice and writing rules, application templates and a complete asset handoff, all documented in a guidelines book like this one." },
      { q: "Can you brand a product that does not exist yet?", a: "Yes. PERK Society was branded pre-launch: the identity was ready before the token, the site and the first drop." },
    ],
  },
  {
    slug: "evolution-brand-kit",
    kind: "product",
    group: "Branding",
    logo: "/logos/evolution.svg",
    name: "EVOLUTION",
    category: "BRAND & DESIGN SYSTEM / WEB3 GAMING",
    headline: "EVOLVE OR CASH OUT.",
    tagline: "Identity, interface and creature system for a risk-escalation game, built by IDAEVIA.",
    description:
      "EVOLUTION is a game where one wager grows through a chain of evolutions: every step forward is worth more and safe for one moment less. We built the complete brand and design system: the pupil-in-ring mark, two colour variants on one base, Archivo and JetBrains Mono typography, the full HUD and game screen, a creature system of 31 forms across five worlds, environments, key moments and a ship checklist.",
    features: [
      "Brand core & positioning",
      "Mark & lockups",
      "Two colour variants",
      "Typography & voice",
      "Interface & HUD",
      "Game screen",
      "Creature system: 5 worlds, 31 forms",
      "Environments & sound map",
      "Key moments",
      "Ship checklist",
    ],
    accent: "#2BFF88",
    cta: "Explore the design system",
    demo: "brandkit",
    preferDemo: true,
    brandKit: {
      mark: "pupil",
      wordmark: "EVOLUTION",
      tagline: "Evolve or cash out",
      accent: "#2BFF88",
      ground: "#050706",
      paper: "#F2F5F3",
      grid: "#0B0F0C",
      version: "V1.0 · 2026",
      docLabel: "Branding kit",
      typeLabel: "Display · 96 / 800 · JetBrains Mono for numbers",
      headline: ["ASCENSION", "17.00x"],
      colors: [
        { name: "Culture", hex: "#2BFF88", dark: true },
        { name: "Void", hex: "#050706" },
        { name: "Chamber", hex: "#0A0E0C" },
        { name: "Hairline", hex: "#16221B" },
        { name: "Ash", hex: "#A8B7AE" },
        { name: "Bone", hex: "#F2F5F3", dark: true },
        { name: "Mutagen", hex: "#9B5CFF" },
        { name: "High risk", hex: "#FF3B5C" },
        { name: "Jackpot", hex: "#FFC530", dark: true },
      ],
      chips: [{ label: "Evolve → 22.00x", solid: true }, { label: "Cash out $850" }, { label: "Mutate · 62% fail" }],
    },
    cover: "/products/evolution-brand-kit/pages/page-01.png",
    coverAspect: "landscape",
    coverFrame: "none",
    file: { href: "/products/evolution-brand-kit/evolution-brand-guidelines.pdf", label: "View branding kit (PDF)" },
    gallery: [
      { src: "/products/evolution-brand-kit/pages/page-02.png", alt: "EVOLUTION brand core: evolve or cash out, the four rules and the evolution chain" },
      { src: "/products/evolution-brand-kit/pages/page-03.png", alt: "EVOLUTION logo: the pupil-in-ring mark, lockups and rules" },
      { src: "/products/evolution-brand-kit/pages/page-04.png", alt: "EVOLUTION colour: Specimen Green and Unstable Violet variants on one base" },
      { src: "/products/evolution-brand-kit/pages/page-06.png", alt: "EVOLUTION interface: buttons, HUD and mutation cards" },
      { src: "/products/evolution-brand-kit/pages/page-07.png", alt: "EVOLUTION game screen: desktop, mid-round with the Elder Dragon" },
      { src: "/products/evolution-brand-kit/pages/page-08.png", alt: "EVOLUTION creature system: five worlds, 31 forms" },
      { src: "/products/evolution-brand-kit/pages/page-09.png", alt: "EVOLUTION full roster: LV 0 to LV 30" },
      { src: "/products/evolution-brand-kit/pages/page-11.png", alt: "EVOLUTION key moments: mutation, jackpot and fail" },
    ],
    facts: [
      { k: "Client", v: "EVOLUTION" },
      { k: "Sector", v: "Web3 gaming · risk-escalation game" },
      { k: "Deliverables", v: "12-page branding kit, UI system, 31 creature renders, 5 environments" },
      { k: "Year", v: "2026" },
    ],
    highlights: [
      { title: "One tension, one system", text: "The whole brand is built around evolve-or-cash-out. Clarity first: a new player understands bet, multiplier and two buttons in three seconds." },
      { title: "Two variants, one base", text: "Specimen Green for launch, Unstable Violet for seasonal and jackpot skins. Roughly 80% near-black, 15% ash and bone, 5% accent." },
      { title: "A creature system, not mascots", text: "31 forms across five worlds, from Egg to Final. Every form inherits the previous form's spine curve and eye position, then adds mass." },
      { title: "Honest motion", text: "UI at 120 to 180 ms, evolution sequence 900 ms, skippable by tap. Animation only reveals an outcome the RNG already produced." },
    ],
    steps: ["Brand core and positioning", "Mark, colour and typography", "Interface, HUD and game screens", "Creature system, environments and handoff"],
    faq: [
      { q: "Is this a brand kit or a design system?", a: "Both. It covers the identity (mark, colour, type, voice) and the product (buttons, HUD, game screen, key moments, motion timing and a ship checklist)." },
      { q: "Do you also produce the creature art?", a: "Yes. The kit specifies 31 creature renders across five worlds with fixed constants for silhouette, stance and lighting, and IDAEVIA produces them." },
    ],
  },
  {
    slug: "trag-brand-kit",
    kind: "product",
    group: "Branding",
    logo: "/logos/trag.png",
    name: "TRAG",
    category: "BRAND KIT / WEB3 TRADING",
    headline: "TRAG MEANS TRACE.",
    tagline: "Logo, dimensional mark, typography, colour and usage rules for a Solana trading terminal, built by IDAEVIA.",
    description:
      "Every trade leaves a trace. The TRAG identity is built on that single idea: a mark that already looks like it is moving, a palette with exactly one signal colour, and numbers always set in mono so a rate is never mistaken for prose. The kit covers construction, four plate variants, the 3D dimensional mark, wordmark and lockups, misuse, colour, typography, applications and a full asset index.",
    features: [
      "Two strokes on a squircle",
      "Four plate variants",
      "3D dimensional mark",
      "Wordmark & lockups",
      "Six misuse rules",
      "One signal, one ground",
      "Space Grotesk · Manrope · JetBrains Mono",
      "In-use applications",
      "SVG + PNG asset index",
    ],
    accent: "#D6FF4F",
    cta: "Explore the brand kit",
    demo: "brandkit",
    preferDemo: true,
    brandKit: {
      mark: "squircle",
      letter: "T",
      wordmark: "TRAG",
      tagline: "Solana trading terminal",
      accent: "#D6FF4F",
      ground: "#070807",
      paper: "#F4F6F0",
      grid: "#0E110D",
      version: "V1.0 · 2026",
      docLabel: "Brand kit",
      typeLabel: "Space Grotesk · 84 / 700 · -4.5% tracking",
      headline: ["FAST BEFORE", "PRETTY."],
      colors: [
        { name: "Signal Lime", hex: "#D6FF4F", dark: true },
        { name: "Terminal Black", hex: "#070807" },
        { name: "Panel", hex: "#12150F" },
        { name: "Hairline", hex: "#1E2419" },
        { name: "Muted", hex: "#98A38F" },
        { name: "Paper", hex: "#F4F6F0", dark: true },
        { name: "Gain", hex: "#4ADE80", dark: true },
        { name: "Loss", hex: "#FF5C5C" },
        { name: "Caution", hex: "#E9B949", dark: true },
      ],
      chips: [{ label: "Buy", solid: true }, { label: "Sell" }, { label: "$TRAG / SOL · +18.4%" }],
      chipRadius: 6,
    },
    cover: "/products/trag-brand-kit/pages/page-01.png",
    file: { href: "/products/trag-brand-kit/trag-brand-guidelines.pdf", label: "View brand kit (PDF)" },
    gallery: [
      { src: "/products/trag-brand-kit/pages/page-02.png", alt: "TRAG brand kit: the idea and the construction of the mark, two strokes on a squircle" },
      { src: "/products/trag-brand-kit/pages/page-03.png", alt: "TRAG variants: four plates, one geometry" },
      { src: "/products/trag-brand-kit/pages/page-04.png", alt: "TRAG dimensional mark: the 3D build" },
      { src: "/products/trag-brand-kit/pages/page-05.png", alt: "TRAG wordmark and lockups, set tight" },
      { src: "/products/trag-brand-kit/pages/page-07.png", alt: "TRAG misuse rules and colour: one signal, one ground" },
      { src: "/products/trag-brand-kit/pages/page-08.png", alt: "TRAG typography: Grotesk speaks, Manrope explains, Mono counts" },
      { src: "/products/trag-brand-kit/pages/page-09.png", alt: "TRAG in use: terminal card and app icon splash" },
      { src: "/products/trag-brand-kit/pages/page-10.png", alt: "TRAG asset index: what ships with the kit" },
    ],
    facts: [
      { k: "Client", v: "TRAG" },
      { k: "Sector", v: "Web3 · Solana trading terminal" },
      { k: "Deliverables", v: "11-page brand kit + SVG and 2x PNG asset set" },
      { k: "Year", v: "2026" },
    ],
    highlights: [
      { title: "A mark that moves", text: "Two rounded strokes on a squircle plate, the stem leaning 15 degrees forward. It survives a browser tab strip and a stage screen alike." },
      { title: "One signal colour", text: "Lime marks action and gain and nothing else. Green, red and amber live inside data only, never in layout." },
      { title: "Numbers never lie", text: "Space Grotesk speaks, Manrope explains, JetBrains Mono counts. Every rate is set in mono so it is never mistaken for prose." },
      { title: "Ready for product and print", text: "Four plate variants, a 3D dimensional mark for splash and hero art, light application for print, and a circular avatar for token and social." },
    ],
    steps: ["Idea and construction", "Variants and the 3D mark", "Wordmark, colour and typography", "Applications and asset handoff"],
    faq: [
      { q: "Is this the same TRAG as the trading terminal in Projects?", a: "Yes. IDAEVIA designed the brand and built the product. The brand kit is the identity layer; the terminal is the case study under Projects." },
      { q: "What formats ship with the kit?", a: "SVG vectors for the mark in every variant, 2x PNG rasters for the plates, avatar and lockups, plus the three open-licence typefaces." },
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
export const productGroups = ["Automation", "Branding"];
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
  { key: "x", label: "X", href: "https://x.com/idaevia" },
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
  { value: 6, suffix: "", label: "Products Live" },
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

