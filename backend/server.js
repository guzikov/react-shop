const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const connectDb = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.APP_ENV} mode on port ${process.env.PORT}`
  )
)
