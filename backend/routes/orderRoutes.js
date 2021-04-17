const { Router } = require('express')
const router = Router()
const { addOrderItems } = require('../controllers/orderController')
const protect = require('../middleware/authUser')

router.route('/').post(protect, addOrderItems)

module.exports = router
