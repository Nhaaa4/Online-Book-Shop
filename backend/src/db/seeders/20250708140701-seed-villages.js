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
  await queryInterface.bulkInsert('Villages', [
    { name: 'Village A', commune_id: 4, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Village B', commune_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Village C', commune_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Village D', commune_id: 5, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Village E', commune_id: 3, createdAt: new Date(), updatedAt: new Date() }
  ]);

}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
