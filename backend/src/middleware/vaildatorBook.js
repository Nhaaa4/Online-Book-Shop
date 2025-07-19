import db from '../db/models/index.js';

const { Book } = db;

export async function validateStockQuantity(req, res, next) {
  const { items } = req.body;

  if (!items || typeof items !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid items format' });
  }

  try {
    for (const [bookId, quantity] of Object.entries(items)) {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ success: false, message: `Book with ID ${bookId} not found` });
      }
      if (quantity > book.stock_quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for book ID ${bookId}` });
      }
    }
    next();
  } catch (error) {
    console.error("Stock validation error:", error);
    res.status(500).json({ success: false, message: 'Internal server error during stock validation' });
  }
}