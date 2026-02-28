const { CartItem } = require('../db/models')

const getCartItemRepository = async (cartId, productId) => {
    return await CartItem.findOne({ where: { cartId, productId } })
}

const getCartItemsRepository = async (cartId) => {
    return await CartItem.findAll({ where: { cartId } })
}

const createCartItemRepository = async (cartItemData) => {
    return await CartItem.create(cartItemData)
}

const updateCartItemQuantityRepository = async (cartItemId, updatedData) => {
    return await CartItem.update(updatedData, { where: { id: cartItemId } })
}

module.exports = {
    getCartItemRepository,
    createCartItemRepository,
    updateCartItemQuantityRepository,
    getCartItemsRepository
}

