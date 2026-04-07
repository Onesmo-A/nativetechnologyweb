import mongoose, { Schema } from "mongoose";

export type StatDocument = {
  value: string;
  label: string;
  note: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const StatSchema = new Schema<StatDocument>(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    note: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

StatSchema.index({ order: 1 });

export const StatModel =
  (mongoose.models.Stat as mongoose.Model<StatDocument>) ||
  mongoose.model<StatDocument>("Stat", StatSchema);

