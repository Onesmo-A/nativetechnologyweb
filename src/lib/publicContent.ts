"use server";

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

async function tryMongo<T>(fn: () => Promise<T>): Promise<T | null> {
  if (!process.env.MONGODB_URI) return null;
  try {
    await connectMongo();
    return await fn();
  } catch {
    return null;
  }
}

export async function getHeroSlidesPublic() {
  return tryMongo(async () => {
    const items = await HeroSlideModel.find({ active: true })
      .sort({ order: 1 })
      .select({ title: 1, description: 1, image: 1, order: 1 })
      .lean();
    return items.map((x) => ({
      title: x.title,
      description: x.description,
      image: x.image,
    }));
  });
}

export async function getBrandsPublic() {
  return tryMongo(async () => {
    const items = await BrandModel.find({ active: true })
      .sort({ order: 1 })
      .select({ name: 1, href: 1, image: 1, order: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: String(x._id ?? idx),
      name: x.name,
      href: x.href,
      image: x.image,
    }));
  });
}

export async function getServicesPublic() {
  return tryMongo(async () => {
    const items = await ServiceCategoryModel.find({ active: true })
      .sort({ order: 1 })
      .select({ title: 1, paragraph: 1, image: 1, items: 1, order: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: String(x._id ?? idx),
      title: x.title,
      paragraph: x.paragraph ?? "",
      image: x.image ?? "",
      items: Array.isArray(x.items) ? x.items : [],
    }));
  });
}

export async function getWorksPublic() {
  return tryMongo(async () => {
    const items = await WorkModel.find()
      .sort({ createdAt: -1 })
      .select({ title: 1, category: 1, description: 1, tags: 1, image: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: String(x._id ?? idx),
      title: x.title,
      category: x.category,
      description: x.description,
      tags: Array.isArray(x.tags) ? x.tags : [],
      image: x.image ?? "",
    }));
  });
}

export async function getProcessPublic() {
  return tryMongo(async () => {
    const items = await ProcessStepModel.find({ active: true })
      .sort({ order: 1 })
      .select({ title: 1, description: 1, order: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: idx + 1,
      title: x.title,
      description: x.description,
    }));
  });
}

export async function getStatsPublic() {
  return tryMongo(async () => {
    const items = await StatModel.find({ active: true })
      .sort({ order: 1 })
      .select({ value: 1, label: 1, note: 1, order: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: idx + 1,
      value: x.value,
      label: x.label,
      note: x.note ?? "",
    }));
  });
}

export async function getTeamPublic() {
  return tryMongo(async () => {
    const items = await TeamMemberModel.find({ active: true })
      .sort({ order: 1 })
      .select({ name: 1, role: 1, skills: 1, image: 1, order: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: idx + 1,
      name: x.name,
      role: x.role,
      skills: Array.isArray(x.skills) ? x.skills : [],
      image: x.image ?? "",
    }));
  });
}

export async function getTestimonialsPublic() {
  return tryMongo(async () => {
    const items = await TestimonialModel.find({ active: true })
      .sort({ order: 1 })
      .select({ name: 1, role: 1, quote: 1, image: 1, order: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: idx + 1,
      name: x.name,
      designation: x.role ?? "",
      content: x.quote,
      image: x.image ?? "",
      star: 5,
    }));
  });
}

export async function getBlogPublic() {
  return tryMongo(async () => {
    const items = await BlogPostModel.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(6)
      .select({ title: 1, excerpt: 1, coverImage: 1, authorName: 1, publishedAt: 1 })
      .lean();
    return items.map((x, idx) => ({
      id: idx + 1,
      title: x.title,
      paragraph: x.excerpt ?? "",
      image: x.coverImage || "/images/blog/blog-01.jpg",
      author: {
        name: x.authorName || "Native Technology",
        image: "/images/blog/author-03.png",
        designation: "Team",
      },
      tags: ["news"],
      publishDate: x.publishedAt ? new Date(x.publishedAt).getFullYear().toString() : "",
    }));
  });
}

