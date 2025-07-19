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
  await queryInterface.bulkInsert('Categories', [
    { category_name: 'Programming', description: 'Books about coding and software development', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Design', description: 'Books about design thinking and visual arts', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Science Fiction', description: 'Futuristic and imaginative fiction stories', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Mystery', description: 'Crime, detective, and thriller novels', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Romance', description: 'Love stories and romantic fiction', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Fantasy', description: 'Magical and supernatural adventure stories', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Biography', description: 'Life stories of notable people', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'History', description: 'Books about historical events and periods', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Self Help', description: 'Personal development and improvement books', createdAt: new Date(), updatedAt: new Date() },
    { category_name: 'Business', description: 'Entrepreneurship, management, and business strategy', createdAt: new Date(), updatedAt: new Date() }
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Categories', null, {});
}
