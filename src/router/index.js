const express = require('express')
const router = express.Router()
const userRouter = require('./v1/user.router')
const productRouter = require('./v1/product.router')
const cartRouter = require('./v1/cart.router')


router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

// http://localhost:3001/api/v1/users

module.exports = router


//types of module import/export in js

//commonjs
// module.exports = router :default export
// module.exports = {getUsersController, createUserController} :named export
// import router from './router' :default import
// import {getUsersController, createUserController} from './router' :named import

//es module
// export default router :default export
// export {router} :named export
// import router from './router' :default import
// import {router} from './router' :named import


//falsy values in js
// null, undefined, "", 0, false, NaN
//truthy values in js
// "hello", 1, true, {}, [], function() {}, {}
