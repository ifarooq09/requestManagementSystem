import express from "express";
import authenticate from "../middleware/authenticate.js";
import { login, validUser, logout } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.route("/login").post(login)
userRouter.route("/validuser").get(authenticate, validUser)
userRouter.route("/logout").get(authenticate, logout)

export default userRouter