import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Masked line-by-line slide-up reveal */
export function revealLines(
  lines: HTMLElement[],
  opts: { delay?: number; stagger?: number; duration?: number } = {}
) {
  const { delay = 0, stagger = 0.08, duration = 1.1 } = opts;
  gsap.set(lines, { yPercent: 110 });
  return gsap.to(lines, {
    yPercent: 0,
    duration,
    delay,
    stagger,
    ease: "power4.out",
  });
}

/** Clip-path wipe bottom-to-top + inner scale settle */
export function revealImage(
  clipEl: HTMLElement,
  imgEl: HTMLElement | null,
  opts: { delay?: number; duration?: number } = {}
) {
  const { delay = 0, duration = 1.4 } = opts;
  const tl = gsap.timeline({ delay });
  gsap.set(clipEl, { clipPath: "inset(100% 0 0 0)" });
  if (imgEl) gsap.set(imgEl, { scale: 1.2 });

  tl.to(clipEl, {
    clipPath: "inset(0% 0 0 0)",
    duration,
    ease: "power3.inOut",
  });
  if (imgEl) {
    tl.to(
      imgEl,
      { scale: 1, duration: duration * 1.1, ease: "power2.out" },
      0
    );
  }
  return tl;
}

/** Full-width headline wipe from behind a mask */
export function wipeHeadline(
  el: HTMLElement,
  opts: { delay?: number; duration?: number } = {}
) {
  const { delay = 0, duration = 1.2 } = opts;
  gsap.set(el, { clipPath: "inset(0 100% 0 0)" });
  return gsap.to(el, {
    clipPath: "inset(0 0% 0 0)",
    duration,
    delay,
    ease: "power3.inOut",
  });
}

/** Parallax: image moves slower than container (yPercent based) */
export function createParallax(
  trigger: HTMLElement,
  target: HTMLElement,
  speed = 0.3
) {
  if (prefersReducedMotion()) return null;
  return gsap.to(target, {
    yPercent: speed * 30,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/** Full-bleed background parallax at given scroll multiplier */
export function createBleedParallax(
  section: HTMLElement,
  bg: HTMLElement,
  factor = 0.5
) {
  if (prefersReducedMotion()) return null;
  return gsap.fromTo(
    bg,
    { yPercent: -factor * 20 },
    {
      yPercent: factor * 20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

/** Split-letter stagger on eyebrows / labels */
export function scrambleLetters(
  el: HTMLElement,
  opts: { delay?: number; stagger?: number } = {}
) {
  const { delay = 0, stagger = 0.03 } = opts;
  const text = el.textContent || "";
  el.setAttribute("aria-label", text);
  el.innerHTML = text
    .split("")
    .map(
      (ch) =>
        `<span class="inline-block will-change-transform" style="opacity:0;transform:translateY(0.6em)">${
          ch === " " ? "&nbsp;" : ch
        }</span>`
    )
    .join("");

  const spans = el.querySelectorAll("span");
  return gsap.to(spans, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    delay,
    stagger,
    ease: "power3.out",
  });
}

/** Count-up when scrolled into view */
export function animateCounter(
  el: HTMLElement,
  end: number,
  opts: { suffix?: string; duration?: number; decimals?: number } = {}
) {
  const { suffix = "", duration = 2, decimals = 0 } = opts;
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: end,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true,
    },
    onUpdate: () => {
      el.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
    },
  });
}

/** Section enter: wipe headline + reveal images inside */
export function sectionEnter(
  section: HTMLElement,
  opts: { headline?: HTMLElement | null; images?: HTMLElement[] } = {}
) {
  const { headline, images = [] } = opts;
  const ctx = gsap.context(() => {
    if (headline) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () => wipeHeadline(headline),
      });
    }
    images.forEach((wrap) => {
      const img = wrap.querySelector("img") as HTMLElement | null;
      ScrollTrigger.create({
        trigger: wrap,
        start: "top 80%",
        once: true,
        onEnter: () => revealImage(wrap, img),
      });
    });
  }, section);
  return ctx;
}

/** Sync Lenis with ScrollTrigger */
export function syncLenisScrollTrigger(lenis: {
  on: (e: string, cb: (l: { scroll: number }) => void) => void;
}) {
  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });
  gsap.ticker.add((time) => {
    // lenis.raf expects ms
    (lenis as unknown as { raf: (t: number) => void }).raf?.(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
