const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

//@descr Login User
//@method POST
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).exec()

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Email or password are incorrect')
  }
})

//@descr Register user
//@method POST
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('Bad request')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Error while creating user')
  }
})

//@descr Get user data
//@method GET
//@Access Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    })
  }
  res.status(404)
  throw new Error('User not found!')
})

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
}
