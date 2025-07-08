'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      District.belongsTo(models.Province, { foreignKey: 'province_id' });
      District.hasMany(models.Commune, { foreignKey: 'district_id' });
    }
  }
  District.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'District',
  });
  return District;
};