const express = require('express')
const ordersRouter = express.Router();

const { getAllOrders, getOrderById, getOrderByUserId, createOrder, updateOrderStatus } = require('../db/orders');
const { requireAdmin, requireUser } = require('./utils')
const { updateOrderTotal, checkForPendingCart } = require('../db/orders_products')

// Get Orders (Admin) SUCCESS
// ROUTE /api/orders/
ordersRouter.get('/',requireAdmin, async (req, res, next) => {
  try {
    const orders = await getAllOrders()

    res.send(orders)
  } catch ({name, message}) {
    next({name, message})
  }
})


// Get Order By User Id (Admin) SUCCESS
// ROUTE /api/orders/:userId
ordersRouter.get('/:userId', requireUser, async (req, res, next) => {
  try {
    const order = await getOrderByUserId(req.params.userId)
    res.send(order)
  } catch ({name, message}) {
    next({name, message})
  }
})

//Get order total
// ROUTE /api/orders/order/:userId
ordersRouter.get('/order/:userId', requireUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    const order = await checkForPendingCart(userId)
    res.send(order[0])
  } catch ({name, message}) {
    next({name, message})
  }
})


// Start Order SUCCESS
// ROUTE /api/orders/
ordersRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const { order_total } = req.body
    
    const order = await createOrder(req.user.user_id, order_total)
    res.send(order)
  } catch ({name, message}) {
    next({name, message})
  }
})

// Update Order Status after Checkout SUCCESS
// ROUTE /api/orders/:orderId
ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
  try {
    const {orderId} = req.params
// Frontend gets request with userId to get pending orderId, and then pass the orderId through this api function
    const {user_id} = req.user
    const order = await updateOrderStatus(orderId)
    const newOrder = await createOrder(user_id, 0)
    const subtotal = updateOrderTotal(orderId)

    return res.status(200).json({order})
  } catch ({name, message}) {
    next({name, message})
  }
})



module.exports = ordersRouter