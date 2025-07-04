'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.CUstomer, {foreignKey: 'customerID'})
      Orders.hasOne(models.Payment, {foreignKey: 'paymentID'})
      Orders.hasMany(models.CartItem, {foreignKey: 'orderID'})
      Orders.belongsToMany(models.shipMethod, {foreignKey: 'shipID'})
    }
  }
  Orders.init({
    orderDate: DataTypes.STRING,
    total: DataTypes.FLOAT,
    orderStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};