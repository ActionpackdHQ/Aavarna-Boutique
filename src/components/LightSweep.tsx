"use client";

import { motion } from "framer-motion";

export default function LightSweep({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-y-20 w-[60%] blur-3xl"
        style={{
          background:
            "linear-gradient(105deg, transparent, rgba(230,201,135,0.28), transparent)",
        }}
        initial={{ left: "-70%" }}
        whileInView={{ left: ["-70%", "110%"] }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      {children}
    </div>
  );
}
