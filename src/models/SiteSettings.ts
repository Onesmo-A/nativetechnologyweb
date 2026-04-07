import mongoose, { Schema } from "mongoose";

export type SiteSettingsDocument = {
  key: "default";
  companyName: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    facebook?: string;
    x?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

const SiteSettingsSchema = new Schema<SiteSettingsDocument>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    companyName: { type: String, default: "Native Technology", trim: true },
    email: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    socials: {
      facebook: { type: String, default: "", trim: true },
      x: { type: String, default: "", trim: true },
      youtube: { type: String, default: "", trim: true },
      instagram: { type: String, default: "", trim: true },
      tiktok: { type: String, default: "", trim: true },
      whatsapp: { type: String, default: "", trim: true },
    },
  },
  { timestamps: true },
);

export const SiteSettingsModel =
  (mongoose.models.SiteSettings as mongoose.Model<SiteSettingsDocument>) ||
  mongoose.model<SiteSettingsDocument>("SiteSettings", SiteSettingsSchema);

