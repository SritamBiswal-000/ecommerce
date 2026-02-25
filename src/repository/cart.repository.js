const { Cart } = require("../db/models")

const getCartRepository = async (userId) => {
    console.log("entered getCartRepository")
    return await Cart.findOne({ where: { userId } })
}

const createCartRepository = async (userId) => {
    console.log("entered createCartRepository")
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