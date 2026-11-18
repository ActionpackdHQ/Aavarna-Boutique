"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function StitchImage({
  src,
  alt = "",
  className = "",
  speed = 0.1,
}: {
  src: string;
  alt?: string;
  className?: string;
  speed?: number;
}) {
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

  const sides = [
    { d: "M2 2 H98" },
    { d: "M98 2 V98" },
    { d: "M98 98 H2" },
    { d: "M2 98 V2" },
  ];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        className="pointer-events-none absolute -inset-2.5 z-10 h-[calc(100%+1.25rem)] w-[calc(100%+1.25rem)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        {sides.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            stroke="#c9a35c"
            strokeWidth="1.6"
            strokeDasharray="5 6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.8 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.5,
              delay: i * 0.28,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <motion.div
        className="relative h-full w-full overflow-hidden"
        initial={{
          opacity: 0,
          filter: reduced ? "none" : "blur(10px)",
          scale: reduced ? 1 : 1.06,
        }}
        whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {!reduced ? (
          <motion.div style={{ y }} className="absolute inset-[-15%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </motion.div>
    </div>
  );
}
