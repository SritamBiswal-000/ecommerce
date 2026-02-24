const { CartModel } = require("../db/models")

const getCartRepository = async (userId) => {
    return await CartModel.findOne({ where: { userId } })
}

const createCartRepository = async (userId) => {
    return await CartModel.create({ userId, totalAmount: 0 })
}

const updateCartTotalAmountRepository = async (cartId, totalAmount) => {
    return await CartModel.update({ totalAmount }, { where: { id: cartId } })
}

module.exports = {
    getCartRepository,
    createCartRepository,
    updateCartTotalAmountRepository
}