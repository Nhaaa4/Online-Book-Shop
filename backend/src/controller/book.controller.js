import db from '../db/models/index.js'

const { Book, Author, Category, RolePermission, Role, Permission } = db

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

    res.json({ success: true, data: book})    
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }
}
