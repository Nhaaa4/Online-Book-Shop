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
  await queryInterface.bulkInsert('Books', [
    {
      isbn: '9781234567897',
      title: 'Learning JavaScript',
      description: 'A beginner-friendly JS book.',
      price: 19.99,
      stock_quantity: 10,
      image_url: 'https://example.com/js.png',
      author_id: 1,
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9789876543210',
      title: 'Mastering CSS',
      description: 'Advanced CSS techniques.',
      price: 25.00,
      stock_quantity: 5,
      image_url: 'https://example.com/css.png',
      author_id: 2,
      category_id: 1,
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
  await queryInterface.bulkDelete('Books', null, {});
}
