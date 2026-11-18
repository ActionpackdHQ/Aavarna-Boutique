"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { contact } from "@/lib/data";

const links = [
  { href: "#collections", label: "Services" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "#products", label: "Prices" },
  { href: "/assistant", label: "Assistant" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/70 py-3 backdrop-blur-md border-b border-ivory/5"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
        <ul className="hidden items-center gap-8 lg:flex">
          {links.slice(0, 2).map((l) => (
            <li key={l.href}>
              <a href={l.href} className="label text-ivory/70 transition hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#top"
          className="display absolute left-1/2 max-w-[55vw] -translate-x-1/2 text-center text-base tracking-[0.1em] text-ivory sm:text-lg md:text-2xl md:tracking-[0.16em]"
        >
          Aavarna Boutique
        </a>

        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <ul className="mr-4 hidden items-center gap-8 lg:flex">
            {links.slice(2).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label text-ivory/70 transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <MagneticButton
            href={contact.whatsapp}
            variant="solid"
            className="hidden !px-5 !py-3 sm:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </MagneticButton>
          <button
            type="button"
            className="label relative z-50 flex h-10 w-10 items-center justify-center text-ivory lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-6 bg-ivory transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-6 bg-ivory transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-6 bg-ivory transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-charcoal px-8 pt-28 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="display border-b border-ivory/10 py-5 text-4xl text-ivory"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-10 text-gold"
              onClick={() => setOpen(false)}
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
