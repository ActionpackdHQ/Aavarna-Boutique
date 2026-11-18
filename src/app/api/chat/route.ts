import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  GoogleGenAI,
  ThinkingLevel,
  type Content,
} from "@google/genai";
import { AAVARNA_SYSTEM_INSTRUCTION } from "@/lib/aavarna-system-instruction";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "aavarna_chat_sid";

/**
 * In-memory session store (demo).
 * Migrate to Redis/DB later — serverless instances may lose or split state.
 */
type SessionStore = Map<string, Content[]>;

const globalForSessions = globalThis as unknown as {
  __aavarnaChatSessions?: SessionStore;
};

function getSessions(): SessionStore {
  if (!globalForSessions.__aavarnaChatSessions) {
    globalForSessions.__aavarnaChatSessions = new Map();
  }
  return globalForSessions.__aavarnaChatSessions;
}

function withSessionCookie(res: NextResponse, sid: string) {
  res.cookies.set(COOKIE, sid, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

async function readSessionId(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value;
}

function clientError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function sseData(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL;

    if (!apiKey || !model) {
      return clientError("Assistant is not configured yet.", 503);
    }

    let body: { text?: string; reset?: boolean };
    try {
      body = (await req.json()) as { text?: string; reset?: boolean };
    } catch {
      return clientError("Invalid request.", 400);
    }

    const sessions = getSessions();

    if (body.reset) {
      const old = await readSessionId();
      if (old) sessions.delete(old);
      const sid = randomUUID();
      return withSessionCookie(NextResponse.json({ ok: true }), sid);
    }

    const text = (body.text ?? "").trim();
    if (!text) {
      return clientError("Message is empty.", 400);
    }
    if (text.length > 4000) {
      return clientError("Message is too long.", 400);
    }

    let sid = await readSessionId();
    let isNewSid = false;
    if (!sid) {
      sid = randomUUID();
      isNewSid = true;
    }

    const history = sessions.get(sid) ?? [];
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: AAVARNA_SYSTEM_INSTRUCTION,
        maxOutputTokens: 400,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.MINIMAL,
        },
      },
      history,
    });

    const encoder = new TextEncoder();
    const stream = await chat.sendMessageStream({ message: text });

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          let produced = false;
          for await (const chunk of stream) {
            const piece = chunk.text;
            if (!piece) continue;
            produced = true;
            controller.enqueue(encoder.encode(sseData({ text: piece })));
          }

          const curated = chat.getHistory(true);
          sessions.set(sid!, curated);

          if (!produced) {
            controller.enqueue(
              encoder.encode(
                sseData({
                  text: "I couldn't form a reply just then — please try again.",
                })
              )
            );
          }
          controller.enqueue(encoder.encode(sseData({ done: true })));
          controller.close();
        } catch (err) {
          console.error(
            "[api/chat stream]",
            err instanceof Error ? err.message : "error"
          );
          controller.enqueue(
            encoder.encode(sseData({ error: "Something went wrong. Please try again." }))
          );
          controller.close();
        }
      },
    });

    const res = new NextResponse(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
    if (isNewSid) withSessionCookie(res, sid);
    return res;
  } catch (err) {
    console.error("[api/chat]", err instanceof Error ? err.message : "error");
    return clientError("Something went wrong. Please try again.", 500);
  }
}

export async function DELETE() {
  try {
    const sessions = getSessions();
    const old = await readSessionId();
    if (old) sessions.delete(old);
    const sid = randomUUID();
    return withSessionCookie(NextResponse.json({ ok: true }), sid);
  } catch {
    return clientError("Something went wrong. Please try again.", 500);
  }
}
