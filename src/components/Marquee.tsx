"use client";

import { useEffect, useRef } from "react";
import { marqueeText } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/animations";

type Props = {
  reverse?: boolean;
  className?: string;
};

export default function Marquee({ reverse = false, className = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const baseSpeed = useRef(1);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf = 0;
    let offset = reverse ? -50 : 0;

    const tick = () => {
      const lenis = (window as unknown as { __lenis?: { velocity: number } })
        .__lenis;
      const velocityBoost = lenis
        ? Math.min(Math.abs(lenis.velocity) * 0.02, 2)
        : 0;
      const dir = reverse ? 1 : -1;
      offset += dir * (0.04 + velocityBoost) * baseSpeed.current;
      if (offset <= -50) offset += 50;
      if (offset >= 0) offset -= 50;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offset}%, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  const content = (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="mx-4 whitespace-nowrap">
          {marqueeText}
        </span>
      ))}
    </>
  );

  return (
    <div
      className={`overflow-hidden border-y border-ivory/10 bg-charcoal py-4 ${className}`}
      aria-hidden
    >
      <div
        ref={trackRef}
        className="flex w-[200%] will-change-transform label text-gold/80"
        style={{ transform: reverse ? "translate3d(-50%,0,0)" : undefined }}
      >
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0">{content}</div>
      </div>
    </div>
  );
}
