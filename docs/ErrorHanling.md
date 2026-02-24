# Express Error Handling Guide

This guide explains how errors are handled in this Express application, specifically detailing the custom error classes, the central error-handling middleware, and how errors propagate from the controllers.

## 1. How Errors are Handled in Express

In Express, error handling is done using a special type of middleware that takes **four** arguments instead of three: `(err, req, res, next)`. When an error occurs in any route or middleware, Express skips all regular middlewares and routes, and jumps directly to this specialized error-handling middleware.

### Express 5 Async Error Handling

Our project uses **Express 5** (as defined in `package.json` with `"express": "^5.2.1"`). A major feature of Express 5 is that **async errors are handled automatically**. 

If a Promise is rejected or an error is thrown inside an `async` route handler/controller, Express 5 automatically catches it and passes it to the `next(err)` function. This eliminates the need for repeated `try/catch` blocks or wrapper packages like `express-async-handler` in our controllers.

---

## 2. The Custom Error Classes (`src/utils/app.error.js`)

To define structured, predictable errors throughout the application, we use custom error classes. 

### Why Custom Errors?
Standard JavaScript `Error` objects only have a `message` and `stack`. By subclassing `Error`, we can attach important HTTP metadata, such as:
- **`statusCode`**: The appropriate HTTP status code to return to the client (e.g., 400 for Bad Request, 404 for Not Found).
- **`name`**: The specific type of error for logging or debugging.

### Overview of `app.error.js`
In `src/utils/app.error.js`, there is a base class called `AppError`:
```javascript
class AppError extends Error {
    statusCode
    name
    message
}
```
All other specific HTTP errors extend this base class. For example:
- `BadRequestError` (400)
- `UnAuthorizedError` (401)
- `NotFoundError` (404)
- `InternalServerError` (500)

When you need to throw an error anywhere in your service or controller routines, you just instantiate one of these classes:
```javascript
throw new BadRequestError("Invalid user data provided");
```

---

## 3. The Error Middleware (`src/middlewares/error.middleware.js`)

All errors that are thrown or passed to `next()` eventually end up in the central error handling middleware:

```javascript
const appErrorHandler = (error, req, res, next) => {
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
}

module.exports = appErrorHandler
```

### How it works:
1. **Catches the Error**: It receives the `error` object thrown by the route or service.
2. **Extracts Status Code**: It sets the HTTP Response status using `error.statusCode` (which was set by our custom `AppError` subclasses).
3. **Sends JSON Response**: It responds to the client with a consistent JSON format indicating `success: false` and the error `message`.

*(Note: For a fully production-ready app, you might also want to add fallback logic in case `error.statusCode` is undefined, setting it to 500, but the current structure handles all explicit `AppError` instances flawlessly.)*

---

## 4. Usage in Controllers (`src/controller/user.controller.js`)

Let's look at how this simplifies our controllers, such as `src/controller/user.controller.js`.

```javascript
const createUserController = async (req, res) => {
	const { name, email, password } = req.body;
	const result = await createUserService({
		name, email, password, role: "user",
	});
	res.status(StatusCodes.CREATED).json({ message: "User created successfully", result });
};
```

### The Flow:
1. **Clean Syntax**: Notice there are no `try/catch` blocks. The controller is purely focused on the "happy path."
2. **Service Layer Errors**: If the `createUserService` fails (e.g., it throws a `ConflictError` because the email already exists, or `BadRequestError` for invalid data), standard JavaScript throws that error up the call stack.
3. **Express 5 Magic**: Because `createUserController` is an `async` function, Express 5 catches the unhandled Promise rejection natively.
4. **Middleware Interception**: Express automatically calls `next(err)` and forwards it directly to `src/middlewares/error.middleware.js`.
5. **Client Response**: The user gets a cleanly formatted error response with the correct status code.

This architecture ensures a highly maintainable, readable, and robust approach to managing errors across the entire Express application.

---

## 5. Connecting Error Middleware in `src/index.js`

To make the error handling middleware effective, it must be officially integrated into the primary Express application pipeline. This takes place inside `src/index.js`.

```javascript
const express = require('express')
const router = require('./router')
const app = express()
const appErrorHandler = require('./middlewares/error.middleware')

// ... (other body parsing middlewares, etc) ...

app.use(express.json())
app.use('/api/v1', router)
app.use(appErrorHandler) // <-- Error middleware registered MUST BE LAST
```

### Key Considerations:
1. **Position is Crucial**: Note that `app.use(appErrorHandler)` is placed **after** `app.use('/api/v1', router)`. In Express, middlewares evaluate sequentially. By placing the error middleware at the very end of the stack, Express knows that if any of the preceding routes or middlewares throw an error (or call `next(err)`), the error handler is perfectly positioned to catch it.
2. **Global Catch-All**: Because it is mounted at the global application level (`app.use(...)` rather than on a specific route), it acts as a global catch-all for any errors that escape from the controllers.
