import { Router } from "express";
import { getNumberOfCustomer, getUserData, login, register, getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authorize, authUser } from "../middleware/auth.middleware.js";

const userRoute = Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/profile', authUser, getUserData)
userRoute.get('/number', authUser, authorize('select.user'), getNumberOfCustomer)

// Admin routes
userRoute.get('/', authUser, authorize('select.user'), getAllUsers)
userRoute.get('/:id', authUser, authorize('select.user'), getUserById)
userRoute.post('/', authUser, authorize('insert.user'), createUser)
userRoute.patch('/:id', authUser, authorize('update.user'), updateUser)
userRoute.delete('/:id', authUser, authorize('delete.user'), deleteUser)

export default userRoute