import mongoose, { Schema } from "mongoose";

export type ServiceCategoryDocument = {
  title: string;
  paragraph: string;
  image: string;
  items: string[];
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ServiceCategorySchema = new Schema<ServiceCategoryDocument>(
  {
    title: { type: String, required: true, trim: true },
    paragraph: { type: String, default: "", trim: true },
    image: { type: String, default: "", trim: true },
    items: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ServiceCategorySchema.index({ order: 1 });

export const ServiceCategoryModel =
  (mongoose.models.ServiceCategory as mongoose.Model<ServiceCategoryDocument>) ||
  mongoose.model<ServiceCategoryDocument>("ServiceCategory", ServiceCategorySchema);

