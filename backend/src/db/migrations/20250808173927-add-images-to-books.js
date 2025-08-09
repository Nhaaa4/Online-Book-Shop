'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('Books', 'images', {
    type: Sequelize.JSON,
    allowNull: true,
    defaultValue: null,
    comment: 'Array of image URLs for the book (1-5 images)'
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('Books', 'images');
};
