import express from "express";
import authenticate from "../middleware/authenticate.js";
import roleBasedAccess from "../middleware/roleBasedAccess.js";
import { login, validUser, logout, allUser, updateUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.route("/login").post(login)
userRouter.route("/validuser").get(authenticate, validUser)
userRouter.route("/logout").get(authenticate, logout)
userRouter.route("/users").get(authenticate, roleBasedAccess(['admin']), allUser)
userRouter.route('/users/:userId').put(authenticate, roleBasedAccess(['admin']), updateUser);

export default userRouter