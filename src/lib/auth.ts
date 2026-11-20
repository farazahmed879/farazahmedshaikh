import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import { AdminUserModel } from "./models";

export const SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin";

export type AdminSession = { id: string; username: string; isDefault: boolean };
let dummyHash: Promise<string> | undefined;
type AdminUser = { _id: unknown; username: string; passwordHash: string; tokenVersion: number; isDefault: boolean };

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set to a random string of at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

/** Creates the default admin/admin account the first time, when no admin exists. */
export async function ensureAdminUser() {
  await connectDB();
  if ((await AdminUserModel.estimatedDocumentCount()) > 0) return;
  try {
    await AdminUserModel.create({
      username: DEFAULT_USERNAME,
      passwordHash: await bcrypt.hash(DEFAULT_PASSWORD, 12),
      isDefault: true,
    });
  } catch (err: any) {
    if (err?.code !== 11000) throw err; // another request created it first
  }
}

export async function checkCredentials(username: string, password: string): Promise<AdminUser | null> {
  await ensureAdminUser();
  const user = await AdminUserModel.findOne({ username: username.trim().toLowerCase() }).lean<AdminUser>();
  // Always run a full bcrypt compare so response time doesn't reveal whether the username exists.
  dummyHash ??= bcrypt.hash("not-a-real-password", 12);
  const ok = await bcrypt.compare(password, user?.passwordHash ?? (await dummyHash));
  return user && ok ? user : null;
}

export async function createSession(user: Pick<AdminUser, "_id" | "tokenVersion">) {
  const token = await new SignJWT({ v: user.tokenVersion })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user._id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey());
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Returns the logged-in admin, or null. Sessions die when the password changes. */
export async function getSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    await connectDB();
    const user = await AdminUserModel.findById(payload.sub).lean<AdminUser>();
    if (!user || user.tokenVersion !== payload.v) return null;
    return { id: String(user._id), username: user.username, isDefault: user.isDefault };
  } catch {
    return null;
  }
}

/** Verifies the current password, then updates username and/or password. */
export async function updateCredentials(
  id: string,
  { currentPassword, username, newPassword }: { currentPassword: string; username?: string; newPassword?: string }
): Promise<{ error: string } | { ok: true }> {
  const user = await AdminUserModel.findById(id);
  if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
    return { error: "Current password is incorrect" };
  }
  const nextUsername = username?.trim().toLowerCase();
  if (nextUsername !== undefined && nextUsername !== user.username) {
    if (!/^[a-z0-9._-]{3,50}$/.test(nextUsername)) {
      return { error: "Username must be 3–50 characters: letters, numbers, . _ -" };
    }
    user.username = nextUsername;
  }
  if (newPassword) {
    if (newPassword.length < 8) return { error: "New password must be at least 8 characters" };
    if (newPassword === DEFAULT_PASSWORD) return { error: "Please choose a different password" };
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    user.isDefault = false;
  }
  user.tokenVersion += 1;
  try {
    await user.save();
  } catch (err: any) {
    if (err?.code === 11000) return { error: "That username is already taken" };
    throw err;
  }
  await createSession(user); // keep this browser logged in; others are signed out
  return { ok: true };
}
