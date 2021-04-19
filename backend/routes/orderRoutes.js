const { Router } = require('express')
const router = Router()
const {
  addOrderItems,
  getOrderById,
} = require('../controllers/orderController')
const protect = require('../middleware/authUser')

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

module.exports = router
