import mongoose, { Schema } from "mongoose";

export type WorkDocument = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

const WorkSchema = new Schema<WorkDocument>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    image: { type: String, default: "" },
  },
  { timestamps: true },
);

export const WorkModel =
  (mongoose.models.Work as mongoose.Model<WorkDocument>) ||
  mongoose.model<WorkDocument>("Work", WorkSchema);

