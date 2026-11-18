"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/animations";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (prefersReducedMotion() || !barRef.current) return;

    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left pointer-events-none"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gold origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
