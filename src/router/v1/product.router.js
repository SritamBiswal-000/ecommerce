const express = require('express')
const productRouter = express.Router()
const { createProductController, getAllProductsController, getProductController, updateProductController, deleteProductController } = require('../../controller/product.controller')


productRouter.post('/', createProductController)
productRouter.get('/', getAllProductsController)
productRouter.get('/:id', getProductController)
productRouter.put('/:id', updateProductController)
productRouter.delete('/:id', deleteProductController)

module.exports = productRouter