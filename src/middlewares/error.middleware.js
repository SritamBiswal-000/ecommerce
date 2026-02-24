const appErrorHandler = (error, req, res, next) => {
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
}

module.exports = appErrorHandler
