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
      CartItem.belongsTo(models.Order, { foreignKey: 'order_id' });
      CartItem.belongsTo(models.Book, { foreignKey: 'book_id' });
    }
  }
  CartItem.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CartItem',
      id: false,
    }
  );
  return CartItem;
};