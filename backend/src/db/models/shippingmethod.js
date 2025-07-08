'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShippingMethod.hasMany(models.Order, { foreignKey: 'ship_method_id' });
    }
  }
  ShippingMethod.init({
    method_name: DataTypes.STRING,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ShippingMethod',
  });
  return ShippingMethod;
};