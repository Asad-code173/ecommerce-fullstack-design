import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserDocument, UserMethods } from "../types/User.js";


const userSchema = new Schema<UserDocument>(
  {
    username:
    {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [30, "Username cannot exceed 30 characters"],
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]

    },
    fullName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [6, "Full name must be at least 6 characters long"],
      maxLength: [50, "Full name cannot exceed 50 characters"],
      match: [/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"]

    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"],
      


    },
    password:
    {
      type: String,
      required: [true, "Password is Required"],
      minLength: [8, "Password must be at least 8 characters long"],
      maxLength: [16, "Password cannot exceed 16 characters"],
      validate: {
        validator: function (password) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password);
        },
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      }
    },
    refreshToken:
    {
      type: String
    },
    role:
    {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
  },
  { timestamps: true }
);

// Pre-save hook for password hashing
userSchema.pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 12);
  

});                     

// Schema methods
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // console.log("ACCESS_TOKEN_EXPIRY =", process.env.ACCESS_TOKEN_EXPIRY);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


 export const User: Model<UserDocument, {}, UserMethods> = mongoose.model<UserDocument, Model<UserDocument, {}, UserMethods>>("User", userSchema);
// export const User = mongoose.model<UserDocument>(
//   "User",
//   userSchema
// );

// export interface UserModal extends Model<UserDocument> {}

// export const User = mongoose.model<UserDocument, UserModal>(
//   "User",
//   userSchema
// );

