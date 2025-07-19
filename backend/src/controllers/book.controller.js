import { col, fn } from 'sequelize';
import db from '../db/models/index.js'

const { Book, Author, Category, Review, User } = db

export async function getCategories(req, res) {
  try {
    const categories = await Category.findAll({
      attributes: { include: ['category_name'] }
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
}

export async function getBook(req, res) {
  try {
    const books = await Book.findAll({
      attributes: [
        'id',
        'title',
        'price',
        'stock_quantity',
        'image_url',
        [fn('AVG', col('Reviews.rating')), 'averageRating'],
        [fn('COUNT', col('Reviews.id')), 'totalReviews']
      ],
      include: [
        {
          model: Author,
          attributes: ['first_name', 'last_name']
        },
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Review,
          attributes: []
        }
      ],
      group: ['Book.id', 'Author.id', 'Category.id'],
      raw: true,
      nest: true
    });

    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch books' });
  }
}

export async function getBookById(req, res) {
  const { id } = req.params;

  try {
    const books = await Book.findByPk(id, {
      include: [
        { model: Author, attributes: ['first_name', 'last_name'] },
        { model: Category, attributes: ['category_name'] },
      ]
    });

    const reviews = await Review.findAll({ where: { book_id: id } }) || [];
    const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1);
    const totalReviews = reviews.length;

    const grouped = await Review.findAll({
      where: { book_id: id },
      attributes: ['rating',
        [fn('COUNT', col('rating')), 'total']
      ],
      group: ['rating'],
      raw: true
    });

    const ratingDistribution = grouped.map(row => {
      return {
        rating: row.rating,
        total: parseInt(row.total, 10),
        percentage: Math.round((row.total / totalReviews) * 100)
      };
    })

    const book = {
      ...books.get({ plain: true }),
      ratingDistribution,
      rating,
      totalReviews
    };

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    console.error('Error fetching book:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}