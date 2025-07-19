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
  await queryInterface.bulkInsert('Authors', [
    { first_name: 'John', last_name: 'Doe', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Jane', last_name: 'Smith', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Michael', last_name: 'Johnson', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Sarah', last_name: 'Williams', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'David', last_name: 'Brown', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Emily', last_name: 'Davis', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Robert', last_name: 'Miller', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Jessica', last_name: 'Wilson', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Christopher', last_name: 'Moore', createdAt: new Date(), updatedAt: new Date() },
    { first_name: 'Amanda', last_name: 'Taylor', createdAt: new Date(), updatedAt: new Date() }
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Authors', null, {});
}
