"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/animations";

type Props = {
  onComplete: () => void;
};

export default function Preloader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      setDone(true);
      return;
    }

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete();
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (pctRef.current) {
          pctRef.current.textContent = `${Math.round(obj.val)}`;
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${obj.val / 100})`;
        }
      },
    })
      .to(".preloader-content", {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      })
      .to(leftRef.current, {
        yPercent: -101,
        duration: 1.15,
        ease: "power4.inOut",
      })
      .to(
        rightRef.current,
        { yPercent: 101, duration: 1.15, ease: "power4.inOut" },
        "<"
      )
      .set(rootRef.current, { pointerEvents: "none", autoAlpha: 0 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (done && prefersReducedMotion()) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300]"
      aria-hidden={done}
      role="status"
      aria-label="Loading Aavarna Boutique"
    >
      {/* Two-panel curtain (wipe reveals hero) */}
      <div
        ref={leftRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/2 bg-charcoal will-change-transform"
      />
      <div
        ref={rightRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-charcoal will-change-transform"
      />

      <div className="preloader-content relative z-20 flex h-full flex-col items-center justify-center px-6">
        <p className="preloader-wordmark display text-center text-2xl tracking-[0.2em] text-ivory sm:text-3xl md:text-4xl md:tracking-[0.28em]">
          Aavarna Boutique
        </p>
        <div className="mt-12 flex flex-col items-center gap-4">
          <span ref={pctRef} className="label text-gold tabular-nums">
            0
          </span>
          <div className="h-[1px] w-48 overflow-hidden bg-ivory/10 sm:w-64">
            <div
              ref={barRef}
              className="h-full w-full origin-left bg-gold will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
