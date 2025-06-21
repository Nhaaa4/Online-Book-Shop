'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ShipMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShipMethod.init({
    ShipMethod: DataTypes.STRING,
    Cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ShipMethod',
    timestamps: true
  });
  ShipMethod.associate = (models) => {
    ShipMethod.hasMany(models.Orders, { foreignKey: 'ShipID' });
  };
  return ShipMethod;
};