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
    {
      name: 'Kein Svay',
      province_id: 1, // Assuming Kandal has ID 1
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dangkao',
      province_id: 1, // Assuming Kandal has ID 1
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Phnom Penh',
      province_id: 2, // Assuming Phnom Penh has ID 2
      createdAt: new Date(),
      updatedAt: new Date()
    }
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
