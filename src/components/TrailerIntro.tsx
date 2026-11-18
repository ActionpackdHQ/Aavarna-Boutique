"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { contact } from "@/lib/data";

const HEADLINE = ["Your fabric.", "Our craft."];

type Props = {
  onComplete?: () => void;
};

export default function TrailerIntro({ onComplete }: Props) {
  const [stage, setStage] = useState(0);
  // 0 black · 1 logo · 2 letters · 3 silk up · 4 rule+CTA · 5 unmount
  const reduced = useReducedMotion();
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onComplete?.();
  };

  useEffect(() => {
    if (reduced) {
      setStage(5);
      finish();
      return;
    }
    const t = [
      setTimeout(() => setStage(1), 150),
      setTimeout(() => setStage(2), 2200),
      setTimeout(() => setStage(3), 3400),
      setTimeout(() => setStage(4), 4200),
      setTimeout(() => setStage(5), 6000),
    ];
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (stage >= 5) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  if (stage >= 5) return null;

  const s = (n: number) => stage >= n;

  return (
    <AnimatePresence>
      <motion.div
        key="trailer"
        className="fixed inset-0 z-[280] overflow-hidden bg-[#161210]"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage >= 5 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* silk background — fades up from black */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/maroon-silk-texture.webp)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: s(3) ? 0.85 : 0 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161210]/70 via-transparent to-[#161210]/80" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* logo bloom */}
          <motion.div
            initial={{ opacity: 0, scale: 1.15, filter: "blur(14px)" }}
            animate={{
              opacity: s(1) ? 1 : 0,
              scale: s(1) ? 1 : 1.15,
              filter: s(1) ? "blur(0px)" : "blur(14px)",
            }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/aavarna-logo-hd.svg"
              alt="Aavarna Boutique"
              className="h-20 w-auto sm:h-28"
              style={{
                filter: "drop-shadow(0 0 40px rgba(201,163,92,0.35))",
              }}
            />
          </motion.div>

          <motion.div
            className="mt-5 h-px bg-[#c9a35c]"
            initial={{ width: 0 }}
            animate={{ width: s(1) ? 72 : 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: "easeInOut" }}
          />

          <h1 className="mt-10 font-serif text-[clamp(3.2rem,9vw,7.5rem)] leading-[1.05] text-[#f5efe4]">
            {HEADLINE.map((line, li) => (
              <span
                key={li}
                className={`block ${li === 1 ? "italic text-[#e6c987]" : ""}`}
              >
                {line.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: s(2) ? 1 : 0 }}
                    transition={{
                      delay: 2.2 + (li * line.length + ci) * 0.04,
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            className="label mt-6 text-[#cbb891]"
            initial={{ opacity: 0 }}
            animate={{ opacity: s(3) ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          >
            Custom designer studio · Chennai
          </motion.p>

          <motion.div
            className="my-8 h-px w-full max-w-3xl origin-left bg-[#c9a35c]/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: s(4) ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-3 border border-[#c9a35c] px-9 py-4 text-[#e6c987] transition-colors duration-500 hover:bg-[#c9a35c] hover:text-[#161210]"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: s(4) ? 1 : 0,
              y: s(4) ? 0 : 10,
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Book a fitting →
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
