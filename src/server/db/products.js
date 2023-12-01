const db =require('./client');

const createProduct = async({ product_id, product_name, product_description, product_price, product_image, product_category, product_stock }) => {
    try {
        const { rows: [products ] } = await db.query(`
        INSERT INTO products(product_id, product_name, product_description, product_price, product_image, product_category, product_stock)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`, [product_id, product_name, product_description, product_price, product_image, product_category, product_stock]);

        return products;
    } catch (err) {
        throw err;
    }
}

module.exports = { createProduct }