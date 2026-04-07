import { connectMongo } from "@/lib/mongodb";
import { HeroSlideModel } from "@/models/HeroSlide";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(5).max(400),
  image: z.string().min(2).max(300),
  order: z.number().int().optional().default(0),
  active: z.boolean().optional().default(true),
});

export async function GET() {
  await connectMongo();
  const items = await HeroSlideModel.find().sort({ order: 1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const created = await HeroSlideModel.create(parsed.data);
  return NextResponse.json({ item: created }, { status: 201 });
}

