import db from '../db/models/index.js'

const { Book, Author, Category } = db

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
    const book = await Book.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { 
          model: Author,
          attributes: ['first_name', 'last_name']
        },
        { 
          model: Category,
          attributes: ['category_name']
        }
      ]
    });

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch books' });
  }
}

export async function getBookById(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id, {
      include: [
        { model: Author, attributes: ['first_name', 'last_name'] },
        { model: Category, attributes: ['category_name'] }
      ]
    });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    console.error('Error fetching book:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}