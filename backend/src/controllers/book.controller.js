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
        'isbn',
        'description',
        'price',
        'stock_quantity',
        'image_url',
        [fn('AVG', col('Reviews.rating')), 'averageRating'],
        [fn('COUNT', col('Reviews.id')), 'totalReviews']
      ],
      include: [
        {
          model: Author,
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: Category,
          attributes: ['id', 'category_name']
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

export async function getNumberOfBook(req, res) {
  try {
    const count = await Book.count();

    if (count === 0) {
      return res.status(404).json({ success: false, message: 'No books found' });
    }

    res.json({ success: true, data: count });
  } catch (error) {
    console.error("Get Number of Book error:", error.message);
    res.status(500).json({ success: false, message: 'Server error: Get Number of Book' });
  }
}

// Get all authors (admin)
export async function getAuthors(req, res) {
  try {
    const authors = await Author.findAll({
      attributes: ['id', 'first_name', 'last_name']
    });
    res.status(200).json({ success: true, data: authors });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch authors', error: error.message });
  }
}

// Create book (admin)
export async function createBook(req, res) {
  try {
    const { isbn, title, description, price, stock_quantity, image_url, author_id, category_id } = req.body;

    if (!isbn || !title || !price || !author_id || !category_id) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    // Check if book with ISBN already exists
    const existingBook = await Book.findOne({ where: { isbn } });
    if (existingBook) {
      return res.status(409).json({ success: false, message: 'Book with this ISBN already exists' });
    }

    const newBook = await Book.create({
      isbn,
      title,
      description,
      price,
      stock_quantity: stock_quantity || 0,
      image_url,
      author_id,
      category_id
    });

    // Fetch the created book with relations
    const bookWithRelations = await Book.findByPk(newBook.id, {
      include: [
        {
          model: Author,
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: Category,
          attributes: ['id', 'category_name']
        }
      ]
    });

    res.status(201).json({ success: true, data: bookWithRelations, message: 'Book created successfully' });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ success: false, message: 'Failed to create book', error: error.message });
  }
}

// Update book (admin)
export async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    await book.update(updateData);

    // Fetch updated book with relations
    const updatedBook = await Book.findByPk(id, {
      include: [
        {
          model: Author,
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: Category,
          attributes: ['id', 'category_name']
        }
      ]
    });

    res.status(200).json({ success: true, data: updatedBook, message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ success: false, message: 'Failed to update book', error: error.message });
  }
}

// Delete book (admin)
export async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ success: false, message: 'Failed to delete book', error: error.message });
  }
}