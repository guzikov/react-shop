const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const connectDb = require('./config/db')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()
app.use(express.json())

if (process.env.APP_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')))

if (process.env.APP_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//Get PAYPAL config
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)
app.use(errorHandler)

app.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.APP_ENV} mode on port ${process.env.PORT}`
  )
)
