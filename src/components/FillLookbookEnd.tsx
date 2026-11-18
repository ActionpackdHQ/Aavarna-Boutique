"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";

export default function FillLookbookEnd() {
  return (
    <section className="relative overflow-hidden border-t border-[#c9a35c]/15 bg-[#161210] py-16 md:py-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/images/maroon-silk-texture.webp')] bg-cover bg-center opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#161210] via-[#161210]/70 to-[#161210]" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-8 px-5 md:grid-cols-2 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="label mb-4 text-[#c9a35c]">Your fabric awaits</p>
          <h2 className="font-serif text-3xl leading-tight text-[#f5efe4] md:text-5xl">
            Bring it home.
            <br />
            <em className="italic text-[#e6c987]">We&apos;ll stitch it.</em>
          </h2>
          <p className="mt-5 max-w-md text-base text-[#8fa294]">
            Send a photo of your fabric or design on WhatsApp — we reply with the
            exact quote, timeline and fitting slots the same day.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4 md:justify-end"
        >
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 bg-[#c9a35c] px-8 py-4 text-[#161210] transition-colors hover:bg-[#e6c987]"
          >
            Chat on WhatsApp →
          </a>
          <a
            href="#products"
            className="label inline-flex items-center gap-2 border border-[#c9a35c]/60 px-8 py-4 text-[#e6c987] transition-colors hover:bg-[#c9a35c]/10"
          >
            See rate card
          </a>
        </motion.div>
      </div>
    </section>
  );
}
