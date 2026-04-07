import { connectMongo } from "@/lib/mongodb";
import { WorkModel } from "@/models/Work";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateSchema = z.object({
  title: z.string().min(2).max(120).optional(),
  category: z.string().min(2).max(60).optional(),
  description: z.string().min(10).max(500).optional(),
  tags: z.array(z.string().min(1).max(30)).optional(),
  image: z.string().optional(),
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

  const updated = await WorkModel.findByIdAndUpdate(id, parsed.data, {
    new: true,
  });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongo();
  const { id } = await params;
  const deleted = await WorkModel.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

