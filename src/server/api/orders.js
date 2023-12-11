const express = require('express')
const ordersRouter = express.Router();

const { getAllOrders, getOrderById, getOrderByUserId, createOrder, updateOrderStatus } = require('../db/orders');
const { requireAdmin, requireUser } = require('./utils')
const { updateOrderTotal, checkForPendingCart } = require('../db/orders_products')

//TODO (Admin) Get Orders SUCCESS
ordersRouter.get('/',requireAdmin, async (req, res, next) => {
  try {
    const orders = await getAllOrders()

    res.send(orders)
  } catch ({name, message}) {
    next({name, message})
  }
})

//TODO (Admin) (Fix routes on this and the get by user id)
// ordersRouter.get('/:orderId', async (req, res, next) => {
//   try {
//     const order = await getOrderById(req.params.orderId)
//     res.send(order)
//   } catch ({name, message}) {
//     next({name, message})
//   }
// })

//TODO (Admin) Get Order By Id SUCCESS

ordersRouter.get('/:userId', requireUser, async (req, res, next) => {
  try {
    const order = await getOrderByUserId(req.params.userId)
    res.send(order)
  } catch ({name, message}) {
    next({name, message})
  }
})

//Get order total TODO
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



// This route is for TESTING ONLY!
// ordersRouter.delete('/:orderId', async (req, res, next) => {
//   try {
//     const order = await deleteOrder(req.params.orderId)
//     res.send(order)
//   } catch ({name, message}) {
//     next({name, message})
//   }
// })

module.exports = ordersRouter