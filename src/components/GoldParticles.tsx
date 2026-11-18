"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

function seed(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function GoldParticles({ count = 14 }: { count?: number }) {
  const reduced = useReducedMotion();

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seed(i) * 100,
        top: seed(i + 17) * 100,
        size: 1.5 + seed(i + 31) * 2.5,
        dur: 10 + seed(i + 41) * 8,
        delay: seed(i + 53) * 6,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-[#e6c987]/70"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 5px 0 rgba(230,201,135,.35)",
            animation: `gold-float ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
