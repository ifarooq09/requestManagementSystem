import express from "express";
import authenticate from "../middleware/authenticate.js";
import { login } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.route("/login").post(login)

export default userRouter