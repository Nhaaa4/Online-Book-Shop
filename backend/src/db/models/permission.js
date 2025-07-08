'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, { through: models.RolePermission, foreignKey: 'permission_id' });
    }
  }
  Permission.init({
    permission: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};