'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Author, { foreignKey: 'author_id' });
      Book.belongsTo(models.Category, { foreignKey: 'category_id' });
      Book.hasMany(models.Review, { foreignKey: 'book_id' });
      Book.hasMany(models.CartItem, { foreignKey: 'book_id' });
    }
  }
  Book.init({
    isbn: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stock_quantity: DataTypes.INTEGER,
    image_url: DataTypes.TEXT,
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      comment: 'Array of image URLs for the book (1-5 images)',
      validate: {
        isValidImages(value) {
          if (value !== null && value !== undefined) {
            if (!Array.isArray(value)) {
              throw new Error('Images must be an array');
            }
            if (value.length < 1 || value.length > 5) {
              throw new Error('Must have between 1 and 5 images');
            }
            // Validate each URL
            value.forEach(url => {
              if (typeof url !== 'string' || !url.trim()) {
                throw new Error('Each image must be a valid URL string');
              }
            });
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};