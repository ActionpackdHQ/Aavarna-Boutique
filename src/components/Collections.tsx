"use client";

import { useEffect, useRef } from "react";
import { collections } from "@/lib/data";
import StitchHeading from "./StitchHeading";
import {
  gsap,
  registerGSAP,
  ScrollTrigger,
  prefersReducedMotion,
  revealImage,
} from "@/lib/animations";

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const tilesRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      tilesRef.current.forEach((tile) => {
        if (!tile) return;
        const clip = tile.querySelector("[data-clip]") as HTMLElement;
        const img = tile.querySelector("img") as HTMLElement;
        ScrollTrigger.create({
          trigger: tile,
          start: "top 80%",
          once: true,
          onEnter: () => revealImage(clip, img),
        });
        gsap.to(img, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: tile,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative border-t border-[#c9a35c]/15 px-5 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 md:mb-10">
          <StitchHeading
            eyebrow="What we stitch"
            title="Crafted for"
            accent="every occasion."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {collections.map((c, i) => (
            <a
              key={c.id}
              href={c.href}
              ref={(el) => {
                tilesRef.current[i] = el;
              }}
              data-cursor="VIEW"
              className="group relative block aspect-[3/4] overflow-hidden md:aspect-[4/5]"
            >
              <div
                data-clip
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "inset(100% 0 0 0)" }}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full scale-[1.2] object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
                  loading="lazy"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
              </div>
              {/* Gold frame line */}
              <span
                className="pointer-events-none absolute inset-3 border border-gold/0 transition duration-700 group-hover:border-gold/60 md:inset-5"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-10">
                <h3 className="display text-3xl text-ivory md:text-4xl lg:text-5xl">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ivory/75">
                  {c.copy}
                </p>
                <span className="gold-underline label mt-6 inline-block text-gold">
                  View starting prices
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
