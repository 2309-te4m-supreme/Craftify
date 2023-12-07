const express = require('express')
const ordersProductsRouter = express.Router();

const { requireAdmin, requireUser } = require('./utils')
const { getAllProductsByOrderId, createOrders_Product, checkForPendingCart, removeFromCartByID } = require('../db/orders_products')
const { getOrderByUserId } = require('../db/orders')

// Get Cart 
// ROUTE /api/orders_products/:userId
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

// Add to Cart (Makes New Product in Cart)
// ROUTE /api/orders_products/
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

// Remove from Cart SUCCESS
// ROUTE /api/orders_products/:productId
ordersProductsRouter.delete('/:productId', requireUser, async (req, res, next) => {
  try {
    const {user_id} = req.user
    const {productId} = req.params
    const order = await checkForPendingCart(user_id)
    const order_id = order[0].order_id
    const discardProduct = removeFromCartByID(order_id, productId)

    res.send(discardProduct)
  } catch ({name, message}) {
    next({name, message})
  }
})

// Edit Quantity IN PROGRESS
// ordersProductsRouter.PATCH('/:productId', requireUser, async (req, res, next) => {
//   try {
//     const {productId} = req.params
//     const {quantity} = req.body
//     const {user_id} = req.user
//     // const order = await checkForPendingCart(user_id)  UNDECIDED
//     // const order_id = order[0].order_id UNDECIDED

//     res.send(products)
//   } catch ({name, message}) {
//     next({name, message})
//   }
// })

module.exports = ordersProductsRouter