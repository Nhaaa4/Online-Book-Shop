'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Users', 'avatar', {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    comment: 'URL to user profile image stored in Cloudinary'
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Users', 'avatar');
}
