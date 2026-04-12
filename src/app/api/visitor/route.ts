import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { VisitorModel } from "@/models/Visitor";

export async function GET() {
  await connectMongo();
  const visitor = await VisitorModel.findOne().lean();
  return NextResponse.json({ count: visitor?.count ?? 0 });
}

export async function POST() {
  await connectMongo();
  const visitor = await VisitorModel.findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  ).lean();
  return NextResponse.json({ count: visitor?.count ?? 0 });
}
