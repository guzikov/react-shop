const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

//@descr Get all products
//@method GET /api/products
//@Access Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const products = await Product.find({ ...keyword })
  res.status(200).json(products)
})

//@descr Get product by ID
//@method GET /api/products/:id
//@Access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).json({ message: 'product not fount' })
  }
})

//@descr Delete product by ID
//@method DELETE /api/products/:id
//@Access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404).json({ message: 'product not fount' })
  }
})

//@descr Create new product
//@method POST /api/products
//@Access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Product',
    category: 'Sample Category',
    price: 1111,
    brand: 'Sample Brand',
    image: '/image/sample.jpg',
    description: 'Sample Description',
    countInStock: 20,
    user: req.user.id,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@descr Update product by ID
//@method PUT /api/products/:id
//@Access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, price, brand, image, description, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.category = category || product.category
    product.price = price || product.price
    product.brand = brand || product.brand
    product.image = image || product.image
    product.description = description || product.description
    product.countInStock = countInStock || product.countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404).json({ message: 'product not fount' })
  }
})

//@descr Create product review
//@method POST /api/products/:id/reviews
//@Access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed by user')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numReviews

    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404).json({ message: 'product not fount' })
  }
})

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
