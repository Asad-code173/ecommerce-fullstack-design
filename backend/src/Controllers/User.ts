import { asyncHandler } from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../Models/UserModal.js";
import type { UserDocument } from "../types/User.js";
import type { NextFunction, Request, Response } from 'express';
import type { RegisterUserBody, LoginUserBody } from "../types/Auth.js";
import type { QueryFilter } from "mongoose";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (
    userId: string): Promise<{ accessToken: string; refreshToken: string }> => {
    try {
        const user: UserDocument | null = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        // Generate tokens
        const accessToken: string = user.generateAccessToken();
        const refreshToken: string = user.generateRefreshToken();

        // Save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating access and Refresh Tokens")
    }
}


const registerUser = asyncHandler(async (req: Request<{}, {}, RegisterUserBody>, res: Response) => {
    const { fullName, username, email, password } = req.body;
    console.log(fullName, username, email, password);
    if (
        [fullName, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "This field is Required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req: Request<{}, {}, LoginUserBody>, res: Response) => {
    const { email, username, password } = req.body
    console.time("Login Process Ends")

    if (!(username || email)) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (!user) {
        throw new ApiError(404, "Invalid username or email")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }
    const [tokens, loggedInUser] = await Promise.all([
        generateAccessAndRefreshTokens(user._id),
        User.findById(user._id).select("-password -refreshToken"),
    ]);
    const { accessToken, refreshToken } = tokens;
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as "none",

    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200,
            { user: loggedInUser, accessToken, refreshToken },
            "User Loggedin Successfully"
        ))


})

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(401, "User is not authenticated");
    }
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as "none"
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))



})

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }
        const options = {
            httpOnly: true,
            secure: true,
            // sameSite:"none"
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken },
                "Access Token Refreshed"
            ))



    } catch (error) {
        if (error instanceof Error)
            throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})



const getAdminDashboard = asyncHandler(
    async (req: Request, res: Response) => {
        return res.status(200).json({ message: "Welcome Admin" });
    }
);

const changeCurrentPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id)
    if(!user){
        throw new ApiError(403,"User does not exist")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getAdminDashboard,
    changeCurrentPassword

} 