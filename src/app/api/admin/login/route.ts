import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { setAdminCookie, signAdminToken } from "@/lib/adminAuth";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

export async function POST(req: Request) {
  const raw = await req.text().catch(() => "");
  let body: unknown = null;
  try {
    body = JSON.parse(raw);
  } catch {
    body = null;
  }
  const parsed = LoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid payload",
        hint: "Send JSON: { email, password } with Content-Type: application/json",
      },
      { status: 400 },
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const emailMatches =
    parsed.data.email.toLowerCase() === adminEmail.toLowerCase();

  if (!emailMatches) {
    return NextResponse.json({ error: "Invalid email" }, { status: 401 });
  }

  const passwordMatches = await bcrypt.compare(parsed.data.password, adminHash);
  if (!passwordMatches) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await signAdminToken({ sub: "admin", email: adminEmail });
  await setAdminCookie(token);

  return NextResponse.json({ ok: true });
}
