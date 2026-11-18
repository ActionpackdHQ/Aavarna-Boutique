"use client";

import { motion } from "framer-motion";
import { studioFacts } from "@/lib/data";

export default function HeroBottomFill() {
  const facts = studioFacts.slice(0, 3);

  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      <div className="border-t border-[#c9a35c]/20 bg-[#161210]/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-3.5 md:gap-6 md:px-10 md:py-4">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 + i * 0.15, duration: 0.7 }}
              className="flex items-baseline gap-2"
            >
              <span className="font-serif text-lg text-[#e6c987]">{f.value}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#8fa294] md:text-xs">
                {f.label}
              </span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="hidden items-center gap-2 text-[#c9a35c] md:flex"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] md:text-xs">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              ⌄
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
