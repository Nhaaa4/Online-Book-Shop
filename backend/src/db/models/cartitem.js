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
    }
  }
  CartItem.init({
    OrderID: DataTypes.INTEGER,
    BookID: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
    timestamps: true
  });
  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Orders, { foreignKey: 'OrderID' });
    CartItem.belongsTo(models.Book, { foreignKey: 'BookID' });
  };
  return CartItem;
};