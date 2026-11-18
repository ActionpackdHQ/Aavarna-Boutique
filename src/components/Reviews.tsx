"use client";

import { motion } from "framer-motion";
import { reviews } from "@/lib/data";

export default function Reviews() {
  return (
    <section className="relative overflow-hidden border-t border-[#c9a35c]/15 bg-[#120f0c] py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 bg-[url('/images/maroon-silk-texture.webp')] bg-cover bg-center"
      />
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label mb-3 text-center text-[#c9a35c]"
        >
          From the fitting room
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="display mb-10 text-center text-[clamp(2.2rem,5vw,3.8rem)] text-[#f5efe4]"
        >
          Words from{" "}
          <em className="italic text-[#e6c987]">clients</em>
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                delay: i * 0.12,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col border border-[#c9a35c]/20 bg-[#161210]/80 p-7 backdrop-blur-sm md:p-8"
            >
              <span className="font-serif text-3xl leading-none text-[#e6c987]">
                “
              </span>
              <p className="mt-2 flex-1 text-base leading-relaxed text-[#f5efe4]/85">
                {r.quote}
              </p>
              <footer className="mt-6 border-t border-[#c9a35c]/15 pt-4">
                <cite className="not-italic">
                  <span className="block font-medium text-[#e6c987]">
                    {r.name}
                  </span>
                  <span className="label mt-1 block text-ivory/45">
                    {r.place}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
