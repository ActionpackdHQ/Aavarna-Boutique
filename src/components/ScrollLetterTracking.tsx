"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function ScrollLetterTracking({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ls = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduced ? ["0em", "0em", "0em"] : ["-0.04em", "0.02em", "-0.04em"]
  );

  return (
    <motion.span
      ref={ref}
      style={{ letterSpacing: ls }}
      className="inline-block will-change-[letter-spacing]"
    >
      {text}
    </motion.span>
  );
}
