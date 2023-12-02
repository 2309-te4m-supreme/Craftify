const db =require('./client');

const createProduct = async( product_name, product_description, product_price, product_image, product_category, product_stock ) => {
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

module.exports = { 
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct
}