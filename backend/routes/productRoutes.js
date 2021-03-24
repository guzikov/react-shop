const { Router } = require('express')
const router = Router()
const {
  getProducts,
  getProductById,
} = require('../controllers/productController')

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

module.exports = router
