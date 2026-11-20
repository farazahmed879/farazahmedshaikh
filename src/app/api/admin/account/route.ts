import { getSession, updateCredentials } from "@/lib/auth";
import { clientIp, error, json, rateLimited } from "@/lib/api";

export async function GET() {
  const session = await getSession();
  if (!session) return error("Unauthorized", 401);
  return json({ username: session.username, isDefault: session.isDefault });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return error("Unauthorized", 401);
  if (rateLimited(`account:${clientIp(req)}`, 10, 15 * 60 * 1000)) {
    return error("Too many attempts. Try again in a few minutes.", 429);
  }
  const body = await req.json().catch(() => ({}));
  const result = await updateCredentials(session.id, {
    currentPassword: String(body.currentPassword ?? ""),
    username: body.username !== undefined ? String(body.username) : undefined,
    newPassword: body.newPassword ? String(body.newPassword) : undefined,
  });
  if ("error" in result) return error(result.error, 400);
  return json({ ok: true });
}
