const { CartItem } = require('../db/models')

const getCartItemRepository = async (cartId, productId) => {
    console.log("entered getCartItemRepository")
    return await CartItem.findOne({ where: { cartId, productId } })
}

const getCartItemsRepository = async (cartId) => {
    return await CartItem.findAll({ where: { cartId } })
}

const createCartItemRepository = async (cartItemData) => {
    console.log("entered createCartItemRepository")
    return await CartItem.create(cartItemData)
}

const updateCartItemQuantityRepository = async (cartItemId, updatedData) => {
    console.log("entered updateCartItemQuantityRepository")
    return await CartItem.update(updatedData, { where: { id: cartItemId } })
}

module.exports = {
    getCartItemRepository,
    createCartItemRepository,
    updateCartItemQuantityRepository,
    getCartItemsRepository
}

