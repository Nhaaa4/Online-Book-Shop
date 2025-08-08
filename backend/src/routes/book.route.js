import { Router } from "express";
import { getBook, getBookById, getCategories, getNumberOfBook, getAuthors, createBook, updateBook, deleteBook } from "../controllers/book.controller.js";
import { authUser, authorize } from "../middleware/auth.middleware.js";

const bookRoute = Router();

bookRoute.get('/', getBook)
bookRoute.get('/categories', getCategories)
bookRoute.get('/number', getNumberOfBook)
bookRoute.get('/authors', authUser, authorize('select.author'), getAuthors)
bookRoute.get('/:id', getBookById)

// Admin routes
bookRoute.post('/', authUser, authorize('insert.book'), createBook)
bookRoute.patch('/:id', authUser, authorize('update.book'), updateBook)
bookRoute.delete('/:id', authUser, authorize('delete.book'), deleteBook)

export default bookRoute    