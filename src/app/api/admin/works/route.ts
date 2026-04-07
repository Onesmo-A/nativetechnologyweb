import { connectMongo } from "@/lib/mongodb";
import { WorkModel } from "@/models/Work";
import { NextResponse } from "next/server";
import { z } from "zod";

const WorkCreateSchema = z.object({
  title: z.string().min(2).max(120),
  category: z.string().min(2).max(60),
  description: z.string().min(10).max(500),
  tags: z.array(z.string().min(1).max(30)).default([]),
  image: z.string().optional().default(""),
});

export async function GET() {
  await connectMongo();
  const items = await WorkModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json().catch(() => null);
  const parsed = WorkCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const created = await WorkModel.create(parsed.data);
  return NextResponse.json({ item: created }, { status: 201 });
}

