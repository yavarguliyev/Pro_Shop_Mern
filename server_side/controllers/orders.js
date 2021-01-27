import asyncHadnler from 'express-async-handler'
import Order from '../models/order.js'

// @desc    Create new order
// @route   POST /api/v1/ordeers
// @access  Private
const addOrderItems = asyncHadnler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/v1/ordeers/:id
// @access  Private
const getOrderById = asyncHadnler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order by to paid
// @route   PUT /api/v1/ordeers/:id/pay
// @access  Private
const updateOrderToPay = asyncHadnler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   PUT /api/v1/ordeers/myorders
// @access  Private
const getMyOrders = asyncHadnler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPay, getMyOrders }
