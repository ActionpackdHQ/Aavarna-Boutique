"use client";

/**
 * OpeningReveal v2 — sharp zoom fix
 * Texture is full-screen at natural cover size; expanding circle is only a
 * clip-path mask so pixels never get scaled from 120px → 240vmax.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { contact } from "@/lib/data";
import GoldParticles from "./GoldParticles";
import ShimmerWord from "./ShimmerWord";

type Props = {
  onComplete?: () => void;
};

export default function OpeningReveal({ onComplete }: Props) {
  const reduced = useReducedMotion();
  // 0 idle, 1 ring, 2 expand, 3 content, 4 CTA, 5 unmount
  const [stage, setStage] = useState(0);
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
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2300),
      setTimeout(() => setStage(4), 3100),
      setTimeout(() => setStage(5), 4600),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (stage >= 5) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  if (stage >= 5) return null;

  const expanded = stage >= 2;
  const shown = stage >= 3;
  const settled = stage >= 4;

  return (
    <div className="fixed inset-0 z-[280] overflow-hidden bg-[#161210]">
      {/* Full-screen texture — clip grows; image never scales */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{
          clipPath: expanded
            ? "circle(140% at 50% 50%)"
            : stage >= 1
              ? "circle(6% at 50% 50%)"
              : "circle(0% at 50% 50%)",
        }}
        transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/maroon-silk-texture.webp)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0d12]/55 via-transparent to-[#160608]/70" />
        <GoldParticles count={18} />
      </motion.div>

      {/* pulsing gold ring */}
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-auto h-24 w-24 rounded-full border border-[#c9a35c]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
            <p className="mt-6 whitespace-nowrap text-center text-[10px] uppercase tracking-[0.5em] text-[#c9a35c]">
              Aavarna Boutique
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* headline + model */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-[1.2fr_0.8fr] md:px-16">
          <div>
            <AnimatePresence>
              {shown && (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    className="mb-5 text-[11px] uppercase tracking-[0.5em] text-[#e6c987]"
                  >
                    Custom designer studio · Chennai
                  </motion.p>
                  <h1 className="display text-[clamp(3rem,9vw,7.5rem)] leading-[1.02] text-[#f5efe4]">
                    <span className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: "110%", rotate: 2 }}
                        animate={{ y: "0%", rotate: 0 }}
                        transition={{
                          delay: 0.15,
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        Stitched
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: "110%", rotate: 2 }}
                        animate={{ y: "0%", rotate: 0 }}
                        transition={{
                          delay: 0.27,
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <ShimmerWord>for you.</ShimmerWord>
                      </motion.span>
                    </span>
                  </h1>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative hidden h-[70vh] md:block">
            <AnimatePresence>
              {shown && (
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{
                    delay: 0.35,
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/reveal-model-bridal.webp"
                    alt="Traditional silk saree drape by Aavarna Boutique"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#160608]/50 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CTA */}
      <AnimatePresence>
        {settled && (
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-3 bg-[#c9a35c] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[#160608] transition-colors hover:bg-[#e6c987]"
            >
              Book a fitting →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
