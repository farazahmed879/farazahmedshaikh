import { checkCredentials, createSession } from "@/lib/auth";
import { clientIp, error, json, rateLimited } from "@/lib/api";

export async function POST(req: Request) {
  if (rateLimited(`login:${clientIp(req)}`, 8, 15 * 60 * 1000)) {
    return error("Too many attempts. Try again in a few minutes.", 429);
  }
  const body = await req.json().catch(() => ({}));
  const username = String(body.username ?? "");
  const password = String(body.password ?? "");
  try {
    const user = await checkCredentials(username, password);
    if (!user) return error("Invalid username or password", 401);
    await createSession(user);
    return json({ ok: true });
  } catch (err) {
    console.error("[login]", err);
    return error("Login is unavailable right now (database not reachable).", 500);
  }
}
