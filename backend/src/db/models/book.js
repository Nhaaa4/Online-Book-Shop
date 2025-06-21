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
    }
  }
  Book.init({
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock_quantity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
    timestamps: true
  });
  Book.associate = (models) => {
    Book.belongsTo(models.Category, { foreignKey: 'CategoryID' });
    Book.belongsTo(models.Author, { foreignKey: 'AuthorID' });
    Book.hasMany(models.CartItem, { foreignKey: 'BookID' });
    Book.hasMany(models.Review, { foreignKey: 'BookID' });
  };
  return Book;
};