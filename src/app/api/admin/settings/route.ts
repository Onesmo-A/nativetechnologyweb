import { connectMongo } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";
import { NextResponse } from "next/server";
import { z } from "zod";

const SettingsSchema = z.object({
  companyName: z.string().min(2).max(80).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional(),
  address: z.string().max(200).optional(),
  socials: z
    .object({
      facebook: z.string().url().optional().or(z.literal("")),
      x: z.string().url().optional().or(z.literal("")),
      youtube: z.string().url().optional().or(z.literal("")),
      instagram: z.string().url().optional().or(z.literal("")),
      tiktok: z.string().url().optional().or(z.literal("")),
      whatsapp: z.string().url().optional().or(z.literal("")),
    })
    .optional(),
});

export async function GET() {
  await connectMongo();
  const doc =
    (await SiteSettingsModel.findOne({ key: "default" }).lean()) ??
    (await SiteSettingsModel.create({ key: "default" }));
  return NextResponse.json({ item: doc });
}

export async function PUT(req: Request) {
  await connectMongo();
  const body = await req.json().catch(() => null);
  const parsed = SettingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updated = await SiteSettingsModel.findOneAndUpdate(
    { key: "default" },
    { $set: parsed.data, $setOnInsert: { key: "default" } },
    { new: true, upsert: true },
  ).lean();

  return NextResponse.json({ item: updated });
}

