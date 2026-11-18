"use client";

import { motion } from "framer-motion";

export default function WarmFloat({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 4,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="transition-[box-shadow] duration-700 [box-shadow:0_10px_40px_rgba(44,34,28,0.08)] hover:[box-shadow:0_18px_60px_rgba(44,34,28,0.14)]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
