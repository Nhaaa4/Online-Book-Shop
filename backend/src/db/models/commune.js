'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Commune extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commune.belongsTo(models.District, { foreignKey: 'district_id' });
      Commune.hasMany(models.Village, { foreignKey: 'commune_id' });
    }
  }
  Commune.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commune',
  });
  return Commune;
};