"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/data";
import GoldParticles from "./GoldParticles";

const EASE = [0.22, 1, 0.36, 1] as const;

const signature = [
  { icon: "❋", l1: "FINEST", l2: "FABRICS" },
  { icon: "◈", l1: "HERITAGE", l2: "CRAFTSMANSHIP" },
  { icon: "✦", l1: "ENDURING", l2: "ELEGANCE" },
];

const navLinks = [
  { href: "#top", label: "HOME" },
  { href: "#lookbook", label: "NEW ARRIVALS" },
  { href: "#collections", label: "CATEGORIES" },
  { href: "#products", label: "RATE CARD" },
  { href: "#products", label: "BEST SELLER" },
  { href: "#cta", label: "CONTACT" },
];

type Props = { ready?: boolean };

export default function CultureHero({ ready = true }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const play = ready && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "18%"]
  );
  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 1.08]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "35%"]
  );
  const fade = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduced ? [1, 1] : [1, 0]
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#1a0708]"
    >
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-[center_25%] animate-hero-zoom"
          style={{ backgroundImage: "url(/images/culture-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0708]/80 via-[#1a0708]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a0708]/85 to-transparent" />
        <GoldParticles count={18} />
      </motion.div>

      {/* NAV over image */}
      <motion.header
        initial={play ? { y: -40, opacity: 0 } : false}
        animate={ready || reduced ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
        className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12"
      >
        <a
          href="#top"
          className="relative z-10 h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/40 md:h-14 md:w-14"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/aavarna-logo-hd.svg"
            alt="Aavarna Boutique"
            className="h-full w-full scale-[1.35] object-cover"
          />
        </a>

        <nav className="hidden items-center gap-9 text-[11px] tracking-[0.22em] text-[#f5efe4] lg:flex">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative pb-1 transition-colors hover:text-[#e6c987] ${
                i === 0 ? "text-[#e6c987]" : ""
              }`}
            >
              {l.label}
              {i === 0 && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-[#e6c987]"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-[11px] text-[#f5efe4]">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="relative hidden cursor-pointer hover:text-[#e6c987] sm:inline"
            aria-label="WhatsApp"
          >
            ✉
            <span className="absolute -right-2 -top-1.5 h-4 min-w-4 rounded-full bg-[#c9a35c] px-1 text-center text-[9px] leading-4 text-[#1a0708]">
              1
            </span>
          </a>
          <button
            type="button"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-6 bg-[#f5efe4] transition ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-[#f5efe4] transition ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-[#f5efe4] transition ${
                  mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {mobileOpen && (
        <div className="absolute inset-0 z-40 flex flex-col bg-[#1a0708]/95 px-8 pt-28 backdrop-blur-md lg:hidden">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/10 py-4 font-serif text-2xl text-[#f5efe4]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={contact.whatsapp}
            className="mt-8 text-[11px] tracking-[0.3em] text-[#e6c987] uppercase"
            onClick={() => setMobileOpen(false)}
          >
            WhatsApp
          </a>
        </div>
      )}

      {/* MAIN CONTENT */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-20 flex h-[calc(100%-88px)] items-center"
      >
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="pt-4">
            <div className="mb-3 overflow-hidden">
              <motion.p
                initial={play ? { y: "120%" } : false}
                animate={ready || reduced ? { y: 0 } : { y: "120%" }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
                className="text-[11px] uppercase tracking-[0.55em] text-[#e9dcc3] md:text-xs"
              >
                Custom stitching, woven with
              </motion.p>
            </div>

            <div className="relative inline-block">
              <h1 className="font-serif text-[clamp(4rem,10vw,9.5rem)] font-medium leading-none tracking-[0.02em] text-[#f3e9db]">
                {"COUTURE".split("").map((c, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <motion.span
                      className="inline-block"
                      initial={play ? { y: "110%" } : false}
                      animate={ready || reduced ? { y: 0 } : { y: "110%" }}
                      transition={{
                        delay: 0.65 + i * 0.055,
                        duration: 0.9,
                        ease: EASE,
                      }}
                    >
                      {c}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.svg
                viewBox="0 0 420 60"
                fill="none"
                className="absolute -bottom-8 left-0 w-[min(420px,90%)] text-[#e6c987]"
                initial={{ opacity: 0 }}
                animate={ready || reduced ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.5 }}
              >
                <motion.path
                  d="M6 38 C 120 10, 300 8, 414 34 M300 44 C 330 52, 356 54, 380 50"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={
                    ready || reduced ? { pathLength: 1 } : { pathLength: 0 }
                  }
                  transition={{ delay: 1.5, duration: 1.1, ease: "easeInOut" }}
                />
              </motion.svg>
            </div>

            <div className="mt-10 overflow-hidden">
              <motion.p
                initial={play ? { y: "120%" } : false}
                animate={ready || reduced ? { y: 0 } : { y: "120%" }}
                transition={{ delay: 1.35, duration: 0.8, ease: EASE }}
                className="text-[11px] uppercase leading-6 tracking-[0.4em] text-[#e9dcc3] md:text-xs"
              >
                Your fabric, our stitch —<br />
                blouses, ethnic, Aari &amp; more
              </motion.p>
            </div>

            <motion.a
              href="#products"
              initial={play ? { opacity: 0, y: 24 } : false}
              animate={
                ready || reduced
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{ delay: 1.65, duration: 0.8, ease: EASE }}
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-[#f5efe4]/70 px-9 py-4 text-[11px] uppercase tracking-[0.3em] text-[#f5efe4] backdrop-blur-[2px] transition-all duration-500 hover:border-[#f5efe4] hover:bg-[#f5efe4] hover:text-[#1a0708]"
            >
              Explore the collection
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </motion.a>

            <motion.div
              initial="hidden"
              animate={ready || reduced ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.18, delayChildren: 2.0 },
                },
              }}
              className="mt-12"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mb-5 text-[10px] uppercase tracking-[0.45em] text-[#cbb891]"
              >
                The Aavarna Signature
              </motion.p>
              <div className="flex items-stretch">
                {signature.map((s, i) => (
                  <motion.div
                    key={s.l1}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: EASE },
                      },
                    }}
                    className={`pr-6 sm:pr-8 ${
                      i > 0 ? "border-l border-[#f5efe4]/25 pl-6 sm:pl-8" : ""
                    }`}
                  >
                    <div className="mb-2 text-lg text-[#e6c987]">{s.icon}</div>
                    <div className="text-[10px] uppercase leading-5 tracking-[0.28em] text-[#f5efe4]">
                      {s.l1}
                      <br />
                      {s.l2}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="relative hidden h-full min-h-[420px] lg:block">
            <motion.p
              initial={{ opacity: 0 }}
              animate={ready || reduced ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2.4, duration: 1 }}
              className="absolute right-0 top-1/3 text-[10px] uppercase tracking-[0.5em] text-[#e9dcc3] [writing-mode:vertical-rl]"
            >
              Crafted · Elegance · Woven · Stories
            </motion.p>
            <motion.p
              initial={play ? { opacity: 0, x: 20 } : false}
              animate={
                ready || reduced
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 20 }
              }
              transition={{ delay: 2.55, duration: 0.9, ease: EASE }}
              className="absolute bottom-6 right-10 font-serif text-2xl italic text-[#e6c987]/90 [text-shadow:0_1px_12px_rgba(0,0,0,.6)]"
            >
              Wear a story ✨
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.9, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-lg text-[#e6c987]"
        >
          ⌄
        </motion.span>
        <span className="text-[9px] uppercase tracking-[0.5em] text-[#e9dcc3]">
          Scroll to discover
        </span>
      </motion.div>
    </section>
  );
}
