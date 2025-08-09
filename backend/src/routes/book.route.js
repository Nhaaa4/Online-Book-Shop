import { Router } from "express";
import { getBook, getBookById, getCategories, getNumberOfBook, getAuthors, createBook, updateBook, deleteBook, uploadBookImage, deleteBookImage } from "../controllers/book.controller.js";
import { authUser, authorize } from "../middleware/auth.middleware.js";
import { upload } from "../config/cloudinary.js";

const bookRoute = Router();

bookRoute.get('/', getBook)
bookRoute.get('/categories', getCategories)
bookRoute.get('/number', getNumberOfBook)
bookRoute.get('/authors', authUser, authorize('select.author'), getAuthors)
bookRoute.get('/:id', getBookById)

// Admin routes
bookRoute.post('/', authUser, authorize('insert.book'), upload.array('images', 5), createBook)
bookRoute.patch('/:id', authUser, authorize('update.book'), upload.array('images', 5), updateBook)
bookRoute.delete('/:id', authUser, authorize('delete.book'), deleteBook)

// Image upload routes (keeping both single and multiple for flexibility)
bookRoute.post('/upload-image', authUser, authorize('insert.book'), upload.single('image'), uploadBookImage)
bookRoute.post('/upload-images', authUser, authorize('insert.book'), upload.array('images', 5), uploadBookImage)
bookRoute.delete('/delete-image', authUser, authorize('delete.book'), deleteBookImage)

export default bookRoute    