import mongoose, { Schema } from "mongoose";

export type TestimonialDocument = {
  name: string;
  role: string;
  quote: string;
  image: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "", trim: true },
    quote: { type: String, required: true, trim: true },
    image: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

TestimonialSchema.index({ order: 1 });

export const TestimonialModel =
  (mongoose.models.Testimonial as mongoose.Model<TestimonialDocument>) ||
  mongoose.model<TestimonialDocument>("Testimonial", TestimonialSchema);

