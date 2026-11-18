"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/lib/data";

export default function EndVideoPanel() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    const v = vidRef.current;
    if (!v || !useVideo) return;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.play().catch(() => {
      /* autoplay blocked; poster / CSS fallback still shows */
    });
  }, [useVideo]);

  return (
    <div className="relative h-[55vh] w-[80vw] shrink-0 overflow-hidden md:w-[44vw]">
      {useVideo && (
        <video
          ref={vidRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/silk-loop.mp4"
          poster="/images/maroon-silk-texture.webp"
          preload="auto"
          muted
          loop
          playsInline
          onError={() => setUseVideo(false)}
        />
      )}
      {!useVideo && (
        <div
          aria-hidden
          className="absolute inset-0 animate-[silk-drift_14s_ease-in-out_infinite_alternate] bg-[url('/images/maroon-silk-texture.webp')] bg-cover bg-center"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/85 via-[#161210]/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end gap-4 p-8 md:p-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="label text-[#e6c987]"
        >
          Every thread, in motion
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl leading-snug text-[#f5efe4] md:text-4xl"
        >
          Bring it home.
          <br />
          <em className="italic text-[#e6c987]">We&apos;ll stitch it.</em>
        </motion.h3>
        <motion.a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="label mt-1 inline-flex w-fit items-center gap-2 bg-[#c9a35c] px-7 py-3.5 text-[#161210] transition-colors hover:bg-[#e6c987]"
        >
          Chat on WhatsApp →
        </motion.a>
      </div>
    </div>
  );
}
