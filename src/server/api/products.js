const express = require('express')
const productsRouter = express.Router();

const { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct} = require('../db/products');
const { user } = require('../db');

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

//TODO Delete Product (Admin) SUCCESS

productsRouter.delete('/:productId', async (req, res, next) => {

  try {
    const product = await deleteProduct(req.params.productId)
    res.send(product)
  } catch ({name, message}) {
    next({name, message})
  }

})


//TODO Update Product (Admin) SUCCESS
productsRouter.put('/:productId', async (req, res, next) => {

    try {

    const existingProduct = getProductById(req.params.productId);

    if (!existingProduct) return res.status(404).json({message:"This product does not exist"})

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