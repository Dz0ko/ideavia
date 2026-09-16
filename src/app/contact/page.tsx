"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import RevealText from "@/components/ui/RevealText";
import Wordmark from "@/components/ui/Wordmark";

const IdaeviaCore = dynamic(() => import("@/components/three/IdaeviaCore"), { ssr: false });

const buildOptions = [
  "Website / Landing Page",
  "Marketplace (Cars, Real Estate…)",
  "E-commerce",
  "SaaS / Web App",
  "Mobile App",
  "Web3 / Blockchain",
  "Game / Web3 Game",
  "Casino",
  "AI",
  "Automation / Integration",
  "Branding",
  "Social Media Marketing",
  "Custom Software",
  "Something New",
];

export default function ContactPage() {
  const [type, setType] = useState<string | null>(null);
  const [idea, setIdea] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // anti-bot: hidden honeypot field + time the form was opened
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());

  const canSubmit = !!(form.name && form.email && form.contact.trim().length >= 3 && type) && !sending;

  async function submit() {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, type, idea, website, t: startedAt }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="relative min-h-screen pt-[72px]">
      <AnimatePresence mode="wait">
        {submitted ? (
          <Success key="success" />
        ) : (
          <motion.section
            key="form"
            exit={{ opacity: 0 }}
            className="container-x py-24 md:py-32"
          >
            <RevealText
              text="HAVE AN IDEA?"
              as="h1"
              className="display text-[clamp(2.5rem,8vw,6rem)]"
            />
            <RevealText
              text="LET'S BUILD IT."
              as="h1"
              delay={0.12}
              className="display text-[clamp(2.5rem,8vw,6rem)] accent-text"
            />

            <div className="mt-20 max-w-3xl space-y-16">
              {/* Step 1 */}
              <div>
                <label className="eyebrow">What are you building?</label>
                <div className="mt-6 flex flex-wrap gap-3">
                  {buildOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setType(opt)}
                      data-cursor="arrow"
                      className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                        type === opt
                          ? "border-accent bg-accent/10 text-white"
                          : "border-white/12 text-chalk/60 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <label className="eyebrow">Tell us about your idea</label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={4}
                  placeholder="What are you trying to build, and why?"
                  className="mt-5 w-full resize-none border-b border-white/12 bg-transparent pb-4 text-lg text-white outline-none transition-colors placeholder:text-chalk/25 focus:border-accent"
                />
              </div>

              {/* honeypot: invisible to humans, tempting to bots */}
              <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              {/* Step 3 */}
              <div className="grid gap-8 sm:grid-cols-2">
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Field
                  label="Company"
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <Field
                  label="Telegram or WhatsApp"
                  placeholder="@username or +389 70 000 000"
                  value={form.contact}
                  onChange={(v) => setForm({ ...form, contact: v })}
                />
              </div>

              <div>
                <button
                  disabled={!canSubmit}
                  onClick={submit}
                  data-cursor="arrow"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-ink transition-all hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {sending ? "Sending…" : "Start the Journey"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
                {error && (
                  <p className="mt-4 text-sm text-[#ff6b8b]">{error}</p>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="eyebrow">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-4 w-full border-b border-white/12 bg-transparent pb-3 text-lg text-white outline-none transition-colors placeholder:text-chalk/25 focus:border-accent"
      />
    </div>
  );
}

function Success() {
  return (
    <motion.section
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden bg-ink text-center"
    >
      {/* the globe drops in behind the message */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: "-60%", scale: 0.85 }}
        animate={{ opacity: 1, y: "0%", scale: 1 }}
        transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
      >
        <IdaeviaCore className="h-full w-full" accent="#5b6bff" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,6,0.55)_0%,rgba(5,5,6,0.2)_45%,rgba(5,5,6,0.9)_100%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="pointer-events-none relative px-6"
      >
        <h2 className="display text-[clamp(2.5rem,8vw,6rem)]">IDEA RECEIVED.</h2>
        <p className="mt-6 text-chalk/70">The journey starts here.</p>
        <p className="mt-12 text-2xl font-semibold tracking-[0.4em]"><Wordmark /></p>
      </motion.div>
    </motion.section>
  );
}
