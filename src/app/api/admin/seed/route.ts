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

import brandsData from "@/components/Brands/brandsData";
import featuresData from "@/components/Features/featuresData";
import worksData from "@/components/Works/worksData";
import processData from "@/components/WorkProcess/processData";
import statsData from "@/components/Stats/statsData";
import teamData from "@/components/Team/teamData";

const defaultHeroSlides = [
  {
    title: "Web & Mobile Solutions Built to Scale",
    description:
      "Native Technology designs and builds modern products for web and mobile — fast, secure, and ready for growth.",
    image: "/images/hero/slide-01.jpg",
    order: 1,
    active: true,
  },
  {
    title: "Design, Development, and Long‑Term Support",
    description:
      "From discovery to launch, we deliver premium UI/UX and clean implementation — then keep everything running smoothly.",
    image: "/images/hero/slide-02.jpg",
    order: 2,
    active: true,
  },
  {
    title: "Digital Systems That Streamline Your Business",
    description:
      "Custom business systems, integrations, and automation that reduce manual work and improve visibility.",
    image: "/images/hero/slide-03.jpg",
    order: 3,
    active: true,
  },
];

const defaultTestimonials = [
  {
    name: "Client Project Lead",
    role: "Operations Team",
    quote:
      "Native Technology delivered with clarity and speed. Communication was excellent, and the final product was polished and reliable.",
    image: "/images/testimonials/auth-01.png",
    order: 1,
    active: true,
  },
  {
    name: "Product Owner",
    role: "Startup Founder",
    quote:
      "Great attention to detail in both design and development. The team handled feedback quickly and kept everything on track.",
    image: "/images/testimonials/auth-02.png",
    order: 2,
    active: true,
  },
  {
    name: "IT Coordinator",
    role: "Business Team",
    quote:
      "We needed long-term maintenance and support. Their structured process and fast turnaround made a big difference.",
    image: "/images/testimonials/auth-03.png",
    order: 3,
    active: true,
  },
];

export async function POST() {
  try {
    await connectMongo();

    const result: Record<string, unknown> = {};

    if ((await HeroSlideModel.countDocuments()) === 0) {
      await HeroSlideModel.insertMany(defaultHeroSlides);
      result.heroSlides = "seeded";
    }

    if ((await BrandModel.countDocuments()) === 0) {
      await BrandModel.insertMany(
        brandsData.map((b, idx) => ({
          name: b.name,
          href: b.href,
          image: b.image,
          order: idx + 1,
          active: true,
        })),
      );
      result.brands = "seeded";
    }

    if ((await ServiceCategoryModel.countDocuments()) === 0) {
      await ServiceCategoryModel.insertMany(
        featuresData.map((f, idx) => ({
          title: f.title,
          paragraph: f.paragraph,
          image: f.image,
          items: f.items,
          order: idx + 1,
          active: true,
        })),
      );
      result.services = "seeded";
    }

    if ((await WorkModel.countDocuments()) === 0) {
      await WorkModel.insertMany(
        worksData.map((w) => ({
          title: w.title,
          category: w.category,
          description: w.description,
          tags: w.tags,
          image: w.image ?? "",
        })),
      );
      result.works = "seeded";
    }

    if ((await ProcessStepModel.countDocuments()) === 0) {
      await ProcessStepModel.insertMany(
        processData.map((p, idx) => ({
          title: p.title,
          description: p.description,
          order: idx + 1,
          active: true,
        })),
      );
      result.process = "seeded";
    }

    if ((await StatModel.countDocuments()) === 0) {
      await StatModel.insertMany(
        statsData.map((s, idx) => ({
          value: s.value,
          label: s.label,
          note: s.note,
          order: idx + 1,
          active: true,
        })),
      );
      result.stats = "seeded";
    }

    if ((await TeamMemberModel.countDocuments()) === 0) {
      await TeamMemberModel.insertMany(
        teamData.map((t, idx) => ({
          name: t.name,
          role: t.role,
          skills: t.skills,
          image: t.image ?? "",
          order: idx + 1,
          active: true,
        })),
      );
      result.team = "seeded";
    }

    if ((await TestimonialModel.countDocuments()) === 0) {
      await TestimonialModel.insertMany(defaultTestimonials);
      result.testimonials = "seeded";
    }

    if (Object.keys(result).length === 0) {
      result.status = "already_seeded";
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        ok: false,
        error: "Seed failed",
        message,
        hint:
          "Check MONGODB_URI, Atlas IP Access List, and Database user permissions.",
      },
      { status: 500 },
    );
  }
}
