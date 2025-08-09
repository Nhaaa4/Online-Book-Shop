import { Router } from "express";
import { getNumberOfCustomer, getUserData, login, register, getAllUsers, getUserById, createUser, updateUser, deleteUser, uploadAvatarImage, uploadAvatar, updateProfile } from "../controllers/user.controller.js";
import { authorize, authUser } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const userRoute = Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/profile', authUser, getUserData)
userRoute.put('/profile', authUser, updateProfile)
userRoute.post('/upload-avatar', authUser, asyncHandler((req, res, next) => {
  uploadAvatar(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        success: false, 
        message: err.message || 'Image upload failed' 
      });
    }
    next();
  });
}), uploadAvatarImage)
userRoute.get('/number', authUser, authorize('select.user'), getNumberOfCustomer)

// Admin routes
userRoute.get('/', authUser, authorize('select.user'), getAllUsers)
userRoute.get('/:id', authUser, authorize('select.user'), getUserById)
userRoute.post('/', authUser, authorize('insert.user'), createUser)
userRoute.patch('/:id', authUser, authorize('update.user'), updateUser)
userRoute.delete('/:id', authUser, authorize('delete.user'), deleteUser)

export default userRoute