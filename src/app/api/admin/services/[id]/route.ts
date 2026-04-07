import { connectMongo } from "@/lib/mongodb";
import { ServiceCategoryModel } from "@/models/ServiceCategory";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateSchema = z.object({
  title: z.string().min(2).max(80).optional(),
  paragraph: z.string().max(300).optional(),
  image: z.string().max(300).optional(),
  items: z.array(z.string().min(1).max(80)).optional(),
  order: z.number().int().optional(),
  active: z.boolean().optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongo();
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updated = await ServiceCategoryModel.findByIdAndUpdate(id, parsed.data, {
    new: true,
  });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongo();
  const { id } = await params;
  const deleted = await ServiceCategoryModel.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

