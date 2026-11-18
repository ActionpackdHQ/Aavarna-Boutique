"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import MagneticButton from "./MagneticButton";
import GoldParticles from "./GoldParticles";
import ShimmerWord from "./ShimmerWord";
import HeroBottomFill from "./HeroBottomFill";
import { contact } from "@/lib/data";
import { lineReveal } from "@/lib/anim";

type Props = {
  ready: boolean;
};

export default function Hero({ ready }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax Y only — never animate scale here (conflicts with the entrance zoom)
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "18%"]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "28%"]
  );
  const fade = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduced ? [1, 1] : [1, 0]
  );

  const show = ready && !reduced;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden"
    >
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.12 }}
          animate={ready || reduced ? { scale: 1 } : { scale: 1.12 }}
          transition={{ duration: 12, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-campaign-silk-drape.webp"
            alt="Cinematic campaign — silk saree draped in dramatic side light"
            className="h-full w-full object-cover object-[72%_18%] sm:object-[center_20%]"
            fetchPriority="high"
            width={1600}
            height={2000}
            draggable={false}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/75 to-[#161210]/45 md:via-[#161210]/40 md:to-[#161210]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161210]/90 via-[#161210]/55 to-transparent md:via-[#161210]/25 md:from-[#161210]/70" />
        {ready && !reduced && <GoldParticles count={14} />}
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-5 pb-28 pt-28 md:px-10 md:pb-32"
      >
        <div className="max-w-xl">
          <p className="label mb-3 overflow-hidden text-gold">
            <motion.span
              className="block"
              initial={reduced || !ready ? false : { y: 20, opacity: 0 }}
              animate={
                ready || reduced ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
              }
              transition={{ delay: 0.35, duration: 0.8 }}
            >
              Custom designer studio · Chennai
            </motion.span>
          </p>
          <h1 className="display text-[clamp(3rem,12vw,8rem)] text-ivory drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={lineReveal}
                custom={0}
                initial="hidden"
                animate={show ? "show" : reduced ? "show" : "hidden"}
              >
                Stitched
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={lineReveal}
                custom={1}
                initial="hidden"
                animate={show ? "show" : reduced ? "show" : "hidden"}
              >
                <ShimmerWord>for you.</ShimmerWord>
              </motion.span>
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/85 md:text-lg md:text-ivory/75">
            Bring your fabric — we stitch blouses, ethnic wear, Aari work,
            western &amp; kids wear to your measurements. English, Tamil &amp;
            Tanglish.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton
              href={contact.whatsapp}
              variant="solid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </MagneticButton>
            <MagneticButton href="#products" variant="outline">
              View Starting Prices
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      {ready && <HeroBottomFill />}
    </section>
  );
}
