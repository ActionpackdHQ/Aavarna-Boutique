"use client";

export default function ShimmerWord({ children }: { children: string }) {
  return (
    <em className="italic text-[#e6c987] animate-[soft-shimmer-glow_4.5s_ease-in-out_infinite]">
      {children}
    </em>
  );
}
