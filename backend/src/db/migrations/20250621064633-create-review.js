'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    CustomerID: {
      type: Sequelize.INTEGER
    },
    BookID: {
      type: Sequelize.INTEGER
    },
    Rating: {
      type: Sequelize.INTEGER
    },
    Comment: {
      type: Sequelize.TEXT
    },
    created_at: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Reviews');
}