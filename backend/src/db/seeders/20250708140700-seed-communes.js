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

  await queryInterface.bulkInsert('Communes', [
    { name: 'Commune 1', district_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Commune 2', district_id: 5, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Commune 3', district_id: 4, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Commune 4', district_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Commune 5', district_id: 3, createdAt: new Date(), updatedAt: new Date() }
  ]);
  
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */

  await queryInterface.bulkDelete('Communes', null, {});
}

