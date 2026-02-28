const { Cart } = require("../db/models")

const getCartRepository = async (userId) => {
    return await Cart.findOne({ where: { userId } })
}

const createCartRepository = async (userId) => {
    return await Cart.create({ userId, totalAmount: 0 })
}

const updateCartTotalAmountRepository = async (cartId, totalAmount) => {
    return await Cart.update({ totalAmount }, { where: { id: cartId } })
}

module.exports = {
    getCartRepository,
    createCartRepository,
    updateCartTotalAmountRepository
}