"use client";

import { motion } from "framer-motion";

export default function BrandStatement() {
  return (
    <section className="relative overflow-hidden border-t border-[#c9a35c]/15">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
        <div className="relative min-h-[52vh] overflow-hidden lg:min-h-[70vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand-statement-zari-closeup.webp"
            alt="Gold zari weave close-up on dark silk"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#161210]/40 max-lg:bg-gradient-to-t max-lg:from-[#161210]/80 max-lg:via-transparent max-lg:to-transparent" />
          <motion.div
            aria-hidden
            initial={{ pathLength: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pointer-events-none absolute inset-5 border border-[#c9a35c]/35 md:inset-8"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-14 md:px-12 md:py-20 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label mb-3 text-[#c9a35c]"
          >
            The atelier
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(2.4rem,5vw,4.2rem)] text-[#f5efe4]"
          >
            Your fabric.{" "}
            <em className="italic text-[#e6c987]">Our stitch.</em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="my-6 h-px w-24 origin-left bg-[#c9a35c]/70"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="max-w-md text-base leading-relaxed text-ivory/70 md:text-lg"
          >
            Aavarna Boutique is a custom designer stitching studio in Chennai —
            not a ready-made shop. Measurements by video call, studio visit by
            appointment, or a sample blouse with your fabric.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-8 space-y-3 text-sm text-ivory/65 md:text-base"
          >
            {[
              "Customer fabric only — we stitch what you bring",
              "Unlimited free trials until the fit is right",
              "Aari, bridal, ethnic & western — made to measure",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a35c]" />
                {line}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
