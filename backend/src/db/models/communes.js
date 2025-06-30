'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class communes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      communes.hasMany(models.villages, {foreignKey: 'villageID'})
      communes.belongsTo(models.districts, {foreignKey: 'districtID'})
    }
  }
  communes.init({
    communeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'communes',
  });
  return communes;
};