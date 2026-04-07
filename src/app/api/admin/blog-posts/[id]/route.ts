import { connectMongo } from "@/lib/mongodb";
import { BlogPostModel } from "@/models/BlogPost";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateSchema = z.object({
  title: z.string().min(3).max(140).optional(),
  slug: z
    .string()
    .min(3)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  excerpt: z.string().max(280).optional(),
  content: z.string().optional(),
  coverImage: z.string().max(300).optional(),
  authorName: z.string().max(80).optional(),
  status: z.enum(["draft", "published"]).optional(),
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

  const update: Record<string, unknown> = { ...parsed.data };
  if (parsed.data.status === "published") {
    update.publishedAt = new Date();
  }
  if (parsed.data.status === "draft") {
    update.publishedAt = null;
  }

  const updated = await BlogPostModel.findByIdAndUpdate(id, update, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongo();
  const { id } = await params;
  const deleted = await BlogPostModel.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

