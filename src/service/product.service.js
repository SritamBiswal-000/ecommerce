const { createProductRepository, getProductByNameRepository, getAllProductsRepository, getProductRepository, updateProductRepository, deleteProductRepository } = require('../repository/product.repository')
const { BadRequestError, NotFoundError, ConflictError } = require('../utils/app.error')

const createProductService = async (product) => {
    const productExist = await getProductByNameRepository(product.name)
    if (productExist) {
        throw new ConflictError('Product already exists')
    }
    const newProduct = await createProductRepository(product)
    return newProduct
}

const getAllProductsService = async () => {
    const products = await getAllProductsRepository()
    return products
}

const getProductService = async (id) => {
    const products = await getProductRepository(id)
    if (!products) {
        throw new NotFoundError('Product not found')
    }
    return products
}

const updateProductService = async (id, product) => {
    const productExist = await getProductRepository(id)
    if (!productExist) {
        throw new BadRequestError("Product Doesn't Exist")
    }
    const updatedProduct = await updateProductRepository(id, product)
    if (updatedProduct[0] === 1) return true
    return false
}

const deleteProductService = async (id) => {
    const product = await getProductRepository(id);
    if (!product) {
        throw new NotFoundError('Product not found')
    }
    const deletedproduct = await deleteProductRepository(id);
    if (deletedproduct) return true
    return false
}

module.exports = {
    createProductService,
    getAllProductsService,
    getProductService,
    updateProductService,
    deleteProductService
}