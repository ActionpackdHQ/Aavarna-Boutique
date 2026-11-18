"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { imgWipe } from "@/lib/anim";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  speed?: number;
  priority?: boolean;
};

export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  speed = 0.18,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`-${speed * 100}%`, `${speed * 100}%`]
  );

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      variants={reduced ? undefined : imgWipe}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, margin: "-15%" }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-[-20%] will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      </motion.div>
    </motion.div>
  );
}
