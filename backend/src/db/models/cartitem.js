'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Book, {foreignKey: 'bookID'})
      CartItem.belongsTo(models.Orders, {foreignKey: 'orderID'})
    }
  }
  CartItem.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};