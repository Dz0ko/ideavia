import RevealText from "./RevealText";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <Reveal>
          <div
            className={`eyebrow mb-5 ${
              align === "center" ? "flex justify-center" : ""
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      <RevealText
        text={title}
        as="h2"
        className="display text-[clamp(2rem,5.5vw,4.5rem)]"
      />
      {intro && (
        <Reveal delay={0.15}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed text-chalk/55 md:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
