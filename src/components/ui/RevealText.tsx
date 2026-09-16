"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Word-by-word text reveal. Splits on spaces and animates each word up
 * from a masked baseline as it enters the viewport.
 */
export default function RevealText({
  text,
  className = "",
  delay = 0,
  as = "h2",
}: Props) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: {
                y: 0,
                transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
