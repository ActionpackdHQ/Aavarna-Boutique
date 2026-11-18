"use client";

import { motion, useReducedMotion } from "framer-motion";
import { lineReveal } from "@/lib/anim";

type Props = {
  lines: string[];
  accentIdx?: number;
  className?: string;
  as?: "h1" | "h2";
  /** When false, wait (e.g. until preloader finishes) */
  ready?: boolean;
  /** Animate on mount instead of whileInView */
  onMount?: boolean;
};

export default function RevealLines({
  lines,
  accentIdx = -1,
  className = "",
  as = "h1",
  ready = true,
  onMount = false,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = as;
  const show = ready && !reduced;

  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={`${l}-${i}`} className="block overflow-hidden">
          <motion.span
            className={`block will-change-transform ${
              i === accentIdx ? "italic text-gold" : ""
            }`}
            variants={lineReveal}
            custom={i}
            initial="hidden"
            {...(onMount
              ? { animate: show ? "show" : "hidden" }
              : {
                  whileInView: "show",
                  viewport: { once: true, margin: "-10%" as const },
                })}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
