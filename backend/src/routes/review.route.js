import { Router } from "express";
import { getRatingDistribution, getReviewsByBook, getUserReviews, userReviewBook } from "../controllers/review.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const reviewRouter = Router()

reviewRouter.post("/", authUser, userReviewBook);
reviewRouter.get("/my-reviews", authUser, getUserReviews)
reviewRouter.get("/:bookId", getReviewsByBook);
reviewRouter.get("/:bookId/rating-distribution", getRatingDistribution);

export default reviewRouter