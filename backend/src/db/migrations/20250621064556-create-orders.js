'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    OrderDate: {
      type: Sequelize.DATE
    },
    Total: {
      type: Sequelize.DECIMAL
    },
    PaymentID: {
      type: Sequelize.INTEGER
    },
    CustomerID: {
      type: Sequelize.INTEGER
    },
    ShipID: {
      type: Sequelize.INTEGER
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
  await queryInterface.dropTable('Orders');
}