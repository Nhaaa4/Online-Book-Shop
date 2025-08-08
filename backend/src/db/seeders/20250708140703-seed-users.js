'use strict';

import bcrypt from 'bcrypt';

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
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  
  await queryInterface.bulkInsert('Users', [
    {      
      first_name: 'Panha',
      last_name: 'Sovan',
      password: hashedPassword,
      email: 'admin@book.com',
      role_id: 1, 
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
  await queryInterface.bulkDelete('Users', null, {});
}
