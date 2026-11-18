"use client";

import { motion } from "framer-motion";

export default function StitchHeading({
  eyebrow,
  title,
  accent,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  flip?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${flip ? "ml-auto text-right" : ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7 }}
        className="label mb-3 text-[#c9a35c]"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="display text-[clamp(2.2rem,5vw,4rem)] leading-[1.1] text-[#f5efe4]"
      >
        {title}{" "}
        {accent && <em className="italic text-[#e6c987]">{accent}</em>}
      </motion.h2>

      <svg
        viewBox="0 0 320 12"
        className={`my-4 h-3 w-56 ${flip ? "ml-auto" : ""}`}
        fill="none"
        aria-hidden
      >
        <motion.line
          x1="4"
          y1="6"
          x2="304"
          y2="6"
          stroke="#c9a35c"
          strokeWidth="2"
          strokeDasharray="10 8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.25 }}
          style={
            flip
              ? { transform: "scaleX(-1)", transformOrigin: "center" }
              : undefined
          }
        />
        <motion.circle
          cx={flip ? 8 : 312}
          cy="6"
          r="3.5"
          fill="#e6c987"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.25, duration: 0.3 }}
        />
      </svg>
    </div>
  );
}
