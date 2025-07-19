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

  await queryInterface.bulkInsert('Provinces', [
    { name: 'Province A', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Province B', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Province C', createdAt: new Date(), updatedAt: new Date() }
  ]);
 
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Provinces', null, {});
}
