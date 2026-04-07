import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const TOKEN_NAME = "nt_admin_token";

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("Missing `ADMIN_JWT_SECRET` env var.");
  return new TextEncoder().encode(secret);
}

export type AdminTokenPayload = {
  sub: string;
  email: string;
};

export async function signAdminToken(payload: AdminTokenPayload) {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  const email = payload.email;
  const sub = payload.sub;

  if (typeof email !== "string" || typeof sub !== "string") {
    throw new Error("Invalid token payload.");
  }

  return { sub, email };
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function readAdminCookieFromRequest(req: NextRequest) {
  return req.cookies.get(TOKEN_NAME)?.value ?? null;
}
