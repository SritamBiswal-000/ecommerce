'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('create_cart_items', 'CartItems');
    await queryInterface.renameColumn('CartItems', 'productid', 'productId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('CartItems', 'create_cart_items');
    await queryInterface.renameColumn('CartItems', 'productId', 'productid');
  }
};
