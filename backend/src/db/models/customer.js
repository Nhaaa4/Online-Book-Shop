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
      Customer.hasMany(models.Review, {foreignKey: 'reviewID'})
      Customer.hasMany(models.Payment, {foreignKey: 'paymentID'})
      Customer.hasMany(models.Orders, {foreignKey: 'orderID'})
      Customer.belongsToMany(models.villages, {foreignKey: 'villageID'})
      
    }
  }
  Customer.init({
    fname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};