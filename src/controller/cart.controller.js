const { addToCartService } = require("../service/cart.service")

const addToCartController = async (req, res) => {
    const { userId, productId } = req.body;
    console.log(req.body)
    const result = await addToCartService(userId, productId)
    if (result) {
        res.status(200).json({ message: "Product added to cart successfully" })
    }
}

module.exports = {
    addToCartController
}