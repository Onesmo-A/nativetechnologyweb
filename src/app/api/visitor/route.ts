import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
const COUNTER_PATH = path.join(process.cwd(), "data/visitor-counter.json");

export async function GET() {
  try {
    const data = await fs.readFile(COUNTER_PATH, "utf8");
    const count = JSON.parse(data).count ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  try {
    const data = await fs.readFile(COUNTER_PATH, "utf8");
    const current = JSON.parse(data).count ?? 0;
    const newCount = current + 1;
    await fs.writeFile(COUNTER_PATH, JSON.stringify({ count: newCount }, null, 2));
    return NextResponse.json({ count: newCount });
  } catch {
    const newCount = 1;
    await fs.writeFile(COUNTER_PATH, JSON.stringify({ count: newCount }, null, 2));
    return NextResponse.json({ count: newCount });
  }
}
