const express = require('express')
const { getUsersController, createUserController, getUserByIdController, updateUserController, deleteUserController } = require('../../controller/user.controller')
const userRouter = express.Router()

userRouter.get('/', getUsersController)
userRouter.post('/', createUserController)
userRouter.get('/:id', getUserByIdController)
userRouter.put('/:id', updateUserController)
userRouter.delete('/:id', deleteUserController)


module.exports = userRouter