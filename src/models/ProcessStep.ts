import mongoose, { Schema } from "mongoose";

export type ProcessStepDocument = {
  title: string;
  description: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ProcessStepSchema = new Schema<ProcessStepDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ProcessStepSchema.index({ order: 1 });

export const ProcessStepModel =
  (mongoose.models.ProcessStep as mongoose.Model<ProcessStepDocument>) ||
  mongoose.model<ProcessStepDocument>("ProcessStep", ProcessStepSchema);

