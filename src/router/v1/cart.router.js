const express = require("express")
const cartRouter = express.Router()
const { addToCartController } = require("../../controller/cart.controller")

cartRouter.post('/', addToCartController)

module.exports = cartRouter
