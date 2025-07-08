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
    image_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};