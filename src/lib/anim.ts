import type { Variants } from "framer-motion";

/** Masked line reveal — luxury headline effect */
export const lineReveal: Variants = {
  hidden: { y: "110%", rotate: 3 },
  show: (i: number = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
};

/** Clip-path wipe for images (bottom-to-top curtain) */
export const imgWipe: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
