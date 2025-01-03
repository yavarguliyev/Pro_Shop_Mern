import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPay,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orders.js'
import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPay)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
