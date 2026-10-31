import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal session auth for the admin panel.
 *
 * HONESTY: this is a self-contained demo gate so the admin workflow can be
 * evaluated without an identity provider. It is NOT production authentication:
 * before launch, replace it with a real provider (Auth.js, Clerk, or an SSO
 * integration) and store password hashes with argon2/bcrypt in the database.
 *
 * The admin password comes from ADMIN_PASSWORD; the session secret from
 * AUTH_SECRET. If neither is set, a development-only default is used and a
 * warning is logged so it can never be mistaken for a secure configuration.
 */

const COOKIE = "ptbin_admin_session";
const DEMO_PASSWORD = "ptbin-demo-2026";
const DEV_SECRET = "dev-only-secret-change-me";

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) {
    console.warn(
      "[auth] AUTH_SECRET is not set; using an insecure development default. Set AUTH_SECRET before deployment."
    );
    return DEV_SECRET;
  }
  return s;
}

function expectedPassword() {
  return process.env.ADMIN_PASSWORD ?? DEMO_PASSWORD;
}

/** Constant-time string compare to avoid leaking length/timing information. */
function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function verifyPassword(input: string) {
  return safeEqual(input, expectedPassword());
}

export async function createSession(): Promise<void> {
  const payload = JSON.stringify({ iat: Date.now(), exp: Date.now() + 1000 * 60 * 60 * 8 });
  const encoded = Buffer.from(payload).toString("base64url");
  const store = await cookies();
  store.set(COOKIE, `${encoded}.${sign(encoded)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  if (!raw) return false;

  const [encoded, sig] = raw.split(".");
  if (!encoded || !sig) return false;
  if (sign(encoded) !== sig) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
      exp: number;
    };
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}
