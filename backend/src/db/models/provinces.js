'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class provinces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      provinces.hasMany(models.districts, {foreignKey: 'districtID'})
    }
  }
  provinces.init({
    provinceName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'provinces',
  });
  return provinces;
};