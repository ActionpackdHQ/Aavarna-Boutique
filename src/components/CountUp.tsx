"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({
  to,
  prefix = "₹",
  className = "",
}: {
  to: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(to);
  const spring = useSpring(mv, { stiffness: 70, damping: 22 });

  useEffect(() => {
    if (!inView) return;
    mv.set(Math.round(to * 0.6));
    const t = setTimeout(() => mv.set(to), 80);
    return () => clearTimeout(t);
  }, [inView, mv, to]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("en-IN")}`;
        }
      }),
    [spring, prefix]
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toLocaleString("en-IN")}
    </span>
  );
}
