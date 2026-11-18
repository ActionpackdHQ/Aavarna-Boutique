"use client";

import { motion } from "framer-motion";

const items = [
  {
    icon: "◈",
    title: "Advance on order",
    proof: "Slot confirmed the same day you book",
  },
  {
    icon: "✦",
    title: "₹0 alterations",
    proof: "Free fitting adjustments until it's perfect",
  },
  {
    icon: "❋",
    title: "In-person trials",
    proof: "Unlimited trials at the Chennai studio",
  },
  {
    icon: "◇",
    title: "48h express",
    proof: "Rush stitching available on request",
  },
];

export default function PromiseRow() {
  return (
    <section className="border-t border-[#2c221c]/10 bg-[#f5efe4] py-16 md:py-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="label mb-3 text-center text-[#b98a3e]">Studio promise</p>
        <h2 className="mb-10 text-center font-serif text-3xl text-[#2c221c] md:text-5xl">
          Stitched with <em className="italic text-[#b98a3e]">care.</em>
        </h2>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#2c221c]/10 md:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="bg-[#faf6ee] p-6 transition-colors duration-500 hover:bg-white md:p-7"
            >
              <div className="mb-3 text-2xl text-[#b98a3e]">{it.icon}</div>
              <div className="text-sm font-medium text-[#2c221c] md:text-base">
                {it.title}
              </div>
              <div className="mt-1.5 text-[13px] leading-relaxed text-[#6d6154] md:text-sm">
                {it.proof}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
