import asyncHadnler from 'express-async-handler'
import Product from '../models/product.js'

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHadnler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHadnler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }
