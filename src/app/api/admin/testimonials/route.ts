import { connectMongo } from "@/lib/mongodb";
import { TestimonialModel } from "@/models/Testimonial";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchema = z.object({
  name: z.string().min(2).max(80),
  role: z.string().max(80).optional().default(""),
  quote: z.string().min(5).max(600),
  image: z.string().max(300).optional().default(""),
  order: z.number().int().optional().default(0),
  active: z.boolean().optional().default(true),
});

export async function GET() {
  await connectMongo();
  const items = await TestimonialModel.find().sort({ order: 1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const created = await TestimonialModel.create(parsed.data);
  return NextResponse.json({ item: created }, { status: 201 });
}

