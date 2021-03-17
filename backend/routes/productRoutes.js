const asyncHandler = require('express-async-handler')
const { Router } = require('express')
const router = Router()

const Product = require('../models/productModel')

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ message: 'product not fount' })
    }
  })
)

module.exports = router
