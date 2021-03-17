const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      reqired: true,
    },
  },
  {
    timestamps: true,
  }
)

const productModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productModel)

module.exports = Product
