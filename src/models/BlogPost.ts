import mongoose, { Schema } from "mongoose";

export type BlogPostDocument = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  publishedAt: Date | null;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
};

const BlogPostSchema = new Schema<BlogPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    excerpt: { type: String, default: "", trim: true },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "", trim: true },
    authorName: { type: String, default: "Native Technology", trim: true },
    publishedAt: { type: Date, default: null },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true },
);

BlogPostSchema.index({ status: 1, publishedAt: -1 });

export const BlogPostModel =
  (mongoose.models.BlogPost as mongoose.Model<BlogPostDocument>) ||
  mongoose.model<BlogPostDocument>("BlogPost", BlogPostSchema);

