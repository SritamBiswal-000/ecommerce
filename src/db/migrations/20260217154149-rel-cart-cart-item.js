'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('CartItems', {
      fields: ['cartId'],
      type: 'foreign key',
      name: 'cart_item_cart_id_fk',
      references: {
        table: 'Carts',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('CartItems', 'cart_item_cart_id_fk');
  }
};
