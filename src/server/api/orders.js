const express = require('express')
const ordersRouter = express.Router();

const { getAllOrders, getOrderById, getOrderByUserId, createOrder } = require('../db/orders');
const { requireAdmin } = require('./utils')

//TODO (Admin)
ordersRouter.get('/', async (req, res, next) => {
  try {
    const orders = await getAllOrders()

    res.send(orders)
  } catch ({name, message}) {
    next({name, message})
  }
})

//TODO (Admin)
ordersRouter.get('/:orderId', async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.orderId)
    res.send(order)
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = ordersRouter