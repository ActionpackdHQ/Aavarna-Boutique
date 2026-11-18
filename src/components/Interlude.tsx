"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Interlude({
  quote,
  stat1,
  stat2,
  flip = false,
}: {
  quote: string;
  stat1?: string;
  stat2?: string;
  flip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div
      ref={ref}
      className="relative h-auto overflow-hidden bg-gradient-to-r from-[#5a2430] via-[#8a5a34] to-[#b98a3e] py-14 md:py-16"
    >
      <motion.div
        style={{ x: bgX }}
        aria-hidden
        className="absolute inset-[-10%] bg-[radial-gradient(60%_120%_at_30%_50%,rgba(230,201,135,0.35),transparent_60%)] opacity-40"
      />

      <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-6 px-5 md:grid-cols-[1fr_auto] md:px-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`font-serif text-xl italic leading-snug text-[#fdf6ec] md:text-3xl ${
            flip ? "md:text-right" : ""
          }`}
        >
          “{quote}”
        </motion.blockquote>

        {(stat1 || stat2) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className={`flex gap-8 ${flip ? "md:justify-end" : ""}`}
          >
            {[stat1, stat2].filter(Boolean).map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-2xl text-[#e6c987] md:text-3xl">
                  {s?.split("|")[0]}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#fdf6ec]/80 md:text-xs">
                  {s?.split("|")[1]}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
