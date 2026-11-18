"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32 });
  const ry = useSpring(y, { stiffness: 350, damping: 32 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      );
      setHovering(!!interactive);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] hidden md:block"
        style={{ x, y }}
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a35c]" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[99] hidden md:block"
        style={{ x: rx, y: ry }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a35c]/50 transition-all duration-300 ${
            hovering ? "h-10 w-10" : "h-6 w-6"
          }`}
        />
      </motion.div>
    </>
  );
}
