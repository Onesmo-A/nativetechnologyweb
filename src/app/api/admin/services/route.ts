import { connectMongo } from "@/lib/mongodb";
import { ServiceCategoryModel } from "@/models/ServiceCategory";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchema = z.object({
  title: z.string().min(2).max(80),
  paragraph: z.string().max(300).optional().default(""),
  image: z.string().max(300).optional().default(""),
  items: z.array(z.string().min(1).max(80)).optional().default([]),
  order: z.number().int().optional().default(0),
  active: z.boolean().optional().default(true),
});

export async function GET() {
  await connectMongo();
  const items = await ServiceCategoryModel.find().sort({ order: 1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const created = await ServiceCategoryModel.create(parsed.data);
  return NextResponse.json({ item: created }, { status: 201 });
}

