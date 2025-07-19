import db from "../db/models/index.js"

const { Review, Book } = db

export async function userReviewBook(req, res) {
  try {
    const { bookId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!bookId || !rating) {
      return res.status(400).json({ success: false, message: "Book ID and rating are required" });
    }

    const review = await Review.create({
      user_id: userId,
      book_id: bookId,
      rating,
      comment
    });
    return res.status(201).json({ success: true, message: "Review created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to create review" });
  }
}

export async function getReviewsByBook(req, res) {
  try {
    const bookId = req.params.bookId;

    if (!bookId) {
      return res.status(400).json({ success: false, message: "Book ID is required" });
    }

    const reviews = await Review.findAll({
      where: { book_id: bookId },
      include: [{ model: db.User, attributes: ['first_name', 'last_name'] }],
      order: [['createdAt', 'DESC']],
      limit: 3
    });

    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
}

export async function getRatingDistribution(req, res) {
  try {
    const bookId = req.params.bookId;

    if (!bookId) {
      return res.status(400).json({ success: false, message: "Book ID is required" });
    }

    const ratings = await Review.findAll({
      where: { book_id: bookId },
      attributes: ['rating'],
      raw: true
    });


    return res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    console.error("Failed to fetch rating distribution:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch rating distribution" });
  }
}

export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id

    const reviews = await Review.findAll({
      where: { user_id: userId },
      include: [{ model: Book, attributes: ["title"] }],
      order: [["createdAt", "DESC"]],
    })

    const formatted = reviews.map(review => ({
      id: review.id,
      bookTitle: review.Book.title,
      rating: review.rating,
      comment: review.comment,
      date: review.createdAt,
    }))

    res.json({ success: true, data: formatted })
  } catch (error) {
    console.error("Failed to fetch user reviews:", error)
    res.status(500).json({ success: false, message: "Failed to fetch reviews" })
  }
}
