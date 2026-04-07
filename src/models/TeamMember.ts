import mongoose, { Schema } from "mongoose";

export type TeamMemberDocument = {
  name: string;
  role: string;
  skills: string[];
  image: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const TeamMemberSchema = new Schema<TeamMemberDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    skills: { type: [String], default: [] },
    image: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

TeamMemberSchema.index({ order: 1 });

export const TeamMemberModel =
  (mongoose.models.TeamMember as mongoose.Model<TeamMemberDocument>) ||
  mongoose.model<TeamMemberDocument>("TeamMember", TeamMemberSchema);

