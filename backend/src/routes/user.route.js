import { Router } from "express";
import { getUserData, login, register } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const userRoute = Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/profile', authUser, getUserData)


export default userRoute