const express = require('express')
const ordersProductsRouter = express.Router();

const { requireAdmin, requireUser } = require('./utils')
const { getAllProductsByOrderId, createOrders_Product, checkForPendingCart } = require('../db/orders_products')
const { getOrderByUserId } = require('../db/orders')

ordersProductsRouter.get('/:userId', requireUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    const order = await checkForPendingCart(userId)
    const products = await getAllProductsByOrderId(order[0].order_id)
    res.send(products)
  } catch ({name, message}) {
    next({name, message})
  }
})

ordersProductsRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const {product_id, quantity} = req.body
    const {user_id} = req.user
    const order = await checkForPendingCart(user_id)
    const order_id = order[0].order_id
    const products = await createOrders_Product({order_id, product_id, quantity})

    res.send(products)
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = ordersProductsRouter