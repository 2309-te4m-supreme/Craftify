const express = require('express')
const ordersProductsRouter = express.Router();

const { requireAdmin, requireUser } = require('./utils')
const { getAllProductsByOrderId, createOrders_Product, checkForPendingCart, removeFromCartByID, updateQuantity, updateOrderTotal } = require('../db/orders_products')
const { getOrderByUserId } = require('../db/orders')

// Get Cart 
// ROUTE /api/orders_products/:userId SUCCESS
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

// Add to Cart (Makes New Product in Cart) SUCCESS
// ROUTE /api/orders_products/
ordersProductsRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const {product_id, quantity} = req.body
    const {user_id} = req.user
    const order = await checkForPendingCart(user_id)
    const order_id = order[0].order_id
    const products = await createOrders_Product({order_id, product_id, quantity})
    const subtotal = updateOrderTotal(order_id)

    res.status(200).send(products)
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
    const subtotal = updateOrderTotal(order_id)


    res.send(discardProduct)
  } catch ({name, message}) {
    next({name, message})
  }
})

// Edit Quantity SUCCESS
// ROUTE /api/orders_products/:productId
ordersProductsRouter.patch('/:productId', requireUser, async (req, res, next) => {
  try {
    const {user_id} = req.user
    const {productId} = req.params
    const order = await checkForPendingCart(user_id)
    const orderId = order[0].order_id
    const {quantity} = req.body
    const amountOfProduct = await updateQuantity(quantity, productId, orderId)
    const subtotal = updateOrderTotal(orderId)


    res.send(amountOfProduct)
  } catch ({name, message}) {
    next({name, message})
  }
})









module.exports = ordersProductsRouter