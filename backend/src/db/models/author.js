'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Author.init({
    AuthorID: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
    timestamps: true
  });
  Author.associate = (models) => {
    Author.hasMany(models.Book, { foreignKey: 'BookId' })
  }
  return Author;
};