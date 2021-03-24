const { Router } = require('express')
const router = Router()
const {
  registerUser,
  authUser,
  getUserProfile,
} = require('../controllers/userController')
const protect = require('../middleware/authUser')

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)

module.exports = router
