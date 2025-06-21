'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init({
    OrderDate: DataTypes.DATE,
    Total: DataTypes.DECIMAL,
    PaymentID: DataTypes.INTEGER,
    CustomerID: DataTypes.INTEGER,
    ShipID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
    timestamps: true
  });
  Orders.associate = (models) => {
    Orders.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
    Orders.belongsTo(models.Payment, { foreignKey: 'PaymentID' });
    Orders.belongsTo(models.ShipMethod, { foreignKey: 'ShipID' });
    Orders.hasMany(models.CartItem, { foreignKey: 'OrderID' });
  };
  return Orders;
};