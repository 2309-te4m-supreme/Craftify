const db = require('./client')
const SALT_COUNT = 10;

const createOrders_Product = async ({
    order_id,
    product_id,
    quantity  }) => {

      try {
      const { rows: [orders_product] } = await db.query(`
      INSERT INTO orders_products(
        order_id,
        product_id,
        quantity  )
      VALUES($1, $2, $3)
      RETURNING *`, [
        order_id,
        product_id,
        quantity]);
      return orders_product;
  } catch (err) {
      throw err;
  }
}

module.exports = { createOrders_Product}