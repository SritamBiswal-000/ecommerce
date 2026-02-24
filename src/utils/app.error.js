const { StatusCodes } = require('http-status-codes')

class AppError extends Error {
    statusCode
    name
    message
}

class InternalServerError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        this.name = 'InternalServerError'
        this.message = message
    }
}

class BadRequestError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        this.name = 'BadRequestError'
        this.message = message
    }
}

class UnAuthorizedError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
        this.name = 'UnAuthorizedError'
        this.message = message
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
        this.name = 'NotFoundError'
        this.message = message
    }
}

class ForbiddenError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
        this.name = 'ForbiddenError'
        this.message = message
    }
}

class ConflictError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.CONFLICT
        this.name = 'ConflictError'
        this.message = message
    }
}

class UnprocessableEntityError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY
        this.name = 'UnprocessableEntityError'
        this.message = message
    }
}

class TooManyRequestsError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.TOO_MANY_REQUESTS
        this.name = 'TooManyRequestsError'
        this.message = message
    }
}


class NotImplementedError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_IMPLEMENTED
        this.name = 'NotImplementedError'
        this.message = message
    }
}

class ServiceUnavailableError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.SERVICE_UNAVAILABLE
        this.name = 'ServiceUnavailableError'
        this.message = message
    }
}


module.exports = {
    AppError,
    InternalServerError,
    BadRequestError,
    UnAuthorizedError,
    NotFoundError,
    ForbiddenError,
    ConflictError,
    UnprocessableEntityError,
    TooManyRequestsError,
    NotImplementedError,
    ServiceUnavailableError
}