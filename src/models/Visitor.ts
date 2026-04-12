import mongoose, { Schema } from "mongoose";

export type VisitorDocument = {
  count: number;
  createdAt: Date;
  updatedAt: Date;
};

const VisitorSchema = new Schema<VisitorDocument>(
  {
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const VisitorModel =
  (mongoose.models.Visitor as mongoose.Model<VisitorDocument>) ||
  mongoose.model<VisitorDocument>("Visitor", VisitorSchema);
