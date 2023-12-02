const express = require('express')
const productsRouter = express.Router();

const { createProduct, getAllProducts, getProductById, deleteProduct } = require('../db/products')

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

//TODO Create Product (Admin) SUCCESS

productsRouter.post('/', async (req, res, next) => {
  const { product_name, product_description, product_price, product_image, product_category, product_stock } = req.body
  const productData = {}

  try {
    productData.name = product_name
    productData.description = product_description
    productData.price = product_price
    productData.image = product_image
    productData.category = product_category
    productData.stock = product_stock

    const newProduct = await createProduct(
      productData.name,
      productData.description, 
      productData.price,
      productData.image,
      productData.category,
      productData.stock
      )

    res.send(newProduct)

  } catch ({name, message}) {
    next({name, message})
  }
})

//TODO Delete Product (Admin) SUCCESS

productsRouter.delete('/:productId', async (req, res, next) => {

  try {
    const product = await deleteProduct(req.params.productId)
    res.send(product)
  } catch ({name, message}) {
    next({name, message})
  }

})



module.exports = productsRouter;