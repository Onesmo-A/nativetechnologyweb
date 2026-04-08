import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { HeroSlideModel } from "@/models/HeroSlide";
import { BrandModel } from "@/models/Brand";
import { ServiceCategoryModel } from "@/models/ServiceCategory";
import { WorkModel } from "@/models/Work";
import { ProcessStepModel } from "@/models/ProcessStep";
import { StatModel } from "@/models/Stat";
import { TeamMemberModel } from "@/models/TeamMember";
import { TestimonialModel } from "@/models/Testimonial";
import { BlogPostModel } from "@/models/BlogPost";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectMongo();
    const state = mongoose.connection.readyState; // 1 = connected

    const counts = {
      heroSlides: await HeroSlideModel.countDocuments(),
      brands: await BrandModel.countDocuments(),
      services: await ServiceCategoryModel.countDocuments(),
      works: await WorkModel.countDocuments(),
      process: await ProcessStepModel.countDocuments(),
      stats: await StatModel.countDocuments(),
      team: await TeamMemberModel.countDocuments(),
      testimonials: await TestimonialModel.countDocuments(),
      blogPosts: await BlogPostModel.countDocuments(),
    };

    return NextResponse.json({ ok: true, mongoState: state, counts });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: "Health check failed", message },
      { status: 500 },
    );
  }
}

