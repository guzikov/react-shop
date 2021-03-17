const dotenv = require('dotenv')
const products = require('./data/products')
const users = require('./data/users')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const addedUsers = await User.insertMany(users)

    const allProducts = products.map((product) => {
      return { ...product, user: addedUsers[0]._id }
    })
    await Product.insertMany(allProducts)
    console.log('Data imported')
    process.exit()
  } catch (error) {
    console.error(`${error} while import data`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed')
    process.exit()
  } catch (error) {
    console.error(`${error} while destroy data`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
