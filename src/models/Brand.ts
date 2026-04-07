import mongoose, { Schema } from "mongoose";

export type BrandDocument = {
  name: string;
  href: string;
  image: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const BrandSchema = new Schema<BrandDocument>(
  {
    name: { type: String, required: true, trim: true },
    href: { type: String, default: "#", trim: true },
    image: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

BrandSchema.index({ order: 1 });

export const BrandModel =
  (mongoose.models.Brand as mongoose.Model<BrandDocument>) ||
  mongoose.model<BrandDocument>("Brand", BrandSchema);

