const db = require("./client");
const product = require("./products");
const SALT_COUNT = 10;

const createOrders_Product = async ({ order_id, product_id, quantity }) => {
  try {
    if (!quantity) {
      quantity = 1;
    }
    const {
      rows: [orders_product],
    } = await db.query(
      `
      INSERT INTO orders_products(
        order_id,
        product_id,
        quantity  )
      VALUES($1, $2, $3)
      RETURNING *`,
      [order_id, product_id, quantity]
    );
    return orders_product;
  } catch (err) {
    throw err;
  }
};

const getAllProductsByOrderId = async (orderId) => {
  try {
    const { rows } = await db.query(
      `
    SELECT products.product_id, products.product_name, products.product_price, orders_products.quantity
    FROM orders_products
    JOIN products ON orders_products.product_id = products.product_id
    WHERE order_id = $1;
     ;`,
      [orderId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

const checkForPendingCart = async (userId) => {
  try {
    const { rows: order } = await db.query(
      `
      SELECT * FROM orders
      WHERE user_id=$1 AND order_status='Pending';`,
      [userId]
    );
    return order;
  } catch (err) {
    throw err;
  }
};

const removeFromCartByID = async (orderId, productId) => {
  try {
    const { rows } = await db.query(
      `
    DELETE FROM orders_products
    WHERE order_id = $1 AND product_id = $2
    RETURNING * ;`,
      [orderId, productId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

const updateQuantity = async (quantity, productId, orderId) => {
  try {
    const { rows } = await db.query(
      `
    UPDATE orders_products
      SET 
      quantity = $1 
    WHERE product_id = $2
    AND
    order_id = $3
    RETURNING * ;`,
      [quantity, productId, orderId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

// Update for Total
const updateOrderTotal = async (order_id) => {
  try {
    
    const { rows: sum } = await db.query(`
    SELECT sum(products.product_price * orders_products.quantity)
    FROM orders_products
    JOIN products ON orders_products.product_id = products.product_id
    WHERE order_id = $1;`,[order_id]);

    const subtotal = sum[0].sum
    const insertTotal = await db.query(`
    Update orders
    SET
    order_total = $1
    WHERE order_id = $2
    RETURNING * ;`, [subtotal, order_id])

    return subtotal;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createOrders_Product,
  getAllProductsByOrderId,
  checkForPendingCart,
  removeFromCartByID,
  updateQuantity,
  updateOrderTotal
};
