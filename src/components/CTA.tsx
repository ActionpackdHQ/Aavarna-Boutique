"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { contact } from "@/lib/data";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-[#c9a35c]/15 px-5 py-16 md:px-10 md:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 bg-[url('/images/maroon-silk-texture.webp')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#161210] via-[#161210]/85 to-[#161210]" />

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label mb-3 text-gold"
        >
          Visit · WhatsApp · Book
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[clamp(2.5rem,7vw,5.5rem)] text-ivory"
        >
          Chat with us on{" "}
          <em className="italic text-gold">WhatsApp</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ivory/70 md:text-lg"
        >
          Send your fabric photos, design reference, or measurements. Or request
          a consultation — our team confirms every booking. Chennai ·{" "}
          {contact.phone}.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href={contact.whatsapp}
            variant="solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with us on WhatsApp
          </MagneticButton>
          <MagneticButton
            href={contact.calendar}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request consultation
          </MagneticButton>
        </motion.div>
        <p className="mt-6 text-sm text-ivory/45">
          Consultation requests are not confirmed until the team replies on
          WhatsApp.
        </p>
      </div>
    </section>
  );
}
