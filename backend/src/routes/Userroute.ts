import { Router } from "express";
import {
    changeCurrentPassword,
    getAdminDashboard,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
   
} from '../Controllers/User.js'
 import { verifyJWT ,isAdmin} from "../Middleware/Authmiddleware.js";

const router = Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured routes
 router.route("/logout").post(verifyJWT, logoutUser)
 router.route("/update-password").post(verifyJWT,changeCurrentPassword)
router.route("/refresh-token").post(refreshAccessToken)

// admin
router.route("/admin/dashboard").get(verifyJWT,isAdmin,getAdminDashboard)



export default router
