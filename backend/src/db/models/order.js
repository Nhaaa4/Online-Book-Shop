'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.belongsTo(models.ShippingMethod, { foreignKey: 'ship_method_id' });
      Order.hasMany(models.CartItem, { foreignKey: 'order_id' });
      Order.hasOne(models.Payment, { foreignKey: 'order_id' });
    }
  }
  Order.init({
    order_status: DataTypes.STRING,
    total_amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};