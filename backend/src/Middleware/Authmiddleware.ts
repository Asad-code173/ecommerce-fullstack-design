import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/UserModal.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized Request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload & { _id: string };

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();

    } catch (error) {
        if (error instanceof Error)
            throw new ApiError(401, error?.message || "Invalid access token");

    }


})

export const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, "User does not exist");
        }
        const user = req.user;

        if (user.role.toLowerCase() !== "admin") {
            throw new ApiError(403, "User is not an admin");
        }
        else {
            next();
        }
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new ApiError(500, error?.message || "Forbidden:Not an admin");
    }
})

