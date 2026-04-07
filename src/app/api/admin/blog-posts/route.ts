import { connectMongo } from "@/lib/mongodb";
import { BlogPostModel } from "@/models/BlogPost";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchema = z.object({
  title: z.string().min(3).max(140),
  slug: z
    .string()
    .min(3)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().max(280).optional().default(""),
  content: z.string().optional().default(""),
  coverImage: z.string().max(300).optional().default(""),
  authorName: z.string().max(80).optional().default("Native Technology"),
  status: z.enum(["draft", "published"]).optional().default("draft"),
});

export async function GET() {
  await connectMongo();
  const items = await BlogPostModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const publishedAt =
    parsed.data.status === "published" ? new Date() : (null as null);

  const created = await BlogPostModel.create({
    ...parsed.data,
    publishedAt,
  });

  return NextResponse.json({ item: created }, { status: 201 });
}

