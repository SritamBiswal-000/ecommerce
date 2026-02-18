const { createCartRepository, getCartRepository } = require("../repository/cart.repository")
const { getProductRepository } = require("../repository/product.repository")

const addToCartService = async (userId, productId) => {
    const product = await getProductRepository(productId)
    if (!product) {
        return "Product not found!"
    }
    if (product.stock <= 0) {
        return "Product is out of stock!"
    }
    let cart = await getCartRepository(userId)
    if (!cart) {
        cart = await createCartRepository(userId, productId)
        console.log("Cart items", cart.countCartItem())
    }
}


const getCartService = async (userId) => {
    return await getCartRepository(userId)
}

module.exports = {
    addToCartService,
    getCartService
}
