'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    CustomerID: DataTypes.INTEGER,
    PaymentDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payment',
    timestamps: true
  });
  Payment.associate = (models) => {
    Payment.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
    Payment.hasOne(models.Orders, { foreignKey: 'PaymentID' });
  };
  return Payment;
};