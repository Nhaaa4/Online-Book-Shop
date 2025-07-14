import { Router } from "express";
import { getBook, getBookById, getCategories } from "../controllers/book.controller.js";

const bookRoute = Router();

bookRoute.get('/', getBook)
bookRoute.get('/categories', getCategories)
bookRoute.get('/:id', getBookById)

export default bookRoute    