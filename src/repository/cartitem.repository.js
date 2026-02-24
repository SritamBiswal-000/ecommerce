const { CartItemModel } = require('../db/models')

const getCartItemRepository = async (cartId, productId) => {
    return await CartItemModel.findOne({ where: { cartId, productId } })
}

const getCartItemsRepository = async (cartId) => {
    return await CartItemModel.findAll({ where: { cartId } })
}

const createCartItemRepository = async (cartItemData) => {
    return await CartItemModel.create(cartItemData)
}

const updateCartItemQuantityRepository = async (cartItemId, updatedData) => {
    return await CartItemModel.update(updatedData, { where: { id: cartItemId } })
}

module.exports = {
    getCartItemRepository,
    createCartItemRepository,
    updateCartItemQuantityRepository,
    getCartItemsRepository
}

