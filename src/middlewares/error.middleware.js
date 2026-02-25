const appErrorHandler = (error, req, res, next) => {
    console.log(error)

    const statusCode = error.statusCode || 500
    const message = error.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        message
    })
}

module.exports = appErrorHandler
