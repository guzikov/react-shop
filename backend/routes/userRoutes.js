const { Router } = require('express')
const router = Router()
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authUser')

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router
