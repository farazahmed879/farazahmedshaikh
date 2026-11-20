import "server-only";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import { connectDB } from "./db";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Wraps an admin route handler: rejects unauthenticated requests,
 * connects to MongoDB and turns thrown errors into JSON responses.
 */
export function adminRoute<C>(handler: (req: Request, ctx: C) => Promise<Response>) {
  return async (req: Request, ctx: C) => {
    const session = await getSession();
    if (!session) return error("Unauthorized", 401);
    try {
      await connectDB();
      return await handler(req, ctx);
    } catch (err: any) {
      if (err?.name === "ValidationError" || err?.name === "CastError") return error(err.message, 400);
      console.error("[admin api]", err);
      return error("Something went wrong", 500);
    }
  };
}

/** Rebuilds the public page after content changes. */
export function refreshSite() {
  revalidatePath("/", "layout");
}

/** Removes fields clients must not set directly. */
export function cleanBody(body: any) {
  if (!body || typeof body !== "object") return {};
  const { id, _id, createdAt, updatedAt, ...rest } = body;
  return rest;
}

const hits = new Map<string, number[]>();
/** Tiny in-memory rate limiter (per server instance). */
export function rateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > limit;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}
