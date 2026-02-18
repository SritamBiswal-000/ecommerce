const { CartModel } = require("../db/models")

const getCartRepository = async (userId) => {
    return await CartModel.findOne({ where: { userId } })
}

const createCartRepository = async (cart) => {
    return await CartModel.create(cart)
}


module.exports = {
    getCartRepository,
    createCartRepository
}