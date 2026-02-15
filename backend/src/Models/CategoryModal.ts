import mongoose, { Schema } from "mongoose";
import type { CategoryType } from "../types/category.js";

const CategorySchema = new Schema<CategoryType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model<CategoryType>("Category", CategorySchema);
