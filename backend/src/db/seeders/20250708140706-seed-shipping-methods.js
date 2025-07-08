'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
  await queryInterface.bulkInsert('ShippingMethods', [
    { method_name: 'VET Express', cost: 1.50 },
    { method_name: 'J&T Express', cost: 2.00 },
    { method_name: 'ZTO Express', cost: 2.00 },
    { method_name: 'GrabExpress', cost: 2.50 },
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('ShippingMethods', null, {});
}
