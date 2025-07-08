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
  await queryInterface.bulkInsert('Permissions', [
    { permission: 'update.book', description: 'Modify existing book', createdAt: new Date() },
    { permission: 'insert.book', description: 'Upload new book', createdAt: new Date() },
    { permission: 'select.book', description: 'View all books', createdAt: new Date() },
    { permission: 'select.book_details', description: 'View book details', createdAt: new Date() },
    { permission: 'delete.book', description: 'Remove book', createdAt: new Date() },
    { permission: 'select.user', description: 'View all customer', createdAt: new Date() },
    { permission: 'insert.role', description: 'Create new role', createdAt: new Date() },
    { permission: 'select.role', description: 'View all roles', createdAt: new Date() },
    { permission: 'update.role', description: 'Change role permission', createdAt: new Date() },
    { permission: 'remove.role', description: 'Remove role', createdAt: new Date() },
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Permissions', null, {});
}
