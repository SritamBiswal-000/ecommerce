const { createCartRepository, getCartRepository, updateCartTotalAmountRepository } = require("../repository/cart.repository")
const { getProductRepository } = require("../repository/product.repository")
const { getCartItemRepository, getCartItemsRepository, createCartItemRepository, updateCartItemQuantityRepository } = require('../repository/cartitem.repository')
const {findUserByIdRepository} = require("../repository/user.repository")
const { NotFoundError, UnprocessableEntityError, BadRequestError } = require('../utils/app.error')

const addToCartService = async (userId, productId) => {
    const user = await findUserByIdRepository(userId)
    if(!user){
        throw new BadRequestError("user doesn't exist")
    }
    const product = await getProductRepository(productId)
    if (!product) {
        console.log("not found")
        throw new NotFoundError("Product not found!")
    }
    if (product.stock <= 0) {
        console.log("stock not available")
        throw new UnprocessableEntityError("Product is out of stock!")
    }
    let cart = await getCartRepository(userId)
    if (!cart) {
        console.log("cart is creating..")
        cart = await createCartRepository(userId)
    }
    let cartItem = await getCartItemRepository(cart.id, productId)
    if (cartItem) {
        console.log("cartitem ...")
        const newQuantity = cartItem.quantity + 1
        const newPrice = product.price * newQuantity
        if (newQuantity > product.stock) {
            console.log("quantity error")
            throw new UnprocessableEntityError(
                "Cannot add more of this product due to limited stock"
            )
        }
        await updateCartItemQuantityRepository(cartItem.id, { quantity: newQuantity, price: newPrice })
    } else {
        await createCartItemRepository({
            cartId: cart.id,
            productId: product.id,
            quantity: 1,
            price: product.price
        })
    }
    const totalAmount = await calculateTotalAmountService(cart.id)
    await updateCartTotalAmountRepository(cart.id, totalAmount)
    cart = await getCartRepository(userId)
    return cart
}

const calculateTotalAmountService = async (cartId) => {
    const cartItems = await getCartItemsRepository(cartId)
    let totalAmount = 0
    cartItems.forEach(cartItem => {
        totalAmount = totalAmount + (cartItem.price * cartItem.quantity)
    });
    return totalAmount
}


const getCartService = async (userId) => {
    return await getCartRepository(userId)
}

module.exports = {
    addToCartService,
    getCartService,
    calculateTotalAmountService
}
