"use client";

import { categories } from "@/lib/data";
import StitchHeading from "./StitchHeading";
import StitchImage from "./StitchImage";

export default function Categories() {
  return (
    <section className="relative border-t border-[#c9a35c]/15 px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 md:mb-10">
          <StitchHeading
            eyebrow="Trending categories"
            title="Start with"
            accent="these."
            flip
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              data-cursor="VIEW"
              className="group relative block"
            >
              <StitchImage
                src={cat.image}
                alt={cat.title}
                className="aspect-[16/10] md:aspect-[16/11]"
                speed={0.08}
              />
              <div className="pointer-events-none absolute inset-0 z-20 flex items-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent p-8 md:p-12">
                <h3 className="display text-3xl text-ivory md:text-5xl">
                  {cat.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
