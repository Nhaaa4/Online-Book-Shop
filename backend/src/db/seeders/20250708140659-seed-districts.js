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

  await queryInterface.bulkInsert('Districts', [
    { name: 'District 1', province_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'District 2', province_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'District 3', province_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { name: 'District 4', province_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { name: 'District 5', province_id: 3, createdAt: new Date(), updatedAt: new Date() }
  ]);
  
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */

  await queryInterface.bulkDelete('Districts', null, {});
}
