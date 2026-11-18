"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { lookbook } from "@/lib/data";
import StitchHeading from "./StitchHeading";
import EndVideoPanel from "./EndVideoPanel";

export default function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [travel, setTravel] = useState("0px");
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0px", travel]);

  useEffect(() => {
    if (reduced) return;

    const measure = () => {
      if (!trackRef.current) return;
      const w = trackRef.current.scrollWidth;
      setTravel(`-${Math.max(0, w - window.innerWidth)}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    // Remeasure after images settle
    const t = window.setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section
        id="lookbook"
        className="relative border-t border-[#c9a35c]/15 py-16 md:py-20"
      >
        <div className="mx-auto mb-8 max-w-[1600px] px-5 md:px-10">
          <StitchHeading
            eyebrow="Studio lookbook"
            title="Made to"
            accent="measure."
            flip
          />
        </div>
        <div
          className="flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-lenis-prevent
        >
          {lookbook.map((panel) => (
            <article
              key={panel.id}
              className="relative h-[55vh] w-[85vw] shrink-0 snap-center overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={panel.image}
                alt={panel.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="display text-3xl text-ivory">{panel.title}</h3>
                <p className="mt-1 text-base text-ivory/65">{panel.subtitle}</p>
              </div>
            </article>
          ))}
          <div className="shrink-0 snap-center">
            <EndVideoPanel />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="lookbook"
      ref={ref}
      className="relative h-[170vh] border-t border-[#c9a35c]/15"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-6 px-5 md:mb-8 md:px-10">
          <StitchHeading
            eyebrow="Studio lookbook"
            title="Made to"
            accent="measure."
            flip
          />
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-5 pl-5 pr-5 will-change-transform md:gap-6 md:pl-10 md:pr-10"
        >
          {lookbook.map((panel) => (
            <article
              key={panel.id}
              data-cursor="DRAG"
              className="group relative h-[55vh] w-[70vw] shrink-0 overflow-hidden md:w-[32vw]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={panel.image}
                alt={panel.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="display text-3xl text-ivory md:text-4xl">
                  {panel.title}
                </h3>
                <p className="label mt-2 text-gold">{panel.subtitle}</p>
              </div>
            </article>
          ))}
          <EndVideoPanel />
        </motion.div>
      </div>
    </section>
  );
}
