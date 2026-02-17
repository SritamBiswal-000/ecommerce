const { createProductService, getAllProductsService, getProductService, updateProductService, deleteProductService } = require('../service/product.service')

const createProductController = async (req, res) => {
    const result = await createProductService(req.body)
    if (result === "Product already exists") {
        res.status(400).json({
            message: "Product already exists"
        })
    }
    res.status(201).json({
        message: "Product created successfully",
        product: result
    })
}

const getAllProductsController = async (req, res) => {
    const result = await getAllProductsService()
    res.status(200).json({
        message: "Products fetched successfully",
        products: result
    })
}

const getProductController = async (req, res) => {
    const { id } = req.params
    const result = await getProductService(id)
    if (result === 'Product not found') {
        res.status(400).json({
            message: "Product not found"
        })
    }
    res.status(200).json({
        message: "Product fetched successfully",
        product: result
    })
}

const updateProductController = async (req, res) => {
    const {id} = req.params;
    const productData = req.body;
    const result = await updateProductService(id,productData);
    if(result === "Product Doesn't Exist"){
        res.status(400).json({
            message: "Product not found"
        })
    }
    res.status(200).json({
        message: "Product Updated Successfully",
        product: result
    })
    
}

const deleteProductController = async (req, res) => {
    const {id} = req.params;
    const result = await deleteProductService(id);
    if(result === "Product not found"){
        res.status(400).json({
            message: "Product not found"
        })
    }
    res.status(200).json({
        message: "Product deleted successfully",
        product: result
    })
}

module.exports = {
    createProductController,
    getAllProductsController,
    getProductController,
    updateProductController,
    deleteProductController
}