import express from "express";
import { signup,Login, GetUserprofile, UpdateUserprofile, applytojob, AppliedJobs, Logout } from "../controllers/UserController.js";
import { AuthMiddleware } from "../middleware/Authmiddleware.js";

const router = express.Router();


router.post("/signup",signup)
router.post("/login",Login)
router.get("/profile",AuthMiddleware,GetUserprofile)
router.post("/updateprofile",AuthMiddleware,UpdateUserprofile)
router.post("/applyjob/:id",AuthMiddleware,applytojob)
router.get("/appliedjobs",AuthMiddleware,AppliedJobs)

router.get("/logout",AuthMiddleware,Logout)

export default router