const db = require('./client');
const util = require('./utils');

const createProduct = async({ product_name, product_description, product_price, product_image, product_category, product_stock }) => {
    try {
        const { rows: [products] } = await db.query(`
        INSERT INTO products(product_name, product_description, product_price, product_image, product_category, product_stock)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *`, [product_name, product_description, product_price, product_image, product_category, product_stock]);
        return products;
    } catch (err) {
        throw err;
    }
}

const deleteProduct = async (productId) => {
    try {
        const { rows: product } = await db.query(`
            DELETE FROM products
            WHERE product_id=$1
            RETURNING *;
        `, [productId])
        return product
    } catch (error) {
        throw error;
    }
}

const getAllProducts = async() => {
    try {
        const {rows} = await db.query(`
            SELECT * FROM products;
        `)
        return rows
    } catch (error) {
        throw error;
    }
}

const getProductById = async(productId) => {
    try {
        const { rows: product } = await db.query(`
            SELECT * FROM products
            WHERE product_id=$1;
        `, [productId])
        return product
    } catch (error) {
        throw error;
    }
}

async function updateProduct({id, ...fields}){
    try {

      let product;
        const {rows} = await db.query(`
          UPDATE products
          SET  
            product_name= $1, 
            product_description = $2, 
            product_price = $3, 
            product_image = $4, 
            product_category = $5, 
            product_stock = $6
          WHERE product_id = $7
          RETURNING *;
        `, [fields.product_name, fields.product_description, fields.product_price, fields.product_image, fields.product_category, fields.product_stock, id]);

        product = rows[0];
        return product;

    } catch (error) {
      throw error
    }
}

module.exports = { 
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
}