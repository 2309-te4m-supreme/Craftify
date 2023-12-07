const express = require('express')
const ordersRouter = express.Router();

const { getAllOrders, getOrderById, getOrderByUserId, createOrder, deleteOrder } = require('../db/orders');
const { requireAdmin, requireUser } = require('./utils')

//TODO (Admin)
ordersRouter.get('/', async (req, res, next) => {
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


ordersRouter.get('/:userId', requireUser, async (req, res, next) => {
  try {
    const order = await getOrderByUserId(req.params.userId)
    res.send(order)
  } catch ({name, message}) {
    next({name, message})
  }
})

ordersRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const { order_total } = req.body
    
    const order = await createOrder(req.user.user_id, order_total)
    res.send(order)
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