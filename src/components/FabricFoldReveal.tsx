"use client";

import { motion } from "framer-motion";

export default function FabricFoldReveal({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-10 bg-cream"
        initial={{ clipPath: "inset(0 0 0 0)" }}
        whileInView={{ clipPath: "inset(0 0 40% 0)" }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: "none" }}
      />
      <motion.div
        className="absolute inset-0 z-20 origin-top bg-cream-2"
        initial={{ clipPath: "inset(0 0 40% 0)", scaleY: 1 }}
        whileInView={{ clipPath: "inset(0 0 40% 0)", scaleY: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.34, 1.4, 0.44, 1] }}
        style={{ transformOrigin: "top", pointerEvents: "none" }}
      />
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        initial={{ scale: 1.12, filter: "brightness(0.9)" }}
        whileInView={{ scale: 1, filter: "brightness(1)" }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
