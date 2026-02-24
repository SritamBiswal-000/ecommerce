const express = require('express')
const router = require('./router')
const app = express()
const appErrorHandler = require('./middlewares/error.middleware')
const PORT = 3001

app.use(express.json())
app.use('/api/v1', router)
app.use(appErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port no: http://localhost:${PORT}`)
})

// http://localhost:3001/api/v1/users

// callback: when a function is passed as an argument to another function
// higher order function: a function that takes another function as an argument
// first class function: a function can be passed as an argument to another function

