const { Product } = require('../db/models')

const createProductRepository = async (product) => {
    return await Product.create(product)
}

const getAllProductsRepository = async () => {
    return await Product.findAll()
}

const getProductRepository = async (id) => {
    return await Product.findByPk(id)
}

const getProductByNameRepository = async (name) => {
    return await Product.findOne({ where: { name } })
}

const updateProductRepository = async (id, product) => {
    return await Product.update(product, { where: { id } })
}

const deleteProductRepository = async (id) => {
    return await Product.destroy({ where: { id } })
}

module.exports = {
    createProductRepository,
    getAllProductsRepository,
    getProductRepository,
    updateProductRepository,
    deleteProductRepository,
    getProductByNameRepository
}