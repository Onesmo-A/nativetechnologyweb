import { clearAdminCookie } from "@/lib/adminAuth";
import { NextResponse } from "next/server";

export async function POST() {
  await clearAdminCookie();
  return NextResponse.json({ ok: true });
}
