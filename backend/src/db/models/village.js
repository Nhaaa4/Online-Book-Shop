'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Village extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Village.belongsTo(models.Commune, { foreignKey: 'commune_id' });
      Village.hasMany(models.User, { foreignKey: 'village_id' });
    }
  }
  Village.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Village',
  });
  return Village;
};