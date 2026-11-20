import { connectDB } from "@/lib/db";
import { MessageModel } from "@/lib/models";
import { clientIp, error, json, rateLimited } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return error("Invalid request");
  // Honeypot field: real visitors never fill it in.
  if (body.company) return json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const subject = String(body.subject ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return error("Please provide your name, a valid email and a message.");
  }
  if (rateLimited(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return error("You have sent several messages already. Please try again later.", 429);
  }
  try {
    await connectDB();
    await MessageModel.create({ name, email, subject, message });
    return json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return error("Could not send your message right now. Please email me directly.", 500);
  }
}
