import mongoose, { Schema } from "mongoose";

export type HeroSlideDocument = {
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const HeroSlideSchema = new Schema<HeroSlideDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

HeroSlideSchema.index({ order: 1 });

export const HeroSlideModel =
  (mongoose.models.HeroSlide as mongoose.Model<HeroSlideDocument>) ||
  mongoose.model<HeroSlideDocument>("HeroSlide", HeroSlideSchema);

