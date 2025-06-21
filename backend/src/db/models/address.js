'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    Street: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    ZipCode: DataTypes.STRING,
    Country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
    timestamps: true
  });
  Address.associate = (models) => {
    Address.hasMany(models.Customer, { foreignKey: 'AddressId' })
  }
  return Address;
};