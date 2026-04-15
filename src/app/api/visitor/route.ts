import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { connectMongo } from "@/lib/mongodb";
import { VisitorModel } from "@/models/Visitor";
const COUNTER_PATH = path.join(process.cwd(), "data/visitor-counter.json");

export async function GET() {
  if (process.env.MONGODB_URI) {
    await connectMongo();
    const doc = await VisitorModel.findOne().lean();
    return NextResponse.json({ count: doc?.count ?? 0 });
  }
  try {
    const data = await fs.readFile(COUNTER_PATH, "utf8");
    const count = JSON.parse(data).count ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  if (process.env.MONGODB_URI) {
    await connectMongo();
    const updated = await VisitorModel.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    ).lean();
    return NextResponse.json({ count: updated?.count ?? 1 });
  }
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
