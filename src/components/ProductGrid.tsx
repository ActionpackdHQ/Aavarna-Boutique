"use client";

import { useEffect, useRef } from "react";
import { products, contact } from "@/lib/data";
import StitchHeading from "./StitchHeading";
import CountUp from "./CountUp";
import TiltCard from "./TiltCard";
import {
  gsap,
  registerGSAP,
  ScrollTrigger,
  prefersReducedMotion,
} from "@/lib/animations";

export default function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.fromTo(
              card,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                delay: 0.1 * i,
                ease: "power3.out",
              }
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative border-t border-[#c9a35c]/15 px-5 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 md:mb-10">
          <StitchHeading
            eyebrow="Rate card · starts from"
            title="Stitching"
            accent="prices."
          />
        </div>
        <p className="mb-8 max-w-xl text-base text-ivory/60 md:-mt-6 md:mb-10">
          Final price is confirmed after seeing your design. Customer fabric
          only — we don&apos;t sell ready-mades.
        </p>

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <article
              key={p.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              data-cursor="VIEW"
              className="group relative opacity-0 motion-reduce:opacity-100"
            >
              <TiltCard>
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                    loading="lazy"
                    width={600}
                    height={800}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.hoverImage}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                    loading="lazy"
                    width={600}
                    height={800}
                  />
                  {p.discount != null && (
                    <span className="label absolute left-3 top-3 bg-charcoal/70 px-3 py-2 text-gold backdrop-blur-sm">
                      {p.discount}% Off
                    </span>
                  )}
                </div>
              </TiltCard>

              <div className="mt-4 translate-y-2 transition duration-500 group-hover:translate-y-0">
                <p className="label mb-2 text-ivory/40">{p.category}</p>
                <h3 className="font-serif text-xl leading-snug text-ivory md:text-2xl">
                  {p.name}
                </h3>
                <div className="mt-2 flex flex-col gap-1">
                  <span className="text-base text-gold md:text-lg">
                    From <CountUp to={p.price} className="text-gold" />
                  </span>
                  {p.note && (
                    <span className="text-sm text-ivory/45">{p.note}</span>
                  )}
                </div>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline label mt-4 inline-block translate-y-3 text-gold opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Enquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
