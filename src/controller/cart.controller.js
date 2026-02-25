const { addToCartService } = require("../service/cart.service")
const { StatusCodes } = require("http-status-codes");

const addToCartController = async (req, res) => {
    const { userId, productId } = req.body;
    const result = await addToCartService(userId, productId)
    console.log(result)
    res.status(StatusCodes.OK).json({ message: "Product added to cart successfully", result })
}

module.exports = {
    addToCartController
}