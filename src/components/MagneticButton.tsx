"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  as?: "a" | "button";
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  variant = "outline",
  as,
  target,
  rel,
  "aria-label": ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "btn-magnetic label inline-flex items-center justify-center px-9 py-4 transition-colors duration-500 relative md:px-10 md:py-[1.15rem]";
  const variants = {
    solid: "bg-gold text-charcoal border border-gold",
    outline: "border border-gold/80 text-ivory hover:border-gold",
    ghost: "border border-transparent text-ivory",
  };

  const Comp = as || (href ? "a" : "button");
  const shared = {
    ref: ref as never,
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: springX, y: springY },
    "aria-label": ariaLabel,
  };

  if (Comp === "a") {
    return (
      <motion.a {...shared} href={href} onClick={onClick} target={target} rel={rel}>
        <span className="fill-sweep" aria-hidden />
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...shared} onClick={onClick}>
      <span className="fill-sweep" aria-hidden />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
