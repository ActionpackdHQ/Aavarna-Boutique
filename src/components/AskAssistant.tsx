"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function AskAssistant() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="assistant"
      ref={ref}
      className="relative overflow-hidden border-t border-[#c9a35c]/15 py-16 md:py-20"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-[-8%]">
        <div className="absolute inset-0 bg-[url('/images/assistant-section-bg.webp')] bg-cover bg-center" />
      </motion.div>

      <div className="absolute inset-0 bg-[#7a2230]/25 mix-blend-multiply" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#161210] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#161210] to-transparent" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-[#161210]/55 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] ring-1 ring-[#c9a35c]/25 backdrop-blur-md md:p-12"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a35c]/60 bg-[#161210]/70">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6c987] [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6c987] [animation-delay:300ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6c987] [animation-delay:600ms]" />
            </span>
          </div>

          <p className="label mb-3 text-[#e6c987]">Personal styling help</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] leading-tight text-[#f5efe4]">
            Ask our <em className="italic text-[#e6c987]">assistant</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#f5efe4]/85">
            Questions on blouse styles, fabric metres, Aari budgets, or
            turnaround? Our assistant can guide you — English, Tamil &amp;
            Tanglish.
          </p>
          <div className="mt-7">
            <MagneticButton href="/assistant" variant="solid">
              Open assistant →
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
