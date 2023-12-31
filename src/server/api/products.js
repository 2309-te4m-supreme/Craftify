const express = require('express')
const productsRouter = express.Router();

const { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct} = require('../db/products');
const { user } = require('../db');
const { requireAdmin } = require('./utils')

// Get All Products SUCCESS
// ROUTE /api/products/
productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts()

    res.send(products)
  } catch ({name, message}) {
    next({name, message})
  }
})

// Get Product SUCCESS
// ROUTE /api/products/:productId
productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId)
    res.send(product)
  } catch ({name, message}) {
    next({name, message})
  }
})

// Create Product (Admin) SUCCESS
// ROUTE /api/products/
productsRouter.post('/', requireAdmin, async (req, res, next) => {
  const { product_name, product_description, product_price, product_image, product_category, product_stock } = req.body
  const productData = {}

  try {
    productData.name = product_name
    productData.description = product_description
    productData.price = product_price
    productData.image = product_image
    productData.category = product_category
    productData.stock = product_stock

    const newProduct = await createProduct({
      product_name: productData.name,
      product_description: productData.description, 
      product_price: productData.price,
      product_image: productData.image,
      product_category: productData.category,
      product_stock: productData.stock
    })

    res.send(newProduct)

  } catch ({name, message}) {
    next({name, message})
  }
})

// Delete Product (Admin) SUCCESS
// ROUTE /api/products/:productId
productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {

  try {
    const product = await deleteProduct(req.params.productId)
    res.send(product)
  } catch ({name, message}) {
    next({name, message})
  }

})


// Update Product (Admin) SUCCESS
// ROUTE /api/products/:productId
productsRouter.put('/:productId', requireAdmin, async (req, res, next) => {

    try { 
    const { product_name, product_description, product_price, product_image, product_category, product_stock } = req.body

   const product = await updateProduct({id:req.params.productId, 
      product_name,
      product_description, 
      product_price,
      product_image,
      product_category,
      product_stock })


   res.send(product)
      
    } catch ({name, message}) {
      next({name, message})
    }
  
})



module.exports = productsRouter;