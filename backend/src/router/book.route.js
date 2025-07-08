import { Router } from "express";
import { getBook } from "../controller/book.controller.js";

const bookRoute = Router();

bookRoute.get('/', getBook)

export default bookRoute