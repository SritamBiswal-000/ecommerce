'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('create_cart_items', 'CartItems');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('CartItems', 'create_cart_items');
  }
};
