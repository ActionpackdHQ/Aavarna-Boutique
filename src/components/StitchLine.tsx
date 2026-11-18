"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function StitchLine() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const tipTop = useTransform(p, [0, 1], ["0vh", "100vh"]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
    >
      <svg
        className="absolute left-1/2 top-0 h-full w-px overflow-visible"
        style={{ transform: "translateX(-0.5px)" }}
      >
        <motion.line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          stroke="#c9a35c"
          strokeWidth="1.5"
          strokeDasharray="7 9"
          pathLength={1}
          style={{ pathLength: p, opacity: 0.55 }}
        />
      </svg>
      {/* needle tip */}
      <motion.div
        className="absolute left-1/2 ml-[-3px] h-1.5 w-1.5 rounded-full bg-[#e6c987] shadow-[0_0_8px_rgba(230,201,135,.9)]"
        style={{ top: tipTop }}
      />
    </div>
  );
}
