'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'role_id' });
      User.belongsTo(models.Village, { foreignKey: 'village_id' });
      User.hasMany(models.Review, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Villages',
        key: 'id',
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: 'URL to user profile image stored in Cloudinary'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};