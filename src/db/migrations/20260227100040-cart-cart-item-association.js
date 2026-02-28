'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'cartitems',
      'cart_item_cart_id_fk'
    );

    await queryInterface.addConstraint('cartitems', {
      fields: ['cartId'],
      type: 'foreign key',
      name: 'cart_item_cart_id_fk',
      references: {
        table: 'carts',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'cartitems',
      'cart_item_cart_id_fk'
    );

    await queryInterface.addConstraint('cartitems', {
      fields: ['cartId'],
      type: 'foreign key',
      name: 'cart_item_cart_id_fk',
      references: {
        table: 'carts',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });

  }
};
