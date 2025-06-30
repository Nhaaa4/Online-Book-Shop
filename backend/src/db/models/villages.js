'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class villages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      villages.hasMany(models.Customer, {foreignKey: 'customerID'})
      villages.belongsTo(models.communes, {foreignKey: 'communeID'})
    }
  }
  villages.init({
    villageName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'villages',
  });
  return villages;
};