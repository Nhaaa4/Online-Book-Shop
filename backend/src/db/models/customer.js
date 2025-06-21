'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    AddressID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true
  });
  Customer.associate = (models) => {
    Customer.belongsTo(models.Address, { foreignKey: 'AddressID' });
    Customer.hasMany(models.Payment, { foreignKey: 'CustomerID' });
    Customer.hasMany(models.Orders, { foreignKey: 'CustomerID' });
    Customer.hasMany(models.Review, { foreignKey: 'CustomerID' });
  };
  return Customer;
};