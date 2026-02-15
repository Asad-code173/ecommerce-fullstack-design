import { Document,Model } from "mongoose";
export interface UserData {
  _id?: string;
  fullName:string;
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  role: "user" | "admin";

}

export interface UserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export type UserDocument = UserData & Document & UserMethods;