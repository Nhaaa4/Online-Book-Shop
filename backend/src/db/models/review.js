'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    CustomerID: DataTypes.INTEGER,
    BookID: DataTypes.INTEGER,
    Rating: DataTypes.INTEGER,
    Comment: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
    timestamps: true
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
    Review.belongsTo(models.Book, { foreignKey: 'BookID' });
  };
  return Review;
};