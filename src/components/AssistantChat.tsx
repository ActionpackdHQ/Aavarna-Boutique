"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Wallet,
  Palette,
  Scissors,
  Ruler,
  Package,
  CreditCard,
  Store,
  type LucideIcon,
} from "lucide-react";

type Msg = {
  id: string;
  role: "user" | "agent";
  text: string;
  error?: boolean;
};

const TOPICS: { label: string; Icon: LucideIcon }[] = [
  { label: "Bridal consultation", Icon: Heart },
  { label: "Pricing & budget", Icon: Wallet },
  { label: "Design & styling", Icon: Palette },
  { label: "Fabric guidance", Icon: Scissors },
  { label: "Measurements & fitting", Icon: Ruler },
  { label: "Booking & delivery", Icon: Package },
  { label: "Payments & policies", Icon: CreditCard },
  { label: "Shop information", Icon: Store },
];

export default function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastFailed, setLastFailed] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string, opts?: { retry?: boolean }) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setLastFailed(null);
    setInput("");

    if (!opts?.retry) {
      const userMsg: Msg = {
        id: `u-${Date.now()}`,
        role: "user",
        text: trimmed,
      };
      setMessages((m) => [...m.filter((x) => !x.error), userMsg]);
    } else {
      setMessages((m) => m.filter((x) => !x.error));
    }

    const agentId = `a-${Date.now()}`;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      const contentType = res.headers.get("content-type") ?? "";

      // Non-stream JSON errors (503 / validation)
      if (!res.ok || !contentType.includes("text/event-stream")) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || "Request failed");
      }

      if (!res.body) throw new Error("Request failed");

      setMessages((m) => [
        ...m,
        { id: agentId, role: "agent", text: "" },
      ]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let produced = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const frames = buffer.split("\n\n");
        buffer = frames.pop() ?? "";

        for (const frame of frames) {
          const line = frame
            .split("\n")
            .map((l) => l.trim())
            .find((l) => l.startsWith("data: "));
          if (!line) continue;

          const payload = JSON.parse(line.slice(6)) as {
            text?: string;
            done?: boolean;
            error?: string;
          };

          if (payload.error) throw new Error(payload.error);

          if (payload.text) {
            produced = true;
            setLoading(false);
            setMessages((m) =>
              m.map((msg) =>
                msg.id === agentId
                  ? { ...msg, text: msg.text + payload.text }
                  : msg
              )
            );
          }
        }
      }

      if (!produced) {
        throw new Error("Empty reply");
      }
    } catch {
      setLastFailed(trimmed);
      setMessages((m) => {
        const withoutEmpty = m.filter(
          (x) => !(x.id === agentId && !x.text)
        );
        return [
          ...withoutEmpty.filter((x) => !x.error),
          {
            id: `e-${Date.now()}`,
            role: "agent",
            text: "Something went wrong. Please try again.",
            error: true,
          },
        ];
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  async function startOver() {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/chat", { method: "DELETE" });
    } catch {
      try {
        await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reset: true }),
        });
      } catch {
        /* still clear local */
      }
    }
    setMessages([]);
    setLastFailed(null);
    setInput("");
    setLoading(false);
    inputRef.current?.focus();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const showEmpty = messages.length === 0 && !loading;

  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#161210] text-[#f5efe4]">
      {/* cinematic silk atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] bg-[url('/images/maroon-silk-texture.webp')] bg-cover bg-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#161210]/90 via-[#161210]/75 to-[#161210]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(201,163,92,0.16),transparent_65%)]"
      />

      <header className="relative z-30 sticky top-0 border-b border-[#c9a35c]/20 bg-[#161210]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="label text-[#8fa294] transition hover:text-[#e6c987]"
            >
              ← Home
            </Link>
            <div className="h-4 w-px bg-[#c9a35c]/35" aria-hidden />
            <Link
              href="/"
              className="font-serif text-xl tracking-[0.14em] text-[#f5efe4] md:text-2xl"
            >
              Aavarna
            </Link>
          </div>
          <button
            type="button"
            onClick={() => void startOver()}
            disabled={loading}
            className="label border border-[#c9a35c]/50 px-4 py-2 text-[#e6c987] transition hover:bg-[#c9a35c]/10 disabled:opacity-40"
          >
            Start over
          </button>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a35c]/55 to-transparent" />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-8 md:px-8">
        {showEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col"
          >
            <div className="mx-auto mb-10 max-w-lg text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mb-8 inline-flex flex-col items-center rounded-2xl border border-[#c9a35c]/35 bg-[#161210]/70 px-8 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aavarna-logo-hd.svg"
                  alt="Aavarna Boutique"
                  className="h-10 w-auto md:h-12"
                />
              </motion.div>

              <p className="label mb-4 text-[#c9a35c]">Personal styling help</p>
              <h1 className="display text-[clamp(2.6rem,8vw,4.2rem)] leading-[1.05] text-[#f5efe4]">
                Stitched <em className="italic text-[#e6c987]">for you.</em>
              </h1>
              <div className="mx-auto my-5 h-px w-16 bg-[#c9a35c]/70" />
              <p className="text-base leading-relaxed text-[#f5efe4]/70 md:text-[17px]">
                Ask about blouse designs, half sarees, starting prices or a
                consultation with our team.
              </p>
              <p className="label mt-8 text-[#e6c987]">What can we help with?</p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {TOPICS.map(({ label, Icon }, i) => (
                <motion.button
                  key={label}
                  type="button"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.05,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => void send(label)}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-[#c9a35c]/25 bg-[#1c1814]/85 p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:border-[#e6c987]/70 hover:bg-[#221c17] md:p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a35c]/30 bg-[#c9a35c]/10 text-[#e6c987] transition group-hover:border-[#e6c987]/50 group-hover:bg-[#c9a35c]/18">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-[#f5efe4]/90 md:text-[15px]">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3 text-[15px] leading-relaxed md:max-w-[78%] ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-md bg-[#5a2430] text-[#f5efe4] shadow-[0_10px_30px_rgba(90,36,48,0.35)]"
                        : "rounded-2xl rounded-bl-md border border-[#c9a35c]/30 bg-[#1c1814]/90 text-[#f5efe4]/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    {msg.error && lastFailed && (
                      <button
                        type="button"
                        onClick={() => void send(lastFailed, { retry: true })}
                        className="label mt-3 text-[#e6c987] underline-offset-4 hover:underline"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[#c9a35c]/30 bg-[#1c1814]/90 px-4 py-3.5 backdrop-blur-md">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6c987] [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6c987] [animation-delay:200ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6c987] [animation-delay:400ms]" />
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      <form
        onSubmit={onSubmit}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[#c9a35c]/20 bg-[#161210]/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-3 px-5 py-4 md:px-8">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Ask us anything about your outfit..."
            disabled={loading}
            className="max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl border border-[#c9a35c]/35 bg-[#1c1814]/90 px-4 py-3 text-[#f5efe4] outline-none placeholder:text-[#f5efe4]/40 focus:border-[#e6c987] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="shrink-0 rounded-xl bg-[#c9a35c] px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[#161210] transition hover:bg-[#e6c987] disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
