const express = require('express')
const productsRouter = express.Router();

const { createProduct, getAllProducts, getProductById } = require('../db/products')

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts()

    res.send(products)
  } catch ({name, message}) {
    next({name, message})
  }
})

productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId)
    res.send(product)
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = productsRouter;